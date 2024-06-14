import type { AppErrorFragment } from '@tempo/api/generated/graphql';
import { AppErrorCode } from '@tempo/api/generated/constants';

import { getCommonFormFieldErrorMessage } from './common';

const messages = {
  invalidManifestFormat: {
    id: 'pC6/1z',
    defaultMessage: 'Invalid manifest format',
  },
  invalidPermission: {
    id: 'D2qihU',
    defaultMessage: 'Permission is invalid',
  },
  invalidStatus: {
    id: 'v3WWK+',
    defaultMessage: 'Status is invalid',
  },
  invalidUrlFormat: {
    id: 'g/BrOt',
    defaultMessage: 'Url has invalid format',
  },
  outOfScopeApp: {
    id: 'C4hCsD',
    defaultMessage: 'App is out of your permissions scope',
  },
  outOfScopeGroup: {
    id: '1n1tOR',
    defaultMessage: 'Group is out of your permission scope',
  },
  outOfScopePermission: {
    id: '4prRLv',
    defaultMessage: 'Permission is out of your scope',
  },
  unique: {
    id: 'TDhHMi',
    defaultMessage: 'This needs to be unique',
  },
};

function getAppErrorMessage(err: AppErrorFragment, t: TFunction): string {
  if (err) {
    switch (err.code) {
      case AppErrorCode.InvalidManifestFormat:
        return t('dashboard_invalidManifestFormat', messages.invalidManifestFormat.defaultMessage);
      case AppErrorCode.OutOfScopeApp:
        return t('dashboard_utOfScopeApp', messages.outOfScopeApp.defaultMessage);
      case AppErrorCode.OutOfScopePermission:
        return t('dashboard_utOfScopePermission', messages.outOfScopePermission.defaultMessage);
      case AppErrorCode.InvalidPermission:
        return t('dashboard_invalidPermission', messages.invalidPermission.defaultMessage);
      case AppErrorCode.InvalidStatus:
        return t('dashboard_invalidStatus', messages.invalidStatus.defaultMessage);
      case AppErrorCode.InvalidUrlFormat:
        return t('dashboard_invalidUrlFormat', messages.invalidUrlFormat.defaultMessage);
      case AppErrorCode.Unique:
        return t('dashboard_nique', messages.unique.defaultMessage);
    }
  }

  return getCommonFormFieldErrorMessage(err, t);
}

export default getAppErrorMessage;
