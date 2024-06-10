import type {
  MutationSetDefaultAddressArgs,
  MutationExternalAuthenticationUrlArgs,
  MutationRequestPasswordResetArgs,
  MutationSetPasswordArgs,
  MutationRequestEmailChangeArgs,
  AccountConfirmMutationVariables,
  ExternalAuthenticationUrlMutation,
  LoginMutation,
  RefreshTokenMutation,
  RegisterMutation,
  RequestPasswordResetMutation,
  SetPasswordMutation,
  VerifyTokenMutation,
  PasswordChangeMutation,
  AccountConfirmMutation,
  ConfirmEmailChangeMutation,
  CreateAccountAddressMutation,
  RequestEmailChangeMutation,
  SetAccountDefaultAddressMutation,
} from '@tempo/api/generated/graphql';
import type { OperationResult } from '@urql/core';

import 'next-auth';
import 'next-auth/jwt';

interface SessionUserFields {
  id: string;
  email: string;
}

interface MaybeTokens {
  accessToken?: Maybe<string>;
  accessTokenExpiry?: Maybe<number>;
  csrfToken?: Maybe<string>;
  refreshToken?: Maybe<string>;
}

// https://next-auth.js.org/getting-started/typescript
declare module 'next-auth' {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface User extends SessionUserFields, MaybeTokens {}

  /**
   * Returned by `useSession` and `getSession`; received as a prop on `SessionProvider`.
   */
  interface Session {
    user: SessionUserFields;
    accessToken: string;
    accessTokenExpiry?: number;
    refreshToken: string;
    csrfToken: string;
    error?: string | null;
  }

  /**
   * Usually contains information about the provider being used
   * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
   */
  interface Account {
    scope?: string;
    access_token?: string;
    expires_at?: number;
    refresh_token?: string;
  }

  /** The OAuth profile returned from a provider */
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Profile {}

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  type AdapterUser = MaybeTokens;
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken` when using JWT sessions */
  interface JWT extends MaybeTokens {
    provider?: string;
    providerAccountId?: string;
    accessTokenExpiry?: number;
    error?: string | null;
    user?: SessionUserFields;
  }
}

export type { Session } from 'next-auth';
export type { JWT } from 'next-auth/jwt';

export type JWTToken = {
  iat: number;
  iss: string;
  owner: string;
  exp: number;
  token: string;
  email: string;
  type: string;
  user_id: string;
  is_staff: boolean;
};

// Auth
export type RequestPasswordResetOpts = MutationRequestPasswordResetArgs;
export type SetPasswordOpts = MutationSetPasswordArgs;
export type GetExternalAuthUrlOpts = MutationExternalAuthenticationUrlArgs;
// User
export type RequestEmailChangeOpts = MutationRequestEmailChangeArgs;
export type SetAccountDefaultAddressOpts = MutationSetDefaultAddressArgs;
export type ConfirmAccountOpts = AccountConfirmMutationVariables;

// Methods results
// Auth
export type ChangePasswordResult = OperationResult<PasswordChangeMutation>;
export type ChangePasswordData = PasswordChangeMutation['changePassword'];
export type LoginResult = OperationResult<LoginMutation>;
export type LoginData = LoginMutation['obtainToken'];
export type RefreshTokenResult = OperationResult<RefreshTokenMutation>;
export type RefreshTokenData = RefreshTokenMutation['refreshToken'];
export type RegisterResult = OperationResult<RegisterMutation>;
export type RequestPasswordResetResult = OperationResult<RequestPasswordResetMutation>;
export type RequestPasswordResetData = RequestPasswordResetMutation['requestPasswordReset'];
export type SetPasswordResult = OperationResult<SetPasswordMutation>;
export type SetPasswordData = SetPasswordMutation['setPassword'];
export type VerifyTokenResult = OperationResult<VerifyTokenMutation>;
export type VerifyTokenData = VerifyTokenMutation['verifyToken'];
export type GetExternalAuthUrlResult = OperationResult<ExternalAuthenticationUrlMutation>;
export type GetExternalAuthUrlData =
  ExternalAuthenticationUrlMutation['externalAuthenticationUrl'];
// User
export type ConfirmEmailChangeResult = OperationResult<ConfirmEmailChangeMutation>;
export type ConfirmEmailChangeData = ConfirmEmailChangeMutation['confirmEmailChange'];
export type CreateAccountAddressResult = OperationResult<CreateAccountAddressMutation>;
export type CreateAccountAddressData = CreateAccountAddressMutation['addAddress'];
export type RequestEmailChangeResult = OperationResult<RequestEmailChangeMutation>;
export type RequestEmailChangeData = RequestEmailChangeMutation['requestEmailChange'];
export type SetAccountDefaultAddressResult = OperationResult<SetAccountDefaultAddressMutation>;
export type SetAccountDefaultAddressData = SetAccountDefaultAddressMutation['setDefaultAddress'];
export type ConfirmAccountResult = OperationResult<AccountConfirmMutation>;
export type ConfirmAccountData = AccountConfirmMutation['confirmAccount'];
