
import * as m from '@paraglide/messages';
import useNotifier from '@tempo/ui/hooks/useNotifier';
import { useMutation } from '@tempo/api/hooks/useMutation';
import type { OperationResult } from '@urql/core';
import { useState } from 'react';
import type { ProductListError } from './errors';
import { getProductListErrors } from './errors';
import { getProductChannelsUpdateVariables, getProductUpdateVariables } from './utils';
import type { ProductUpdateSubmitData } from '@tempo/dashboard/components/products/ProductUpdatePage/types';
import { getVariantChannelsInputs } from '@tempo/dashboard/components/products/Products/getVariantChannelsInputs';
import {
  getStockInputs,
  getStocks,
  getVariantChannels,
  getVariantInput,
  getVariantInputs,
} from '@tempo/dashboard/components/products/Products/utils';
import {
  ValueDeleteDocument,
  FileUploadDocument,
  ProductChannelListingUpdateDocument,
  ProductUpdateDocument,
  ProductBulkCreateDocument,
  ProductBulkDeleteDocument,
  UpdateMetadataDocument,
  UpdatePrivateMetadataDocument,
  VariantDatagridChannelListingUpdateDocument,
  VariantDatagridStockUpdateDocument,
  VariantDatagridUpdateDocument,
} from '@tempo/api/generated/graphql';
import type {
  AttributeErrorFragment,
  BulkProductErrorFragment,
  MetadataErrorFragment,
  ProductChannelListingErrorFragment,
  ProductErrorFragment,
  ProductErrorWithAttributesFragment,
  ProductFragment,
  UploadErrorFragment,
} from '@tempo/api/generated/graphql';

import {
  mergeValueDeleteErrors,
  mergeFileUploadErrors,
} from '@tempo/dashboard/oldSrc/attributes/utils/data';
import {
  handleDeleteMultipleValues,
  handleUploadMultipleFiles,
} from '@tempo/dashboard/oldSrc/attributes/utils/handlers';
import { getProductErrorMessage } from '@tempo/dashboard/oldSrc/utils/errors';
import createMetadataUpdateHandler from '@tempo/dashboard/oldSrc/utils/handlers/metadataUpdateHandler';

export type UseProductUpdateHandlerError =
  | ProductErrorWithAttributesFragment
  | ProductErrorFragment
  | BulkProductErrorFragment
  | AttributeErrorFragment
  | UploadErrorFragment
  | ProductChannelListingErrorFragment
  | ProductListError;

type UseProductUpdateHandler = (
  data: ProductUpdateSubmitData
) => Promise<Array<UseProductUpdateHandlerError | MetadataErrorFragment>>;
interface UseProductUpdateHandlerOpts {
  called: boolean;
  loading: boolean;
  errors: ProductErrorWithAttributesFragment[];
  variantListErrors: ProductListError[];
  channelsErrors: ProductChannelListingErrorFragment[];
}

export function useProductUpdateHandler(
  product: ProductFragment | null | undefined
): [UseProductUpdateHandler, UseProductUpdateHandlerOpts] {
  const notify = useNotifier();
  const [variantListErrors, setVariantListErrors] = useState<ProductListError[]>([]);
  const [called, setCalled] = useState(false);
  const [loading, setLoading] = useState(false);

  const [updateMetadata] = useMutation(UpdateMetadataDocument);
  const [updatePrivateMetadata] = useMutation(UpdatePrivateMetadataDocument);
  const [updateStocks] = useMutation(VariantDatagridStockUpdateDocument);
  const [updateVariant] = useMutation(VariantDatagridUpdateDocument);
  const [createVariants] = useMutation(ProductBulkCreateDocument);
  const [deleteVariants] = useMutation(ProductBulkDeleteDocument);
  const [uploadFile] = useMutation(FileUploadDocument);

  const [updateProduct, updateProductOpts] = useMutation(ProductUpdateDocument);
  const [updateChannels, updateChannelsOpts] = useMutation(ProductChannelListingUpdateDocument, {
    onCompleted: (data) => {
      if (data?.updateProductChannelListing?.errors?.length) {
        data?.updateProductChannelListing?.errors?.forEach((error) =>
          notify(getProductErrorMessage(error, t), {
            type: 'error',
          })
        );
      }
    },
  });

  const [updateVariantChannels] = useMutation(VariantDatagridChannelListingUpdateDocument);
  const [deleteValue] = useMutation(ValueDeleteDocument);

  const sendMutations = async (
    data: ProductUpdateSubmitData
  ): Promise<UseProductUpdateHandlerError[]> => {
    if (!product) return;
    let errors: UseProductUpdateHandlerError[] = [];
    const uploadFilesResult = await handleUploadMultipleFiles(
      data?.attributesWithNewFileValue,
      (variables) => uploadFile({ ...variables })
    );

    const deleteValuesResult = await handleDeleteMultipleValues(
      data?.attributesWithNewFileValue,
      product.attributes,
      (variables) => deleteValue({ ...variables })
    );

    errors = [
      ...errors,
      ...mergeFileUploadErrors(uploadFilesResult),
      ...mergeValueDeleteErrors(deleteValuesResult),
    ];

    if (data?.variants?.removed?.length) {
      const variantDeletionResult = await deleteVariants({
        ids: data?.variants?.removed?.map((index) => product.variants?.[index]?.id),
      });
      errors.push(...(variantDeletionResult.data?.deleteProducts?.errors ?? []));
    }

    const result = await updateProduct({
      ...getProductUpdateVariables(product, data, uploadFilesResult),
    });
    errors = [...errors, ...(result.data?.updateProduct?.errors ?? [])];

    const productChannelsUpdateResult = await updateChannels({
      ...getProductChannelsUpdateVariables(product, data),
    });

    const mutations: Array<Promise<OperationResult>> = [
      ...getStocks(product.variants, data?.variants).map((variables) =>
        updateStocks({ ...variables })
      ),
      ...getVariantInputs(product.variants, data?.variants).map((variables) =>
        updateVariant({ ...variables })
      ),
      ...getVariantChannels(product.variants, data?.variants).map((variables) =>
        updateVariantChannels({
          ...variables,
        })
      ),
    ];

    if (data?.variants?.added?.length) {
      mutations.push(
        createVariants({
          id: product.id,
          inputs: data?.variants?.added.map((index) => ({
            ...getVariantInput(data?.variants, index),
            channelListings: getVariantChannelsInputs(data?.variants, index),
            stocks: getStockInputs(data?.variants, index).stocks,
          })),
        })
      );
    }

    const variantMutationResults = await gather<OperationResult>(mutations);

    const variantErrors = getProductListErrors(
      productChannelsUpdateResult,
      variantMutationResults
    );

    errors = [...errors, ...variantErrors];

    setVariantListErrors(variantErrors);

    return errors;
  };

  const submit = async (data: ProductUpdateSubmitData) => {
    setCalled(true);
    setLoading(true);

    const errors = await createMetadataUpdateHandler(
      product,
      sendMutations,
      (variables) => updateMetadata({ ...variables }),
      (variables) => updatePrivateMetadata({ ...variables })
    )(data);

    setLoading(false);

    if (errors?.length === 0) {
      notify((m.dashboard_savedChanges() ?? 'Saved changes'), {
        type: 'success',
      });
    }

    return errors;
  };

  const errors = updateProductOpts.data?.updateProduct?.errors ?? [];

  const channelsErrors = updateChannelsOpts?.data?.updateProductChannelListing?.errors ?? [];

  return [
    submit,
    {
      called,
      loading,
      channelsErrors,
      errors,
      variantListErrors,
    },
  ];
}
