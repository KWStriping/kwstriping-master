import type { OrderingDirection } from '@tempo/api/generated/graphql';

export interface UrlSorting<TField extends string> {
  field: TField;
  direction: OrderingDirection;
}
