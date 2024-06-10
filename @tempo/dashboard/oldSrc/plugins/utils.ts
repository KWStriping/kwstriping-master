import { ConfigurationTypeFieldEnum } from '@tempo/api/generated/constants';
import type { ConfigurationItemFragment } from '@tempo/api/generated/graphql';

export function isSecretField(config: ConfigurationItemFragment[], field: string) {
  return [
    ConfigurationTypeFieldEnum.Password,
    ConfigurationTypeFieldEnum.Secret,
    ConfigurationTypeFieldEnum.Secretmultiline,
  ].includes(config.find((configField) => configField.name === field).type);
}
