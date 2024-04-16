import { ConfigurationTypeFieldEnum } from '@core/api/constants';
import type { ConfigurationItemFragment } from '@core/api/graphql';

export function isSecretField(config: ConfigurationItemFragment[], field: string) {
  return [
    ConfigurationTypeFieldEnum.Password,
    ConfigurationTypeFieldEnum.Secret,
    ConfigurationTypeFieldEnum.Secretmultiline,
  ].includes(config.find((configField) => configField.name === field).type);
}
