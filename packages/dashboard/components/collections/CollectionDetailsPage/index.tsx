import { useTranslation } from '@core/i18n';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import ChannelsAvailabilityCard from '@dashboard/components/cards/ChannelsAvailabilityCard';
import { CardSpacer } from '@dashboard/components/core/CardSpacer';
import Grid from '@core/ui/components/Grid';
import Metadata from '@dashboard/components/core/Metadata';
import PageHeader from '@dashboard/components/core/PageHeader';
import SaveBar from '@dashboard/components/core/SaveBar';
import SeoForm from '@dashboard/components/forms/SeoForm';
import { PermissionCode } from '@core/api/constants';
import type {
  CollectionChannelListingErrorFragment,
  CollectionDetailsQuery,
  CollectionErrorFragment,
} from '@core/api/graphql';
import type { SubmitPromise } from '@dashboard/hooks/useForm';
import type { ChannelCollectionData } from '@dashboard/oldSrc/channels/utils';

import type { ChannelProps, ListActions, PageListProps } from '@dashboard/oldSrc/types';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import type { FC, MouseEvent } from 'react';
import CollectionDetails from '../CollectionDetails';
import { CollectionImage } from '../CollectionImage';
import CollectionProducts from '../CollectionProducts';
import type { CollectionUpdateData } from './form';
import CollectionUpdateForm from './form';

export interface CollectionDetailsPageProps extends PageListProps, ListActions, ChannelProps {
  onAdd: () => void;
  channelsCount: number;
  channelsErrors: CollectionChannelListingErrorFragment[];
  collection: CollectionDetailsQuery['collection'];
  currentChannels: ChannelCollectionData[];
  errors: CollectionErrorFragment[];
  saveButtonBarState: ConfirmButtonTransitionState;
  onCollectionRemove: () => void;
  onImageDelete: () => void;
  onImageUpload: (file: File) => void;
  onProductUnassign: (id: string, event: MouseEvent<unknown>) => void;
  onSubmit: (data: CollectionUpdateData) => SubmitPromise;
  onChannelsChange: (data: ChannelCollectionData[]) => void;
  openChannelsModal: () => void;
}

const CollectionDetailsPage: FC<CollectionDetailsPageProps> = ({
  channelsCount,
  channelsErrors,
  collection,
  currentChannels = [],
  disabled,
  errors,
  saveButtonBarState,
  onCollectionRemove,
  onImageDelete,
  onImageUpload,
  onSubmit,
  onChannelsChange,
  openChannelsModal,
  ...collectionProductsProps
}: CollectionDetailsPageProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <CollectionUpdateForm
      collection={collection}
      currentChannels={currentChannels}
      setChannels={onChannelsChange}
      onSubmit={onSubmit}
      disabled={disabled}
    >
      {({ change, data, handlers, submit, isSaveDisabled }) => (
        <Container>
          <Backlink href={'/collections'}>{t('dashboard.collections', 'Collections')}</Backlink>
          <PageHeader title={collection?.name} />
          <Grid>
            <div>
              <CollectionDetails
                data={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
              <CardSpacer />
              <CollectionImage
                data={data}
                image={collection?.backgroundImage}
                onImageDelete={onImageDelete}
                onImageUpload={onImageUpload}
                onChange={change}
              />
              <CardSpacer />
              <Metadata data={data} onChange={handlers.changeMetadata} />
              <CardSpacer />
              <CollectionProducts
                disabled={disabled}
                collection={collection}
                {...collectionProductsProps}
              />
              <CardSpacer />
              <SeoForm
                description={data?.seoDescription}
                disabled={disabled}
                descriptionPlaceholder=""
                helperText={t(
                  'dashboard.j8LxK',
                  'Add search engine title and description to make this collection easier to find'
                )}
                errors={errors}
                slug={data?.slug}
                slugPlaceholder={data?.name}
                title={data?.seoTitle}
                titlePlaceholder={collection?.name}
                onChange={change}
              />
            </div>
            <div>
              <div>
                <ChannelsAvailabilityCard
                  managePermissions={[PermissionCode.ManageProducts]}
                  messages={{
                    hiddenLabel: t(
                      'dashboard.8FhTt',
                      'Hidden'
                      // collection label
                    ),

                    visibleLabel: t(
                      'dashboard.vQR6c',
                      'Visible'
                      // collection label
                    ),
                  }}
                  errors={channelsErrors}
                  allChannelsCount={channelsCount}
                  channels={data?.channelListings}
                  disabled={disabled}
                  onChange={handlers.changeChannels}
                  openModal={openChannelsModal}
                />
              </div>
            </div>
          </Grid>
          <SaveBar
            state={saveButtonBarState}
            disabled={isSaveDisabled}
            onCancel={() => router.push('/collections')}
            onDelete={onCollectionRemove}
            onSubmit={submit}
          />
        </Container>
      )}
    </CollectionUpdateForm>
  );
};
CollectionDetailsPage.displayName = 'CollectionDetailsPage';
export default CollectionDetailsPage;
