import { Trans, useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import DialogContentText from '@mui/material/DialogContentText';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { assert } from 'tsafe/assert';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import AssignCategoriesDialog from '@dashboard/components/dialogs/AssignCategoryDialog';
import AssignCollectionDialog from '@dashboard/components/dialogs/AssignCollectionDialog';
import AssignProductDialog from '@dashboard/components/dialogs/AssignProductDialog';
import AssignVariantDialog from '@dashboard/components/dialogs/AssignVariantDialog';
import ChannelsAvailabilityDialog from '@dashboard/components/dialogs/ChannelsAvailabilityDialog';
import SaleDetailsPage, {
  SaleDetailsPageTab,
} from '@dashboard/components/discounts/SaleDetailsPage';
import type { SaleTabItemsCount } from '@dashboard/components/discounts/SaleDetailsPage';
import useAppChannel from '@dashboard/components/layout/Layout/AppChannelContext';
import {
  SaleDetailsDocument,
  SaleCataloguesAddDocument,
  UpdateMetadataDocument,
  UpdatePrivateMetadataDocument,
  SaleCataloguesRemoveDocument,
  SaleUpdateDocument,
  SaleDeleteDocument,
} from '@core/api/graphql';
import type { SaleDetailsQueryVariables } from '@core/api/graphql';

import useBulkActions from '@dashboard/hooks/useBulkActions';
import useChannels from '@dashboard/hooks/useChannels';
import useLocalPaginator, {
  useSectionLocalPaginationState,
} from '@dashboard/hooks/useLocalPaginator';
import useLocalStorage from '@dashboard/hooks/useLocalStorage';
import { PaginatorContext } from '@dashboard/hooks/usePaginator';
import type { ChannelSaleData } from '@dashboard/oldSrc/channels/utils';
import {
  createChannelsDataWithSaleDiscountPrice,
  createSortedChannelsDataFromSale,
} from '@dashboard/oldSrc/channels/utils';
import { DEFAULT_INITIAL_SEARCH_DATA, PAGINATE_BY } from '@dashboard/oldSrc/config';
import { createUpdateHandler } from '@dashboard/oldSrc/discounts/SaleDetails/handlers';
import { messages } from '@dashboard/oldSrc/discounts/SaleDetails/messages';
import { SALE_UPDATE_FORM_ID } from '@dashboard/oldSrc/discounts/SaleDetails/types';
import type { SaleUrlDialog, SaleUrlQueryParams } from '@dashboard/oldSrc/discounts/urls';
import { saleUrl } from '@dashboard/oldSrc/discounts/urls';
import useCategorySearch from '@dashboard/oldSrc/searches/useCategorySearch';
import useCollectionSearch from '@dashboard/oldSrc/searches/useCollectionSearch';
import useProductSearch from '@dashboard/oldSrc/searches/useProductSearch';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import createMetadataUpdateHandler from '@dashboard/oldSrc/utils/handlers/metadataUpdateHandler';

interface SaleDetailsProps {
  id: string;
  params: SaleUrlQueryParams;
}

export const SaleDetails = () => {
  const router = useRouter();
  const { id, ...params } = router.query;
  const { ids = [] } = params;
  assert(typeof id === 'string');
  assert(Array.isArray(ids));
  const [updateMetadata] = useMutation(UpdateMetadataDocument, {});
  const [updatePrivateMetadata] = useMutation(UpdatePrivateMetadataDocument, {});

  const notify = useNotifier();
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(ids);
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
    loadMore: loadMoreProducts,
    search: searchProducts,
    result: searchProductsOpts,
  } = useProductSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA,
  });

  const { availableChannels } = useAppChannel(false);

  const [activeTab, setActiveTab] = useState<SaleDetailsPageTab>(SaleDetailsPageTab.categories);
  const [paginationState, setPaginationState] = useSectionLocalPaginationState(
    PAGINATE_BY,
    activeTab
  );
  const paginate = useLocalPaginator(setPaginationState);
  const changeTab = (tab: SaleDetailsPageTab) => {
    reset();
    setActiveTab(tab);
  };

  const detailsQueryInclude: Pick<
    SaleDetailsQueryVariables,
    'includeCategories' | 'includeCollections' | 'includeProducts' | 'includeVariants'
  > = {
    includeCategories: activeTab === SaleDetailsPageTab.categories,
    includeCollections: activeTab === SaleDetailsPageTab.collections,
    includeProducts: activeTab === SaleDetailsPageTab.products,
    includeVariants: activeTab === SaleDetailsPageTab.variants,
  };

  const [{ data, fetching: loading }] = useQuery(SaleDetailsDocument, {
    displayLoader: true,
    variables: {
      id,
      ...paginationState,
      ...detailsQueryInclude,
    },
  });

  const [openModal, closeModal] = useDialogActionHandlers<SaleUrlDialog, SaleUrlQueryParams>(
    router,
    (params) => saleUrl(id, params),
    params
  );

  const allChannels: ChannelSaleData[] = createChannelsDataWithSaleDiscountPrice(
    data?.sale,
    availableChannels
  );
  const saleChannelsChoices = createSortedChannelsDataFromSale(data?.sale);

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
    saleChannelsChoices,
    params?.action,
    {
      closeModal,
      openModal,
    },
    { formId: SALE_UPDATE_FORM_ID }
  );

  const [selectedChannel] = useLocalStorage('salesListChannel', '');

  const notifySaved = () =>
    notify(t('dashboard.savedChanges', 'Saved changes'), {
      type: 'success',
    });

  const [updateSale, updateSaleOpts] = useMutation(SaleUpdateDocument, {
    onCompleted: (data) => {
      if (data?.updateSale?.errors?.length === 0) {
        notifySaved();
      }
    },
  });

  const [deleteSale, deleteSaleOpts] = useMutation(SaleDeleteDocument, {
    onCompleted: (data) => {
      if (data?.deleteSale?.errors?.length === 0) {
        notifySaved();
        void router.replace('/discounts/sales');
      }
    },
  });

  const [addCataloguesToSale, addCataloguesToSaleOpts] = useMutation(SaleCataloguesAddDocument, {
    onCompleted: (data) => {
      if (data?.addCataloguesToSale?.errors?.length === 0) {
        notifySaved();
        closeModal();
      }
    },
  });

  const [removeCataloguesFromSale, removeCataloguesFromSaleOpts] = useMutation(
    SaleCataloguesRemoveDocument,
    {
      onCompleted: (data) => {
        if (data?.removeCataloguesFromSale?.errors?.length === 0) {
          notifySaved();
          closeModal();
          reset();
        }
      },
    }
  );

  const canOpenBulkActionDialog = ids?.length;

  const tabPageInfo =
    activeTab === SaleDetailsPageTab.categories
      ? data?.sale?.categories?.pageInfo
      : activeTab === SaleDetailsPageTab.collections
      ? data?.sale?.collections?.pageInfo
      : activeTab === SaleDetailsPageTab.products
      ? data?.sale?.products?.pageInfo
      : data?.sale?.variants?.pageInfo;

  const handleCategoriesUnassign = (ids: string[]) =>
    removeCataloguesFromSale({
      ...paginationState,
      ...detailsQueryInclude,
      id,
      input: {
        categories: ids,
      },
    });

  const handleCollectionsUnassign = (ids: string[]) =>
    removeCataloguesFromSale({
      ...paginationState,
      ...detailsQueryInclude,
      id,
      input: {
        collections: ids,
      },
    });

  const handleProductsUnassign = (ids: string[]) =>
    removeCataloguesFromSale({
      ...paginationState,
      ...detailsQueryInclude,
      id,
      input: {
        products: ids,
      },
    });

  const handleVariantsUnassign = (ids: string[]) =>
    removeCataloguesFromSale({
      ...paginationState,
      ...detailsQueryInclude,
      id,
      input: {
        variants: ids,
      },
    });

  const { pageInfo, ...paginationValues } = paginate(tabPageInfo, paginationState);

  const tabItemsCount: SaleTabItemsCount = {
    categories: data?.sale?.categoriesCount?.totalCount,
    collections: data?.sale?.collectionsCount?.totalCount,
    products: data?.sale?.productsCount?.totalCount,
    variants: data?.sale?.variantsCount?.totalCount,
  };

  const handleUpdate = createUpdateHandler(data?.sale, saleChannelsChoices, (variables) =>
    updateSale({ variables })
  );
  const handleSubmit = createMetadataUpdateHandler(
    data?.sale,
    handleUpdate,
    (variables) => updateMetadata({ ...variables }),
    (variables) => updatePrivateMetadata({ ...variables })
  );

  return (
    <PaginatorContext.Provider value={{ ...pageInfo, ...paginationValues }}>
      <WindowTitle title={t('dashboard.sales', 'Sales')} />
      {!!allChannels?.length && (
        <ChannelsAvailabilityDialog
          isSelected={isChannelSelected}
          disabled={!channelListElements.length}
          channels={allChannels}
          onChange={channelsToggle}
          onClose={handleChannelsModalClose}
          open={isChannelsModalOpen}
          title={t(
            'dashboard.aleDetailsChannelAvailabilityDialogHeader',
            'Manage Channel Availability'
          )}
          selected={channelListElements.length}
          confirmButtonState="default"
          onConfirm={handleChannelsConfirm}
          toggleAll={toggleAllChannels}
        />
      )}
      <SaleDetailsPage
        sale={data?.sale}
        allChannelsCount={allChannels?.length}
        channelListings={currentChannels}
        disabled={loading || removeCataloguesFromSaleOpts.fetching}
        errors={updateSaleOpts.data?.updateSale?.errors || []}
        selectedChannelId={selectedChannel}
        openChannelsModal={handleChannelsModalOpen}
        onChannelsChange={setCurrentChannels}
        onCategoryAssign={() => openModal('assign-category')}
        onCollectionAssign={() => openModal('assign-collection')}
        onCollectionUnassign={(collectionId) =>
          openModal('unassign-collection', {
            ids: [collectionId],
          })
        }
        onCategoryUnassign={(categoryId) =>
          openModal('unassign-category', {
            ids: [categoryId],
          })
        }
        onProductAssign={() => openModal('assign-product')}
        onProductUnassign={(productId) =>
          openModal('unassign-product', {
            ids: [productId],
          })
        }
        onVariantAssign={() => openModal('assign-variant')}
        onVariantUnassign={(productId) =>
          openModal('unassign-variant', {
            ids: [productId],
          })
        }
        activeTab={activeTab}
        tabItemsCount={tabItemsCount}
        onTabClick={changeTab}
        onSubmit={handleSubmit}
        onRemove={() => openModal('remove')}
        saveButtonBarState={updateSaleOpts.status}
        categoryListToolbar={
          <Button
            onClick={() =>
              openModal('unassign-category', {
                ids: listElements,
              })
            }
          >
            {t('dashboard.aleDetailsUnassignCategory', 'Unassign and save')}
          </Button>
        }
        collectionListToolbar={
          <Button
            onClick={() =>
              openModal('unassign-collection', {
                ids: listElements,
              })
            }
          >
            {t('dashboard.aleDetailsUnassignCollection', 'Unassign and save')}
          </Button>
        }
        productListToolbar={
          <Button
            onClick={() =>
              openModal('unassign-product', {
                ids: listElements,
              })
            }
          >
            {t('dashboard.aleDetailsUnassignProduct', 'Unassign and save')}
          </Button>
        }
        variantListToolbar={
          <Button
            onClick={() =>
              openModal('unassign-variant', {
                ids: listElements,
              })
            }
          >
            {t('dashboard.aleDetailsUnassignVariant', 'Unassign and save')}
          </Button>
        }
        isChecked={isSelected}
        selected={listElements.length}
        toggle={toggle}
        toggleAll={toggleAll}
      />
      <AssignVariantDialog
        confirmButtonState={addCataloguesToSaleOpts.status}
        hasMore={!!searchProductsOpts.data?.search?.pageInfo.hasNextPage}
        open={params.action === 'assign-variant'}
        onFetch={searchProducts}
        onFetchMore={loadMoreProducts}
        loading={searchProductsOpts.fetching}
        onClose={closeModal}
        onSubmit={(variants) =>
          addCataloguesToSale({
            variables: {
              ...paginationState,
              ...detailsQueryInclude,
              id,
              input: {
                variants,
              },
            },
          })
        }
        products={mapEdgesToItems(searchProductsOpts?.data?.search)?.filter(
          (suggestedProduct) => suggestedProduct.id
        )}
      />
      <AssignProductDialog
        confirmButtonState={addCataloguesToSaleOpts.status}
        hasMore={!!searchProductsOpts.data?.search?.pageInfo.hasNextPage}
        open={params.action === 'assign-product'}
        onFetch={searchProducts}
        onFetchMore={loadMoreProducts}
        loading={searchProductsOpts.fetching}
        onClose={closeModal}
        onSubmit={(products) =>
          addCataloguesToSale({
            variables: {
              ...paginationState,
              ...detailsQueryInclude,
              id,
              input: {
                products,
              },
            },
          })
        }
        products={mapEdgesToItems(searchProductsOpts?.data?.search)?.filter(
          (suggestedProduct) => suggestedProduct.id
        )}
      />
      <AssignCategoriesDialog
        categories={mapEdgesToItems(searchCategoriesOpts?.data?.search)?.filter(
          (suggestedCategory) => suggestedCategory.id
        )}
        confirmButtonState={addCataloguesToSaleOpts.status}
        hasMore={!!searchCategoriesOpts.data?.search?.pageInfo.hasNextPage}
        open={params.action === 'assign-category'}
        onFetch={searchCategories}
        onFetchMore={loadMoreCategories}
        loading={searchCategoriesOpts.fetching}
        onClose={closeModal}
        onSubmit={(categories) =>
          addCataloguesToSale({
            variables: {
              ...paginationState,
              ...detailsQueryInclude,
              id,
              input: {
                categories,
              },
            },
          })
        }
      />
      <AssignCollectionDialog
        collections={mapEdgesToItems(searchCollectionsOpts?.data?.search)?.filter(
          (suggestedCategory) => suggestedCategory.id
        )}
        confirmButtonState={addCataloguesToSaleOpts.status}
        hasMore={!!searchCollectionsOpts.data?.search?.pageInfo.hasNextPage}
        open={params.action === 'assign-collection'}
        onFetch={searchCollections}
        onFetchMore={loadMoreCollections}
        loading={searchCollectionsOpts.fetching}
        onClose={closeModal}
        onSubmit={(collections) =>
          addCataloguesToSale({
            variables: {
              ...paginationState,
              ...detailsQueryInclude,
              id,
              input: {
                collections,
              },
            },
          })
        }
      />
      <ActionDialog
        open={params.action === 'unassign-category' && canOpenBulkActionDialog}
        title={t(
          'dashboard.aleDetailsUnassignCategoryDialogHeader',
          'Unassign Categories From Sale'
        )}
        confirmButtonState={removeCataloguesFromSaleOpts.status}
        onClose={closeModal}
        onConfirm={() => handleCategoriesUnassign(ids)}
        confirmButtonLabel={t('dashboard.aleDetailsUnassignCategory', 'Unassign and save')}
      >
        {canOpenBulkActionDialog && (
          <DialogContentText>
            <Trans
              i18nKey="saleDetailsUnassignCategoryDialog"
              count={ids.length}
              displayQuantity={<strong>{ids.length}</strong>}
            >
              {ids.length === 1
                ? 'Are you sure you want to unassign this category?'
                : 'Are you sure you want to unassign {{displayQuantity}} categories?'}
            </Trans>
          </DialogContentText>
        )}
      </ActionDialog>
      <ActionDialog
        open={params.action === 'unassign-collection' && canOpenBulkActionDialog}
        title={t(
          'dashboard.aleDetailsUnassignCollectionDialogHeader',
          'Unassign Collection From Sale'
        )}
        confirmButtonState={removeCataloguesFromSaleOpts.status}
        onClose={closeModal}
        onConfirm={() => handleCollectionsUnassign(ids)}
        confirmButtonLabel={t('dashboard.aleDetailsUnassignCollection', 'Unassign and save')}
      >
        {canOpenBulkActionDialog && (
          <DialogContentText>
            <Trans
              i18nKey="saleDetailsUnassignCollectionDialog"
              count={ids.length}
              displayQuantity={<strong>{ids.length}</strong>}
            >
              {ids.length === 1
                ? 'Are you sure you want to unassign this collection?'
                : 'Are you sure you want to unassign {{displayQuantity}} collections?'}
            </Trans>
          </DialogContentText>
        )}
      </ActionDialog>
      <ActionDialog
        open={params.action === 'unassign-product' && canOpenBulkActionDialog}
        title={t('dashboard.aleDetailsUnassignProductDialogHeader', 'Unassign Product From Sale')}
        confirmButtonState={removeCataloguesFromSaleOpts.status}
        onClose={closeModal}
        onConfirm={() => handleProductsUnassign(ids)}
        confirmButtonLabel={t('dashboard.aleDetailsUnassignProduct', 'Unassign and save')}
      >
        {canOpenBulkActionDialog && (
          <DialogContentText>
            <Trans
              {...messages.saleDetailsUnassignCategoryDialog}
              values={{
                count: ids.length,
                displayQuantity: <strong>{ids.length}</strong>,
              }}
            />
          </DialogContentText>
        )}
      </ActionDialog>
      <ActionDialog
        open={params.action === 'unassign-variant' && canOpenBulkActionDialog}
        title={t('dashboard.aleDetailsUnassignVariantDialogHeader', 'Unassign Variant From Sale')}
        confirmButtonState={removeCataloguesFromSaleOpts.status}
        onClose={closeModal}
        onConfirm={() => handleVariantsUnassign(ids)}
        confirmButtonLabel={t('dashboard.aleDetailsUnassignVariant', 'Unassign and save')}
      >
        {canOpenBulkActionDialog && (
          <DialogContentText>
            <Trans
              {...messages.saleDetailsUnassignVariantDialog}
              values={{
                count: ids.length,
                displayQuantity: <strong>{ids.length}</strong>,
              }}
            />
          </DialogContentText>
        )}
      </ActionDialog>
      <ActionDialog
        open={params.action === 'remove'}
        title={t('dashboard.aleDetailsSaleDeleteDialogHeader', 'Delete Sale')}
        confirmButtonState={deleteSaleOpts.status}
        onClose={closeModal}
        variant="delete"
        onConfirm={() =>
          deleteSale({
            variables: { id },
          })
        }
      >
        <DialogContentText>
          <Trans
            {...messages.saleDetailsUnassignDialogDelete}
            values={{
              saleName: <strong>{data?.sale?.name ?? '...'}</strong>,
            }}
          />
        </DialogContentText>
      </ActionDialog>
    </PaginatorContext.Provider>
  );
};
export default SaleDetails;
