import type { TFunction } from '@core/i18n';

interface MessageDescriptor {
  id: string;
  description?: string | object;
  defaultMessage: string;
}

export const withLabels = <
  K extends string | number | symbol,
  T extends Record<string, any> & { id: K }
>(
  t: TFunction,
  messages: Record<K, MessageDescriptor>,
  items: T[]
): (T & { id: K; label: string })[] => {
  return items.map((item) => ({
    ...item,
    label: t(messages[item.id]?.id, messages[item.id].defaultMessage),
  }));
};

export const withNames = <
  K extends string | number | symbol,
  T extends Record<string, any> & { id: K }
>(
  t: TFunction,
  messages: Record<K, MessageDescriptor>,
  items: T[]
): (T & { id: K; name: string })[] => {
  return items.map((item) => ({
    ...item,
    name: messages[item.id]
      ? (t(messages[item.id]?.id, messages[item.id].defaultMessage) as unknown as string)
      : item.id.toString(),
  }));
};
