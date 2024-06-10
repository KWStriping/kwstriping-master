import { useTranslation } from '@core/i18n';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import FilterBar from '@dashboard/components/bars/FilterBar';
import DeleteFilterTabDialog from '@dashboard/components/dialogs/DeleteFilterTabDialog';
import type { SaveFilterTabDialogFormData } from '@dashboard/components/dialogs/SaveFilterTabDialog';
import SaveFilterTabDialog from '@dashboard/components/dialogs/SaveFilterTabDialog';
import useBulkActions from '@dashboard/hooks/useBulkActions';
import { DEFAULT_INITIAL_SEARCH_DATA } from '@dashboard/oldSrc/config';
import type { PageListUrlQueryParams } from '@dashboard/oldSrc/pages/urls';
import { pageListUrl } from '@dashboard/oldSrc/pages/urls';
import usePageKlassSearch from '@dashboard/oldSrc/searches/usePageKlassSearch';
import useFilterHandlers from '@dashboard/oldSrc/utils/handlers/filterHandlers';
import { useRouter } from 'next/router';
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

interface PageListSearchAndFiltersProps {
  params: PageListUrlQueryParams;
  actionDialogOpts: PageListActionDialogOpts;
}

const PageListSearchAndFilters: FC<PageListSearchAndFiltersProps> = ({
  params,
  actionDialogOpts,
}) => {
  const router = useRouter();
  const { t } = useTranslation();

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
        searchPlaceholder={t('dashboard.searchPlaceholder', 'Search Pages')}
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
