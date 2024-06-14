import type { SetPasswordData } from '@tempo/api/auth';
import { AccountErrorCode } from '@tempo/api/generated/constants';

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
        return t('dashboard_invalidPassword', messages.invalidPassword.defaultMessage);
      case AccountErrorCode.OutOfScopeUser:
        return t('dashboard_utOfScopeUser', messages.outOfScopeUser.defaultMessage);
      case AccountErrorCode.OutOfScopeGroup:
        return t('dashboard_utOfScopeGroup', messages.outOfScopeGroup.defaultMessage);
      case AccountErrorCode.PasswordEntirelyNumeric:
        return t('dashboard_asswordNumeric', messages.passwordNumeric.defaultMessage);
      case AccountErrorCode.PasswordTooCommon:
        return t('dashboard_ooCommon', messages.tooCommon.defaultMessage);
      case AccountErrorCode.PasswordTooShort:
        return t('dashboard_ooShort', messages.tooShort.defaultMessage);
      case AccountErrorCode.PasswordTooSimilar:
        return t('dashboard_ooSimilar', messages.tooSimilar.defaultMessage);
      case AccountErrorCode.Unique:
        return t('dashboard_nique', messages.unique.defaultMessage);
      case AccountErrorCode.Invalid:
        return t('dashboard_invalidToken', messages.invalidToken.defaultMessage);
      case AccountErrorCode.NotFound:
        return t('dashboard_serNotFound', messages.userNotFound.defaultMessage);
    }
  }

  return getCommonFormFieldErrorMessage(err, t);
}

export default getAccountErrorMessage;
