import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useShopSettings } from '@core/ui/hooks/useShopSettings';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import placeholderImg from '@dashboard/assets/images/placeholder255x255.png';
import type { AttributeInput } from '@dashboard/components/attributes/AttributesCard';
import NotFoundPage from '@dashboard/components/core/NotFoundPage';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import ProductDeleteDialog from '@dashboard/components/products/ProductDeleteDialog';
import ProductPage from '@dashboard/components/products/ProductPage';
import type { ProductUpdateSubmitData } from '@dashboard/components/products/ProductPage/form';
import type { ProductErrorWithAttributesFragment } from '@core/api/graphql';
import {
  FileUploadDocument,
  ProductDetailsDocument,
  UpdateMetadataDocument,
  UpdatePrivateMetadataDocument,
  ProductDeleteDocument,
  ProductMediaAssignDocument,
  ProductMediaUnassignDocument,
  ProductUpdateDocument,
  WarehouseListDocument,
} from '@core/api/graphql';
import useOnSetDefaultVariant from '@dashboard/hooks/useOnSetDefaultVariant';
import {
  getAttributesAfterFileAttributesUpdate,
  mergeValueDeleteErrors,
  mergeFileUploadErrors,
} from '@dashboard/oldSrc/attributes/utils/data';
import {
  handleDeleteMultipleValues,
  handleUploadMultipleFiles,
  prepareAttributesInput,
} from '@dashboard/oldSrc/attributes/utils/handlers';
import { createVariantChannels } from '@dashboard/oldSrc/channels/utils';
import { DEFAULT_INITIAL_SEARCH_DATA } from '@dashboard/oldSrc/config';
import { weight } from '@dashboard/oldSrc/misc';
import { createVariantReorderHandler } from '@dashboard/oldSrc/products/ProductUpdate/handlers';
import { useSubmitChannels } from '@dashboard/oldSrc/products/Product/useSubmitChannels';
import type {
  ProductEditUrlDialog,
  ProductEditUrlQueryParams,
} from '@dashboard/oldSrc/products/urls';
import { productUrl, productVariantEditUrl } from '@dashboard/oldSrc/products/urls';
import {
  getAttributeInputFromVariant,
  mapFormsetStockToStockInput,
} from '@dashboard/oldSrc/products/utils/data';
import { handleAssignMedia } from '@dashboard/oldSrc/products/utils/handlers';
import usePageSearch from '@dashboard/oldSrc/searches/usePageSearch';
import useProductSearch from '@dashboard/oldSrc/searches/useProductSearch';
import useValueSearchHandler from '@dashboard/oldSrc/utils/handlers/valueSearchHandler';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import createMetadataUpdateHandler from '@dashboard/oldSrc/utils/handlers/metadataUpdateHandler';
import { warehouseAddPath } from '@dashboard/oldSrc/warehouses/urls';

interface ProductUpdateProps {
  productId: string;
  productId: string;
  params: ProductEditUrlQueryParams;
}

export const Product: FC<ProductUpdateProps> = ({ productId, params }) => {
  const shop = useShopSettings();
  const router = useRouter();
  const notify = useNotifier();
  const { t } = useTranslation();
  const [errors, setErrors] = useState<ProductErrorWithAttributesFragment[]>([]);
  useEffect(() => {
    setErrors([]);
  }, [productId]);

  const [{ data, fetching: loading }] = useQuery(ProductDetailsDocument, {
    displayLoader: true,
    variables: {
      id: productId,
      firstValues: 10,
    },
  });
  const [updateMetadata] = useMutation(UpdateMetadataDocument, {});
  const [updatePrivateMetadata] = useMutation(UpdatePrivateMetadataDocument, {});

  const [openModal] = useDialogActionHandlers<
    ProductEditUrlDialog,
    ProductEditUrlQueryParams
  >((params) => productVariantEditUrl(productId, productId, params), params);

  const [uploadFile, uploadFileOpts] = useMutation(FileUploadDocument, {});

  const [assignMedia, assignMediaOpts] = useMutation(ProductMediaAssignDocument, {});
  const [unassignMedia, unassignMediaOpts] = useMutation(ProductMediaUnassignDocument, {});
  const [deleteVariant, deleteVariantOpts] = useMutation(ProductDeleteDocument, {
    onCompleted: () => {
      notify(t('dashboard.UKMzM', 'Variant removed'), {
        type: 'success',
      });
      void router.push(productUrl(productId));
    },
  });

  const [updateVariant, updateVariantOpts] = useMutation(ProductUpdateDocument, {
    onCompleted: (data) => {
      if (data?.updateProduct?.errors?.length === 0) {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
      }
      setErrors(data?.updateProduct?.errors);
    },
  });

  const [deleteValue, deleteValueOpts] = useMutation(
    ValueDeleteDocument,
    {}
  );

  const { handleSubmitChannels, updateChannelsOpts } = useSubmitChannels();

  const variant = data?.productVariant;
  const channels = createVariantChannels(variant);

  const [warehouses] = useQuery(WarehouseListDocument, {
    displayLoader: true,
    variables: {
      first: 50,
      filter: {
        channels: channels.map((channel) => channel.id),
      },
    },
  });

  const [deactivatePreorder, deactivatePreoderOpts] = useMutation(
    ProductPreorderDeactivateDocument,
    {}
  );
  const handleDeactivateVariantPreorder = (id: string) =>
    deactivatePreorder({ variables: { id } });

  const [reorderProductVariants, reorderProductVariantsOpts] = useMutation(
    ProductReorderDocument,
    {}
  );

  const onSetDefaultVariant = useOnSetDefaultVariant(productId, variant);

  const handleVariantReorder = createVariantReorderHandler(
    variant?.product,
    reorderProductVariants
  );

  const disableFormSave =
    loading ||
    uploadFileOpts.fetching ||
    deleteVariantOpts.fetching ||
    updateVariantOpts.fetching ||
    assignMediaOpts.fetching ||
    unassignMediaOpts.fetching ||
    deactivatePreoderOpts.fetching ||
    reorderProductVariantsOpts.fetching ||
    deleteValueOpts.fetching;

  const handleUpdate = async (data: ProductUpdateSubmitData) => {
    const uploadFilesResult = await handleUploadMultipleFiles(
      data?.attributesWithNewFileValue,
      (variables) => uploadFile({ ...variables })
    );

    const deleteValuesResult = await handleDeleteMultipleValues(
      data?.attributesWithNewFileValue,
      variant?.nonSelectionAttributes,
      (variables) => deleteValue({ ...variables })
    );

    const updatedFileAttributes = getAttributesAfterFileAttributesUpdate(
      data?.attributesWithNewFileValue,
      uploadFilesResult
    );

    const assignMediaErrors = await handleAssignMedia(
      data?.media,
      variant,
      (variables) => assignMedia({ variables }),
      (variables) => unassignMedia({ variables })
    );

    const result = await updateVariant({
      variables: {
        addStocks: data?.addStocks?.map(mapFormsetStockToStockInput),
        attributes: prepareAttributesInput({
          attributes: data?.attributes,
          prevAttributes: getAttributeInputFromVariant(variant),
          updatedFileAttributes,
        }),
        id: productId,
        removeStocks: data?.removeStocks,
        sku: data?.sku,
        quantityLimitPerCustomer: Number(data?.quantityLimitPerCustomer) || null,
        stocks: data?.updateStocks?.map(mapFormsetStockToStockInput),
        trackInventory: data?.trackInventory,
        preorder: data?.isPreorder
          ? {
              globalThreshold: data?.globalThreshold ? parseInt(data?.globalThreshold, 10) : null,
              endDate: data?.preorderEndDateTime || null,
            }
          : null,
        weight: weight(data?.weight),
        firstValues: 10,
        name: data?.name,
      },
    });

    const channelErrors = await handleSubmitChannels(data, variant);

    return [
      ...mergeFileUploadErrors(uploadFilesResult),
      ...mergeValueDeleteErrors(deleteValuesResult),
      ...(result.data?.createProductStocks?.errors ?? []),
      ...(result.data?.deleteProductStocks?.errors ?? []),
      ...(result.data?.updateProductStocks?.errors ?? []),
      ...(result.data?.updateProduct?.errors ?? []),
      ...assignMediaErrors,
      ...channelErrors,
    ];
  };
  const handleSubmit = createMetadataUpdateHandler(
    data?.productVariant,
    handleUpdate,
    (variables) => updateMetadata({ ...variables }),
    (variables) => updatePrivateMetadata({ ...variables })
  );

  const handleAssignAttributeReferenceClick = (attribute: AttributeInput) =>
    void router.push(
      productVariantEditUrl(productId, productId, {
        action: 'assign-attribute-value',
        id: attribute.id,
      })
    );

  const {
    loadMore: loadMorePages,
    search: searchPages,
    result: searchPagesOpts,
  } = usePageSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA,
  });
  const {
    loadMore: loadMoreProducts,
    search: searchProducts,
    result: searchProductsOpts,
  } = useProductSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA,
  });
  const {
    loadMore: loadMoreValues,
    search: searchValues,
    result: searchValuesOpts,
    reset: searchAttributeReset,
  } = useValueSearchHandler(DEFAULT_INITIAL_SEARCH_DATA);

  const fetchMoreReferencePages = {
    hasMore: searchPagesOpts.data?.search?.pageInfo?.hasNextPage,
    loading: searchPagesOpts.fetching,
    onFetchMore: loadMorePages,
  };
  const fetchMoreReferenceProducts = {
    hasMore: searchProductsOpts.data?.search?.pageInfo?.hasNextPage,
    loading: searchProductsOpts.fetching,
    onFetchMore: loadMoreProducts,
  };
  const fetchMoreValues = {
    hasMore: !!searchValuesOpts.data?.attribute?.values?.pageInfo?.hasNextPage,
    loading: !!searchValuesOpts.fetching,
    onFetchMore: loadMoreValues,
  };

  const values =
    mapEdgesToItems(searchValuesOpts?.data?.attribute?.values) || [];

  if (variant === null) {
    return <NotFoundPage backHref={productUrl(productId)} />;
  }

  return (
    <>
      <WindowTitle title={data?.productVariant?.name} />
      <ProductPage
        productId={productId}
        defaultWeightUnit={shop?.defaultWeightUnit}
        defaultVariantId={data?.productVariant?.product.defaultVariant?.id}
        errors={errors}
        values={values}
        channels={channels}
        channelErrors={updateChannelsOpts?.data?.updateProductChannelListing?.errors || []}
        onSetDefaultVariant={onSetDefaultVariant}
        saveButtonBarState={updateVariantOpts.status}
        loading={disableFormSave}
        placeholderImage={placeholderImg}
        variant={variant}
        header={variant?.name || variant?.sku}
        warehouses={mapEdgesToItems(warehouses?.data?.warehouses) || []}
        onDelete={() => openModal('remove')}
        onSubmit={handleSubmit}
        onWarehouseConfigure={() => router.push(warehouseAddPath)}
        onVariantPreorderDeactivate={handleDeactivateVariantPreorder}
        variantDeactivatePreoderButtonState={deactivatePreoderOpts.status}
        onVariantReorder={handleVariantReorder}
        assignReferencesAttributeId={params.action === 'assign-attribute-value' && params.id}
        onAssignReferencesClick={handleAssignAttributeReferenceClick}
        referencePages={mapEdgesToItems(searchPagesOpts?.data?.search) || []}
        referenceProducts={mapEdgesToItems(searchProductsOpts?.data?.search) || []}
        fetchReferencePages={searchPages}
        fetchMoreReferencePages={fetchMoreReferencePages}
        fetchReferenceProducts={searchProducts}
        fetchMoreReferenceProducts={fetchMoreReferenceProducts}
        fetchValues={searchValues}
        fetchMoreValues={fetchMoreValues}
        onCloseDialog={() => router.push(productVariantEditUrl(productId, productId))}
        onAttributeSelectBlur={searchAttributeReset}
      />
      <ProductDeleteDialog
        confirmButtonState={deleteVariantOpts.status}
        onClose={() => router.push(productVariantEditUrl(productId, productId))}
        onConfirm={() =>
          deleteVariant({
            variables: {
              id: productId,
            },
          })
        }
        open={params.action === 'remove'}
        name={data?.productVariant?.name}
      />
    </>
  );
};
export default Product;
