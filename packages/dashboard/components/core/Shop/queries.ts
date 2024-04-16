import type { UseQueryHookOptions } from '@core/urql/hooks';
import { useQuery } from '@core/urql/hooks';
import { graphql as gql } from '@core/api/gql';
import { RefreshLimitsDocument } from '@core/api/graphql';
import type { RefreshLimitsQuery, RefreshLimitsQueryVariables } from '@core/api/graphql';

export const shopCountries = gql(`
  query ShopCountries($filter: CountryFilter) {
    shop {
      id
      countries(filters: $filter) {
        code
        name
      }
    }
  }
`);

const limitVariables: Record<keyof RefreshLimitsQueryVariables, boolean> = {
  channels: false,
  orders: false,
  productVariants: false,
  staffUsers: false,
  warehouses: false,
};

export const limitInfo = gql(`
  query RefreshLimits(
    $channels: Boolean!
    $orders: Boolean!
    $productVariants: Boolean!
    $staffUsers: Boolean!
    $warehouses: Boolean!
  ) {
    shop {
      id
      ...ShopLimit
    }
  }
`);
export const useShopLimitsQuery = (
  opts: UseQueryHookOptions<RefreshLimitsQuery, Partial<RefreshLimitsQueryVariables>>
) =>
  useQuery(RefreshLimitsDocument, {
    ...opts,
    variables: {
      ...limitVariables,
      ...opts.variables,
    },
  });
