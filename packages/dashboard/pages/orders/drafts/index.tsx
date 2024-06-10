import { Trans, useTranslation } from '@core/i18n';
import IconButton from '@core/ui/components/buttons/IconButton/IconButton';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogContentText from '@mui/material/DialogContentText';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useShopLimitsQuery } from '@dashboard/components/core/Shop/queries';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import ChannelPickerDialog from '@dashboard/components/dialogs/ChannelPickerDialog';
import DeleteFilterTabDialog from '@dashboard/components/dialogs/DeleteFilterTabDialog';
import type { SaveFilterTabDialogFormData } from '@dashboard/components/dialogs/SaveFilterTabDialog';
import SaveFilterTabDialog from '@dashboard/components/dialogs/SaveFilterTabDialog';
import useAppChannel from '@dashboard/components/layout/Layout/AppChannelContext';
import OrderDraftListPage from '@dashboard/components/orders/OrderDraftListPage';
import {
  OrderDraftListDocument,
  OrderDraftCreateDocument,
  OrderDraftBulkCancelDocument,
} from '@core/api/graphql';

import useBulkActions from '@dashboard/hooks/useBulkActions';
import useListSettings from '@dashboard/hooks/useListSettings';
import { usePaginationReset } from '@dashboard/hooks/usePaginationReset';
import usePaginator, {
  createPaginationState,
  PaginatorContext,
} from '@dashboard/hooks/usePaginator';
import {
  deleteFilterTab,
  getActiveFilters,
  getFilterOpts,
  getFilterQueryParam,
  getFiltersCurrentTab,
  getFilterTabs,
  getFilterVariables,
  saveFilterTab,
} from '@dashboard/oldSrc/orders/OrderDraftList/filters';
import { getSortQueryVariables } from '@dashboard/oldSrc/orders/OrderDraftList/sort';
import type {
  OrderDraftListUrlDialog,
  OrderDraftListUrlQueryParams,
} from '@dashboard/oldSrc/orders/urls';
import { orderDraftListUrl, orderUrl } from '@dashboard/oldSrc/orders/urls';
import { ListViews } from '@dashboard/oldSrc/types';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import useFilterHandlers from '@dashboard/oldSrc/utils/handlers/filterHandlers';
import useSortHandler from '@dashboard/oldSrc/utils/handlers/sortHandler';
import { mapNodeToChoice } from '@dashboard/oldSrc/utils/maps';
import { getSortParams } from '@dashboard/oldSrc/utils/sort';

interface OrderDraftListProps {
  params: OrderDraftListUrlQueryParams;
}

export const OrderDraftList = () => {
  const router = useRouter();
  const params = router.query;
  const notify = useNotifier();
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(params.ids);
  const { updateListSettings, settings } = useListSettings(ListViews.DraftList);

  usePaginationReset(orderDraftListUrl, params, settings.rowNumber);

  const { t } = useTranslation();

  const [orderDraftBulkDelete, orderDraftBulkDeleteOpts] = useMutation(
    OrderDraftBulkCancelDocument,
    {
      onCompleted: (data) => {
        if (data?.deleteOrderDrafts?.errors?.length === 0) {
          notify(t('dashboard.a2O4j', 'Deleted draft orders'), {
            type: 'success',
          });
          refetch();
          reset();
          closeModal();
        }
      },
    }
  );

  const [createOrder] = useMutation(OrderDraftCreateDocument, {
    onCompleted: (data) => {
      notify(t('dashboard.udlH+', 'Order draft successfully created'), {
        type: 'success',
      });
      void router.push(orderUrl(data?.createDraftOrder?.order?.id));
    },
  });

  const { channel, availableChannels } = useAppChannel(false);
  const limitOpts = useShopLimitsQuery({
    variables: {
      orders: true,
    },
  });

  const tabs = getFilterTabs();

  const currentTab = getFiltersCurrentTab(params, tabs);

  const [changeFilters, resetFilters, handleSearchChange] = useFilterHandlers({
    cleanupFn: reset,
    createUrl: orderDraftListUrl,
    getFilterQueryParam,
  });

  const [openModal, closeModal] = useDialogActionHandlers<
    OrderDraftListUrlDialog,
    OrderDraftListUrlQueryParams
  >(orderDraftListUrl, params);

  const handleTabChange = (tab: number) => {
    reset();
    void router.push(
      orderDraftListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1]?.data,
      })
    );
  };

  const handleTabDelete = () => {
    deleteFilterTab(currentTab);
    reset();
    void router.push('/orders/drafts');
  };

  const handleTabSave = (data: SaveFilterTabDialogFormData) => {
    saveFilterTab(data?.name, getActiveFilters(params));
    handleTabChange(tabs.length + 1);
  };

  const paginationState = createPaginationState(settings.rowNumber, params);
  const queryVariables = useMemo(
    () => ({
      ...paginationState,
      filter: getFilterVariables(params),
      sort: getSortQueryVariables(params),
    }),
    [params, settings.rowNumber]
  );
  const [{ data, fetching: loading }, refetch] = useQuery(OrderDraftListDocument, {
    displayLoader: true,
    variables: queryVariables,
  });

  const paginationValues = usePaginator({
    pageInfo: data?.orderDrafts?.pageInfo,
    paginationState,
    queryString: params,
  });

  const handleSort = useSortHandler(orderDraftListUrl, params);

  const onOrderDraftBulkDelete = () =>
    orderDraftBulkDelete({
      ids: params.ids,
    });

  return (
    <PaginatorContext.Provider value={paginationValues}>
      <OrderDraftListPage
        currentTab={currentTab}
        filterOpts={getFilterOpts(params)}
        limits={limitOpts.data?.shop.limits}
        initialSearch={params.query || ''}
        onSearchChange={handleSearchChange}
        onFilterChange={changeFilters}
        onAll={resetFilters}
        onTabChange={handleTabChange}
        onTabDelete={() => openModal('delete-search')}
        onTabSave={() => openModal('save-search')}
        tabs={tabs.map((tab) => tab.name)}
        disabled={loading}
        settings={settings}
        orders={mapEdgesToItems(data?.orderDrafts)}
        onAdd={() => openModal('create-order')}
        onSort={handleSort}
        onUpdateListSettings={updateListSettings}
        isChecked={isSelected}
        selected={listElements.length}
        sort={getSortParams(params)}
        toggle={toggle}
        toggleAll={toggleAll}
        toolbar={
          <IconButton
            color="secondary"
            onClick={() =>
              openModal('remove', {
                ids: listElements,
              })
            }
          >
            <DeleteIcon />
          </IconButton>
        }
      />
      <ActionDialog
        confirmButtonState={orderDraftBulkDeleteOpts.status}
        onClose={closeModal}
        onConfirm={onOrderDraftBulkDelete}
        open={params.action === 'remove'}
        title={t(
          'dashboard.bmeUI',
          'Delete Order Drafts'
          // dialog header
        )}
        variant="delete"
      >
        <DialogContentText>
          <Trans
            t={t}
            i18nKey={'Q6VRrE'}
            count={params.ids?.length}
            displayQuantity={<strong>{params.ids?.length}</strong>}
          >
            {
              '{count,plural,one{Are you sure you want to delete this order draft?} other{Are you sure you want to delete {displayQuantity} order drafts?}}'
            }
          </Trans>
        </DialogContentText>
      </ActionDialog>
      <SaveFilterTabDialog
        open={params.action === 'save-search'}
        confirmButtonState="default"
        onClose={closeModal}
        onSubmit={handleTabSave}
      />
      <DeleteFilterTabDialog
        open={params.action === 'delete-search'}
        confirmButtonState="default"
        onClose={closeModal}
        onSubmit={handleTabDelete}
        tabName={tabs[currentTab - 1]?.name ?? '...'}
      />
      <ChannelPickerDialog
        channelsChoices={mapNodeToChoice(availableChannels)}
        confirmButtonState="success"
        defaultChoice={channel?.id}
        open={params.action === 'create-order'}
        onClose={closeModal}
        onConfirm={(channelId) =>
          createOrder({
            input: { channelId },
          })
        }
      />
    </PaginatorContext.Provider>
  );
};

export default OrderDraftList;
