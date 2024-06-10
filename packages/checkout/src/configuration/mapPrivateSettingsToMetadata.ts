import reduce from 'lodash-es/reduce';
import type { CommonField } from '@core/checkout/config/fields';
import { fields } from '@core/checkout/config/fields';
import type { PrivateSettingsValues, SettingValue } from '@core/checkout/types/api';
import type { PrivateSettingID } from '@core/checkout/types/common';
import { encryptSetting } from './encryption';

const encryptSubSettings = (
  subSetting: Record<string, string> | undefined,
  subSettingsFieldsInput?: CommonField[]
) => {
  const subSettingsFields = Array.isArray(subSettingsFieldsInput) ? subSettingsFieldsInput : [];

  return reduce(
    subSetting,
    (result, value, valueKey) => {
      const setting = subSettingsFields?.find((setting) => setting.id === valueKey);

      if (setting?.encrypt && value) {
        return {
          ...result,
          [valueKey]: encryptSetting(value),
        };
      }
      return {
        ...result,
        [valueKey]: {
          encrypted: false,
          value,
        },
      };
    },
    {} as Record<string, SettingValue>
  );
};

const encryptSettings = (
  settingsValues: Partial<Record<string, Record<string, string>>> | undefined,
  settingsFields: Record<string, CommonField[]>
) => {
  return reduce(
    settingsValues,
    (result, subSetting, settingKey) => {
      const subSettingsFields = settingsFields[settingKey];

      const encryptedSubSetting = encryptSubSettings(subSetting, subSettingsFields);

      return {
        ...result,
        [settingKey]: encryptedSubSetting,
      };
    },
    {} as Partial<PrivateSettingsValues<'encrypted'>[keyof PrivateSettingsValues<'unencrypted'>]>
  );
};

export const mapPrivateSettingsToMetadata = (
  settingsValues: Partial<PrivateSettingsValues<'unencrypted'>>
) => {
  return Object.keys(settingsValues).reduce(
    (metadata, settingsValuesKey) => {
      const settingsValuesObject = encryptSettings(
        settingsValues[settingsValuesKey as keyof PrivateSettingsValues<'unencrypted'>],
        fields[settingsValuesKey as PrivateSettingID[number]]
      );
      const settingsValuesValue = JSON.stringify(settingsValuesObject);

      return [
        ...metadata,
        {
          key: settingsValuesKey,
          value: settingsValuesValue,
        },
      ];
    },
    [] as Array<{
      key: string;
      value: string;
    }>
  );
};
