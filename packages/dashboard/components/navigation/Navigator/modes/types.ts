import type {
  CheckIfOrderExistsQuery,
  SearchCatalogQuery,
  SearchCustomersQuery,
} from '@core/api/graphql';
import type { RelayToFlat } from '@dashboard/oldSrc/types';

export interface ActionQueries {
  catalog: SearchCatalogQuery;
  customers: RelayToFlat<NonNullable<SearchCustomersQuery['search']>>;
  order: CheckIfOrderExistsQuery['order'];
}
