import type { UseQueryHookOptions } from '@tempo/api/hooks';
import { useQuery } from '@tempo/api/hooks';
import { gql } from '@tempo/api/gql';
import { RefreshLimitsDocument } from '@tempo/api/generated/graphql';
import type {
  RefreshLimitsQuery,
  RefreshLimitsQueryVariables,
} from '@tempo/api/generated/graphql';

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
