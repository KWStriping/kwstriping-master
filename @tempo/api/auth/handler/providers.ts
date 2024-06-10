import pick from 'lodash-es/pick';
import type { AppProviders } from 'next-auth/providers';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import InstagramProvider from 'next-auth/providers/instagram';
import { assert } from 'tsafe/assert';
import { LoginDocument } from '@tempo/api/generated/graphql';
import { gql } from '@tempo/api';

const USE_CLIENT_SIDE_AUTH = true;

const GOOGLE_AUTHORIZATION_URL =
  'https://accounts.google.com/o/oauth2/v2/auth?' +
  new URLSearchParams({
    prompt: 'consent',
    access_type: 'offline',
    response_type: 'code',
  });

const APP_ENV = process.env.APP_ENV;

let useMockProviders = false;
if (APP_ENV === 'test') {
  console.log('⚠️ Using mocked auth providers');
  useMockProviders = true;
}

export const LOGIN = gql(`
  mutation login($email: String!, $password: String!) {
    obtainToken(authInput: { email: $email, password: $password }) {
      result {
        accessToken
        refreshToken
        csrfToken
        user {
          ...UserDetails
        }
      }
      errors {
        message
        field
        code
      }
    }
  }
`);

type Credentials<UseClientSideAuth extends boolean> = UseClientSideAuth extends false
  ? {
      email: { label: 'Email address'; type: 'text'; placeholder: '' };
      password: { label: 'Password'; type: 'password' };
    }
  : {
      id: { label: 'ID'; type: 'text'; placeholder: '' };
      email: { label: 'Email address'; type: 'text'; placeholder: '' };
      accessToken: { label: 'Token'; type: 'text'; placeholder: '' };
      refreshToken: { label: 'Refresh Token'; type: 'text'; placeholder: '' };
      csrfToken: { label: 'CSRF Token'; type: 'text'; placeholder: '' };
    };

const providers: AppProviders = [];
if (useMockProviders) {
  // TODO
} else {
  providers.push(
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID ?? '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? '',
      userinfo: {
        params: { fields: 'id,email,first_name,last_name,birthday,picture{is_silhouette,url}' },
      },
      profile(profile: any) {
        return {
          ...profile,
          firstName: profile.first_name,
          lastName: profile.last_name,
          is_silhouette: profile.picture.data?.is_silhouette,
          image: profile.picture.data?.url,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID ?? '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? '',
      authorization: GOOGLE_AUTHORIZATION_URL,
      checks: ['state'],
      profile(profile: any) {
        return {
          id: profile.sub,
          email: profile.email,
          firstName: profile.given_name,
          lastName: profile.family_name,
          image: profile.picture,
        };
      },
    }),
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID ?? '',
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? '',
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: 'b5082b8898654db6dca9',
      clientSecret: '4924f08c72935c24b98ae8c7ce4ae0b1a03cded8',
    }),
    // https://next-auth.js.org/providers/credentials
    USE_CLIENT_SIDE_AUTH
      ? CredentialsProvider<Credentials<true>>({
          id: 'credentials',
          name: 'Credentials', // name to display on the sign-in form ('Sign in with ____')
          credentials: {
            id: { label: 'ID', type: 'text', placeholder: '' },
            email: { label: 'Email address', type: 'text', placeholder: '' },
            accessToken: { label: 'Token', type: 'text', placeholder: '' },
            refreshToken: { label: 'Refresh Token', type: 'text', placeholder: '' },
            csrfToken: { label: 'CSRF Token', type: 'text', placeholder: '' },
          },
          async authorize(credentials) {
            if (!credentials?.accessToken || !credentials?.csrfToken) return null;
            return pick(credentials, ['id', 'email', 'accessToken', 'refreshToken', 'csrfToken']);
          },
        })
      : CredentialsProvider<Credentials<false>>({
          id: 'credentials',
          name: 'Credentials', // name to display on the sign-in form ('Sign in with ____')
          credentials: {
            email: { label: 'Email address', type: 'text', placeholder: '' },
            password: { label: 'Password', type: 'password' },
          },
          async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) return null;
            const credentialsAreValid = true;
            if (credentialsAreValid) {
              const client = getClient();
              assert(!!client);
              const { data, error } = await client
                .mutation(LoginDocument, {
                  email: credentials.email,
                  password: credentials.password,
                })
                .toPromise();
              console.log('🔑 error', error);
              if (data?.obtainToken?.result.accessToken && data?.obtainToken?.result.csrfToken) {
                const { user, accessToken, csrfToken } = data?.obtainToken.result ?? {};
                assert(!!user?.email);
                assert(!!accessToken);
                assert(!!csrfToken);
                console.log('🔑 result', data.obtainToken.result);
                return { ...user, accessToken, csrfToken };
              }
            }
            return null;
          },
        })
  );
}

export default providers;
