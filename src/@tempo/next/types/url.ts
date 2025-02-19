import type { OrderingDirection } from '@tempo/api';

export interface UrlSorting<TField extends string> {
  field: TField;
  direction: OrderingDirection;
}
