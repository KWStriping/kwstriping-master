import { Trans, useTranslation } from '@core/i18n';
import IconButton from '@core/ui/components/buttons/IconButton/IconButton';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogContentText from '@mui/material/DialogContentText';
import { useRouter } from 'next/router';
import { useMemo, useEffect } from 'react';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import DeleteFilterTabDialog from '@dashboard/components/dialogs/DeleteFilterTabDialog';
import SaveFilterTabDialog from '@dashboard/components/dialogs/SaveFilterTabDialog';
import type { SaveFilterTabDialogFormData } from '@dashboard/components/dialogs/SaveFilterTabDialog';
import VoucherListPage from '@dashboard/components/discounts/VoucherListPage';
import useAppChannel from '@dashboard/components/layout/Layout/AppChannelContext';
import { VoucherListDocument, VoucherBulkDeleteDocument } from '@core/api/graphql';
import useBulkActions from '@dashboard/hooks/useBulkActions';
import useListSettings from '@dashboard/hooks/useListSettings';
import { usePaginationReset } from '@dashboard/hooks/usePaginationReset';
import usePaginator, {
  createPaginationState,
  PaginatorContext,
} from '@dashboard/hooks/usePaginator';
import {
  canBeSorted,
  DEFAULT_SORT_KEY,
  getSortQueryVariables,
} from '@dashboard/oldSrc/discounts/sort';
import { voucherListUrl } from '@dashboard/oldSrc/discounts/urls';
import type {
  VoucherListUrlDialog,
  VoucherListUrlQueryParams,
} from '@dashboard/oldSrc/discounts/urls';
import {
  deleteFilterTab,
  getActiveFilters,
  getFilterOpts,
  getFilterQueryParam,
  getFiltersCurrentTab,
  getFilterTabs,
  getFilterVariables,
  saveFilterTab,
} from '@dashboard/oldSrc/discounts/VoucherList/filters';
import { ListViews } from '@dashboard/oldSrc/types';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import useFilterHandlers from '@dashboard/oldSrc/utils/handlers/filterHandlers';
import useSortHandler from '@dashboard/oldSrc/utils/handlers/sortHandler';
import { mapNodeToChoice } from '@dashboard/oldSrc/utils/maps';
import { getSortParams } from '@dashboard/oldSrc/utils/sort';

export const VoucherList = () => {
  const router = useRouter();
  const params = router.query;
  const notify = useNotifier();
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(params.ids);
  const { updateListSettings, settings } = useListSettings(ListViews.VoucherList);

  usePaginationReset(voucherListUrl, params, settings.rowNumber);

  const { t } = useTranslation();

  const { availableChannels } = useAppChannel(false);
  const selectedChannel = availableChannels.find((channel) => channel.slug === params.channel);
  const channelOpts = availableChannels
    ? mapNodeToChoice(availableChannels, (channel) => channel.slug)
    : null;

  const [openModal, closeModal] = useDialogActionHandlers<
    VoucherListUrlDialog,
    VoucherListUrlQueryParams
  >(voucherListUrl, params);

  const paginationState = createPaginationState(settings.rowNumber, params);
  const queryVariables = useMemo(
    () => ({
      ...paginationState,
      filter: getFilterVariables(params),
      sort: getSortQueryVariables(params),
      channel: params.channel,
    }),
    [params, settings.rowNumber] // eslint-disable-line react-hooks/exhaustive-deps
  );
  const [{ data, fetching: loading }, refetch] = useQuery(VoucherListDocument, {
    displayLoader: true,
    variables: queryVariables,
  });

  const tabs = getFilterTabs();

  const currentTab = getFiltersCurrentTab(params, tabs);

  const [changeFilters, resetFilters, handleSearchChange] = useFilterHandlers({
    cleanupFn: reset,
    createUrl: voucherListUrl,
    getFilterQueryParam,
  });

  useEffect(() => {
    if (!canBeSorted(params.sort, !!selectedChannel)) {
      void router.push(
        voucherListUrl({
          ...params,
          sort: DEFAULT_SORT_KEY,
        })
      );
    }
  }, [params]);

  const handleTabChange = (tab: number) => {
    reset();
    void router.push(
      voucherListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1]?.data,
      })
    );
  };

  const handleTabDelete = () => {
    deleteFilterTab(currentTab);
    reset();
    void router.push('/discounts/vouchers');
  };

  const handleTabSave = (data: SaveFilterTabDialogFormData) => {
    saveFilterTab(data?.name, getActiveFilters(params));
    handleTabChange(tabs.length + 1);
  };

  const canOpenBulkActionDialog = params.ids?.length;

  const paginationValues = usePaginator({
    pageInfo: data?.vouchers?.pageInfo,
    paginationState,
    queryString: params,
  });

  const [deleteVouchers, deleteVouchersOpts] = useMutation(VoucherBulkDeleteDocument, {
    onCompleted: (data) => {
      if (data?.deleteVouchers?.errors?.length === 0) {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
        reset();
        closeModal();
        refetch();
      }
    },
  });

  const onVoucherBulkDelete = () =>
    deleteVouchers({
      ids: params.ids,
    });

  const handleSort = useSortHandler(voucherListUrl, params);

  return (
    <PaginatorContext.Provider value={paginationValues}>
      <WindowTitle title={t('dashboard.vouchers', 'Vouchers')} />
      <VoucherListPage
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
        settings={settings}
        vouchers={mapEdgesToItems(data?.vouchers)}
        disabled={loading}
        onUpdateListSettings={updateListSettings}
        onSort={handleSort}
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
        confirmButtonState={deleteVouchersOpts.status}
        onClose={closeModal}
        onConfirm={onVoucherBulkDelete}
        open={params.action === 'remove' && canOpenBulkActionDialog}
        title={t(
          'dashboard.0JJ4F',
          'Delete Vouchers'
          // dialog header
        )}
        variant="delete"
      >
        {canOpenBulkActionDialog && (
          <DialogContentText>
            <Trans
              t={t}
              i18nKey={'O9QPe1'}
              count={params.ids.length}
              displayQuantity={<strong>{params.ids.length}</strong>}
            >
              {
                '{count,plural,one{Are you sure you want to delete this voucher?} other{Are you sure you want to delete {displayQuantity} vouchers?}}'
              }
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
export default VoucherList;
