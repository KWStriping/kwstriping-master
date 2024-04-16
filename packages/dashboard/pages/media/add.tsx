import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { getMutationErrors } from '@core/urql/utils';
import { useRouter } from 'next/router';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import MediaItemDetailsPage from '@dashboard/components/media/MediaItemDetailsPage';
import type { MediaSubmitData } from '@dashboard/components/media/MediaItemDetailsPage/form';
import { MediaType } from '@core/api/constants';
import {
  FileUploadDocument,
  MediaCreateDocument,
  UpdateMetadataDocument,
  UpdatePrivateMetadataDocument,
} from '@core/api/graphql';
import type { MediaErrorFragment } from '@core/api/graphql';
import { createMediaUrl, mediaUrl } from '@dashboard/oldSrc/media/urls';
import type { MediaCreateUrlQueryParams } from '@dashboard/oldSrc/media/urls';
import createMetadataCreateHandler from '@dashboard/oldSrc/utils/handlers/metadataCreateHandler';
import { getParsedDataForJsonStringField } from '@dashboard/oldSrc/utils/richText/misc';

export interface MediaCreateProps {
  id: string;
  params: MediaCreateUrlQueryParams;
}

export const MediaCreate = () => {
  const router = useRouter();
  const params = router.query;
  const notify = useNotifier();
  const { t } = useTranslation();

  const [updateMetadata] = useMutation(UpdateMetadataDocument, {});
  const [updatePrivateMetadata] = useMutation(UpdatePrivateMetadataDocument, {});

  const handleSelectMediaTypeId = (mediaTypeId: string) =>
    void router.push(
      createMediaUrl({
        ...params,
        'media-type-id': mediaTypeId,
      })
    );

  const [createMedia, createMediaOpts] = useMutation(MediaCreateDocument, {
    onCompleted: (data) => {
      if (data?.createMedia?.errors?.length === 0) {
        notify(t('dashboard.ngZ7a', 'Successfully added new media'), {
          type: 'success',
        });
        void router.push(mediaUrl(data?.createMedia?.media?.id));
      }
    },
  });

  const [uploadFile, uploadFileOpts] = useMutation(FileUploadDocument);

  const handleCreate = async (formData: MediaSubmitData) => {
    const result = await createMedia({
      input: {
        ...formData,
        description: getParsedDataForJsonStringField(formData.description),
      },
    });
    return {
      id: result.data?.createMedia?.media?.id || null,
      errors: getMutationErrors(result),
    };
  };

  const handleSubmit = createMetadataCreateHandler(
    handleCreate,
    updateMetadata,
    updatePrivateMetadata
  );

  const errors = getMutationErrors(createMediaOpts) as MediaErrorFragment[];

  const selectedMediaType = params['media-type-id'] as MediaType;
  if (!Object.values(MediaType).includes(selectedMediaType)) {
    console.error('Invalid media type: ', selectedMediaType);
    handleSelectMediaTypeId(MediaType.Image);
  }

  return (
    <>
      <WindowTitle
        title={
          selectedMediaType === MediaType.Image
            ? t(
                'dashboard.ig/5o',
                'Add Image'
                // header
              )
            : selectedMediaType === MediaType.Video
            ? t(
                'dashboard.X02cD',
                'Add Video'
                // header
              )
            : t(
                'dashboard.8DMiY',
                'Add Media'
                // header
              )
        }
      />
      <MediaItemDetailsPage
        item={null}
        loading={createMediaOpts.fetching || uploadFileOpts.fetching}
        errors={errors}
        saveButtonBarState={createMediaOpts.status}
        mediaTypes={[MediaType.Image, MediaType.Video]}
        onRemove={() => undefined}
        onSubmit={handleSubmit}
        onCloseDialog={() => router.push('/media/add')}
        selectedMediaType={selectedMediaType}
        onSelectMediaType={handleSelectMediaTypeId}
      />
    </>
  );
};
export default MediaCreate;
