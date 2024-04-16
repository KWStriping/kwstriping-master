import { Trans, useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
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
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import PageListPage from '@dashboard/components/pages/PageListPage';
import PageKlassPickerDialog from '@dashboard/components/pages/PageKlassPickerDialog';
import {
  PageBulkPublishDocument,
  PageBulkRemoveDocument,
  PageListDocument,
} from '@core/api/graphql';

import useBulkActions from '@dashboard/hooks/useBulkActions';
import useListSettings from '@dashboard/hooks/useListSettings';
import { usePaginationReset } from '@dashboard/hooks/usePaginationReset';
import usePaginator, {
  createPaginationState,
  PaginatorContext,
} from '@dashboard/hooks/usePaginator';
import { DEFAULT_INITIAL_SEARCH_DATA } from '@dashboard/oldSrc/config';
import { getFilterVariables, getSortQueryVariables } from '@dashboard/oldSrc/pages/sort';
import type { PageListUrlDialog, PageListUrlQueryParams } from '@dashboard/oldSrc/pages/urls';
import { createPageUrl, pageListUrl } from '@dashboard/oldSrc/pages/urls';
import usePageKlassSearch from '@dashboard/oldSrc/searches/usePageKlassSearch';
import { ListViews } from '@dashboard/oldSrc/types';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import useSortHandler from '@dashboard/oldSrc/utils/handlers/sortHandler';
import { mapNodeToChoice } from '@dashboard/oldSrc/utils/maps';
import { getSortParams } from '@dashboard/oldSrc/utils/sort';

interface PageListProps {
  params: PageListUrlQueryParams;
}

export const PageList = () => {
  const router = useRouter();
  const params = router.query;
  const notify = useNotifier();
  const { ids = [] } = params;
  assert(Array.isArray(ids));
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(ids);
  const { updateListSettings, settings } = useListSettings(ListViews.PagesList);

  usePaginationReset(pageListUrl, params, settings.rowNumber);

  const { t } = useTranslation();

  const paginationState = createPaginationState(settings.rowNumber, params);
  const queryVariables = useMemo(
    () => ({
      ...paginationState,
      filter: getFilterVariables(params),
      sort: getSortQueryVariables(params),
    }),
    [params, settings.rowNumber]
  );
  const [{ data, fetching: loading }, refetch] = useQuery(PageListDocument, {
    displayLoader: true,
    variables: queryVariables,
  });

  const paginationValues = usePaginator({
    pageInfo: data?.pages?.pageInfo,
    paginationState,
    queryString: params,
  });

  const [openModal, closeModal] = useDialogActionHandlers<
    PageListUrlDialog,
    PageListUrlQueryParams
  >(pageListUrl, params);

  const [bulkPageRemove, bulkPageRemoveOpts] = useMutation(PageBulkRemoveDocument, {
    onCompleted: (data) => {
      if (data?.deletePages?.errors?.length === 0) {
        closeModal();
        notify(
          t(
            'dashboard.1z2Qi',
            'Removed pages'
            // notification
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

  const [bulkPagePublish, bulkPagePublishOpts] = useMutation(PageBulkPublishDocument, {
    onCompleted: (data) => {
      if (data?.publishPages?.errors?.length === 0) {
        closeModal();
        notify(
          t(
            'dashboard.zshS2',
            'Published pages'
            // notification
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

  const handleSort = useSortHandler(pageListUrl, params);

  const {
    loadMore: loadMoreDialogPageKlasses,
    search: searchDialogPageKlasses,
    result: searchDialogPageKlassesOpts,
  } = usePageKlassSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA,
  });

  const fetchMoreDialogPageKlasses = {
    hasMore: searchDialogPageKlassesOpts.data?.search?.pageInfo?.hasNextPage,
    loading: searchDialogPageKlassesOpts.fetching,
    onFetchMore: loadMoreDialogPageKlasses,
  };

  return (
    <PaginatorContext.Provider value={paginationValues}>
      <PageListPage
        disabled={loading}
        settings={settings}
        pages={mapEdgesToItems(data?.pages)}
        onUpdateListSettings={updateListSettings}
        onAdd={() => openModal('create-page')}
        onSort={handleSort}
        actionDialogOpts={{
          open: openModal,
          close: closeModal,
        }}
        params={params}
        toolbar={
          <>
            <Button
              onClick={() =>
                openModal('unpublish', {
                  ids: listElements,
                })
              }
            >
              <>
                {/* unpublish page, button */}

                {t('dashboard.8gsds', 'Unpublish')}
              </>
            </Button>
            <Button
              onClick={() =>
                openModal('publish', {
                  ids: listElements,
                })
              }
            >
              <>
                {/* publish page, button */}

                {t('dashboard.EmwxD', 'Publish')}
              </>
            </Button>
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
          </>
        }
        isChecked={isSelected}
        selected={listElements.length}
        sort={getSortParams(params)}
        toggle={toggle}
        toggleAll={toggleAll}
      />
      <ActionDialog
        open={params.action === 'publish'}
        onClose={closeModal}
        confirmButtonState={bulkPagePublishOpts.status}
        onConfirm={() =>
          bulkPagePublish({
            ids: params.ids,
            isPublished: true,
          })
        }
        title={t(
          'dashboard.yvzh9',
          'Publish Pages'
          // dialog header
        )}
      >
        <DialogContentText>
          <Trans
            t={t}
            i18nKey={'WRPQMM'}
            count={ids.length}
            displayQuantity={<strong>{ids.length}</strong>}
          >
            {
              '{count,plural,one{Are you sure you want to publish this page?} other{Are you sure you want to publish {displayQuantity} pages?}}'
            }
          </Trans>
        </DialogContentText>
      </ActionDialog>
      <ActionDialog
        open={params.action === 'unpublish'}
        onClose={closeModal}
        confirmButtonState={bulkPagePublishOpts.status}
        onConfirm={() =>
          bulkPagePublish({
            ids: params.ids,
            isPublished: false,
          })
        }
        title={t(
          'dashboard.HQQMQ',
          'Unpublish Pages'
          // dialog header
        )}
      >
        <Trans
          t={t}
          i18nKey={'Wd8vG7'}
          count={ids.length}
          displayQuantity={<strong>{ids.length}</strong>}
        >
          {
            '{count,plural,one{Are you sure you want to unpublish this page?} other{Are you sure you want to unpublish {displayQuantity} pages?}}'
          }
        </Trans>
      </ActionDialog>
      <ActionDialog
        open={params.action === 'remove'}
        onClose={closeModal}
        confirmButtonState={bulkPageRemoveOpts.status}
        onConfirm={() =>
          bulkPageRemove({
            ids: params.ids,
          })
        }
        variant="delete"
        title={t(
          'dashboard.Sz1/t',
          'Delete Pages'
          // dialog header
        )}
      >
        <Trans
          t={t}
          i18nKey={'UNwG+4'}
          count={ids.length}
          displayQuantity={<strong>{ids.length}</strong>}
        >
          {
            '{count,plural,one{Are you sure you want to delete this page?} other{Are you sure you want to delete {displayQuantity} pages?}}'
          }
        </Trans>
      </ActionDialog>
      <PageKlassPickerDialog
        confirmButtonState="success"
        open={params.action === 'create-page'}
        pageKlasses={mapNodeToChoice(mapEdgesToItems(searchDialogPageKlassesOpts?.data?.search))}
        fetchPageKlasses={searchDialogPageKlasses}
        fetchMorePageKlasses={fetchMoreDialogPageKlasses}
        onClose={closeModal}
        onConfirm={(pageKlassId) =>
          void router.push(
            createPageUrl({
              'page-type-id': pageKlassId,
            })
          )
        }
      />
    </PaginatorContext.Provider>
  );
};

export default PageList;
