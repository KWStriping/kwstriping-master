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
import { assert } from 'tsafe';
import CollectionListPage from '@dashboard/components/collections/CollectionListPage';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import DeleteFilterTabDialog from '@dashboard/components/dialogs/DeleteFilterTabDialog';
import SaveFilterTabDialog from '@dashboard/components/dialogs/SaveFilterTabDialog';
import type { SaveFilterTabDialogFormData } from '@dashboard/components/dialogs/SaveFilterTabDialog';
import useAppChannel from '@dashboard/components/layout/Layout/AppChannelContext';
import {
  CollectionBulkDeleteDocument,
  CollectionListDocument,
} from '@core/api/graphql';
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
} from '@dashboard/oldSrc/collections/CollectionList/filters';
import {
  canBeSorted,
  DEFAULT_SORT_KEY,
  getSortQueryVariables,
} from '@dashboard/oldSrc/collections/sort';
import { collectionListUrl } from '@dashboard/oldSrc/collections/urls';
import type {
  CollectionListUrlDialog,
  CollectionListUrlQueryParams,
} from '@dashboard/oldSrc/collections/urls';
import { ListViews } from '@dashboard/oldSrc/types';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import useFilterHandlers from '@dashboard/oldSrc/utils/handlers/filterHandlers';
import useSortHandler from '@dashboard/oldSrc/utils/handlers/sortHandler';
import { mapNodeToChoice } from '@dashboard/oldSrc/utils/maps';
import { getSortParams } from '@dashboard/oldSrc/utils/sort';

interface CollectionListProps {
  params: CollectionListUrlQueryParams;
}

export const CollectionList = () => {
  const router = useRouter();
  const params = router.query;
  const { ids = [] } = params;
  assert(Array.isArray(ids));
  const { t } = useTranslation();
  const notify = useNotifier();
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(ids);
  const { updateListSettings, settings } = useListSettings(ListViews.CollectionList);

  usePaginationReset(collectionListUrl, params, settings.rowNumber);

  const [changeFilters, resetFilters, handleSearchChange] = useFilterHandlers({
    cleanupFn: reset,
    createUrl: collectionListUrl,
    getFilterQueryParam,
  });

  const { availableChannels } = useAppChannel(false);
  const channelOpts = availableChannels
    ? mapNodeToChoice(availableChannels, (channel) => channel.slug)
    : null;
  const selectedChannel = availableChannels.find((channel) => channel.slug === params.channel);

  const paginationState = createPaginationState(settings.rowNumber, params);
  const queryVariables = useMemo(
    () => ({
      ...paginationState,
      filter: getFilterVariables(params),
      sort: getSortQueryVariables(params),
      channel: selectedChannel?.slug,
    }),
    [params, settings.rowNumber] // eslint-disable-line react-hooks/exhaustive-deps
  );
  const [{ data, fetching: loading }, refetch] = useQuery(CollectionListDocument, {
    displayLoader: true,
    variables: queryVariables,
  });

  const [deleteCollections, deleteCollectionsOpts] = useMutation(CollectionBulkDeleteDocument, {
    onCompleted: (data) => {
      // TODO: make sure this modified check works
      if (data?.deleteCollections?.errors?.length === 0) {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
        refetch();
        reset();
        closeModal();
      }
    },
  });

  const filterOpts = getFilterOpts(params, channelOpts);
  const tabs = getFilterTabs();

  useEffect(() => {
    if (!canBeSorted(params.sort, !!selectedChannel)) {
      void router.push(
        collectionListUrl({
          ...params,
          sort: DEFAULT_SORT_KEY,
        })
      );
    }
  }, [params]);

  const currentTab = getFiltersCurrentTab(params, tabs);

  const [openModal, closeModal] = useDialogActionHandlers<
    CollectionListUrlDialog,
    CollectionListUrlQueryParams
  >(collectionListUrl, params);

  const handleTabChange = (tab: number) => {
    reset();
    void router.push(
      collectionListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1]?.data,
      })
    );
  };

  const handleTabDelete = () => {
    deleteFilterTab(currentTab);
    reset();
    void router.push('/collections');
  };

  const handleTabSave = (data: SaveFilterTabDialogFormData) => {
    saveFilterTab(data?.name, getActiveFilters(params));
    handleTabChange(tabs.length + 1);
  };

  const paginationValues = usePaginator({
    pageInfo: data?.collections?.pageInfo,
    paginationState,
    queryString: params,
  });

  const handleSort = useSortHandler(collectionListUrl, params);

  return (
    <PaginatorContext.Provider value={paginationValues}>
      <CollectionListPage
        currentTab={currentTab}
        initialSearch={params.query || ''}
        onSearchChange={handleSearchChange}
        onAll={resetFilters}
        onTabChange={handleTabChange}
        onTabDelete={() => openModal('delete-search')}
        onTabSave={() => openModal('save-search')}
        tabs={tabs.map((tab) => tab.name)}
        disabled={loading}
        collections={mapEdgesToItems(data?.collections)}
        settings={settings}
        onSort={handleSort}
        onUpdateListSettings={updateListSettings}
        sort={getSortParams(params)}
        toolbar={
          <IconButton
            color="secondary"
            data-test-id="delete-icon"
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
        toggle={toggle}
        toggleAll={toggleAll}
        selectedChannelId={selectedChannel?.id}
        filterOpts={filterOpts}
        onFilterChange={changeFilters}
      />
      <ActionDialog
        open={params.action === 'remove' && params.ids?.length}
        onClose={closeModal}
        confirmButtonState={deleteCollectionsOpts.status}
        onConfirm={() =>
          deleteCollections({
            variables: {
              ids: params.ids,
            },
          })
        }
        variant="delete"
        title={t(
          'dashboard.kw8k5',
          'Delete collections'
          // dialog title
        )}
      >
        <DialogContentText>
          <Trans
            id="yT5zvU"
            defaultMessage="{count,plural,one{Are you sure you want to delete this collection?} other{Are you sure you want to delete {displayQuantity} collections?}}"
            values={{
              count: params.ids.length,
              displayQuantity: <strong>{params.ids.length}</strong>,
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
export default CollectionList;
