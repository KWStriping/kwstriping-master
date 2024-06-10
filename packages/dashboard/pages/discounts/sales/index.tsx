import { Trans, useTranslation } from '@core/i18n';
import IconButton from '@core/ui/components/buttons/IconButton/IconButton';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogContentText from '@mui/material/DialogContentText';
import { useRouter } from 'next/router';
import { useMemo, useEffect } from 'react';
import { assert } from 'tsafe/assert';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import DeleteFilterTabDialog from '@dashboard/components/dialogs/DeleteFilterTabDialog';
import SaveFilterTabDialog from '@dashboard/components/dialogs/SaveFilterTabDialog';
import type { SaveFilterTabDialogFormData } from '@dashboard/components/dialogs/SaveFilterTabDialog';
import SaleListPage from '@dashboard/components/discounts/SaleListPage';
import useAppChannel from '@dashboard/components/layout/Layout/AppChannelContext';
import { SaleBulkDeleteDocument, SaleListDocument } from '@core/api/graphql';
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
} from '@dashboard/oldSrc/discounts/SaleList/filters';
import {
  canBeSorted,
  DEFAULT_SORT_KEY,
  getSortQueryVariables,
} from '@dashboard/oldSrc/discounts/SaleList/sort';
import { saleListUrl } from '@dashboard/oldSrc/discounts/urls';
import type { SaleListUrlDialog, SaleListUrlQueryParams } from '@dashboard/oldSrc/discounts/urls';
import { ListViews } from '@dashboard/oldSrc/types';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import useFilterHandlers from '@dashboard/oldSrc/utils/handlers/filterHandlers';
import useSortHandler from '@dashboard/oldSrc/utils/handlers/sortHandler';
import { mapNodeToChoice } from '@dashboard/oldSrc/utils/maps';
import { getSortParams } from '@dashboard/oldSrc/utils/sort';

interface SaleListProps {
  params: SaleListUrlQueryParams;
}

export const SaleList = () => {
  const router = useRouter();
  const params = router.query;
  const { ids = [] } = params;
  assert(Array.isArray(ids));
  const notify = useNotifier();
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(ids);
  const { updateListSettings, settings } = useListSettings(ListViews.SalesList);

  usePaginationReset(saleListUrl, params, settings.rowNumber);

  const { t } = useTranslation();
  const { availableChannels } = useAppChannel(false);
  const selectedChannel = availableChannels.find((channel) => channel.slug === params.channel);
  const channelOpts = availableChannels
    ? mapNodeToChoice(availableChannels, (channel) => channel.slug)
    : null;

  const [openModal, closeModal] = useDialogActionHandlers<
    SaleListUrlDialog,
    SaleListUrlQueryParams
  >(saleListUrl, params);

  const paginationState = createPaginationState(settings.rowNumber, params);
  const queryVariables = useMemo(
    () => ({
      ...paginationState,
      filter: getFilterVariables(params),
      sort: getSortQueryVariables(params),
      channel: params.channel,
    }),
    [params, settings.rowNumber]
  );
  const [{ data, fetching: loading }, refetch] = useQuery(SaleListDocument, {
    displayLoader: true,
    variables: queryVariables,
  });

  const tabs = getFilterTabs();

  const currentTab = getFiltersCurrentTab(params, tabs);

  const [changeFilters, resetFilters, handleSearchChange] = useFilterHandlers({
    cleanupFn: reset,
    createUrl: saleListUrl,
    getFilterQueryParam,
  });

  useEffect(() => {
    if (!canBeSorted(params.sort, !!selectedChannel)) {
      void router.push(
        saleListUrl({
          ...params,
          sort: DEFAULT_SORT_KEY,
        })
      );
    }
  }, [params]);

  const handleTabChange = (tab: number) => {
    reset();
    void router.push(
      saleListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1]?.data,
      })
    );
  };

  const handleTabDelete = () => {
    deleteFilterTab(currentTab);
    reset();
    void router.push('/discounts/sales');
  };

  const handleTabSave = (data: SaveFilterTabDialogFormData) => {
    saveFilterTab(data?.name, getActiveFilters(params));
    handleTabChange(tabs.length + 1);
  };

  const canOpenBulkActionDialog = ids?.length;

  const paginationValues = usePaginator({
    pageInfo: data?.sales?.pageInfo,
    paginationState,
    queryString: params,
  });

  const [deleteSales, deleteSalesOpts] = useMutation(SaleBulkDeleteDocument, {
    onCompleted: (data) => {
      if (data?.deleteSales?.errors?.length === 0) {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
        reset();
        closeModal();
        refetch();
      }
    },
  });

  const handleSort = useSortHandler(saleListUrl, params);

  const onSaleBulkDelete = () =>
    deleteSales({
      ids: ids,
    });

  return (
    <PaginatorContext.Provider value={paginationValues}>
      <WindowTitle title={t('dashboard.sales', 'Sales')} />
      <SaleListPage
        currentTab={currentTab}
        filterOpts={getFilterOpts(params, channelOpts)}
        initialSearch={params.query || ''}
        onSearchChange={handleSearchChange}
        onFilterChange={(filter) => changeFilters(filter)}
        onAll={resetFilters}
        onTabChange={handleTabChange}
        onTabDelete={() => openModal('delete-search')}
        onTabSave={() => openModal('save-search')}
        tabs={tabs.map((tab) => tab.name)}
        sales={mapEdgesToItems(data?.sales)}
        settings={settings}
        disabled={loading}
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
        selectedChannelId={selectedChannel?.id}
      />
      <ActionDialog
        confirmButtonState={deleteSalesOpts.status}
        onClose={closeModal}
        onConfirm={onSaleBulkDelete}
        open={params.action === 'remove' && canOpenBulkActionDialog}
        title={t(
          'dashboard.WIjvr',
          'Delete Sales'
          // dialog header
        )}
        variant="delete"
      >
        {canOpenBulkActionDialog && (
          <DialogContentText>
            <Trans
              t={t}
              i18nKey={'FPzzh7'}
              count={ids.length}
              displayQuantity={<strong>{ids.length}</strong>}
            >
              {ids.length === 1
                ? 'Are you sure you want to delete this sale?'
                : 'Are you sure you want to delete {{displayQuantity}} sales?'}
            </Trans>
          </DialogContentText>
        )}
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
    </PaginatorContext.Provider>
  );
};
export default SaleList;
