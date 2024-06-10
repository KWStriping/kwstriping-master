import CryptoJS from 'crypto-js';
import invariant from 'ts-invariant';
import type { SettingValue } from '@core/checkout/types/api';

const SETTINGS_ENCRYPTION_SECRET = process.env.SETTINGS_ENCRYPTION_SECRET;

export const obfuscateValue = (value: string) => {
  const unobfuscatedLength = Math.min(4, value.length - 4);

  // if value is 4 characters or less, obfuscate entire value
  if (unobfuscatedLength <= 0) {
    return '••••';
  }

  const unobfuscatedValue = value.slice(-unobfuscatedLength);

  return '••••' + ' ' + unobfuscatedValue;
};

export const encryptSetting = (settingValue: string): SettingValue => {
  invariant(
    SETTINGS_ENCRYPTION_SECRET,
    'Cannot encrypt settings when SETTINGS_ENCRYPTION_SECRET is not configured.'
  );
  return {
    encrypted: true,
    value: CryptoJS.AES.encrypt(settingValue, SETTINGS_ENCRYPTION_SECRET).toString() || '',
  };
};

export const decryptSetting = (settingValue: SettingValue, obfuscateEncryptedData: boolean) => {
  invariant(
    SETTINGS_ENCRYPTION_SECRET,
    'Cannot decrypt settings when SETTINGS_ENCRYPTION_SECRET is not configured'
  );
  const decrypted =
    CryptoJS.AES.decrypt(settingValue.value, SETTINGS_ENCRYPTION_SECRET).toString(
      CryptoJS.enc.Utf8
    ) || '';

  if (obfuscateEncryptedData) {
    return obfuscateValue(decrypted);
  }

  return decrypted;
};
