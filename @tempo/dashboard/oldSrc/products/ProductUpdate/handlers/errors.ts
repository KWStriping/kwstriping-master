import { hasMutationErrors } from '@tempo/api/utils';
import type {
  ProductChannelListingUpdateMutation,
  ProductErrorCode,
  ProductBulkCreateMutation,
  ProductChannelListingUpdateMutation,
  ProductChannelListingUpdateMutationVariables,
  StockInput,
  VariantDatagridStockUpdateMutation,
  VariantDatagridStockUpdateMutationVariables,
  VariantDatagridUpdateMutation,
  VariantDatagridUpdateMutationVariables,
} from '@tempo/api/generated/graphql';

export type ProductListError =
  | {
    __typename: 'DatagridError';
    attributes: string[] | null;
    error: ProductErrorCode;
    productId: string;
    type: 'variantData';
  }
  | {
    __typename: 'DatagridError';
    productId: string;
    warehouseId: string;
    type: 'stock';
  }
  | {
    __typename: 'DatagridError';
    error: ProductErrorCode;
    productId: string;
    channelIds: string[];
    type: 'channel';
  }
  | {
    __typename: 'DatagridError';
    error: ProductErrorCode;
    index: number;
    type: 'create';
  };

export function getProductListErrors(
  productChannelsUpdateResult: OperationResult<ProductChannelListingUpdateMutation>,
  variantMutationResults: OperationResult[]
): ProductListError[] {
  return [productChannelsUpdateResult, ...variantMutationResults]
    .filter(hasMutationErrors)
    .flatMap((result) => {
      if (result.data?.updateProductChannelListing) {
        const data = result.data as ProductChannelListingUpdateMutation;
        return data?.updateProductChannelListing?.errors.map<ProductListError>(
          (error) => ({
            __typename: 'DatagridError',
            type: 'channel',
            error: error.code,
            productId: (
              result.extensions.variables as ProductChannelListingUpdateMutationVariables
            ).id,
            channelIds: error.channels,
          })
        );
      }

      if (result.data?.updateProductStocks) {
        const data = result.data as VariantDatagridStockUpdateMutation;
        const variables = result.extensions
          .variables as VariantDatagridStockUpdateMutationVariables;
        return [
          ...data?.updateProductStocks?.errors?.map<ProductListError>((error) => ({
            __typename: 'DatagridError',
            type: 'stock',
            productId: (variables as VariantDatagridStockUpdateMutationVariables).id,
            warehouseId: (variables.stocks as StockInput[])[error.index]?.warehouse,
          })),
          ...data?.deleteProductStocks?.errors?.map<ProductListError>(() => ({
            __typename: 'DatagridError',
            type: 'stock',
            productId: (variables as VariantDatagridStockUpdateMutationVariables).id,
            warehouseId: null,
          })),
        ];
      }

      if (result.data?.updateProduct) {
        const data = result.data as VariantDatagridUpdateMutation;
        const variables = result.extensions.variables as VariantDatagridUpdateMutationVariables;
        return data?.updateProduct?.errors.map<ProductListError>((error) => ({
          __typename: 'DatagridError',
          type: 'variantData',
          productId: (variables as VariantDatagridUpdateMutationVariables).id,
          error: error.code,
          attributes: error.attributes,
        }));
      }

      if (result.data?.createProducts) {
        const data = result.data as ProductBulkCreateMutation;
        return data?.createProducts?.errors.map<ProductListError>((error) => ({
          __typename: 'DatagridError',
          type: 'create',
          index: error.index,
          error: error.code,
        }));
      }
    });
}
