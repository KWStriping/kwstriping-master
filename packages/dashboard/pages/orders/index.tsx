import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useShopLimitsQuery } from '@dashboard/components/core/Shop/queries';
import ChannelPickerDialog from '@dashboard/components/dialogs/ChannelPickerDialog';
import DeleteFilterTabDialog from '@dashboard/components/dialogs/DeleteFilterTabDialog';
import type { SaveFilterTabDialogFormData } from '@dashboard/components/dialogs/SaveFilterTabDialog';
import SaveFilterTabDialog from '@dashboard/components/dialogs/SaveFilterTabDialog';
import useAppChannel from '@dashboard/components/layout/Layout/AppChannelContext';
import OrderListPage from '@dashboard/components/orders/OrderListPage/OrderListPage';
import { OrderDraftCreateDocument, OrderListDocument } from '@core/api/graphql';
import useListSettings from '@dashboard/hooks/useListSettings';
import { usePaginationReset } from '@dashboard/hooks/usePaginationReset';
import usePaginator, {
  createPaginationState,
  PaginatorContext,
} from '@dashboard/hooks/usePaginator';
import { useSortRedirects } from '@dashboard/hooks/useSortRedirects';
import { getStringOrPlaceholder } from '@dashboard/oldSrc/misc';
import {
  deleteFilterTab,
  getActiveFilters,
  getFilterOpts,
  getFilterQueryParam,
  getFiltersCurrentTab,
  getFilterTabs,
  getFilterVariables,
  saveFilterTab,
} from '@dashboard/oldSrc/orders/filters';
import { DEFAULT_SORT_KEY, getSortQueryVariables } from '@dashboard/oldSrc/orders/sort';
import type {
  OrderListUrlDialog,
  OrderListUrlQueryParams,
  OrderListUrlOrdering,
} from '@dashboard/oldSrc/orders/urls';
import { orderListUrl, orderSettingsPath, orderUrl } from '@dashboard/oldSrc/orders/urls';
import { ListViews } from '@dashboard/oldSrc/types';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import useFilterHandlers from '@dashboard/oldSrc/utils/handlers/filterHandlers';
import useSortHandler from '@dashboard/oldSrc/utils/handlers/sortHandler';
import { mapNodeToChoice } from '@dashboard/oldSrc/utils/maps';
import { getSortParams } from '@dashboard/oldSrc/utils/sort';

interface OrderListProps {
  params: OrderListUrlQueryParams;
}

export const OrderList = () => {
  const router = useRouter();
  const params = router.query;
  const notify = useNotifier();
  const { updateListSettings, settings } = useListSettings(ListViews.OrderList);

  usePaginationReset(orderListUrl, params, settings.rowNumber);

  const { t } = useTranslation();

  const [createOrder] = useMutation(OrderDraftCreateDocument, {
    onCompleted: (data) => {
      if (!data?.createDraftOrder?.order) return;
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

  const noChannel = !channel && typeof channel !== 'undefined';
  const channelOpts = availableChannels ? mapNodeToChoice(availableChannels) : null;

  const tabs = getFilterTabs();

  const currentTab = getFiltersCurrentTab(params, tabs);

  const [changeFilters, resetFilters, handleSearchChange] = useFilterHandlers({
    createUrl: orderListUrl,
    getFilterQueryParam,
  });

  const [openModal, closeModal] = useDialogActionHandlers<
    OrderListUrlDialog,
    OrderListUrlQueryParams
  >(orderListUrl, params);

  const handleTabChange = (tab: number) =>
    void router.push(
      orderListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1]?.data,
      })
    );

  const handleFilterTabDelete = () => {
    deleteFilterTab(currentTab);
    void router.push('/orders');
  };

  const handleFilterTabSave = (data: SaveFilterTabDialogFormData) => {
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

  const [{ data, fetching: loading }] = useQuery(OrderListDocument, {
    displayLoader: true,
    variables: queryVariables,
  });

  const paginationValues = usePaginator({
    pageInfo: data?.orders?.pageInfo,
    paginationState,
    queryString: params,
  });

  const handleSort = useSortHandler(orderListUrl, params);

  useSortRedirects<OrderListUrlOrdering>({
    params,
    defaultOrdering: DEFAULT_SORT_KEY,
    urlFunc: orderListUrl,
  });

  return (
    <PaginatorContext.Provider value={paginationValues}>
      <OrderListPage
        settings={settings}
        currentTab={currentTab}
        disabled={loading}
        filterOpts={getFilterOpts(params, channelOpts)}
        limits={limitOpts.data?.shop.limits}
        orders={mapEdgesToItems(data?.orders)}
        sort={getSortParams(params)}
        onAdd={() => openModal('create-order')}
        onUpdateListSettings={updateListSettings}
        onSort={handleSort}
        onSearchChange={handleSearchChange}
        onFilterChange={changeFilters}
        onTabSave={() => openModal('save-search')}
        onTabDelete={() => openModal('delete-search')}
        onTabChange={handleTabChange}
        initialSearch={params.query || ''}
        tabs={getFilterTabs().map((tab) => tab.name)}
        onAll={resetFilters}
        onSettingsOpen={() => router.push(orderSettingsPath)}
      />
      <SaveFilterTabDialog
        open={params.action === 'save-search'}
        confirmButtonState="default"
        onClose={closeModal}
        onSubmit={handleFilterTabSave}
      />
      <DeleteFilterTabDialog
        open={params.action === 'delete-search'}
        confirmButtonState="default"
        onClose={closeModal}
        onSubmit={handleFilterTabDelete}
        tabName={getStringOrPlaceholder(tabs[currentTab - 1]?.name)}
      />
      {!noChannel && (
        <ChannelPickerDialog
          channelsChoices={channelOpts}
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
      )}
    </PaginatorContext.Provider>
  );
};

export default OrderList;
