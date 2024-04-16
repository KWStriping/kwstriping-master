import { useQuery } from '@core/urql/hooks';
import { TaxClassAssignDocument } from '@core/api/graphql';
import type { TaxClassBaseFragment } from '@core/api/graphql';
import type { FetchMoreProps } from '@dashboard/oldSrc/types';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import { useMemo } from 'react';

interface UseTaxClassFetchMoreHookResult {
  taxClasses: Maybe<TaxClassBaseFragment[]>;
  fetchMoreTaxClasses: FetchMoreProps;
}

/**
 * Hook used in views where tax class can be assigned to an entity.
 * It can be replaced with a top-level search when search feature
 * is implemented in the API.
 * @returns taxClasses - list of tax classes
 * @returns fetchMore - props for paginated components, e.g. dropdowns
 */
export function useTaxClassFetchMore(): UseTaxClassFetchMoreHookResult {
  const [{ data, fetching: loading }, fetchMore] = useQuery(TaxClassAssignDocument, {
    variables: {
      first: 20,
    },
  });
  return useMemo(() => {
    const taxClasses = mapEdgesToItems(data?.taxClasses);
    const fetchMoreTaxClasses = {
      hasMore: !!data?.taxClasses?.pageInfo?.hasNextPage,
      loading,
      onFetchMore: () => {
        fetchMore({
          variables: {
            after: data?.taxClasses?.pageInfo?.endCursor,
          },
        });
      },
    };
    return { taxClasses, fetchMoreTaxClasses };
  }, [data]);
}
