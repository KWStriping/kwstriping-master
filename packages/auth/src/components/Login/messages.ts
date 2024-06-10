import { useTranslation } from '@core/i18n';
import { useCallback } from 'react';

export function useLoginErrorMessages() {
  const { t } = useTranslation();
  return useCallback(
    (err: string) => {
      // TODO: use error enum type
      switch (err) {
        case 'loginError':
          return t(
            'auth.errors.loginError',
            'Your username and/or password are incorrect. Please try again.'
          );
        case 'serverError':
          return t(
            'auth.errors.serverError',
            'Tempo is unavailable, please check your network connection and try again.'
          );
        case 'noPermissionsError':
          return t('auth.errors.noPermissionsError', "You don't have permission to login.");
        case 'externalLoginError':
        case 'unknownLoginError':
        default:
          return t('auth.errors.unknownLoginError', 'Login went wrong. Please try again.');
      }
    },
    [t]
  );
}
