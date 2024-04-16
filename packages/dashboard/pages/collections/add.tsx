import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { getMutationErrors } from '@core/urql/utils';
import { useRouter } from 'next/router';
import CollectionCreatePage from '@dashboard/components/collections/CollectionCreatePage';
import type { CollectionCreateData } from '@dashboard/components/collections/CollectionCreatePage/form';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import ChannelsAvailabilityDialog from '@dashboard/components/dialogs/ChannelsAvailabilityDialog';
import useAppChannel from '@dashboard/components/layout/Layout/AppChannelContext';
import {
  CollectionChannelListingUpdateDocument,
  CreateCollectionDocument,
  UpdateMetadataDocument,
  UpdatePrivateMetadataDocument,
} from '@core/api/graphql';
import useChannels from '@dashboard/hooks/useChannels';
import type { ChannelsAction } from '@dashboard/oldSrc/channels/urls';
import { createCollectionChannels } from '@dashboard/oldSrc/channels/utils';
import { COLLECTION_CREATE_FORM_ID } from '@dashboard/oldSrc/collections/consts';
import type { CollectionCreateUrlQueryParams } from '@dashboard/oldSrc/collections/urls';
import { collectionAddUrl, collectionUrl } from '@dashboard/oldSrc/collections/urls';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import createMetadataCreateHandler from '@dashboard/oldSrc/utils/handlers/metadataCreateHandler';
import { getParsedDataForJsonStringField } from '@dashboard/oldSrc/utils/richText/misc';

interface CollectionCreateProps {
  params: CollectionCreateUrlQueryParams;
}

export const CollectionCreate = () => {
  const router = useRouter();
  const params = router.query;
  const notify = useNotifier();
  const { t } = useTranslation();
  const [updateMetadata] = useMutation(UpdateMetadataDocument, {});
  const [updatePrivateMetadata] = useMutation(UpdatePrivateMetadataDocument, {});

  const [openModal, closeModal] = useDialogActionHandlers<
    ChannelsAction,
    CollectionCreateUrlQueryParams
  >((params) => collectionAddUrl(params), params);

  const [updateChannels, updateChannelsOpts] = useMutation(
    CollectionChannelListingUpdateDocument,
    {}
  );
  const { availableChannels } = useAppChannel(false);

  const allChannels = createCollectionChannels(availableChannels)?.sort((channel, nextChannel) =>
    channel.name.localeCompare(nextChannel.name)
  );

  const {
    channelListElements,
    channelsToggle,
    currentChannels,
    handleChannelsConfirm,
    handleChannelsModalClose,
    handleChannelsModalOpen,
    isChannelSelected,
    isChannelsModalOpen,
    setCurrentChannels,
    toggleAllChannels,
  } = useChannels(
    allChannels,
    params?.action,
    { closeModal, openModal },
    { formId: COLLECTION_CREATE_FORM_ID }
  );

  const [createCollection, createCollectionOpts] = useMutation(CreateCollectionDocument, {
    onCompleted: (data) => {
      if (data?.createCollection?.errors?.length === 0) {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
        void router.push(collectionUrl(data?.createCollection?.collection?.id));
        if (backgroundImageError) {
          notify(t('dashboard.somethingWentWrong', 'Tempo ran into an unexpected problem'), {
            type: 'error',
          });
        }
      }
    },
  });

  const handleCreate = async (formData: CollectionCreateData) => {
    const result = await createCollection({
      input: {
        backgroundImage: formData.backgroundImage.value,
        backgroundImageAlt: formData.backgroundImageAlt,
        description: getParsedDataForJsonStringField(formData.description),
        name: formData.name,
        seo: {
          description: formData.seoDescription,
          title: formData.seoTitle,
        },
      },
    });

    const id = result.data?.createCollection.collection?.id || null;
    if (id) {
      updateChannels({
        id,
        input: {
          addChannels: formData.channelListings.map((channel) => ({
            channelId: channel.id,
            isPublished: channel.isPublished,
            publishedAt: channel.publishedAt,
          })),
          removeChannels: [],
        },
      });
    }

    return { id, errors: getMutationErrors(result) };
  };

  const handleSubmit = createMetadataCreateHandler(
    handleCreate,
    updateMetadata,
    updatePrivateMetadata
  );

  return (
    <>
      <WindowTitle
        title={t(
          'dashboard.tMauu',
          'Create collection'
          // window title
        )}
      />
      {!!allChannels?.length && (
        <ChannelsAvailabilityDialog
          isSelected={isChannelSelected}
          disabled={!channelListElements.length}
          channels={allChannels}
          onChange={channelsToggle}
          onClose={handleChannelsModalClose}
          open={isChannelsModalOpen}
          title={t('dashboard.1Mz7h', 'Manage Collection Channel Availability')}
          confirmButtonState="default"
          selected={channelListElements.length}
          onConfirm={handleChannelsConfirm}
          toggleAll={toggleAllChannels}
        />
      )}
      <CollectionCreatePage
        errors={createCollectionOpts.data?.createCollection?.errors || []}
        channelsErrors={updateChannelsOpts?.data?.updateCollectionChannelListing?.errors || []}
        currentChannels={currentChannels}
        channelsCount={availableChannels.length}
        openChannelsModal={handleChannelsModalOpen}
        onChannelsChange={setCurrentChannels}
        disabled={createCollectionOpts.fetching || updateChannelsOpts.fetching}
        onSubmit={handleSubmit}
        saveButtonBarState={createCollectionOpts.status}
      />
    </>
  );
};
export default CollectionCreate;
