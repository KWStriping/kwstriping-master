import type {
  CheckIfOrderExistsQuery,
  SearchCatalogQuery,
  SearchCustomersQuery,
} from '@tempo/api/generated/graphql';
import type { RelayToFlat } from '@tempo/dashboard/oldSrc/types';

export interface ActionQueries {
  catalog: SearchCatalogQuery;
  customers: RelayToFlat<NonNullable<SearchCustomersQuery['search']>>;
  order: CheckIfOrderExistsQuery['order'];
}
