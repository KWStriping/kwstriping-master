import { Trans, useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useShopSettings } from '@core/ui/hooks/useShopSettings';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import DialogContentText from '@mui/material/DialogContentText';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { assert } from 'tsafe/assert';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import AssignCategoriesDialog from '@dashboard/components/dialogs/AssignCategoryDialog';
import AssignCollectionDialog from '@dashboard/components/dialogs/AssignCollectionDialog';
import AssignProductDialog from '@dashboard/components/dialogs/AssignProductDialog';
import ChannelsAvailabilityDialog from '@dashboard/components/dialogs/ChannelsAvailabilityDialog';
import DiscountCountrySelectDialog from '@dashboard/components/discounts/DiscountCountrySelectDialog';
import VoucherDetailsPage, {
  VoucherDetailsPageTab,
} from '@dashboard/components/discounts/VoucherDetailsPage';
import type { VoucherTabItemsCount } from '@dashboard/components/discounts/VoucherDetailsPage';
import useAppChannel from '@dashboard/components/layout/Layout/AppChannelContext';
import {
  VoucherDetailsDocument,
  VoucherDeleteDocument,
  UpdateMetadataDocument,
  UpdatePrivateMetadataDocument,
  VoucherChannelListingUpdateDocument,
  VoucherUpdateDocument,
  VoucherCataloguesRemoveDocument,
  VoucherCataloguesAddDocument,
} from '@core/api/graphql';
import type { VoucherDetailsQueryVariables } from '@core/api/graphql';
import useBulkActions from '@dashboard/hooks/useBulkActions';
import useChannels from '@dashboard/hooks/useChannels';
import useLocalPaginator, {
  useSectionLocalPaginationState,
} from '@dashboard/hooks/useLocalPaginator';
import { PaginatorContext } from '@dashboard/hooks/usePaginator';
import {
  createChannelsDataWithDiscountPrice,
  createSortedChannelsDataFromVoucher,
} from '@dashboard/oldSrc/channels/utils';
import type { ChannelVoucherData } from '@dashboard/oldSrc/channels/utils';
import { DEFAULT_INITIAL_SEARCH_DATA, PAGINATE_BY } from '@dashboard/oldSrc/config';
import { voucherUrl } from '@dashboard/oldSrc/discounts/urls';
import type { VoucherUrlDialog, VoucherUrlQueryParams } from '@dashboard/oldSrc/discounts/urls';
import { createUpdateHandler } from '@dashboard/oldSrc/discounts/VoucherDetails/handlers';
import { VOUCHER_UPDATE_FORM_ID } from '@dashboard/oldSrc/discounts/VoucherDetails/types';
import useCategorySearch from '@dashboard/oldSrc/searches/useCategorySearch';
import useCollectionSearch from '@dashboard/oldSrc/searches/useCollectionSearch';
import useProductSearch from '@dashboard/oldSrc/searches/useProductSearch';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import createMetadataUpdateHandler from '@dashboard/oldSrc/utils/handlers/metadataUpdateHandler';

export const VoucherDetails = () => {
  const router = useRouter();
  const { id, ids = [], ...params } = router.query;
  assert(typeof id === 'string');
  assert(Array.isArray(ids));
  const notify = useNotifier();
  const shop = useShopSettings();
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
  const [updateMetadata] = useMutation(UpdateMetadataDocument, {});
  const [updatePrivateMetadata] = useMutation(UpdatePrivateMetadataDocument, {});

  const [activeTab, setActiveTab] = useState<VoucherDetailsPageTab>(
    VoucherDetailsPageTab.categories
  );
  const [paginationState, setPaginationState] = useSectionLocalPaginationState(
    PAGINATE_BY,
    activeTab
  );
  const paginate = useLocalPaginator(setPaginationState);
  const changeTab = (tab: VoucherDetailsPageTab) => {
    reset();
    setActiveTab(tab);
  };

  const detailsQueryInclude: Pick<
    VoucherDetailsQueryVariables,
    'includeCategories' | 'includeCollections' | 'includeProducts'
  > = {
    includeCategories: activeTab === VoucherDetailsPageTab.categories,
    includeCollections: activeTab === VoucherDetailsPageTab.collections,
    includeProducts: activeTab === VoucherDetailsPageTab.products,
  };

  const [{ data, fetching: loading }] = useQuery(VoucherDetailsDocument, {
    displayLoader: true,
    variables: {
      id,
      ...paginationState,
      ...detailsQueryInclude,
    },
  });

  const [openModal, closeModal] = useDialogActionHandlers<
    VoucherUrlDialog,
    VoucherUrlQueryParams
  >((params) => voucherUrl(id, params), params);

  const { channel, availableChannels } = useAppChannel(false);

  const allChannels: ChannelVoucherData[] = createChannelsDataWithDiscountPrice(
    data?.voucher,
    availableChannels
  );
  const voucherChannelsChoices: ChannelVoucherData[] = useMemo(
    () => createSortedChannelsDataFromVoucher(data?.voucher),
    [data?.voucher]
  );

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
    voucherChannelsChoices,
    params?.action,
    {
      closeModal,
      openModal,
    },
    { formId: VOUCHER_UPDATE_FORM_ID }
  );

  const [updateChannels, updateChannelsOpts] = useMutation(
    VoucherChannelListingUpdateDocument,
    {}
  );

  const notifySaved = () =>
    notify(t('dashboard.savedChanges', 'Saved changes'), {
      type: 'success',
    });

  const [updateVoucher, updateVoucherOpts] = useMutation(VoucherUpdateDocument, {
    onCompleted: (data) => {
      if (data?.updateVoucher?.errors?.length === 0) {
        closeModal();
        notifySaved();
      }
    },
  });

  const [deleteVoucher, deleteVoucherOpts] = useMutation(VoucherDeleteDocument, {
    onCompleted: (data) => {
      if (data?.deleteVoucher?.errors?.length === 0) {
        notifySaved();
        void router.replace('/discounts/vouchers');
      }
    },
  });

  const [removeCataloguesFromVoucher, removeCataloguesFromVoucherOpts] = useMutation(
    VoucherCataloguesRemoveDocument,
    {
      onCompleted: (data) => {
        if (data?.removeCataloguesFromVoucher?.errors?.length === 0) {
          notifySaved();
          closeModal();
          reset();
        }
      },
    }
  );

  const [addCataloguesToVoucher, addCataloguesToVoucherOpts] = useMutation(
    VoucherCataloguesAddDocument,
    {
      onCompleted: (data) => {
        if (data?.addCataloguesToVoucher?.errors?.length === 0) {
          notifySaved();
          closeModal();
        }
      },
    }
  );

  const canOpenBulkActionDialog = ids?.length;

  const handleUpdate = createUpdateHandler(
    data?.voucher,
    voucherChannelsChoices,
    (variables) => updateVoucher({ variables }),
    updateChannels
  );

  const handleSubmit = createMetadataUpdateHandler(
    data?.voucher,
    handleUpdate,
    (variables) => updateMetadata({ ...variables }),
    (variables) => updatePrivateMetadata({ ...variables })
  );

  const tabPageInfo =
    activeTab === VoucherDetailsPageTab.categories
      ? data?.voucher?.categories?.pageInfo
      : activeTab === VoucherDetailsPageTab.collections
      ? data?.voucher?.collections?.pageInfo
      : data?.voucher?.products?.pageInfo;

  const handleCategoriesUnassign = (ids: string[]) =>
    removeCataloguesFromVoucher({
      ...paginationState,
      ...detailsQueryInclude,
      id,
      input: {
        categories: ids,
      },
    });

  const handleCollectionsUnassign = (ids: string[]) =>
    removeCataloguesFromVoucher({
      ...paginationState,
      ...detailsQueryInclude,
      id,
      input: {
        collections: ids,
      },
    });

  const handleProductsUnassign = (ids: string[]) =>
    removeCataloguesFromVoucher({
      ...paginationState,
      ...detailsQueryInclude,
      id,
      input: {
        products: ids,
      },
    });

  const { pageInfo, ...paginationValues } = paginate(tabPageInfo, paginationState);

  const tabItemsCount: VoucherTabItemsCount = {
    categories: data?.voucher?.categoriesCount?.totalCount,
    collections: data?.voucher?.collectionsCount?.totalCount,
    products: data?.voucher?.productsCount?.totalCount,
  };

  return (
    <PaginatorContext.Provider value={{ ...pageInfo, ...paginationValues }}>
      <WindowTitle title={t('dashboard.vouchers', 'Vouchers')} />
      {!!allChannels?.length && (
        <ChannelsAvailabilityDialog
          isSelected={isChannelSelected}
          disabled={false}
          channels={allChannels}
          onChange={channelsToggle}
          onClose={handleChannelsModalClose}
          open={isChannelsModalOpen}
          title={t('dashboard.M730i', 'Manage Channel Availability')}
          selected={channelListElements.length}
          confirmButtonState="default"
          onConfirm={handleChannelsConfirm}
          toggleAll={toggleAllChannels}
        />
      )}
      <VoucherDetailsPage
        voucher={data?.voucher}
        allChannelsCount={allChannels?.length}
        channelListings={currentChannels}
        disabled={
          loading || removeCataloguesFromVoucherOpts.fetching || updateChannelsOpts.fetching
        }
        errors={[
          ...(updateVoucherOpts.data?.updateVoucher?.errors || []),
          ...(updateChannelsOpts.data?.updateVoucherChannelListing?.errors || []),
        ]}
        selectedChannelId={channel?.id}
        onCategoryAssign={() => openModal('assign-category')}
        onCollectionAssign={() => openModal('assign-collection')}
        onCollectionUnassign={(collectionId) =>
          openModal('unassign-collection', {
            ids: [collectionId],
          })
        }
        onCountryAssign={() => openModal('assign-country')}
        onCountryUnassign={(countryCode) =>
          updateVoucher({
            ...paginationState,
            id,
            input: {
              countries: data?.voucher?.countries
                .filter((country) => country.code !== countryCode)
                .map((country) => country.code),
            },
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
        activeTab={activeTab}
        tabItemsCount={tabItemsCount}
        onTabClick={changeTab}
        onSubmit={handleSubmit}
        onRemove={() => openModal('remove')}
        openChannelsModal={handleChannelsModalOpen}
        onChannelsChange={setCurrentChannels}
        saveButtonBarState={updateVoucherOpts.status}
        categoryListToolbar={
          <Button
            onClick={() =>
              openModal('unassign-category', {
                ids: listElements,
              })
            }
          >
            <>
              {/* button */}

              {t('dashboard.kip05', 'Unassign')}
            </>
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
            <>
              {/* button */}

              {t('dashboard.kip05', 'Unassign')}
            </>
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
            <>
              {/* button */}

              {t('dashboard.kip05', 'Unassign')}
            </>
          </Button>
        }
        isChecked={isSelected}
        selected={listElements.length}
        toggle={toggle}
        toggleAll={toggleAll}
      />
      <AssignCategoriesDialog
        categories={mapEdgesToItems(searchCategoriesOpts?.data?.search)?.filter(
          (suggestedCategory) => suggestedCategory.id
        )}
        confirmButtonState={addCataloguesToVoucherOpts.status}
        hasMore={!!searchCategoriesOpts.data?.search?.pageInfo.hasNextPage}
        open={params.action === 'assign-category'}
        onFetch={searchCategories}
        onFetchMore={loadMoreCategories}
        loading={searchCategoriesOpts.fetching}
        onClose={closeModal}
        onSubmit={(categories) =>
          addCataloguesToVoucher({
            ...paginationState,
            ...detailsQueryInclude,
            id,
            input: {
              categories,
            },
          })
        }
      />
      <AssignCollectionDialog
        collections={mapEdgesToItems(searchCollectionsOpts?.data?.search)?.filter(
          (suggestedCategory) => suggestedCategory.id
        )}
        confirmButtonState={addCataloguesToVoucherOpts.status}
        hasMore={!!searchCollectionsOpts.data?.search?.pageInfo.hasNextPage}
        open={params.action === 'assign-collection'}
        onFetch={searchCollections}
        onFetchMore={loadMoreCollections}
        loading={searchCollectionsOpts.fetching}
        onClose={closeModal}
        onSubmit={(collections) =>
          addCataloguesToVoucher({
            ...paginationState,
            ...detailsQueryInclude,
            id,
            input: {
              collections,
            },
          })
        }
      />
      <DiscountCountrySelectDialog
        confirmButtonState={updateVoucherOpts.status}
        countries={shop.countries ?? []}
        onClose={() => router.push({ pathname: '/discounts/vouchers/[id]', query: { id } })}
        onConfirm={(formData) =>
          updateVoucher({
            id,
            input: {
              countries: formData.countries,
            },
          })
        }
        open={params.action === 'assign-country'}
        initial={data?.voucher?.countries.map((country) => country.code) ?? []}
      />
      <AssignProductDialog
        confirmButtonState={addCataloguesToVoucherOpts.status}
        hasMore={!!searchProductsOpts.data?.search?.pageInfo.hasNextPage}
        open={params.action === 'assign-product'}
        onFetch={searchProducts}
        onFetchMore={loadMoreProducts}
        loading={searchProductsOpts.fetching}
        onClose={closeModal}
        onSubmit={(products) =>
          addCataloguesToVoucher({
            ...paginationState,
            ...detailsQueryInclude,
            id,
            input: {
              products,
            },
          })
        }
        products={mapEdgesToItems(searchProductsOpts?.data?.search)?.filter(
          (suggestedProduct) => suggestedProduct.id
        )}
      />
      <ActionDialog
        open={params.action === 'unassign-category' && canOpenBulkActionDialog}
        title={t(
          'dashboard.OSNq0',
          'Unassign Categories From Voucher'
          // dialog header
        )}
        confirmButtonState={removeCataloguesFromVoucherOpts.status}
        onClose={closeModal}
        onConfirm={() => handleCategoriesUnassign(ids)}
        confirmButtonLabel={t(
          'dashboard.NSLLO',
          'Unassign and save'
          // button
        )}
      >
        {canOpenBulkActionDialog && (
          <DialogContentText>
            <Trans
              t={t}
              i18nKey={'GiJm1v'}
              count={ids.length}
              displayQuantity={<strong>{ids.length}</strong>}
            >
              {
                '{count,plural,one{Are you sure you want to unassign this category?} other{Are you sure you want to unassign {displayQuantity} categories?}}'
              }
            </Trans>
          </DialogContentText>
        )}
      </ActionDialog>
      <ActionDialog
        open={params.action === 'unassign-collection' && canOpenBulkActionDialog}
        title={t(
          'dashboard.mGlkp',
          'Unassign Collections From Voucher'
          // dialog header
        )}
        confirmButtonState={removeCataloguesFromVoucherOpts.status}
        onClose={closeModal}
        onConfirm={() => handleCollectionsUnassign(ids)}
        confirmButtonLabel={t(
          'dashboard.NSLLO',
          'Unassign and save'
          // button
        )}
      >
        {canOpenBulkActionDialog && (
          <DialogContentText>
            <Trans
              t={t}
              i18nKey={'UjoSZB'}
              count={ids.length}
              displayQuantity={<strong>{ids.length}</strong>}
            >
              {
                '{count,plural,one{Are you sure you want to unassign this collection?} other{Are you sure you want to unassign {displayQuantity} collections?}}'
              }
            </Trans>
          </DialogContentText>
        )}
      </ActionDialog>
      <ActionDialog
        open={params.action === 'unassign-product' && canOpenBulkActionDialog}
        title={t(
          'dashboard.KCfSW',
          'Unassign Products From Voucher'
          // dialog header
        )}
        confirmButtonState={removeCataloguesFromVoucherOpts.status}
        onClose={closeModal}
        onConfirm={() => handleProductsUnassign(ids)}
        confirmButtonLabel={t(
          'dashboard.NSLLO',
          'Unassign and save'
          // button
        )}
      >
        {canOpenBulkActionDialog && (
          <DialogContentText>
            <Trans
              t={t}
              i18nKey={'AHK0K9'}
              count={ids.length}
              displayQuantity={<strong>{ids.length}</strong>}
            >
              {
                '{count,plural,one{Are you sure you want to unassign this product?} other{Are you sure you want to unassign {displayQuantity} products?}}'
              }
            </Trans>
          </DialogContentText>
        )}
      </ActionDialog>
      <ActionDialog
        open={params.action === 'remove'}
        title={t(
          'dashboard.gz44z',
          'Delete Voucher'
          // dialog header
        )}
        confirmButtonState={deleteVoucherOpts.status}
        onClose={closeModal}
        variant="delete"
        onConfirm={() =>
          deleteVoucher({
            variables: { id },
          })
        }
      >
        <DialogContentText>
          <Trans
            t={t}
            i18nKey={'NEJo1I'}
            voucherCode={`<strong>${data?.voucher?.code ?? '...'}</strong>}`}
          >
            {'Are you sure you want to delete {voucherCode}?'}
          </Trans>
        </DialogContentText>
      </ActionDialog>
    </PaginatorContext.Provider>
  );
};
export default VoucherDetails;
