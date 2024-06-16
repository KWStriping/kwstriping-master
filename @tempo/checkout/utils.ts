import type { ApolloError } from '@tempo/api';
import type {
  PublicMetafieldsValues,
  UnknownPublicSettingsValues,
} from '@tempo/checkout/types/api';
import type {
  Item,
  NamedNode,
  Node,
  PublicMetafieldID,
  PublicSettingID,
} from '@tempo/checkout/types/common';
import type { PaymentMethodID, PaymentProviderID } from '@tempo/checkout/types/payments';
import type { ChannelActivePaymentProvidersByChannel } from '@tempo/checkout/types/payments-api';

export const getParsedPaymentMethods = (
  activePaymentProvidersByChannel: Maybe<ChannelActivePaymentProvidersByChannel>
): PaymentMethodID[] => {
  if (!activePaymentProvidersByChannel) return [];
  return Object.entries(activePaymentProvidersByChannel)
    .filter(([, paymentProviderId]) => !!paymentProviderId)
    .map(([paymentMethodId]) => paymentMethodId) as PaymentMethodID[];
};

export const getParsedPaymentProviders = (
  activePaymentProvidersByChannel: Maybe<ChannelActivePaymentProvidersByChannel>
): readonly PaymentProviderID[] => {
  if (!activePaymentProvidersByChannel) return [];
  return Object.values(activePaymentProvidersByChannel).filter(
    (paymentProviderId): paymentProviderId is Exclude<typeof paymentProviderId, ''> =>
      !!paymentProviderId
  );
};

export const flattenSettingId = (
  groupId: PublicSettingID[number],
  optionIdx: number,
  settingId: string
) => `${groupId}-${optionIdx}-${settingId}`;

export const unflattenValue = (
  valueId: PublicMetafieldID[number],
  flattenedValues: Record<string, string>
) => {
  const valueKey = Object.keys(flattenedValues).find((flattedKey) => {
    const keys = flattedKey.split('-');

    return keys[0] === valueId;
  });

  return valueKey && flattenedValues[valueKey];
};

export const unflattenSettings = <S extends Node>(
  groupId: PublicSettingID[number],
  flattenedValues: Record<string, string>,
  options: S[]
) => {
  const unflattenedSettings: UnknownPublicSettingsValues = {};

  Object.keys(flattenedValues).forEach((flattedKey) => {
    const keys = flattedKey.split('-');

    if (keys[0] !== groupId) return;

    const mainKey = options[Number(keys[1])]?.id;
    const subKey = keys[2];

    if (mainKey && subKey) {
      const subkeyValue = flattenedValues[flattedKey];
      unflattenedSettings[mainKey] = {
        ...(unflattenedSettings[mainKey] ?? {}),
        ...(subkeyValue && { [subKey]: subkeyValue }),
      };
    }
  });

  return unflattenedSettings;
};

export const mapNodeToItem = (node: NamedNode): Item => ({
  id: node.id,
  label: node.name,
});
export const mapNodesToItems = (nodes?: NamedNode[]): Item[] => nodes?.map(mapNodeToItem) || [];

export const getCommonErrors = (error?: Partial<ApolloError>) =>
  error?.graphQLErrors || error?.networkError
    ? [...(error?.graphQLErrors || []), ...(error?.networkError ? [error.networkError] : [])]
    : [...(error ? [error] : [])];

export const getMetafield = (
  metafields: PublicMetafieldsValues,
  metafieldId: PublicMetafieldID[number]
) => metafields[metafieldId];

export const getRawAppPath = (path: string): string => {
  const trimmedQueryParams = path.split('?')[0] as string;

  return trimmedQueryParams.replace(/^\/[a-z]{2}(-[A-Z]{2})?(\/|$)/, '/');
};
