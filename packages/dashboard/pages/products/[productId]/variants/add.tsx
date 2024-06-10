import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useShopSettings } from '@core/ui/hooks/useShopSettings';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { getMutationErrors } from '@core/urql/utils';
import { useRouter } from 'next/router';
import type { AttributeInput } from '@dashboard/components/attributes/AttributesCard';
import NotFoundPage from '@dashboard/components/core/NotFoundPage';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import ProductCreatePage from '@dashboard/components/products/ProductCreatePage';
import type { ProductCreateData } from '@dashboard/components/products/ProductCreatePage/form';
import {
  UpdatePrivateMetadataDocument,
  ProductCreateDataDocument,
  WarehouseListDocument,
  FileUploadDocument,
  ProductCreateDocument,
  ProductChannelListingUpdateDocument,
  UpdateMetadataDocument,
  ProductReorderDocument,
} from '@core/api/graphql';

import { getAttributesAfterFileAttributesUpdate } from '@dashboard/oldSrc/attributes/utils/data';
import {
  handleUploadMultipleFiles,
  prepareAttributesInput,
} from '@dashboard/oldSrc/attributes/utils/handlers';
import { DEFAULT_INITIAL_SEARCH_DATA } from '@dashboard/oldSrc/config';
import { weight } from '@dashboard/oldSrc/misc';
import { createVariantReorderHandler } from '@dashboard/oldSrc/products/ProductUpdate/handlers';
import type { ProductAddUrlQueryParams } from '@dashboard/oldSrc/products/urls';
import { productVariantAddUrl, productVariantEditUrl } from '@dashboard/oldSrc/products/urls';
import usePageSearch from '@dashboard/oldSrc/searches/usePageSearch';
import useProductSearch from '@dashboard/oldSrc/searches/useProductSearch';
import useValueSearchHandler from '@dashboard/oldSrc/utils/handlers/valueSearchHandler';
import createMetadataCreateHandler from '@dashboard/oldSrc/utils/handlers/metadataCreateHandler';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import { warehouseAddPath } from '@dashboard/oldSrc/warehouses/urls';

interface ProductCreateProps {
  productId: string;
  params: ProductAddUrlQueryParams;
}

export const Product: FC<ProductCreateProps> = ({ productId, params }) => {
  const router = useRouter();
  const notify = useNotifier();

  const shop = useShopSettings();
  const { t } = useTranslation();
  const [warehouses] = useQuery(WarehouseListDocument, {
    displayLoader: true,
    variables: {
      first: 50,
    },
  });

  const [{ data, fetching: productLoading }] = useQuery(ProductCreateDataDocument, {
    displayLoader: true,
    variables: {
      id: productId,
      firstValues: 10,
    },
  });

  const [uploadFile, uploadFileOpts] = useMutation(FileUploadDocument, {});

  const product = data?.product;

  const [variantCreate, variantCreateResult] = useMutation(ProductCreateDocument, {
    onCompleted: (data) => {
      const productId = data?.createProduct?.productVariant?.id;

      notify(t('dashboard.variantCreatedSuccess', 'Variant created'), {
        type: 'success',
      });
      void router.push(productVariantEditUrl(productId, productId), {
        resetScroll: true,
      });
    },
  });
  const [updateChannels] = useMutation(ProductChannelListingUpdateDocument, {});
  const [updateMetadata] = useMutation(UpdateMetadataDocument, {});
  const [updatePrivateMetadata] = useMutation(UpdatePrivateMetadataDocument, {});

  const [reorderProductVariants, reorderProductVariantsOpts] = useMutation(ProductReorderDocument, {});

  const handleVariantReorder = createVariantReorderHandler(product, reorderProductVariants);

  const handleCreate = async (formData: ProductCreateData) => {
    const uploadFilesResult = await handleUploadMultipleFiles(
      formData.attributesWithNewFileValue,
      (variables) => uploadFile({ ...variables })
    );

    const updatedFileAttributes = getAttributesAfterFileAttributesUpdate(
      formData.attributesWithNewFileValue,
      uploadFilesResult
    );

    const variantCreateResult = await variantCreate({
      input: {
        attributes: prepareAttributesInput({
          attributes: formData.attributes.filter(
            (attribute) => attribute.value?.length && attribute.value[0] !== ''
          ),
          prevAttributes: null,
          updatedFileAttributes,
        }),
        product: productId,
        sku: formData.sku,
        name: formData.name,
        stocks: formData.stocks.map((stock) => ({
          quantity: parseInt(stock.value, 10) || 0,
          warehouse: stock.id,
        })),
        trackInventory: true,
        weight: weight(formData.weight),
        quantityLimitPerCustomer: Number(formData.quantityLimitPerCustomer) || null,
        preorder: formData.isPreorder
          ? {
              globalThreshold: formData.globalThreshold
                ? parseInt(formData.globalThreshold, 10)
                : null,
              endDate: formData.preorderEndDateTime || null,
            }
          : undefined,
      },
      firstValues: 10,
    });

    const variantCreateResultErrors = getMutationErrors(variantCreateResult);

    if (variantCreateResultErrors?.length) {
      return { id: null, errors: variantCreateResultErrors };
    }

    const id = variantCreateResult.data?.createProduct?.productVariant?.id;

    const updateChannelsResult = await updateChannels({
      id,
      input: formData.channelListings.map((listing) => ({
        channelId: listing.id,
        costPrice: listing.value.costPrice || null,
        price: listing.value.price,
        preorderThreshold: listing.value.preorderThreshold,
      })),
    });

    const updateChannelsErrors = getMutationErrors(updateChannelsResult);

    return { id, errors: updateChannelsErrors };
  };

  const handleSubmit = createMetadataCreateHandler(
    handleCreate,
    updateMetadata,
    updatePrivateMetadata
  );
  const handleVariantClick = (id: string) => router.push(productVariantEditUrl(productId, id));

  const handleAssignAttributeReferenceClick = (attribute: AttributeInput) =>
    void router.push(
      productVariantAddUrl(productId, {
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

  const values = mapEdgesToItems(searchValuesOpts?.data?.attribute?.values) || [];

  const disableForm =
    productLoading ||
    uploadFileOpts.fetching ||
    variantCreateResult.fetching ||
    reorderProductVariantsOpts.fetching;

  if (product === null) {
    return <NotFoundPage onBack={() => router.push('/products')} />;
  }

  return (
    <>
      <WindowTitle
        title={t(
          'dashboard.yM2oR',
          'Create variant'
          // window title
        )}
      />
      <ProductCreatePage
        productId={productId}
        defaultVariantId={data?.product.defaultVariant?.id}
        disabled={disableForm}
        errors={variantCreateResult.data?.createProduct?.errors || []}
        header={t(
          'dashboard.6dXGG',
          'Create Variant'
          // header
        )}
        product={data?.product}
        values={values}
        onSubmit={handleSubmit}
        onVariantClick={handleVariantClick}
        onWarehouseConfigure={() => router.push(warehouseAddPath)}
        onVariantReorder={handleVariantReorder}
        saveButtonBarState={variantCreateResult.status}
        warehouses={mapEdgesToItems(warehouses?.data?.warehouses) || []}
        weightUnit={shop?.defaultWeightUnit}
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
        onCloseDialog={() => router.push(productVariantAddUrl(productId))}
        onAttributeSelectBlur={searchAttributeReset}
      />
    </>
  );
};
export default Product;
