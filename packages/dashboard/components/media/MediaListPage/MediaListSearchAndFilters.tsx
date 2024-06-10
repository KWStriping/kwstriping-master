import { useTranslation } from '@core/i18n';
import FilterBar from '@dashboard/components/bars/FilterBar';
import DeleteFilterTabDialog from '@dashboard/components/dialogs/DeleteFilterTabDialog';
import type { SaveFilterTabDialogFormData } from '@dashboard/components/dialogs/SaveFilterTabDialog';
import SaveFilterTabDialog from '@dashboard/components/dialogs/SaveFilterTabDialog';
import { MediaType } from '@core/api/constants';
import useBulkActions from '@dashboard/hooks/useBulkActions';
import type { MediaListUrlQueryParams } from '@dashboard/oldSrc/media/urls';
import { mediaListUrl } from '@dashboard/oldSrc/media/urls';
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
import type { MediaListActionDialogOpts } from './MediaListPage';

interface MediaListSearchAndFiltersProps {
  params: MediaListUrlQueryParams;
  actionDialogOpts: MediaListActionDialogOpts;
}

const MediaListSearchAndFilters: FC<MediaListSearchAndFiltersProps> = ({
  params,
  actionDialogOpts,
}) => {
  const router = useRouter();
  const { t } = useTranslation();

  const { reset } = useBulkActions(params.ids);

  const filterOpts = getFilterOpts({
    params,
    mediaTypes: [MediaType.Image, MediaType.Video],
  });

  const [changeFilters, resetFilters, handleSearchChange] = useFilterHandlers({
    createUrl: mediaListUrl,
    getFilterQueryParam,
    cleanupFn: reset,
  });

  const filterStructure = useFilterStructure(filterOpts);

  const { open: openModal, close: closeModal } = actionDialogOpts;

  const handleTabChange = (tab: number) => {
    void router.push(
      mediaListUrl({
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
    void router.push('/media');
  };

  return (
    <>
      <FilterBar
        structure={filterStructure}
        initialSearch={''}
        onAll={resetFilters}
        onFilterChange={changeFilters}
        onSearchChange={handleSearchChange}
        searchPlaceholder={t('dashboard.searchPlaceholder', 'Search media')}
        allTabLabel={'All Media'}
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

export default MediaListSearchAndFilters;
