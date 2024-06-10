import { Trans, useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import IconButton from '@core/ui/components/buttons/IconButton/IconButton';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogContentText from '@mui/material/DialogContentText';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { assert } from 'tsafe/assert';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import MediaListPage from '@dashboard/components/media/MediaListPage';
import MediaTypePickerDialog from '@dashboard/components/media/MediaTypePickerDialog/MediaTypePickerDialog';
import { MediaType } from '@core/api/constants';
import {
  MediaBulkPublishDocument,
  MediaListDocument,
  MediaBulkRemoveDocument,
} from '@core/api/graphql';
import useBulkActions from '@dashboard/hooks/useBulkActions';
import useListSettings from '@dashboard/hooks/useListSettings';
import { usePaginationReset } from '@dashboard/hooks/usePaginationReset';
import usePaginator, {
  createPaginationState,
  PaginatorContext,
} from '@dashboard/hooks/usePaginator';
import { getFilterVariables, getSortQueryVariables } from '@dashboard/oldSrc/media/sort';
import type { MediaListUrlDialog, MediaListUrlQueryParams } from '@dashboard/oldSrc/media/urls';
import { createMediaUrl, mediaListUrl } from '@dashboard/oldSrc/media/urls';
import { ListViews } from '@dashboard/oldSrc/types';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import useSortHandler from '@dashboard/oldSrc/utils/handlers/sortHandler';
import { getSortParams } from '@dashboard/oldSrc/utils/sort';

interface MediaListProps {
  params: MediaListUrlQueryParams;
}

export const MediaList = () => {
  const router = useRouter();
  const params = router.query;
  const { ids = [] } = params;
  assert(Array.isArray(ids));
  const notify = useNotifier();
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(ids);
  const { updateListSettings, settings } = useListSettings(ListViews.PagesList);

  usePaginationReset(mediaListUrl, params, settings.rowNumber);

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
  const [{ data, fetching: loading }, refetch] = useQuery(MediaListDocument, {
    displayLoader: true,
    variables: queryVariables,
  });

  const paginationValues = usePaginator({
    pageInfo: data?.media?.pageInfo,
    paginationState,
    queryString: params,
  });

  const [openModal, closeModal] = useDialogActionHandlers<
    MediaListUrlDialog,
    MediaListUrlQueryParams
  >(mediaListUrl, params);

  const [bulkMediaRemove, bulkMediaRemoveOpts] = useMutation(MediaBulkRemoveDocument, {
    onCompleted: (data) => {
      if (data?.deleteMediaItems?.errors?.length === 0) {
        closeModal();
        notify(
          t(
            'dashboard.rR9vx',
            'Removed media'
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

  const [bulkPagePublish, bulkPagePublishOpts] = useMutation(MediaBulkPublishDocument, {
    onCompleted: (data) => {
      if (data?.publishMediaItems?.errors?.length === 0) {
        closeModal();
        notify(
          t(
            'dashboard.haN7J',
            'Published media'
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

  const handleSort = useSortHandler(mediaListUrl, params);

  return (
    <PaginatorContext.Provider value={paginationValues}>
      <MediaListPage
        disabled={loading}
        media={mapEdgesToItems(data?.media)}
        onUpdateListSettings={updateListSettings}
        onAdd={() => openModal('create-media')}
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
                {/* unpublish media, button */}

                {t('dashboard.CF7Fy', 'Unpublish')}
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
                {/* publish media, button */}

                {t('dashboard.0vxHg', 'Publish')}
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
            ids,
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
            i18nKey={'84cE9X'}
            count={ids.length}
            displayQuantity={<strong>{ids.length}</strong>}
          >
            {
              '{count,plural,one{Are you sure you want to publish this item?} other{Are you sure you want to publish {displayQuantity} media items?}}'
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
            ids,
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
          i18nKey={'9BFdH8'}
          count={ids.length}
          displayQuantity={<strong>{ids.length}</strong>}
        >
          {
            '{count,plural,one{Are you sure you want to unpublish this item?} other{Are you sure you want to unpublish {displayQuantity} media items?}}'
          }
        </Trans>
      </ActionDialog>
      <ActionDialog
        open={params.action === 'remove'}
        onClose={closeModal}
        confirmButtonState={bulkMediaRemoveOpts.status}
        onConfirm={() =>
          bulkMediaRemove({
            ids,
          })
        }
        variant="delete"
        title={t(
          'dashboard.lwl8A',
          'Delete media'
          // dialog header
        )}
      >
        <Trans
          t={t}
          i18nKey={'0w7IJu'}
          count={ids.length}
          displayQuantity={<strong>{ids.length}</strong>}
        >
          {
            '{count,plural,one{Are you sure you want to delete this item?} other{Are you sure you want to delete {displayQuantity} items?}}'
          }
        </Trans>
      </ActionDialog>
      <MediaTypePickerDialog
        confirmButtonState="success"
        open={params.action === 'create-media'}
        mediaTypes={[
          { label: MediaType.Image.toString(), value: MediaType.Image },
          { label: MediaType.Video.toString(), value: MediaType.Video },
        ]}
        onClose={closeModal}
        onConfirm={(mediaTypeId) =>
          void router.push(
            createMediaUrl({
              'media-type-id': mediaTypeId,
            })
          )
        }
      />
    </PaginatorContext.Provider>
  );
};

export default MediaList;
