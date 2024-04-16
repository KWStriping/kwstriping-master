import { useTranslation } from '@core/i18n';
import IconButton from '@core/ui/components/buttons/IconButton/IconButton';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { assert } from 'tsafe/assert';
import AttributeBulkDeleteDialog from '@dashboard/components/attributes/AttributeBulkDeleteDialog';
import AttributeListPage from '@dashboard/components/attributes/AttributeListPage';
import DeleteFilterTabDialog from '@dashboard/components/dialogs/DeleteFilterTabDialog';
import SaveFilterTabDialog from '@dashboard/components/dialogs/SaveFilterTabDialog';
import type { SaveFilterTabDialogFormData } from '@dashboard/components/dialogs/SaveFilterTabDialog';
import { AttributeListDocument, AttributeBulkDeleteDocument } from '@core/api/graphql';
import useBulkActions from '@dashboard/hooks/useBulkActions';
import usePaginator, {
  createPaginationState,
  PaginatorContext,
} from '@dashboard/hooks/usePaginator';
import {
  deleteFilterTab,
  getActiveFilters,
  getFilterOpts,
  getFiltersCurrentTab,
  getFilterTabs,
  getFilterVariables,
  saveFilterTab,
  getFilterQueryParam,
} from '@dashboard/oldSrc/attributes/AttributeList/filters';
import { getSortQueryVariables } from '@dashboard/oldSrc/attributes/sort';
import type {
  AttributeListUrlDialog,
  AttributeListUrlQueryParams,
} from '@dashboard/oldSrc/attributes/urls';
import { attributeListUrl } from '@dashboard/oldSrc/attributes/urls';
import { PAGINATE_BY } from '@dashboard/oldSrc/config';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import useFilterHandlers from '@dashboard/oldSrc/utils/handlers/filterHandlers';
import useSortHandler from '@dashboard/oldSrc/utils/handlers/sortHandler';
import { getSortParams } from '@dashboard/oldSrc/utils/sort';

const AttributeList = () => {
  const router = useRouter();
  const params = router.query;
  const notify = useNotifier();
  const { ids } = params;
  assert(typeof ids !== 'string');
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(ids);
  const { t } = useTranslation();

  const paginationState = createPaginationState(PAGINATE_BY, params);
  const queryVariables = useMemo(
    () => ({
      ...paginationState,
      filter: getFilterVariables(params),
      sort: getSortQueryVariables(params),
    }),
    [params]
  );
  const [{ data, fetching: loading }, refetch] = useQuery(AttributeListDocument, {
    variables: queryVariables,
  });

  const [deleteAttributes, deleteAttributesOpts] = useMutation(AttributeBulkDeleteDocument, {
    onCompleted: (data) => {
      if (data?.deleteAttributes?.errors?.length === 0) {
        closeModal();
        notify(
          t(
            'dashboard.w9WIk',
            'Attributes successfully delete'
            // deleted multiple attributes
          ),
          {
            type: 'success',
          }
        );
        reset();
        refetch();
      }
    },
  });

  const tabs = getFilterTabs();

  const currentTab = getFiltersCurrentTab(params, tabs);

  const [openModal, closeModal] = useDialogActionHandlers<
    AttributeListUrlDialog,
    AttributeListUrlQueryParams
  >(attributeListUrl, params);

  const [changeFilters, resetFilters, handleSearchChange] = useFilterHandlers({
    cleanupFn: reset,
    createUrl: attributeListUrl,
    getFilterQueryParam,
  });

  const handleTabChange = (tab: number) => {
    reset();
    void router.push(
      attributeListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1]?.data,
      })
    );
  };

  const handleTabDelete = () => {
    deleteFilterTab(currentTab);
    reset();
    void router.push('/attributes');
  };

  const handleTabSave = (data: SaveFilterTabDialogFormData) => {
    saveFilterTab(data?.name, getActiveFilters(params));
    handleTabChange(tabs.length + 1);
  };

  const paginationValues = usePaginator({
    pageInfo: data?.attributes?.pageInfo,
    paginationState,
    queryString: params,
  });

  const handleSort = useSortHandler(attributeListUrl, params);

  return (
    <PaginatorContext.Provider value={paginationValues}>
      <AttributeListPage
        attributes={mapEdgesToItems(data?.attributes)}
        currentTab={currentTab}
        disabled={loading || deleteAttributesOpts.fetching}
        filterOpts={getFilterOpts(params)}
        initialSearch={params.query || ''}
        isChecked={isSelected}
        onAll={resetFilters}
        onFilterChange={changeFilters}
        onSearchChange={handleSearchChange}
        onSort={handleSort}
        onTabChange={handleTabChange}
        onTabDelete={() => openModal('delete-search')}
        onTabSave={() => openModal('save-search')}
        selected={listElements.length}
        sort={getSortParams(params)}
        tabs={tabs.map((tab) => tab.name)}
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
      {!!ids?.length && (
        <AttributeBulkDeleteDialog
          confirmButtonState={deleteAttributesOpts.status}
          open={params.action === 'remove'}
          onConfirm={() => deleteAttributes({ ids })}
          onClose={closeModal}
          quantity={ids.length}
        />
      )}
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

export default AttributeList;
