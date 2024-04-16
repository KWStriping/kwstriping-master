import { Trans, useTranslation } from '@core/i18n';
import IconButton from '@core/ui/components/buttons/IconButton/IconButton';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogContentText from '@mui/material/DialogContentText';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { assert } from 'tsafe/assert';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import CustomerListPage from '@dashboard/components/customers/CustomerListPage';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import DeleteFilterTabDialog from '@dashboard/components/dialogs/DeleteFilterTabDialog';
import type { SaveFilterTabDialogFormData } from '@dashboard/components/dialogs/SaveFilterTabDialog';
import SaveFilterTabDialog from '@dashboard/components/dialogs/SaveFilterTabDialog';
import { BulkRemoveCustomersDocument, ListCustomersDocument } from '@core/api/graphql';
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
} from '@dashboard/oldSrc/customers/CustomerList/filters';
import { getSortQueryVariables } from '@dashboard/oldSrc/customers/sort';
import { customerListUrl } from '@dashboard/oldSrc/customers/urls';
import type {
  CustomerListUrlDialog,
  CustomerListUrlQueryParams,
} from '@dashboard/oldSrc/customers/urls';
import { ListViews } from '@dashboard/oldSrc/types';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import useFilterHandlers from '@dashboard/oldSrc/utils/handlers/filterHandlers';
import useSortHandler from '@dashboard/oldSrc/utils/handlers/sortHandler';
import { getSortParams } from '@dashboard/oldSrc/utils/sort';

interface CustomerListProps {
  params: CustomerListUrlQueryParams;
}

export const CustomerList = () => {
  const router = useRouter();
  const params = router.query;
  const { ids = [] } = params;
  assert(Array.isArray(ids));
  const notify = useNotifier();
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(ids);
  const { updateListSettings, settings } = useListSettings(ListViews.CustomerList);

  usePaginationReset(customerListUrl, params, settings.rowNumber);

  const { t } = useTranslation();

  const paginationState = createPaginationState(settings.rowNumber, params);
  const queryVariables = useMemo(
    () => ({
      ...paginationState,
      filter: getFilterVariables(params),
      sort: getSortQueryVariables(params),
    }),
    [params, settings.rowNumber] // eslint-disable-line react-hooks/exhaustive-deps
  );
  const [{ data, fetching: loading }, refetch] = useQuery(ListCustomersDocument, {
    displayLoader: true,
    variables: queryVariables,
  });

  const tabs = getFilterTabs();

  const currentTab = getFiltersCurrentTab(params, tabs);

  const [changeFilters, resetFilters, handleSearchChange] = useFilterHandlers({
    cleanupFn: reset,
    createUrl: customerListUrl,
    getFilterQueryParam,
  });

  const [openModal, closeModal] = useDialogActionHandlers<
    CustomerListUrlDialog,
    CustomerListUrlQueryParams
  >(customerListUrl, params);

  const handleTabChange = (tab: number) => {
    reset();
    void router.push(
      customerListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1]?.data,
      })
    );
  };

  const handleTabDelete = () => {
    deleteFilterTab(currentTab);
    reset();
    void router.push('/customers');
  };

  const handleTabSave = (data: SaveFilterTabDialogFormData) => {
    saveFilterTab(data?.name, getActiveFilters(params));
    handleTabChange(tabs.length + 1);
  };

  const paginationValues = usePaginator({
    pageInfo: data?.customers?.pageInfo,
    paginationState,
    queryString: params,
  });

  const [bulkRemoveCustomers, bulkRemoveCustomersOpts] = useMutation(
    BulkRemoveCustomersDocument,
    {
      onCompleted: (data) => {
        if (data?.deleteCustomers?.errors?.length === 0) {
          notify(t('dashboard.savedChanges', 'Saved changes'), {
            type: 'success',
          });
          reset();
          refetch();
          closeModal();
        }
      },
    }
  );

  const handleSort = useSortHandler(customerListUrl, params);

  return (
    <PaginatorContext.Provider value={paginationValues}>
      <WindowTitle title={t('dashboard.customers', 'Customers')} />
      <CustomerListPage
        currentTab={currentTab}
        filterOpts={getFilterOpts(params)}
        initialSearch={params.query || ''}
        onSearchChange={handleSearchChange}
        onFilterChange={changeFilters}
        onAll={resetFilters}
        onTabChange={handleTabChange}
        onTabDelete={() => openModal('delete-search')}
        onTabSave={() => openModal('save-search')}
        tabs={tabs.map((tab) => tab.name)}
        customers={mapEdgesToItems(data?.customers)}
        settings={settings}
        disabled={loading}
        onUpdateListSettings={updateListSettings}
        onSort={handleSort}
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
        isChecked={isSelected}
        selected={listElements.length}
        selectedCustomerIds={listElements}
        sort={getSortParams(params)}
        toggle={toggle}
        toggleAll={toggleAll}
      />
      <ActionDialog
        open={params.action === 'remove' && ids?.length}
        onClose={closeModal}
        confirmButtonState={bulkRemoveCustomersOpts.status}
        onConfirm={() =>
          bulkRemoveCustomers({
            variables: {
              ids: ids,
            },
          })
        }
        variant="delete"
        title={t(
          'dashboard.8ep2I',
          'Delete Customers'
          // dialog header
        )}
      >
        <DialogContentText>
          <Trans
            id="N2SbNc"
            defaultMessage="{count,plural,one{Are you sure you want to delete this customer?} other{Are you sure you want to delete {displayQuantity} customers?}}"
            values={{
              count: ids.length,
              displayQuantity: <strong>{ids.length}</strong>,
            }}
          />
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
    </PaginatorContext.Provider>
  );
};
export default CustomerList;
