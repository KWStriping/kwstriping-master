import type { ProductCountQuery, ProductCountQueryVariables } from '@tempo/api/generated/graphql';
import { useQuery } from '@tempo/api/hooks';
import { ProductCountDocument } from '@tempo/api/generated/graphql';
import type { ProductCountQueryVariables } from '@tempo/api/generated/graphql';
import type {
  UseTypeDeleteData,
  UseTypeDeleteProps,
} from '@tempo/dashboard/oldSrc/pageKlasses/hooks/usePageKlassDelete/types';
import { productListUrl } from '@tempo/dashboard/oldSrc/products/urls';
import type {
  ProductKlassListUrlQueryParams,
  ProductKlassUrlQueryParams,
} from '@tempo/dashboard/oldSrc/productKlasses/urls';
import { useMemo } from 'react';

import * as messages from './messages';

type UseProductKlassDeleteProps<T = ProductKlassListUrlQueryParams | ProductKlassUrlQueryParams> =
  UseTypeDeleteProps<T>;

function useProductKlassDelete({
  params,
  singleId,
  selectedTypes,
}: UseProductKlassDeleteProps): UseTypeDeleteData {
  const productKlasses = selectedTypes || [singleId];

  const isDeleteDialogOpen = params.action === 'remove';

  const productsAssignedToSelectedTypesQueryVars = useMemo<ProductCountQueryVariables>(
    () => ({
      filter: {
        productKlasses,
      },
    }),
    [productKlasses]
  );

  const shouldSkipProductListQuery = !productKlasses.length || !isDeleteDialogOpen;

  const {
    data: productsAssignedToSelectedTypesData,
    loading: loadingProductsAssignedToSelectedTypes,
  } = useQuery<ProductCountQuery, ProductCountQueryVariables>(ProductCountDocument, {
    variables: productsAssignedToSelectedTypesQueryVars,
    pause: shouldSkipProductListQuery,
  });

  const selectedProductsAssignedToDeleteUrl = productListUrl({
    productKlasses,
  });

  const assignedItemsCount = productsAssignedToSelectedTypesData?.products?.totalCount;

  return {
    ...messages,
    isOpen: isDeleteDialogOpen,
    assignedItemsCount,
    viewAssignedItemsUrl: selectedProductsAssignedToDeleteUrl,
    isLoading: loadingProductsAssignedToSelectedTypes,
    typesToDelete: productKlasses,
  };
}

export default useProductKlassDelete;
