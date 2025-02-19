import * as m from '@paraglide/messages';
import { useCallback } from 'react';

export function useLoginErrorMessages() {
  return useCallback((err: string) => {
    // TODO: use error enum type
    switch (err) {
      case 'loginError':
        return t(
          'auth_errors_loginError',
          'Your username and/or password are incorrect. Please try again.'
        );
      case 'serverError':
        return t(
          'auth_errors_serverError',
          'Tempo is unavailable, please check your network connection and try again.'
        );
      case 'noPermissionsError':
        return m.auth_errors_noPermissionsError() ?? "You don't have permission to login.";
      case 'externalLoginError':
      case 'unknownLoginError':
      default:
        return m.auth_errors_unknownLoginError() ?? 'Login went wrong. Please try again.';
    }
  }, []);
}
