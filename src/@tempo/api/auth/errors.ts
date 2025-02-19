import { findValueInEnum } from '@tempo/utils/enums';
// import type { ApolloError } from '@tempo/api/types';
import type { ApolloError } from '@tempo/api/types';

export const JWTError = {
  Invalid: 'InvalidTokenError',
  InvalidSignature: 'InvalidSignatureError',
  Expired: 'ExpiredSignatureError',
} as const;

export const AuthError = {
  PermissionDenied: 'PermissionDenied',
  OAuthError: 'OAuthError',
} as const;

export type AuthError = (typeof AuthError)[keyof typeof AuthError];

export function isJwtError(error: ApolloError['graphQLErrors'][0]): boolean {
  let _isJwtError: boolean;
  if (!error.extensions.code) return false;
  try {
    _isJwtError = !!findValueInEnum(error.extensions.code, JWTError);
  } catch (e) {
    console.error('isJwtError:', e);
    _isJwtError = false;
  }
  return _isJwtError;
}

export function isTokenExpired(error: ApolloError['graphQLErrors'][0]): boolean {
  return error.extensions.code === JWTError.Expired;
}
