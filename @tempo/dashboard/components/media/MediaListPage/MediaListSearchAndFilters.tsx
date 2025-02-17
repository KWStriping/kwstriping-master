import * as m from '@paraglide/messages';
import { MediaType } from '@tempo/api/generated/constants';
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
import type { MediaListActionDialogOpts } from './MediaListPage';
import FilterBar from '@tempo/dashboard/components/bars/FilterBar';
import DeleteFilterTabDialog from '@tempo/dashboard/components/dialogs/DeleteFilterTabDialog';
import type { SaveFilterTabDialogFormData } from '@tempo/dashboard/components/dialogs/SaveFilterTabDialog';
import SaveFilterTabDialog from '@tempo/dashboard/components/dialogs/SaveFilterTabDialog';
import useBulkActions from '@tempo/dashboard/hooks/useBulkActions';
import type { MediaListUrlQueryParams } from '@tempo/dashboard/oldSrc/media/urls';
import { mediaListUrl } from '@tempo/dashboard/oldSrc/media/urls';
import useFilterHandlers from '@tempo/dashboard/oldSrc/utils/handlers/filterHandlers';

interface MediaListSearchAndFiltersProps {
  params: MediaListUrlQueryParams;
  actionDialogOpts: MediaListActionDialogOpts;
}

const MediaListSearchAndFilters: FC<MediaListSearchAndFiltersProps> = ({
  params,
  actionDialogOpts,
}) => {
  const router = useRouter();

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
        searchPlaceholder={m.dashboard_searchPlaceholder() ?? 'Search media'}
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
