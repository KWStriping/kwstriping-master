import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import { useClient } from '@core/urql/hooks';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { getMutationState } from '@core/urql/utils';
import DialogContentText from '@mui/material/DialogContentText';
import Skeleton from '@mui/material/Skeleton';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { assert } from 'tsafe/assert';
import placeholderImg from '@dashboard/assets/images/placeholder255x255.png';
import type { AttributeInput } from '@dashboard/components/attributes/AttributesCard';
import { useShopLimitsQuery } from '@dashboard/components/core/Shop/queries';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import useAppChannel from '@dashboard/components/layout/Layout/AppChannelContext';
import ProductUpdatePage from '@dashboard/components/products/ProductUpdatePage';
import type { ProductMediaCreateMutationVariables } from '@core/api/graphql';
import {
  SearchValuesDocument,
  ProductMediaDeleteDocument,
  ProductDeleteDocument,
  ProductMediaReorderDocument,
  ProductDetailsDocument,
  ProductMediaCreateDocument,
  WarehouseListDocument,
} from '@core/api/graphql';
import { DEFAULT_INITIAL_SEARCH_DATA, VALUES_PAGINATE_BY } from '@dashboard/oldSrc/config';
import {
  createImageReorderHandler,
  createImageUploadHandler,
} from '@dashboard/oldSrc/products/ProductUpdate/handlers';
import { useProductUpdateHandler } from '@dashboard/oldSrc/products/ProductUpdate/handlers/useProductUpdateHandler';
import type { ProductUrlDialog, ProductUrlQueryParams } from '@dashboard/oldSrc/products/urls';
import { productUrl, productVariantEditUrl } from '@dashboard/oldSrc/products/urls';
import useCategorySearch from '@dashboard/oldSrc/searches/useCategorySearch';
import useCollectionSearch from '@dashboard/oldSrc/searches/useCollectionSearch';
import usePageSearch from '@dashboard/oldSrc/searches/usePageSearch';
import useProductSearch from '@dashboard/oldSrc/searches/useProductSearch';
import { useTaxClassFetchMore } from '@dashboard/oldSrc/taxes/utils/useTaxClassFetchMore';
import { getProductErrorMessage } from '@dashboard/oldSrc/utils/errors';
import useValueSearchHandler from '@dashboard/oldSrc/utils/handlers/valueSearchHandler';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';

interface ProductUpdateProps {
  params: ProductUrlQueryParams;
}

export const ProductUpdate = () => {
  const router = useRouter();
  const { productId: id, ...params } = router.query;
  assert(typeof id === 'string');
  const notify = useNotifier();
  const { t } = useTranslation();
  const {
    loadMore: loadMoreCategories,
    search: searchCategories,
    result: searchCategoriesOpts,
  } = useCategorySearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA,
  });
  const {
    loadMore: loadMoreCollections,
    search: searchCollections,
    result: searchCollectionsOpts,
  } = useCollectionSearch({
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

  const [{ data, fetching: loading }, refetch] = useQuery(ProductDetailsDocument, {
    displayLoader: true,
    pause: !id,
    variables: {
      id: id as string,
      firstValues: VALUES_PAGINATE_BY,
    },
  });

  const product = data?.product;

  const isSimpleProduct = !product?.productKlass?.hasVariants;

  const { availableChannels } = useAppChannel(false);

  const [limitOpts] = useShopLimitsQuery({
    variables: {
      productVariants: true,
    },
  });

  const [reorderProductImages, reorderProductImagesOpts] = useMutation(
    ProductMediaReorderDocument,
    {}
  );

  const [deleteProduct, deleteProductOpts] = useMutation(ProductDeleteDocument, {
    onCompleted: () => {
      notify(t('dashboard.lVTmY', 'Product removed'), {
        type: 'success',
      });
      void router.push('/products');
    },
  });

  const [createProductImage, createProductImageOpts] = useMutation(ProductMediaCreateDocument, {
    onCompleted: (data) => {
      const imageError = data?.createProductMedia?.errors.find(
        (error) => error.field === ('image' as keyof ProductMediaCreateMutationVariables)
      );
      if (imageError) {
        notify(
          t(
            'dashboard.imageUploadErrorText',
            "There was a problem with the file you uploaded as an image and it couldn't be used. Please try a different file."
          ),
          {
            type: 'error',
            title: t('dashboard.imageUploadErrorTitle', "Couldn't process image"),
          }
        );
      }
    },
  });

  const [deleteProductImage] = useMutation(ProductMediaDeleteDocument, {
    onCompleted: () =>
      notify(t('dashboard.savedChanges', 'Saved changes'), {
        type: 'success',
      }),
  });

  const [openModal, closeModal] = useDialogActionHandlers<
    ProductUrlDialog,
    ProductUrlQueryParams
  >((params) => productUrl(id, params), params);

  const getValuesSuggestions = useValueSuggestions();

  const [warehousesQuery] = useQuery(WarehouseListDocument, {
    displayLoader: true,
    variables: {
      first: 50,
    },
  });

  const [createProductMedia, createProductMediaOpts] = useMutation(ProductMediaCreateDocument, {
    onCompleted: (data) => {
      const errors = data?.createProductMedia?.errors;

      if (errors?.length) {
        for (const error of errors) {
          notify(getProductErrorMessage(error, t), {
            type: 'error',
          });
        }
      } else {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
      }
    },
  });

  const { taxClasses, fetchMoreTaxClasses } = useTaxClassFetchMore();

  const handleImageDelete = (id: string) => () => deleteProductImage({ id });

  const [submit, submitOpts] = useProductUpdateHandler(product);

  const warehouses = useMemo(
    () => mapEdgesToItems(warehousesQuery.data?.warehouses) || [],
    [warehousesQuery.data]
  );

  if (!product) return <Skeleton />;

  const handleMediaUrlUpload = (mediaUrl: string) => {
    const variables = {
      alt: '',
      mediaUrl,
      product: product.id,
    };

    createProductMedia({ ...variables });
  };

  const handleImageUpload = createImageUploadHandler(id, (variables) =>
    createProductImage({ ...variables })
  );
  const handleImageReorder = createImageReorderHandler(product, (variables) =>
    reorderProductImages({ ...variables })
  );

  const handleAssignAttributeReferenceClick = (attribute: AttributeInput) =>
    void router.push(
      {
        pathname: '/products/[id]',
        query: {
          id: attribute.id,
          action: 'assign-attribute-value',
        },
      },
      undefined,
      { scroll: false }
    );

  const disableFormSave =
    submitOpts.loading ||
    createProductImageOpts.fetching ||
    deleteProductOpts.fetching ||
    reorderProductImagesOpts.fetching ||
    createProductMediaOpts.fetching ||
    loading;

  const formTransitionState = getMutationState(
    submitOpts.called,
    submitOpts.loading,
    submitOpts.errors,
    createProductMediaOpts.data?.createProductMedia?.errors ?? []
  );

  const categories = mapEdgesToItems(searchCategoriesOpts?.data?.search) || [];

  const collections = mapEdgesToItems(searchCollectionsOpts?.data?.search) || [];

  const values =
    mapEdgesToItems(searchValuesOpts?.data?.attribute?.values) || [];

  const fetchMoreCollections = getSearchFetchMoreProps(
    searchCollectionsOpts,
    loadMoreCollections
  );

  const fetchMoreCategories = getSearchFetchMoreProps(searchCategoriesOpts, loadMoreCategories);

  const fetchMoreReferencePages = getSearchFetchMoreProps(searchPagesOpts, loadMorePages);

  const fetchMoreReferenceProducts = getSearchFetchMoreProps(
    searchProductsOpts,
    loadMoreProducts
  );

  const fetchMoreValues = {
    hasMore: !!searchValuesOpts.data?.attribute?.values?.pageInfo?.hasNextPage,
    loading: !!searchValuesOpts.fetching,
    onFetchMore: loadMoreValues,
  };

  return (
    <>
      <WindowTitle title={product?.name} />
      <ProductUpdatePage
        channels={availableChannels}
        productId={id}
        isSimpleProduct={isSimpleProduct}
        channelsErrors={submitOpts.channelsErrors}
        categories={categories}
        collections={collections}
        values={values}
        disabled={disableFormSave}
        errors={submitOpts.errors}
        variantListErrors={submitOpts.variantListErrors}
        fetchCategories={searchCategories}
        fetchCollections={searchCollections}
        fetchValues={searchValues}
        refetch={refetch}
        limits={limitOpts.data?.shop.limits}
        saveButtonBarState={formTransitionState}
        media={product.media}
        header={product.name}
        placeholderImage={placeholderImg}
        product={product}
        warehouses={warehouses}
        taxClasses={taxClasses ?? []}
        fetchMoreTaxClasses={fetchMoreTaxClasses}
        variants={product.variants}
        onDelete={() => openModal('remove')}
        onImageReorder={handleImageReorder}
        onMediaUrlUpload={handleMediaUrlUpload}
        onSubmit={submit}
        onVariantShow={(productId) =>
          void router.push(productVariantEditUrl(product.id, productId), {
            resetScroll: true,
          })
        }
        onImageUpload={handleImageUpload}
        onImageDelete={handleImageDelete}
        fetchMoreCategories={fetchMoreCategories}
        fetchMoreCollections={fetchMoreCollections}
        assignReferencesAttributeId={params.action === 'assign-attribute-value' && params.id}
        onAssignReferencesClick={handleAssignAttributeReferenceClick}
        referencePages={mapEdgesToItems(searchPagesOpts?.data?.search) || []}
        referenceProducts={mapEdgesToItems(searchProductsOpts?.data?.search) || []}
        fetchReferencePages={searchPages}
        fetchMoreReferencePages={fetchMoreReferencePages}
        fetchReferenceProducts={searchProducts}
        fetchMoreReferenceProducts={fetchMoreReferenceProducts}
        fetchMoreValues={fetchMoreValues}
        onCloseDialog={() =>
          router.push({ pathname: '/products/[id]', query: { id } }, undefined, { scroll: false })
        }
        onAttributeSelectBlur={searchAttributeReset}
        onValuesSearch={getValuesSuggestions}
      />
      <ActionDialog
        open={params.action === 'remove'}
        onClose={closeModal}
        confirmButtonState={deleteProductOpts.status}
        onConfirm={() => deleteProduct({ id })}
        variant="delete"
        title={t('dashboard.deleteProductDialogTitle', 'Delete Product')}
      >
        <DialogContentText>
          {t(
            'dashboard.deleteProductDialogSubtitle',
            'Are you sure you want to delete {{name}}?',
            {
              name: product?.name,
            }
          )}
        </DialogContentText>
      </ActionDialog>
    </>
  );
};
export default ProductUpdate;

function useValueSuggestions() {
  const client = useClient();
  return useCallback(
    (id: string, query: string) => {
      return client
        .query(SearchValuesDocument, {
          id,
          first: 10,
          query,
        })
        .toPromise()
        .then(
          ({ data }) =>
            mapEdgesToItems(data?.attribute?.values)?.map(({ name, slug }) => ({
              label: name,
              value: slug,
            })) ?? []
        );
    },
    [client]
  );
}
