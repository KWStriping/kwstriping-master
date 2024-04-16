import { Trans, useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { getMutationErrors, getMutationState } from '@core/urql/utils';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import DialogContentText from '@mui/material/DialogContentText';
import { useRouter } from 'next/router';
import CollectionDetailsPage from '@dashboard/components/collections/CollectionDetailsPage';
import type { CollectionUpdateData } from '@dashboard/components/collections/CollectionDetailsPage/form';
import NotFoundPage from '@dashboard/components/core/NotFoundPage';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import AssignProductDialog from '@dashboard/components/dialogs/AssignProductDialog';
import ChannelsAvailabilityDialog from '@dashboard/components/dialogs/ChannelsAvailabilityDialog';
import useAppChannel from '@dashboard/components/layout/Layout/AppChannelContext';
import type { CollectionInput, CollectionUpdateMutation } from '@core/api/graphql';
import {
  CollectionChannelListingUpdateDocument,
  UpdateMetadataDocument,
  UpdatePrivateMetadataDocument,
  CollectionAssignProductDocument,
  CollectionUpdateDocument,
  UnassignCollectionProductDocument,
  RemoveCollectionDocument,
  CollectionDetailsDocument,
} from '@core/api/graphql';
import useBulkActions from '@dashboard/hooks/useBulkActions';
import useChannels from '@dashboard/hooks/useChannels';
import useLocalPaginator, { useLocalPaginationState } from '@dashboard/hooks/useLocalPaginator';
import useLocalStorage from '@dashboard/hooks/useLocalStorage';
import { PaginatorContext } from '@dashboard/hooks/usePaginator';
import {
  createCollectionChannels,
  createCollectionChannelsData,
} from '@dashboard/oldSrc/channels/utils';
import { COLLECTION_DETAILS_FORM_ID } from '@dashboard/oldSrc/collections/consts';
import type {
  CollectionUrlDialog,
  CollectionUrlQueryParams,
} from '@dashboard/oldSrc/collections/urls';
import { collectionUrl } from '@dashboard/oldSrc/collections/urls';
import { getAssignedProductIdsToCollection } from '@dashboard/oldSrc/collections/utils';
import { DEFAULT_INITIAL_SEARCH_DATA, PAGINATE_BY } from '@dashboard/oldSrc/config';
import useProductSearch from '@dashboard/oldSrc/searches/useProductSearch';
import { arrayDiff } from '@dashboard/oldSrc/utils/arrays';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import createMetadataUpdateHandler from '@dashboard/oldSrc/utils/handlers/metadataUpdateHandler';
import { getParsedDataForJsonStringField } from '@dashboard/oldSrc/utils/richText/misc';

interface CollectionDetailsProps {
  id: string;
  params: CollectionUrlQueryParams;
}

export const CollectionDetails = () => {
  const router = useRouter();
  const { id, ...params } = router.query;
  const notify = useNotifier();
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(params.ids);
  const { t } = useTranslation();
  const { search, loadMore, result } = useProductSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA,
  });
  const [openModal, closeModal] = useDialogActionHandlers<
    CollectionUrlDialog,
    CollectionUrlQueryParams
  >((params) => collectionUrl(id, params), params);

  const [updateMetadata] = useMutation(UpdateMetadataDocument, {});
  const [updatePrivateMetadata] = useMutation(UpdatePrivateMetadataDocument, {});

  const [updateChannels, updateChannelsOpts] = useMutation(
    CollectionChannelListingUpdateDocument,
    {}
  );
  const { availableChannels } = useAppChannel(false);

  const handleCollectionUpdate = (data: CollectionUpdateMutation) => {
    if (data?.updateCollection?.errors?.length === 0) {
      notify(t('dashboard.savedChanges', 'Saved changes'), {
        type: 'success',
      });
      void router.push({ pathname: '/collections/[id]', query: { id } });
      if (backgroundImageError) {
        notify(
          t(
            'dashboard.imageUploadErrorText',
            "There was a problem with the file you uploaded as an image and it couldn't be used. Please try a different file."
          ),
          {
            type: 'error',
            title: t('dashboard.imageUploadErrorTitle', "Couldn't process image"),
          }
        );
      }
    }
  };
  const [updateCollection, updateCollectionOpts] = useMutation(CollectionUpdateDocument, {
    onCompleted: handleCollectionUpdate,
  });

  const [assignProduct, assignProductOpts] = useMutation(CollectionAssignProductDocument, {
    onCompleted: (data) => {
      if (data?.addProductsToCollection?.errors?.length === 0) {
        notify(t('dashboard.6vUeQ', 'Added product to collection'), {
          type: 'success',
        });
        void router.replace({ pathname: '/collections/[id]', query: { id } });
      }
    },
  });

  const [unassignProduct, unassignProductOpts] = useMutation(UnassignCollectionProductDocument, {
    onCompleted: (data) => {
      if (data?.removeProductsFromCollection?.errors?.length === 0) {
        notify(t('dashboard.W+Ruy', 'Deleted product from collection'), {
          type: 'success',
        });
        reset();
        closeModal();
      }
    },
  });

  const [removeCollection, removeCollectionOpts] = useMutation(RemoveCollectionDocument, {
    onCompleted: (data) => {
      if (data?.deleteCollection?.errors?.length === 0) {
        notify(t('dashboard.8wHwJ', 'Deleted collection'), {
          type: 'success',
        });
        void router.push('/collections');
      }
    },
  });

  const [paginationState, setPaginationState] = useLocalPaginationState(PAGINATE_BY);
  const paginate = useLocalPaginator(setPaginationState);

  const [selectedChannel] = useLocalStorage('collectionListChannel', '');

  const [{ data, fetching: loading }] = useQuery(CollectionDetailsDocument, {
    displayLoader: true,
    variables: { id, ...paginationState },
  });

  const collection = data?.collection;
  const allChannels = createCollectionChannels(availableChannels)?.sort((channel, nextChannel) =>
    channel.name.localeCompare(nextChannel.name)
  );
  const collectionChannelsChoices = createCollectionChannelsData(collection);
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
    collectionChannelsChoices,
    params?.action,
    {
      closeModal,
      openModal,
    },
    { formId: COLLECTION_DETAILS_FORM_ID }
  );

  const handleUpdate = async (formData: CollectionUpdateData) => {
    const input: CollectionInput = {
      backgroundImageAlt: formData.backgroundImageAlt,
      description: getParsedDataForJsonStringField(formData.description),
      name: formData.name,
      seo: {
        description: formData.seoDescription,
        title: formData.seoTitle,
      },
      slug: formData.slug,
    };

    const result = await updateCollection({
      id,
      input,
    });
    const initialIds = collectionChannelsChoices.map((channel) => channel.id);
    const modifiedIds = formData.channelListings.map((channel) => channel.id);

    const idsDiff = arrayDiff(initialIds, modifiedIds);

    updateChannels({
      variables: {
        id: collection.id,
        input: {
          addChannels: formData.channelListings.map((channel) => ({
            channelId: channel.id,
            isPublished: channel.isPublished,
            publishedAt: channel.publishedAt,
          })),
          removeChannels: idsDiff.removed,
        },
      },
    });

    return getMutationErrors(result);
  };

  const handleSubmit = createMetadataUpdateHandler(
    data?.collection,
    handleUpdate,
    (variables) => updateMetadata({ ...variables }),
    (variables) => updatePrivateMetadata({ ...variables })
  );

  const handleAssignationChange = async (products) => {
    const toUnassignIds = Object.keys(assignedProductDict).filter(
      (s) => assignedProductDict[s] && !products.includes(s)
    );

    const baseVariables = { ...paginationState, collectionId: id };

    if (products?.length) {
      await assignProduct({
        variables: { ...baseVariables, productIds: products },
      });
    }

    if (toUnassignIds?.length) {
      await unassignProduct({
        variables: { ...baseVariables, productIds: toUnassignIds },
      });
    }

    await result.refetch(DEFAULT_INITIAL_SEARCH_DATA);
  };

  const formTransitionState = getMutationState(
    updateCollectionOpts.called,
    updateCollectionOpts.fetching,
    updateCollectionOpts.data?.updateCollection.errors
  );

  const { pageInfo, ...paginationValues } = paginate(
    data?.collection?.products?.pageInfo,
    paginationState
  );

  if (collection === null) {
    return <NotFoundPage backHref={'/collections'} />;
  }

  const assignedProductDict = getAssignedProductIdsToCollection(collection, result.data?.search);

  return (
    <PaginatorContext.Provider value={{ ...pageInfo, ...paginationValues }}>
      <WindowTitle title={data?.collection?.name} />
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
      <CollectionDetailsPage
        onAdd={() => openModal('assign')}
        disabled={loading || updateChannelsOpts.fetching}
        collection={data?.collection}
        channelsErrors={updateChannelsOpts?.data?.updateCollectionChannelListing?.errors || []}
        errors={updateCollectionOpts?.data?.updateCollection?.errors || []}
        onCollectionRemove={() => openModal('remove')}
        onImageDelete={() => openModal('removeImage')}
        onImageUpload={(file) =>
          updateCollection({
            id,
            input: {
              backgroundImage: file,
            },
          })
        }
        onSubmit={handleSubmit}
        onProductUnassign={async (productId, event) => {
          event.stopPropagation();
          await unassignProduct({
            variables: {
              collectionId: id,
              productIds: [productId],
              ...paginationState,
            },
          });

          await result.refetch(DEFAULT_INITIAL_SEARCH_DATA);
        }}
        saveButtonBarState={formTransitionState}
        toolbar={
          <Button
            onClick={() =>
              openModal('unassign', {
                ids: listElements,
              })
            }
          >
            <>
              {/* unassign product from collection, button */}

              {t('dashboard.7V0c0', 'Unassign')}
            </>
          </Button>
        }
        isChecked={isSelected}
        selected={listElements.length}
        toggle={toggle}
        toggleAll={toggleAll}
        currentChannels={currentChannels}
        channelsCount={availableChannels.length}
        selectedChannelId={selectedChannel}
        openChannelsModal={handleChannelsModalOpen}
        onChannelsChange={setCurrentChannels}
      />
      <AssignProductDialog
        selectedIds={assignedProductDict}
        confirmButtonState={assignProductOpts.status}
        hasMore={result.data?.search?.pageInfo.hasNextPage}
        open={params.action === 'assign'}
        onFetch={search}
        onFetchMore={loadMore}
        loading={result.fetching}
        onClose={closeModal}
        onSubmit={handleAssignationChange}
        products={mapEdgesToItems(result?.data?.search)?.filter(
          (suggestedProduct) => suggestedProduct.id
        )}
      />

      <ActionDialog
        confirmButtonState={removeCollectionOpts.status}
        onClose={closeModal}
        onConfirm={() =>
          removeCollection({
            ...{ id },
          })
        }
        open={params.action === 'remove'}
        title={t(
          '+wpvnk',
          'Delete Collection'
          // dialog title
        )}
        variant="delete"
      >
        <DialogContentText>
          <Trans
            id="pVFoOk"
            defaultMessage="Are you sure you want to delete {collectionName}?"
            values={{
              collectionName: <strong>{data?.collection?.name ?? '...'}</strong>,
            }}
          />
        </DialogContentText>
      </ActionDialog>
      <ActionDialog
        confirmButtonState={unassignProductOpts.status}
        onClose={closeModal}
        onConfirm={() =>
          unassignProduct({
            variables: {
              ...paginationState,
              collectionId: id,
              productIds: params.ids,
            },
          })
        }
        open={params.action === 'unassign'}
        title={t(
          'dashboard.OtU+V',
          'Unassign products from collection'
          // dialog title
        )}
      >
        <DialogContentText>
          <Trans
            id="AulH/n"
            defaultMessage="{count,plural,one{Are you sure you want to unassign this product?} other{Are you sure you want to unassign {displayQuantity} products?}}"
            values={{
              count: params.ids.length,
              displayQuantity: <strong>{params.ids.length}</strong>,
            }}
          />
        </DialogContentText>
      </ActionDialog>
      <ActionDialog
        confirmButtonState={updateCollectionOpts.status}
        onClose={closeModal}
        onConfirm={() =>
          updateCollection({
            id,
            input: {
              backgroundImage: null,
            },
          })
        }
        open={params.action === 'removeImage'}
        title={t(
          'dashboard.zk04H',
          'Delete image'
          // dialog title
        )}
        variant="delete"
      >
        <DialogContentText>
          {t('dashboard.xhVZv', "Are you sure you want to delete collection's image?")}
        </DialogContentText>
      </ActionDialog>
    </PaginatorContext.Provider>
  );
};
export default CollectionDetails;
