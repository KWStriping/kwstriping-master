import type { RefreshTokenMutation, RefreshTokenMutationVariables } from '@core/api/graphql';
import { RefreshTokenDocument } from '@core/api/graphql';
import { getServerSideClient } from '@core/urql/client';
import debounce from 'lodash-es/debounce';
import type { NextApiRequest } from 'next';
import type { Account, CallbacksOptions, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import { assert } from 'tsafe/assert';
import { ACCESS_TOKEN_TTL } from '../constants';

// https://next-auth.js.org/configuration/callbacks
const signIn: CallbacksOptions['signIn'] = async ({
  user: _user,
  account,
  profile,
  email: _email,
  credentials: _credentials,
}) => {
  // console.log('🔑 signIn', { _user, account, profile, _email, _credentials });
  if (account?.provider === 'google') {
    // TODO: Allow, but set emailVerified to false
    const _profile = profile as { email_verified: boolean };
    if (!_profile?.email_verified) return false;
  }
  // const client = getServerSideClient();
  // TODO
  // const { data } = await client.mutate<AuthorizeMutation, AuthorizeMutationVariables>({
  //   mutation: AuthorizeDocument,
  //   // TODO: Add login details
  //   variables: {
  //     provider,
  //     user: {
  //       id: user.id,
  //       email: user.email,
  //       firstName: user.firstName,
  //       lastName: user.lastName,
  //       username: user.username,
  //       birthday: user.birthday,
  //       imgUrl: user?.is_silhouette ? undefined : user?.image,
  //     },
  //   },
  // });
  // if (!data) return false;
  // userArg.me = parseGraphQLRes(data, "authorize");
  return true;
};

// https://next-auth.js.org/configuration/callbacks
const redirect: CallbacksOptions['redirect'] = async ({ url, baseUrl: _baseUrl }) => {
  const baseUrl = _baseUrl;
  console.log('🔑 redirect', { url, baseUrl });
  // console.log(process.env.NEXTAUTH_URL);
  // const baseUrl = _baseUrl.includes('/dashboard') ? _baseUrl : `${_baseUrl}/dashboard`;
  // if (url.match(new RegExp(`^${baseUrl}/?$`))) return baseUrl;
  // if (url.includes('login')) return baseUrl; // TODO
  // if (url.startsWith(baseUrl)) {
  //   const splitUrl = url.split('?next=');
  //   console.log('🔑 splitUrl', splitUrl);
  //   return splitUrl.length === 1 ? splitUrl[0] as string : splitUrl[1] as string;
  // }
  // Allow relative callback URLs.
  if (url.startsWith('/')) return new URL(url, baseUrl).toString();
  return baseUrl;
};

const readTokenDataFromAccount = (account: Account): Partial<JWT> => ({
  provider: account.provider,
  providerAccountId: account.providerAccountId,
  scopes: account.scope?.split(' '),
  accessToken: account.access_token,
});

const readTokenDataFromUser = (user: User): Partial<JWT> => {
  const { accessToken, refreshToken, csrfToken, id, email } = user;
  assert(!!accessToken && !!refreshToken && !!csrfToken);
  assert(!!id && !!email);
  return {
    accessToken,
    accessTokenExpiry: getExpiryForNewToken(),
    refreshToken,
    csrfToken,
    user: { id, email },
  };
};

const getJwtCallback: (req: NextApiRequest) => CallbacksOptions['jwt'] =
  (req) =>
  async ({ token, user, account }) => {
    // The account is only passed the first time this callback is called on a new session.
    // In subsequent calls, only the token is available.
    // console.log('🔑 jwt', { token, user, account });
    if (user || account) {
      // The user just logged in. Attach data to the token.
      if (account) {
        token = { ...token, ...readTokenDataFromAccount(account) };
        if (account.expires_at) {
          // TODO: source of truth on expiry?
          token.accessTokenExpiry = account.expires_at * 1000;
          token.refreshToken = account.refresh_token;
        }
      }
      if (user) token = { ...token, ...readTokenDataFromUser(user) };
    }
    if (req.query.refresh) {
      console.log('Refreshing access token due to req.query.refresh');
      token = await refreshAccessToken(token);
    }
    return token;
  };

const session: CallbacksOptions['session'] = async ({ session, token }) => {
  /*
      Attach the access token (and other desired data) to the session.

      An incoming session might looks like this:
      {
        user: {
          name: 'Jacob Fredericksen',
          email: 'jacob.t.fredericksen@gmail.com',
          image: 'https://lh3.googleusercontent.com/a-/AOh14Ggi_RwygCCU2-fH3tOLF8o8l9rlTJALV_TqnJXP=s96-c'
        },
        expires: '2021-12-27T17:57:11.871Z'
      }

      And the token might look like this:
      {
        name: 'Jacob Fredericksen',
        email: 'jacob.t.fredericksen@gmail.com',
        picture: 'https://lh3.googleusercontent.com/a-/AOh14Ggi_RwygCCU2-fH3tOLF8o8l9rlTJALV_TqnJXP=s96-c',
        sub: '103939397459532242325',
        accessToken: 'ya29.a0ARrdaM8aR-DKoygFFlTF8WaPdI4iihykJvUYI940WPSALlwaZxa35kKSiUxm9BvZlkWQJYyA914Z3gaMnN2YZBg339qD-iRPedsdOobq4mDLJ3QIKcBhEIOjqm0z9wqEaNALubwYNITCTD4cGLyBEmzzC0H4',
        iat: 1638035827,
        exp: 1640627827,
        jti: 'e6a89a68-0554-4930-8b74-32af60148b5f'
      }
    */
  if (token.error) {
    session.error = token.error;
  } else {
    delete session.error;
  }
  if (token.user?.id) session.user = token.user;
  if (token.accessToken) session.accessToken = token.accessToken;
  if (token.accessTokenExpiry) session.accessTokenExpiry = token.accessTokenExpiry;
  if (token.refreshToken) session.refreshToken = token.refreshToken;
  if (token.csrfToken) session.csrfToken = token.csrfToken;
  // console.log('🔑 session', session);
  return session;
};

// https://next-auth.js.org/configuration/callbacks
export const getCallbacks: (req: NextApiRequest) => CallbacksOptions = (req) => ({
  signIn,
  redirect,
  jwt: getJwtCallback(req),
  session,
});

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpiry`. If an error occurs,
 * returns the old token and an error property
 */
const refreshAccessToken = debounce(
  async function (token: JWT): Promise<JWT> {
    console.log(`🔑 Attempting to refresh access token ...`);
    // let url: string;
    try {
      assert(
        !!token.csrfToken && !!token.refreshToken,
        'csrfToken and refreshToken are required'
      );
      const client = getServerSideClient();
      const result = await client
        .mutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, {
          refreshToken: token.refreshToken,
          csrfToken: token.csrfToken,
          // pluginId: undefined, // TODO
        })
        .toPromise();
      assert(!!result.data?.refreshToken);
      assert(
        !result.data?.refreshToken?.errors?.length,
        result.data?.refreshToken?.errors?.join('\n')
      );
      const accessTokenExpiry = getExpiryForNewToken();
      const newAccessToken = result.data?.refreshToken?.result.accessToken;
      assert(newAccessToken && accessTokenExpiry > Date.now());
      console.log('Successfully refreshed token:', newAccessToken);
      delete token.error;
      return {
        ...token,
        accessToken: result.data?.refreshToken?.result.accessToken,
        accessTokenExpiry,
      };
      // switch (token.provider) {
      //   case 'google':
      //     url =
      //       'https://oauth2.googleapis.com/token?' +
      //       new URLSearchParams({
      //         client_id: `${process.env.AUTH_GOOGLE_ID}`,
      //         client_secret: `${process.env.AUTH_GOOGLE_SECRET}`,
      //         grant_type: 'refresh_token',
      //         refresh_token: `${token.refreshToken}`,
      //       });
      //     break;
      //   default:
      //     console.error(`Unsupported provider: ${token.provider}`);
      //     return token;
      // }
    } catch (error) {
      console.error('🔑 Error refreshing access token:', error);
      return {
        ...token,
        error: 'RefreshAccessTokenError',
      };
    }
  },
  5000,
  { leading: true, trailing: false }
);

function getExpiryForNewToken() {
  return Date.now() + ACCESS_TOKEN_TTL;
}
