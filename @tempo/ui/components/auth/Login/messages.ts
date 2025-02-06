import { useCallback } from 'react';

export function useLoginErrorMessages() {
  return useCallback((err: string) => {
    // TODO: use error enum type
    switch (err) {
      case 'loginError':
        return 'Your username and/or password are incorrect. Please try again.';
      case 'serverError':
        return 'Tempo is unavailable, please check your network connection and try again.';
      case 'noPermissionsError':
        return "You don't have permission to login.";
      case 'externalLoginError':
      case 'unknownLoginError':
      default:
        return 'Login went wrong. Please try again.';
    }
  }, []);
}
