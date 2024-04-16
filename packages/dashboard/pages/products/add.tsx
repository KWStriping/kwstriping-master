import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useShopSettings } from '@core/ui/hooks/useShopSettings';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { getMutationErrors } from '@core/urql/utils';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { AttributeInput } from '@dashboard/components/attributes/AttributesCard';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import ChannelsAvailabilityDialog from '@dashboard/components/dialogs/ChannelsAvailabilityDialog';
import useAppChannel from '@dashboard/components/layout/Layout/AppChannelContext';
import type { ProductCreateData } from '@dashboard/components/products/ProductCreatePage';
import ProductCreatePage from '@dashboard/components/products/ProductCreatePage';
import {
  UpdateMetadataDocument,
  UpdatePrivateMetadataDocument,
  ProductKlassDocument,
  WarehouseListDocument,
  FileUploadDocument,
  ProductChannelListingUpdateDocument,
  ProductCreateDocument,
  ProductDeleteDocument,
} from '@core/api/graphql';
import type {
  ProductChannelListingErrorFragment,
  ProductErrorWithAttributesFragment,
} from '@core/api/graphql';
import useChannels from '@dashboard/hooks/useChannels';
import { createSortedChannelsData } from '@dashboard/oldSrc/channels/utils';
import type { ChannelData } from '@dashboard/oldSrc/channels/utils';
import { DEFAULT_INITIAL_SEARCH_DATA, VALUES_PAGINATE_BY } from '@dashboard/oldSrc/config';
import { PRODUCT_CREATE_FORM_ID } from '@dashboard/oldSrc/products/ProductCreate/consts';
import { createHandler } from '@dashboard/oldSrc/products/ProductCreate/handlers';
import type {
  ProductCreateUrlDialog,
  ProductCreateUrlQueryParams,
} from '@dashboard/oldSrc/products/urls';
import { productAddUrl, productUrl } from '@dashboard/oldSrc/products/urls';
import useCategorySearch from '@dashboard/oldSrc/searches/useCategorySearch';
import useCollectionSearch from '@dashboard/oldSrc/searches/useCollectionSearch';
import usePageSearch from '@dashboard/oldSrc/searches/usePageSearch';
import useProductSearch from '@dashboard/oldSrc/searches/useProductSearch';
import useProductKlassSearch from '@dashboard/oldSrc/searches/useProductKlassSearch';
import { useTaxClassFetchMore } from '@dashboard/oldSrc/taxes/utils/useTaxClassFetchMore';
import useValueSearchHandler from '@dashboard/oldSrc/utils/handlers/valueSearchHandler';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import createMetadataCreateHandler from '@dashboard/oldSrc/utils/handlers/metadataCreateHandler';
import { warehouseAddPath } from '@dashboard/oldSrc/warehouses/urls';
import { graphql as gql } from '@core/api/gql';

interface ProductCreateViewProps {
  params: ProductCreateUrlQueryParams;
}

// export const PRODUCT_CREATE = gql(`
//   mutation ProductCreate(
//     $input: ProductCreationInput!
//     $firstValues: Int
//     $afterValues: String
//     $lastValues: Int
//     $beforeValues: String
//   ) {
//     createProduct(data: $input) {
//       errors {
//         ...ProductErrorWithAttributes
//       }
//       result {
//         ...Product
//       }
//     }
//   }
// `);

export const CREATE_PRODUCT_MUTATION = gql(`
  mutation ProductCreate($input: ProductCreationInput!) {
    createProduct(data: $input) {
      errors {
        ...ProductErrorWithAttributes
      }
      result {
        id
      }
    }
  }
`);

export const ProductCreateView = () => {
  const router = useRouter();
  const params = router.query;
  const notify = useNotifier();
  const shop = useShopSettings();
  const { t } = useTranslation();
  const [createProductComplete, setProductCreateComplete] = useState(false);
  const selectedProductKlassId = params['product-type-id'];

  const handleSelectProductKlass = (klassId: string) =>
    void router.push(
      productAddUrl({
        ...params,
        'product-type-id': klassId,
      })
    );

  const [openModal, closeModal] = useDialogActionHandlers<
    ProductCreateUrlDialog,
    ProductCreateUrlQueryParams
  >(router.push, (params) => productAddUrl(params), params);

  const {
    loadMore: loadMoreCategories,
    search: searchCategory,
    result: searchCategoryOpts,
  } = useCategorySearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA,
  });
  const {
    loadMore: loadMoreCollections,
    search: searchCollection,
    result: searchCollectionOpts,
  } = useCollectionSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA,
  });
  const {
    loadMore: loadMoreProductKlasses,
    search: searchProductKlasses,
    result: searchProductKlassesOpts,
  } = useProductKlassSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA,
  });
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
  const [updateMetadata] = useMutation(UpdateMetadataDocument, {});
  const [updatePrivateMetadata] = useMutation(UpdatePrivateMetadataDocument, {});
  const { taxClasses, fetchMoreTaxClasses } = useTaxClassFetchMore();
  const [{ data: selectedProductKlass }] = useQuery(ProductKlassDocument, {
    variables: {
      id: selectedProductKlassId,
      firstValues: VALUES_PAGINATE_BY,
    },
    pause: !selectedProductKlassId,
  });

  const productKlasses = mapEdgesToItems(searchProductKlassesOpts?.data?.search) || [];

  const { availableChannels } = useAppChannel(false);
  const allChannels: ChannelData[] = createSortedChannelsData(availableChannels);

  const {
    channelListElements,
    channelsToggle,
    currentChannels,
    handleChannelsConfirm,
    handleChannelsModalClose,
    handleChannelsModalOpen,
    isChannelSelected,
    isChannelsModalOpen,
    setCurrentChannels,
    toggleAllChannels,
  } = useChannels(
    allChannels,
    params?.action,
    {
      closeModal,
      openModal,
    },
    {
      formId: PRODUCT_CREATE_FORM_ID,
    }
  );

  const [warehouses] = useQuery(WarehouseListDocument, {
    displayLoader: true,
    variables: {
      first: 50,
      filter: {
        channels: currentChannels.map((channel) => channel.id),
      },
    },
  });

  const handleSuccess = (productId: string) => {
    notify(t('dashboard.O8+uV', 'Product created'), {
      type: 'success',
    });
    void router.push(productUrl(productId));
  };

  const [uploadFile, uploadFileOpts] = useMutation(FileUploadDocument, {});

  const [updateChannels, updateChannelsOpts] = useMutation(
    ProductChannelListingUpdateDocument,
    {}
  );
  const [updateVariantChannels, updateVariantChannelsOpts] = useMutation(
    ProductChannelListingUpdateDocument,
    {}
  );

  const [createProduct, createProductOpts] = useMutation(ProductCreateDocument, {});
  const [deleteProduct] = useMutation(ProductDeleteDocument, {});

  // const [createProduct, createProductOpts] = useMutation(ProductCreateDocument, {
  //   onCompleted: (data) => {
  //     const errors = data?.createProduct?.errors;
  //     if (errors?.length) {
  //       for (const error of errors) {
  //         notify(getProductErrorMessage(error, t), {
  //           type: 'error',
  //         });
  //       }
  //     }
  //   },
  // });

  const handleSubmit = async (data: ProductCreateData) => {
    const errors = await createMetadataCreateHandler(
      createHandler(
        selectedProductKlass?.productKlass,
        (variables) => uploadFile({ ...variables }),
        (variables) => createProduct({ ...variables }),
        (variables) => createProduct({ ...variables }),
        updateChannels,
        updateVariantChannels,
        deleteProduct
      ),
      updateMetadata,
      updatePrivateMetadata
    )(data);

    if (!errors?.length) {
      setProductCreateComplete(true);
    }

    return errors;
  };

  const handleAssignAttributeReferenceClick = (attribute: AttributeInput) =>
    void router.push(
      productAddUrl({
        ...params,
        action: 'assign-attribute-value',
        id: attribute.id,
      })
    );

  useEffect(() => {
    const productId = createProductOpts.data?.createProduct?.product?.id;

    if (createProductComplete && productId) {
      handleSuccess(productId);
    }
  }, [createProductComplete]);

  const fetchMoreProductKlasses = {
    hasMore: searchProductKlassesOpts.data?.search?.pageInfo?.hasNextPage,
    loading: searchProductKlassesOpts.fetching,
    onFetchMore: loadMoreProductKlasses,
  };
  const fetchMoreCollections = {
    hasMore: searchCollectionOpts.data?.search?.pageInfo?.hasNextPage,
    loading: searchCollectionOpts.fetching,
    onFetchMore: loadMoreCollections,
  };
  const fetchMoreCategories = {
    hasMore: searchCategoryOpts.data?.search?.pageInfo?.hasNextPage,
    loading: searchCategoryOpts.fetching,
    onFetchMore: loadMoreCategories,
  };
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

  const loading =
    uploadFileOpts.fetching ||
    createProductOpts.fetching ||
    createProductOpts.fetching ||
    updateChannelsOpts.fetching ||
    updateVariantChannelsOpts.fetching;

  const channelsErrors = [
    ...getMutationErrors(updateVariantChannelsOpts),
    ...getMutationErrors(updateChannelsOpts),
  ] as ProductChannelListingErrorFragment[];
  const errors = [
    ...getMutationErrors(createProductOpts),
    ...getMutationErrors(createProductOpts),
  ] as ProductErrorWithAttributesFragment[];

  return (
    <>
      <WindowTitle
        title={t(
          'dashboard.Xx4Jk',
          'Create Product'
          // window title
        )}
      />
      {!!allChannels?.length && (
        <ChannelsAvailabilityDialog
          isSelected={isChannelSelected}
          channels={allChannels}
          onChange={channelsToggle}
          onClose={handleChannelsModalClose}
          open={isChannelsModalOpen}
          title={t('dashboard.au5AV', 'Manage Products Channel Availability')}
          confirmButtonState="default"
          selected={channelListElements.length}
          onConfirm={handleChannelsConfirm}
          toggleAll={toggleAllChannels}
        />
      )}
      <ProductCreatePage
        allChannelsCount={allChannels?.length}
        currentChannels={currentChannels}
        categories={mapEdgesToItems(searchCategoryOpts?.data?.search) || []}
        collections={mapEdgesToItems(searchCollectionOpts?.data?.search) || []}
        values={mapEdgesToItems(searchValuesOpts?.data?.attribute.values) || []}
        loading={loading}
        channelsErrors={channelsErrors}
        errors={errors}
        fetchCategories={searchCategory}
        fetchCollections={searchCollection}
        fetchProductKlasses={searchProductKlasses}
        fetchValues={searchValues}
        header={t(
          'dashboard.BP8uu',
          'New Product'
          // page header
        )}
        productKlasses={productKlasses}
        onSubmit={handleSubmit}
        onWarehouseConfigure={() => router.push(warehouseAddPath)}
        saveButtonBarState={createProductOpts.status}
        fetchMoreCategories={fetchMoreCategories}
        fetchMoreCollections={fetchMoreCollections}
        fetchMoreProductKlasses={fetchMoreProductKlasses}
        warehouses={mapEdgesToItems(warehouses?.data?.warehouses) || []}
        taxClasses={taxClasses ?? []}
        fetchMoreTaxClasses={fetchMoreTaxClasses}
        weightUnit={shop?.defaultWeightUnit}
        openChannelsModal={handleChannelsModalOpen}
        onChannelsChange={setCurrentChannels}
        assignReferencesAttributeId={params.action === 'assign-attribute-value' && params.id}
        onAssignReferencesClick={handleAssignAttributeReferenceClick}
        referencePages={mapEdgesToItems(searchPagesOpts?.data?.search) || []}
        referenceProducts={mapEdgesToItems(searchProductsOpts?.data?.search) || []}
        fetchReferencePages={searchPages}
        fetchMoreReferencePages={fetchMoreReferencePages}
        fetchReferenceProducts={searchProducts}
        fetchMoreReferenceProducts={fetchMoreReferenceProducts}
        fetchMoreValues={fetchMoreValues}
        onCloseDialog={(currentParams) => router.push(productAddUrl(currentParams))}
        selectedProductKlass={selectedProductKlass?.productKlass}
        onSelectProductKlass={handleSelectProductKlass}
        onAttributeSelectBlur={searchAttributeReset}
      />
    </>
  );
};
export default ProductCreateView;
