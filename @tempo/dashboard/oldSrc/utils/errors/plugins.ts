import type { PluginErrorFragment } from '@tempo/api/generated/graphql';
import { PluginErrorCode } from '@tempo/api/generated/constants';

import { getCommonFormFieldErrorMessage } from './common';

const messages = {
  misconfigured: {
    id: '0AQH0Q',
    defaultMessage: 'Plugin is misconfigured and cannot be activated',
  },
  unique: {
    id: 'lqIzC8',
    defaultMessage: 'This field needs to be unique',
  },
};

function getPluginErrorMessage(err: PluginErrorFragment): string {
  if (err) {
    switch (err.code) {
      case PluginErrorCode.PluginMisconfigured:
        return t('dashboard_isconfigured', messages.misconfigured.defaultMessage);
      case PluginErrorCode.Unique:
        return t('dashboard_nique', messages.unique.defaultMessage);
    }
  }

  return getCommonFormFieldErrorMessage(err, t);
}

export default getPluginErrorMessage;
