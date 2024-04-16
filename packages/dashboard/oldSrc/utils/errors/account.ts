import type { SetPasswordData } from '@core/auth';
import type { TFunction } from '@core/i18n';
import { AccountErrorCode } from '@core/api/constants';

import { getCommonFormFieldErrorMessage } from './common';

const messages = {
  invalidPassword: {
    id: 'eu98dw',
    defaultMessage: 'Invalid password',
  },
  outOfScopeGroup: {
    id: '1n1tOR',
    defaultMessage: 'Group is out of your permission scope',
  },
  outOfScopeUser: {
    id: 'KRqgfo',
    defaultMessage: 'User is out of your permissions scope',
  },
  passwordNumeric: {
    id: 'cY42ht',
    defaultMessage: 'Password cannot be entirely numeric',
  },
  tooCommon: {
    id: 'wn3di2',
    defaultMessage: 'This password is too commonly used',
  },
  tooShort: {
    id: 'LR3HlT',
    defaultMessage: 'This password is too short',
  },
  tooSimilar: {
    id: '1wyZpQ',
    defaultMessage: 'These passwords are too similar',
  },
  unique: {
    id: 'TDhHMi',
    defaultMessage: 'This needs to be unique',
  },
  invalidToken: {
    id: 'ByYtFB',
    defaultMessage: 'Invalid or expired token. Please check your token in URL',
  },
  userNotFound: {
    id: 'tR+UuE',
    defaultMessage: "User doesn't exist. Please check your email in URL",
  },
};

interface ErrorFragment {
  code: AccountErrorCode | SetPasswordData['errors'][number]['code'];
  field: string | null;
}

function getAccountErrorMessage(err: ErrorFragment, t: TFunction): string {
  if (err) {
    switch (err.code) {
      case AccountErrorCode.InvalidPassword:
        return t('dashboard.invalidPassword', messages.invalidPassword.defaultMessage);
      case AccountErrorCode.OutOfScopeUser:
        return t('dashboard.utOfScopeUser', messages.outOfScopeUser.defaultMessage);
      case AccountErrorCode.OutOfScopeGroup:
        return t('dashboard.utOfScopeGroup', messages.outOfScopeGroup.defaultMessage);
      case AccountErrorCode.PasswordEntirelyNumeric:
        return t('dashboard.asswordNumeric', messages.passwordNumeric.defaultMessage);
      case AccountErrorCode.PasswordTooCommon:
        return t('dashboard.ooCommon', messages.tooCommon.defaultMessage);
      case AccountErrorCode.PasswordTooShort:
        return t('dashboard.ooShort', messages.tooShort.defaultMessage);
      case AccountErrorCode.PasswordTooSimilar:
        return t('dashboard.ooSimilar', messages.tooSimilar.defaultMessage);
      case AccountErrorCode.Unique:
        return t('dashboard.nique', messages.unique.defaultMessage);
      case AccountErrorCode.Invalid:
        return t('dashboard.invalidToken', messages.invalidToken.defaultMessage);
      case AccountErrorCode.NotFound:
        return t('dashboard.serNotFound', messages.userNotFound.defaultMessage);
    }
  }

  return getCommonFormFieldErrorMessage(err, t);
}

export default getAccountErrorMessage;
