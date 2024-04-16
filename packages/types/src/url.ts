import type { OrderingDirection } from '@core/api';

export interface UrlSorting<TField extends string> {
  field: TField;
  direction: OrderingDirection;
}
