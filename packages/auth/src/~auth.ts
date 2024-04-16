import type {
  ExternalAuthenticationUrlMutation,
  ExternalAuthenticationUrlMutationVariables,
  ExternalObtainAccessTokensMutation,
  ExternalObtainAccessTokensMutationVariables,
  ExternalRefreshMutation,
  ExternalRefreshMutationVariables,
  ExternalRefreshWithUserMutation,
  ExternalRefreshWithUserMutationVariables,
  ExternalVerifyMutation,
  ExternalVerifyMutationVariables,
  LoginMutation,
  LoginMutationVariables,
  PasswordChangeMutation,
  PasswordChangeMutationVariables,
  RefreshTokenMutation,
  RefreshTokenMutationVariables,
  RefreshTokenWithUserMutation,
  RefreshTokenWithUserMutationVariables,
  RegisterMutation,
  RegisterMutationVariables,
  RequestPasswordResetMutation,
  RequestPasswordResetMutationVariables,
  SetPasswordMutation,
  SetPasswordMutationVariables,
  VerifyTokenMutation,
  VerifyTokenMutationVariables,
} from '@core/api';
import {
  PasswordChangeDocument,
  ExternalAuthenticationUrlDocument,
  ExternalLogoutDocument,
  ExternalRefreshDocument,
  ExternalVerifyDocument,
  LoginDocument,
  ExternalObtainAccessTokensDocument,
  RequestPasswordResetDocument,
  RefreshTokenDocument,
  RegisterDocument,
  SetPasswordDocument,
  VerifyTokenDocument,
  RefreshTokenWithUserDocument,
  ExternalRefreshWithUserDocument,
  LoginWithoutDetailsDocument,
  UserDocument,
  UserWithoutDetailsDocument,
} from '@core/api';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useCallback } from 'react';
import { useAuthActions, useAuthPlugin, useAuthStore } from './storage';
import type { LoginResult, AuthClientMethodsProps, LoginOpts } from './types';

// export interface AuthSDK {
//   /**
//    * Change the password of the logged in user.
//    *
//    * @param opts - Object with password and new password.
//    * @returns Errors if the password change has failed.
//    */
//   changePassword: (opts: ChangePasswordOpts) => Promise<ChangePasswordResult>;

//   /**
//    * Clears stored token and Apollo store. If external plugin was used to log in, the mutation will prepare
//    * the logout URL. All values passed in field input will be added as GET parameters to the logout request.
//    *
//    * @param opts - Object with input as JSON with returnTo - the URL where a user should be redirected
//    * when external plugin was used to log in
//    * @returns Logout data and errors if external plugin was used to log in. Otherwise null.
//    */
//   logout: (opts?: LogoutOpts) => Promise<LogoutResult>;
//   /**
//    * Refresh JWT token. Mutation will try to take refreshToken from the function's arguments.
//    * If it fails, it will try to use refreshToken from the http-only cookie called refreshToken.
//    *
//    * @param includeUser - Whether to fetch user. Default false.
//    * @returns Authorization token.
//    */
//   refreshToken: (includeUser?: boolean) => Promise<RefreshTokenResult>;
//   /**
//    * Registers user with email and password.
//    *
//    * @param opts - Object with user's data. Email and password are required fields.
//    * "channel" can be changed by using first "setChannel" method from api.
//    * @returns Promise resolved with AccountRegister type data.
//    */
//   register: (opts: RegisterOpts) => Promise<RegisterResult>;
//   /**
//    * Sends an email with the account password modification link.
//    *
//    * @param opts - Object with slug of a channel which will be used for notify user,
//    * email of the user that will be used for password recovery and URL of a view
//    * where users should be redirected to reset the password. URL in RFC 1808 format.
//    *
//    * @returns Errors if there were some.
//    */
//   requestPasswordReset: (opts: RequestPasswordResetOpts) => Promise<RequestPasswordResetResult>;
//   /**
//    * Sets the user's password from the token sent by email.
//    *
//    * @param opts - Object with user's email, password and one-time token required to set the password.
//    * @returns User instance, JWT token, JWT refresh token and CSRF token.
//    */
//   setPassword: (opts: SetPasswordOpts) => Promise<SetPasswordResult>;
//   /**
//    * Verify JWT token.
//    *
//    * @param token - Token value.
//    * @returns User assigned to token and the information if the token is valid or not.
//    */
//   verifyToken: () => Promise<VerifyTokenResult>;
//   /**
//    * Executing externalAuthenticationUrl mutation will prepare special URL which will redirect user to requested
//    * page after successfull authentication. After redirection state and code fields will be added to the URL.
//    *
//    * @param opts - Object withpluginId default value set as "mirumee.authentication.openidconnect" and input as
//    * JSON with redirectUrl - the URL where the user should be redirected after successful authentication.
//    * @returns Authentication data and errors
//    */
//   getExternalAuthUrl: (opts: GetExternalAuthUrlOpts) => Promise<GetExternalAuthUrlResult>;
//   /**
//    * The obtainExternalAccessTokens mutation will generate requested access tokens.
//    *
//    * @param opts - Object withpluginId default value set as "mirumee.authentication.openidconnect" and input as
//    * JSON with code - the authorization code received from the OAuth provider and state - the state value received
//    * from the OAuth provider
//    * @returns Login authentication data and errors
//    */
//   getExternalAccessToken: (
//     opts: GetExternalAccessTokenOpts
//   ) => Promise<GetExternalAccessTokenResult>;
//   /**
//    * The refreshToken mutation will generate new access tokens when provided with a valid refresh token.
//    *
//    * @param includeUser - Whether to fetch user. Default false.
//    * @returns Token refresh data and errors
//    */
//   refreshToken: (includeUser?: boolean) => Promise<RefreshExternalTokenResult>;
//   /**
//    * The mutation will verify the authentication token.
//    *
//    * @returns Token verification data and errors
//    */
//   verifyToken: () => Promise<VerifyExternalTokenResult>;
// }

//   /**
//    * Authenticates user with email and password.
//    *
//    * @param opts - Object with user's email, password and a boolean includeDetails - whether to fetch user details.
//    * Default for includeDetails is true.
//    * @returns Promise resolved with CreateToken type data.
//    */
//   login: (opts: LoginOpts) => Promise<LoginResult>;

export const login = ({ includeDetails = true, ...opts }: LoginOpts): Promise<LoginResult> => {
  const query = includeDetails ? UserDocument : UserWithoutDetailsDocument;
  const loginMutation = includeDetails ? LoginDocument : LoginWithoutDetailsDocument;
  const authStore = useAuthStore.getState();
  authStore.actions.setTokens({ accessToken: null, csrfToken: null });
  authStore.actions.setAuthState('authenticating');

  return client.mutate<LoginMutation, LoginMutationVariables>({
    mutation: loginMutation,
    variables: {
      ...opts,
    },
    update: (_, { data }) => {
      if (data?.obtainToken?.accessToken) {
        storage.setTokens({
          accessToken: data?.obtainToken?.accessToken,
          csrfToken: data?.obtainToken?.csrfToken ?? null,
        });
      } else {
        client.writeQuery({
          query,
          data: {
            authenticating: false,
          },
        });
      }
    },
  });
};

export const useLogout = () => {
  const [pluginId] = useAuthPlugin();
  const auth = useAuthActions();
  const [logout, { fetching, error }] = useMutation(ExternalLogoutDocument);
  return useCallback(() => {
    auth.clear();
    if (pluginId) {
      logout({
        pluginId,
        input: JSON.stringify({ redirectUrl: window.location.href }),
      });
    }
  }, [auth, logout, pluginId]);
};

export const auth = ({ client, channel }: AuthClientMethodsProps): AuthSDK => {
  const register: AuthSDK['register'] = async (opts) =>
    await client.mutate<RegisterMutation, RegisterMutationVariables>({
      mutation: RegisterDocument,
      variables: {
        input: {
          ...opts,
          channel,
        },
      },
    });

  const refreshToken: AuthSDK['refreshToken'] = (includeUser = false) => {
    const csrfToken = storage.getCSRFToken();
    if (!csrfToken) throw Error('csrfToken not present');
    if (includeUser) {
      return client.mutate<RefreshTokenWithUserMutation, RefreshTokenWithUserMutationVariables>({
        mutation: RefreshTokenWithUserDocument,
        variables: {
          csrfToken,
        },
        update: (_, { data }) => {
          if (data?.refreshToken?.accessToken) {
            storage.setAccessToken(data?.refreshToken?.accessToken);
          } else {
            logout();
          }
        },
      });
    }

    return client.mutate<RefreshTokenMutation, RefreshTokenMutationVariables>({
      mutation: RefreshTokenDocument,
      variables: {
        csrfToken,
      },
      update: (_, { data }) => {
        if (data?.refreshToken?.accessToken) {
          storage.setAccessToken(data?.refreshToken?.accessToken);
        } else {
          logout();
        }
      },
    });
  };

  const verifyToken: AuthSDK['verifyToken'] = async () => {
    const token = storage.getAccessToken();

    if (!token) {
      throw Error('Token not present');
    }

    const result = await client.mutate<VerifyTokenMutation, VerifyTokenMutationVariables>({
      mutation: VerifyTokenDocument,
      variables: { token },
    });

    if (!result.data?.verifyToken?.isValid) {
      logout();
    }

    return result;
  };

  const changePassword: AuthSDK['changePassword'] = async (opts) => {
    return await client.mutate<PasswordChangeMutation, PasswordChangeMutationVariables>({
      mutation: PasswordChangeDocument,
      variables: { ...opts },
    });
  };

  const requestPasswordReset: AuthSDK['requestPasswordReset'] = async (opts) => {
    return await client.mutate<
      RequestPasswordResetMutation,
      RequestPasswordResetMutationVariables
    >({
      mutation: RequestPasswordResetDocument,
      variables: { ...opts, channel },
    });
  };

  const setPassword: AuthSDK['setPassword'] = (opts) => {
    return client.mutate<SetPasswordMutation, SetPasswordMutationVariables>({
      mutation: SetPasswordDocument,
      variables: { ...opts },
      update: (_, { data }) => {
        if (data?.setPassword?.accessToken) {
          storage.setTokens({
            accessToken: data?.setPassword?.token,
            csrfToken: data?.setPassword?.csrfToken || null,
          });
        }
      },
    });
  };

  const getExternalAuthUrl: AuthSDK['getExternalAuthUrl'] = async (opts) => {
    return await client.mutate<
      ExternalAuthenticationUrlMutation,
      ExternalAuthenticationUrlMutationVariables
    >({
      mutation: ExternalAuthenticationUrlDocument,
      variables: { ...opts },
    });
  };

  const getExternalAccessToken: AuthSDK['getExternalAccessToken'] = (opts) => {
    client.writeQuery({
      query: UserDocument,
      data: {
        authenticating: true,
      },
    });

    return client.mutate<
      ExternalObtainAccessTokensMutation,
      ExternalObtainAccessTokensMutationVariables
    >({
      mutation: ExternalObtainAccessTokensDocument,
      variables: {
        ...opts,
      },
      update: (_, { data }) => {
        if (data?.obtainExternalAccessTokens?.accessToken) {
          storage.setAuthPluginId(opts.pluginId);
          storage.setTokens({
            accessToken: data?.obtainExternalAccessTokens?.token,
            csrfToken: data?.obtainExternalAccessTokens?.csrfToken || null,
          });
        } else {
          client.writeQuery({
            query: UserDocument,
            data: {
              authenticating: false,
            },
          });
        }
      },
    });
  };

  const refreshToken: AuthSDK['refreshToken'] = (includeUser = false) => {
    const csrfToken = storage.getCSRFToken();
    const authPluginId = storage.getAuthPluginId();

    if (!csrfToken) {
      throw Error('csrfToken not present');
    }

    if (includeUser) {
      return client.mutate<
        ExternalRefreshWithUserMutation,
        ExternalRefreshWithUserMutationVariables
      >({
        mutation: ExternalRefreshWithUserDocument,
        variables: {
          pluginId: authPluginId,
          input: JSON.stringify({
            csrfToken,
          }),
        },
        update: (_, { data }) => {
          if (data?.refreshToken?.accessToken) {
            storage.setTokens({
              accessToken: data?.refreshToken?.token,
              csrfToken: data?.refreshToken?.csrfToken || null,
            });
          } else {
            logout();
          }
        },
      });
    }

    return client.mutate<ExternalRefreshMutation, ExternalRefreshMutationVariables>({
      mutation: ExternalRefreshDocument,
      variables: {
        pluginId: authPluginId,
        input: JSON.stringify({
          csrfToken,
        }),
      },
      update: (_, { data }) => {
        if (data?.refreshToken?.accessToken) {
          storage.setTokens({
            accessToken: data?.refreshToken?.token,
            csrfToken: data?.refreshToken?.csrfToken || null,
          });
        } else {
          logout();
        }
      },
    });
  };

  const verifyToken: AuthSDK['verifyToken'] = async () => {
    const csrfToken = storage.getCSRFToken();
    const authPluginId = storage.getAuthPluginId();

    if (!csrfToken) {
      throw Error('csrfToken not present');
    }

    const result = await client.mutate<ExternalVerifyMutation, ExternalVerifyMutationVariables>({
      mutation: ExternalVerifyDocument,
      variables: {
        pluginId: authPluginId,
        input: JSON.stringify({
          csrfToken,
        }),
      },
    });

    if (!result.data?.verifyToken?.isValid) {
      storage.clear();
    }

    return result;
  };
};
