import { Trans, useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import DialogContentText from '@mui/material/DialogContentText';
import { useRouter } from 'next/router';
import { assert } from 'tsafe';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import MediaItemDetailsPage from '@dashboard/components/media/MediaItemDetailsPage';
import type {
  MediaData,
  MediaSubmitData,
} from '@dashboard/components/media/MediaItemDetailsPage/form';
import {
  MediaItemDetailsDocument,
  FileUploadDocument,
  UpdateMetadataDocument,
  UpdatePrivateMetadataDocument,
  MediaUpdateDocument,
  MediaRemoveDocument,
} from '@core/api/graphql';
import type {
  MediaItemDetailsFragment,
  MediaErrorFragment,
  MediaInput,
  UploadErrorFragment,
} from '@core/api/graphql';
import type { MediaUrlQueryParams } from '@dashboard/oldSrc/media/urls';
import { getStringOrPlaceholder } from '@dashboard/oldSrc/misc';
import createMetadataUpdateHandler from '@dashboard/oldSrc/utils/handlers/metadataUpdateHandler';
import { getParsedDataForJsonStringField } from '@dashboard/oldSrc/utils/richText/misc';

export interface MediaItemDetailsProps {
  id: string;
  params: MediaUrlQueryParams;
}

const createMediaInput = (data: MediaData, _item: MediaItemDetailsFragment): MediaInput => ({
  description: getParsedDataForJsonStringField(data?.description),
  isPublished: data?.isPublished,
  publishedAt: data?.publishedAt,
  alt: data?.alt,
  title: data?.title,
  type: data?.type,
  externalUrl: data?.externalUrl,
  ...(data?.file
    ? data?.file instanceof File
      ? { file: data?.file }
      : { fileUrl: data?.file?.url }
    : {}),
});

export const MediaItemDetails = () => {
  const router = useRouter();
  const { id, ...params } = router.query;
  assert(typeof id === 'string');
  const notify = useNotifier();
  const { t } = useTranslation();
  const [updateMetadata] = useMutation(UpdateMetadataDocument, {});
  const [updatePrivateMetadata] = useMutation(UpdatePrivateMetadataDocument, {});

  const [mediaItemDetails] = useQuery(MediaItemDetailsDocument, { variables: { id } });

  const [updateMedia, updateMediaOpts] = useMutation(MediaUpdateDocument, {});

  const [mediaRemove, mediaRemoveOpts] = useMutation(MediaRemoveDocument, {
    onCompleted: (data) => {
      if (data?.deleteMedia?.errors?.length === 0) {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
        void router.push('/media');
      }
    },
  });

  const [uploadFile, uploadFileOpts] = useMutation(FileUploadDocument);

  const handleUpdate = async (data: MediaSubmitData) => {
    let errors: Array<UploadErrorFragment | MediaErrorFragment> = [];
    const input = createMediaInput(data, mediaItemDetails?.data?.mediaItem);
    const updateResult = await updateMedia({
      id,
      input,
    });

    errors = [...errors, ...(updateResult.data?.updateMedia?.errors ?? [])];

    return errors;
  };

  const handleSubmit = createMetadataUpdateHandler(
    mediaItemDetails?.data?.mediaItem,
    handleUpdate,
    (variables) => updateMetadata({ ...variables }),
    (variables) => updatePrivateMetadata({ ...variables })
  );

  return (
    <>
      <WindowTitle title={mediaItemDetails?.data?.mediaItem?.title} />
      <MediaItemDetailsPage
        loading={mediaItemDetails.fetching || updateMediaOpts.fetching || uploadFileOpts.fetching}
        errors={updateMediaOpts.data?.updateMedia?.errors || []}
        saveButtonBarState={updateMediaOpts.status}
        item={mediaItemDetails.data?.mediaItem}
        onRemove={() =>
          void router.push({ pathname: '/media/[id]', query: { action: 'remove' } })
        }
        uploadFile={uploadFile}
        onSubmit={handleSubmit}
        onCloseDialog={() => router.push({ pathname: '/media/[id]', query: { id } })}
      />
      <ActionDialog
        open={params.action === 'remove'}
        confirmButtonState={mediaRemoveOpts.status}
        title={t('dashboard.1luwg', 'Delete Page')}
        onClose={() => router.push({ pathname: '/media/[id]', query: { id } })}
        onConfirm={() => mediaRemove({ id })}
        variant="delete"
      >
        <DialogContentText>
          <Trans
            t={t}
            i18nKey={'4B32Ba'}
            title={
              <strong>${getStringOrPlaceholder(mediaItemDetails.data?.mediaItem?.title)}</strong>
            }
          >
            {'Are you sure you want to delete {{ title }}?'}
          </Trans>
        </DialogContentText>
      </ActionDialog>
    </>
  );
};
export default MediaItemDetails;
