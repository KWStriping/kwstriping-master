import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { getMutationStatus } from '@core/urql/utils';
import { getById } from '@core/utils';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useShopLimitsQuery } from '@dashboard/components/core/Shop/queries';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import DeleteFilterTabDialog from '@dashboard/components/dialogs/DeleteFilterTabDialog';
import SaveFilterTabDialog from '@dashboard/components/dialogs/SaveFilterTabDialog';
import type { SaveFilterTabDialogFormData } from '@dashboard/components/dialogs/SaveFilterTabDialog';
import WarehouseDeleteDialog from '@dashboard/components/warehouses/WarehouseDeleteDialog';
import WarehouseListPage from '@dashboard/components/warehouses/WarehouseListPage';
import { WarehouseListDocument, WarehouseDeleteDocument } from '@core/api/graphql';
import useListSettings from '@dashboard/hooks/useListSettings';
import { usePaginationReset } from '@dashboard/hooks/usePaginationReset';
import usePaginator, {
  createPaginationState,
  PaginatorContext,
} from '@dashboard/hooks/usePaginator';

import { ListViews } from '@dashboard/oldSrc/types';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import useFilterHandlers from '@dashboard/oldSrc/utils/handlers/filterHandlers';
import useSortHandler from '@dashboard/oldSrc/utils/handlers/sortHandler';
import { getSortParams } from '@dashboard/oldSrc/utils/sort';
import {
  deleteFilterTab,
  getActiveFilters,
  getFiltersCurrentTab,
  getFilterTabs,
  getFilterVariables,
  saveFilterTab,
} from '@dashboard/oldSrc/warehouses/filters';
import { getSortQueryVariables } from '@dashboard/oldSrc/warehouses/sort';
import type {
  WarehouseListUrlDialog,
  WarehouseListUrlQueryParams,
} from '@dashboard/oldSrc/warehouses/urls';
import { warehouseListUrl } from '@dashboard/oldSrc/warehouses/urls';

export interface WarehouseListProps {
  params: WarehouseListUrlQueryParams;
}

const WarehouseList = () => {
  const router = useRouter();
  const params = router.query as WarehouseListUrlQueryParams;
  const notify = useNotifier();
  const { updateListSettings, settings } = useListSettings(ListViews.SalesList);
  const { t } = useTranslation();

  usePaginationReset(warehouseListUrl, params, settings.rowNumber);

  const paginationState = createPaginationState(settings.rowNumber, params);
  const queryVariables = useMemo(
    () => ({
      ...paginationState,
      filter: getFilterVariables(params),
      sort: getSortQueryVariables(params),
    }),
    [params, settings.rowNumber] // eslint-disable-line react-hooks/exhaustive-deps
  );
  const [{ data, fetching: loading }, refetch] = useQuery(WarehouseListDocument, {
    displayLoader: true,
    variables: queryVariables,
  });
  const [limitOpts, refetchShopLimits] = useShopLimitsQuery({
    variables: {
      warehouses: true,
    },
  });
  const [deleteWarehouse, deleteWarehouseMutation] = useMutation(WarehouseDeleteDocument, {
    onCompleted: (data) => {
      if (data?.deleteWarehouse?.errors?.length === 0) {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
        refetch();
        refetchShopLimits();
        closeModal();
      }
    },
  });

  const tabs = getFilterTabs();

  const currentTab = getFiltersCurrentTab(params, tabs);

  const [, resetFilters, handleSearchChange] = useFilterHandlers({
    createUrl: warehouseListUrl,
    getFilterQueryParam: () => undefined,
  });

  const [openModal, closeModal] = useDialogActionHandlers<
    WarehouseListUrlDialog,
    WarehouseListUrlQueryParams
  >(warehouseListUrl, params);

  const handleTabChange = (tab: number) =>
    void router.push(
      warehouseListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1]?.data,
      })
    );

  const handleTabDelete = () => {
    deleteFilterTab(currentTab);
    void router.push('/warehouses');
  };

  const handleTabSave = (data: SaveFilterTabDialogFormData) => {
    saveFilterTab(data?.name, getActiveFilters(params));
    handleTabChange(tabs.length + 1);
  };

  const paginationValues = usePaginator({
    pageInfo: data?.warehouses?.pageInfo,
    paginationState,
    queryString: params,
  });

  const handleSort = useSortHandler(warehouseListUrl, params);

  const deleteTransitionState = getMutationStatus(deleteWarehouseMutation);
  if (!data?.warehouses) return null;
  return (
    <PaginatorContext.Provider value={paginationValues}>
      <WindowTitle title={t('dashboard.warehouses', 'Warehouses')} />
      <WarehouseListPage
        currentTab={currentTab}
        initialSearch={params.query || ''}
        onSearchChange={handleSearchChange}
        onAll={resetFilters}
        onTabChange={handleTabChange}
        onTabDelete={() => openModal('delete-search')}
        onTabSave={() => openModal('save-search')}
        limits={limitOpts.data?.shop.limits}
        tabs={tabs.map((tab) => tab.name)}
        warehouses={mapEdgesToItems(data?.warehouses)}
        settings={settings}
        disabled={loading}
        onRemove={(id) => openModal('delete', { id })}
        onSort={handleSort}
        onUpdateListSettings={updateListSettings}
        sort={getSortParams(params)}
      />
      <WarehouseDeleteDialog
        confirmButtonState={deleteTransitionState}
        name={mapEdgesToItems(data?.warehouses)?.find(getById(params.id))?.name}
        open={params.action === 'delete'}
        onClose={closeModal}
        onConfirm={() => params.id && deleteWarehouse({ id: params.id })}
      />
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

export default WarehouseList;
