import type { PluginErrorFragment } from '@core/api/graphql';
import { PluginErrorCode } from '@core/api/constants';
import type { TFunction } from '@core/i18n';

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

function getPluginErrorMessage(err: PluginErrorFragment, t: TFunction): string {
  if (err) {
    switch (err.code) {
      case PluginErrorCode.PluginMisconfigured:
        return t('dashboard.isconfigured', messages.misconfigured.defaultMessage);
      case PluginErrorCode.Unique:
        return t('dashboard.nique', messages.unique.defaultMessage);
    }
  }

  return getCommonFormFieldErrorMessage(err, t);
}

export default getPluginErrorMessage;
