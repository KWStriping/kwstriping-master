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
import DeleteFilterTabDialog from '@dashboard/components/dialogs/DeleteFilterTabDialog';
import SaveFilterTabDialog from '@dashboard/components/dialogs/SaveFilterTabDialog';
import type { SaveFilterTabDialogFormData } from '@dashboard/components/dialogs/SaveFilterTabDialog';
import TypeDeleteWarningDialog from '@dashboard/components/dialogs/TypeDeleteWarningDialog';
import PageKlassListPage from '@dashboard/components/pageKlasses/PageKlassListPage';
import { PageKlassBulkDeleteDocument, PageKlassListDocument } from '@core/api/graphql';
import useBulkActions from '@dashboard/hooks/useBulkActions';
import useListSettings from '@dashboard/hooks/useListSettings';
import { usePaginationReset } from '@dashboard/hooks/usePaginationReset';
import usePaginator, {
  createPaginationState,
  PaginatorContext,
} from '@dashboard/hooks/usePaginator';
import { getStringOrPlaceholder } from '@dashboard/oldSrc/misc';
import usePageKlassDelete from '@dashboard/oldSrc/pageKlasses/hooks/usePageKlassDelete';
import {
  deleteFilterTab,
  getActiveFilters,
  getFiltersCurrentTab,
  getFilterTabs,
  getFilterVariables,
  saveFilterTab,
} from '@dashboard/oldSrc/pageKlasses/PageKlassList/filters';
import { getSortQueryVariables } from '@dashboard/oldSrc/pageKlasses/sort';
import type {
  PageKlassListUrlDialog,
  PageKlassListUrlFilters,
  PageKlassListUrlQueryParams,
} from '@dashboard/oldSrc/pageKlasses/urls';
import { pageKlassListUrl } from '@dashboard/oldSrc/pageKlasses/urls';
import { ListViews } from '@dashboard/oldSrc/types';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import useSortHandler from '@dashboard/oldSrc/utils/handlers/sortHandler';
import { getSortParams } from '@dashboard/oldSrc/utils/sort';

interface PageKlassListProps {
  params: PageKlassListUrlQueryParams;
}

export const PageKlassList = () => {
  const router = useRouter();
  const params = router.query;
  const { ids = [] } = params;
  assert(Array.isArray(ids));
  const notify = useNotifier();
  const {
    isSelected,
    listElements: selectedPageKlasses,
    reset,
    toggle,
    toggleAll,
  } = useBulkActions(ids);
  const { t } = useTranslation();
  const { settings } = useListSettings(ListViews.PagesList);

  usePaginationReset(pageKlassesListUrl, params, settings.rowNumber);

  const paginationState = createPaginationState(settings.rowNumber, params);
  const queryVariables = useMemo(
    () => ({
      ...paginationState,
      filter: getFilterVariables(params),
      sort: getSortQueryVariables(params),
    }),
    [params, settings.rowNumber]
  );
  const [{ data, fetching: loading }, refetch] = useQuery(PageKlassListDocument, {
    displayLoader: true,
    variables: queryVariables,
  });

  const tabs = getFilterTabs();

  const currentTab = getFiltersCurrentTab(params, tabs);

  const changeFilterField = (filter: PageKlassListUrlFilters) => {
    reset();
    void router.push(
      pageKlassesListUrl({
        ...getActiveFilters(params),
        ...filter,
        activeTab: undefined,
      })
    );
  };

  const [openModal, closeModal] = useDialogActionHandlers<
    PageKlassListUrlDialog,
    PageKlassListUrlQueryParams
  >(pageKlassesListUrl, params);

  const handleTabChange = (tab: number) => {
    reset();
    void router.push(
      pageKlassesListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1]?.data,
      })
    );
  };

  const handleTabDelete = () => {
    deleteFilterTab(currentTab);
    reset();
    void router.push('/page-types');
  };

  const handleTabSave = (data: SaveFilterTabDialogFormData) => {
    saveFilterTab(data?.name, getActiveFilters(params));
    handleTabChange(tabs.length + 1);
  };

  const paginationValues = usePaginator({
    pageInfo: data?.pageKlasses?.pageInfo,
    paginationState,
    queryString: params,
  });

  const handleSort = useSortHandler(pageKlassesListUrl, params);

  const [deletePageKlasses, deletePageKlassesOpts] = useMutation(PageKlassBulkDeleteDocument, {
    onCompleted: (data) => {
      if (data?.deletePageKlasses?.errors?.length === 0) {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
        reset();
        refetch();
        void router.push(
          pageKlassesListUrl({
            ...params,
            action: undefined,
            ids: undefined,
          })
        );
      }
    },
  });

  const hanldePageKlassBulkDelete = () => deletePageKlasses({ ids });

  const deletePageKlassData = usePageKlassDelete({
    selectedTypes: selectedPageKlasses,
    params,
  });

  const pageKlassesData = mapEdgesToItems(data?.pageKlasses);

  return (
    <PaginatorContext.Provider value={paginationValues}>
      <PageKlassListPage
        currentTab={currentTab}
        initialSearch={params.query || ''}
        onSearchChange={(query) => changeFilterField({ query })}
        onAll={() => router.push('/page-types')}
        onTabChange={handleTabChange}
        onTabDelete={() => openModal('delete-search')}
        onTabSave={() => openModal('save-search')}
        tabs={tabs.map((tab) => tab.name)}
        disabled={loading}
        pageKlasses={pageKlassesData}
        onSort={handleSort}
        isChecked={isSelected}
        selected={selectedPageKlasses.length}
        sort={getSortParams(params)}
        toggle={toggle}
        toggleAll={toggleAll}
        toolbar={
          <IconButton
            color="secondary"
            onClick={() =>
              openModal('remove', {
                ids: selectedPageKlasses,
              })
            }
          >
            <DeleteIcon />
          </IconButton>
        }
      />
      {pageKlassesData && (
        <TypeDeleteWarningDialog
          {...deletePageKlassData}
          typesData={pageKlassesData}
          typesToDelete={selectedPageKlasses}
          onClose={closeModal}
          onDelete={hanldePageKlassBulkDelete}
          deleteButtonState={deletePageKlassesOpts.status}
          showViewAssignedItemsButton={false}
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
        tabName={getStringOrPlaceholder(tabs[currentTab - 1]?.name)}
      />
    </PaginatorContext.Provider>
  );
};
export default PageKlassList;
