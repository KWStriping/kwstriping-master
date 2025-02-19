import * as m from '@paraglide/messages';
import { mapEdgesToItems } from '@tempo/ui/utils/maps';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import {
  useFilterStructure,
  deleteFilterTab,
  getActiveFilters,
  getFilterOpts,
  getFilterQueryParam,
  getFiltersCurrentTab,
  getFilterTabs,
  saveFilterTab,
} from './filters';
import type { PageListActionDialogOpts } from './PageListPage';
import FilterBar from '@tempo/dashboard/components/bars/FilterBar';
import DeleteFilterTabDialog from '@tempo/dashboard/components/dialogs/DeleteFilterTabDialog';
import type { SaveFilterTabDialogFormData } from '@tempo/dashboard/components/dialogs/SaveFilterTabDialog';
import SaveFilterTabDialog from '@tempo/dashboard/components/dialogs/SaveFilterTabDialog';
import useBulkActions from '@tempo/dashboard/hooks/useBulkActions';
import { DEFAULT_INITIAL_SEARCH_DATA } from '@tempo/dashboard/oldSrc/config';
import type { PageListUrlQueryParams } from '@tempo/dashboard/oldSrc/pages/urls';
import { pageListUrl } from '@tempo/dashboard/oldSrc/pages/urls';
import usePageKlassSearch from '@tempo/dashboard/oldSrc/searches/usePageKlassSearch';
import useFilterHandlers from '@tempo/dashboard/oldSrc/utils/handlers/filterHandlers';

interface PageListSearchAndFiltersProps {
  params: PageListUrlQueryParams;
  actionDialogOpts: PageListActionDialogOpts;
}

const PageListSearchAndFilters: FC<PageListSearchAndFiltersProps> = ({
  params,
  actionDialogOpts,
}) => {
  const router = useRouter();

  const defaultSearchVariables = {
    variables: {
      ...DEFAULT_INITIAL_SEARCH_DATA,
      first: 5,
    },
  };

  const { reset } = useBulkActions(params.ids);

  const {
    loadMore: fetchMorePageKlasses,
    search: searchPageKlasses,
    result: searchPageKlassesResult,
  } = usePageKlassSearch(defaultSearchVariables);

  const filterOpts = getFilterOpts({
    params,
    pageKlasses: mapEdgesToItems(searchPageKlassesResult?.data?.search),
    pageKlassesProps: {
      ...getSearchFetchMoreProps(searchPageKlassesResult, fetchMorePageKlasses),
      onSearchChange: searchPageKlasses,
    },
  });

  const [changeFilters, resetFilters, handleSearchChange] = useFilterHandlers({
    createUrl: pageListUrl,
    getFilterQueryParam,
    cleanupFn: reset,
  });

  const filterStructure = useFilterStructure(filterOpts);

  const { open: openModal, close: closeModal } = actionDialogOpts;

  const handleTabChange = (tab: number) => {
    void router.push(
      pageListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1]?.data,
      })
    );
  };

  const tabs = getFilterTabs();
  const currentTab = getFiltersCurrentTab(params, tabs);

  const handleTabSave = (data: SaveFilterTabDialogFormData) => {
    saveFilterTab(data?.name, getActiveFilters(params));
    handleTabChange(tabs.length + 1);
  };

  const handleTabDelete = () => {
    deleteFilterTab(currentTab);
    reset();
    void router.push('/pages');
  };

  return (
    <>
      <FilterBar
        structure={filterStructure}
        initialSearch={''}
        onAll={resetFilters}
        onFilterChange={changeFilters}
        onSearchChange={handleSearchChange}
        searchPlaceholder={m.dashboard_searchPlaceholder() ?? 'Search Pages'}
        allTabLabel={'All Pages'}
        tabs={tabs.map(({ name }) => name)}
        currentTab={currentTab}
        onTabDelete={handleTabDelete}
        onTabChange={handleTabChange}
        onTabSave={() => openModal('save-search')}
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
    </>
  );
};

export default PageListSearchAndFilters;
