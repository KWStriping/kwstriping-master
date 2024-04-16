import { ProductCollectionDocument } from '@core/api';
import type { ProductCollectionQueryVariables, ProductFilter, ProductOrdering } from '@core/api';

import { useTranslation } from '@core/i18n';
import type { UrlSorting } from '@core/types/url';
import { useQuery } from '@core/urql/hooks/useQuery';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { Spinner } from '@core/ui/components/Spinner';
import { useLocalization } from '@core/ui/providers/LocalizationProvider';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import clsx from 'clsx';
import { ProductCard } from '../product/ProductCard';
import { Pagination } from '../Pagination';

export interface ProductCollectionProps {
  filter?: ProductFilter;
  sortBy?: Maybe<UrlSorting<ProductOrdering>>;
  allowMore?: boolean;
  perPage?: number;
  setCounter?: (value: number) => void;
  className?: string;
}

export function ProductCollection({
  filter,
  sortBy,
  setCounter,
  allowMore = true,
  perPage = 4,
  className,
}: ProductCollectionProps) {
  const { t } = useTranslation();
  const { query } = useLocalization();

  const variables: ProductCollectionQueryVariables = {
    ...(filter && { filter }),
    first: perPage,
    ...query,
    ...(sortBy?.field &&
      sortBy?.direction && {
        sortBy: {
          direction: sortBy.direction,
          field: sortBy.field,
        },
      }),
  };

  const [{ data, fetching: loading, error }, fetchMore] = useQuery(ProductCollectionDocument, {
    variables,
  });

  useEffect(() => {
    if (setCounter) setCounter(data?.products?.totalCount || 0);
  }, [setCounter, data?.products?.totalCount]);

  const onLoadMore = () => {
    return fetchMore({
      variables: {
        after: data?.products?.pageInfo.endCursor,
      },
    });
  };

  if (loading) return <Spinner />;
  // if (error) return <p>Error</p>;

  const products = mapEdgesToItems(data?.products);
  console.log('>>>', { data, loading, error });
  return (
    <div className={className}>
      {products?.length === 0 ? (
        <Typography fontSize="xl" data-testid="noResultsText" className={'m-10'}>
          {t('noProducts', 'No results')}
        </Typography>
      ) : (
        <>
          <ul
            className={clsx(
              'list-none p-0',
              !!products?.length && products.length > 1
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 list-none p-0'
                : 'flex items-center justify-center'
            )}
            data-testid="productsList"
          >
            {products?.map((product) => <ProductCard key={product.id} product={product} />)}
          </ul>
          {data?.products?.pageInfo && allowMore && (
            <Pagination
              onLoadMore={onLoadMore}
              pageInfo={data?.products?.pageInfo}
              itemsCount={data?.products?.edges?.length}
              totalCount={data?.products?.totalCount ?? 0}
            />
          )}
        </>
      )}
    </div>
  );
}

export default ProductCollection;
