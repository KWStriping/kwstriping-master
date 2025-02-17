import * as m from '@paraglide/messages';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import Grid from '@tempo/ui/components/Grid';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import { PermissionCode } from '@tempo/api/generated/constants';
import type {
  CollectionChannelListingErrorFragment,
  CollectionErrorFragment,
} from '@tempo/api/generated/graphql';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

import CollectionDetails from '../CollectionDetails';
import { CollectionImage } from '../CollectionImage';
import type { CollectionCreateData } from './form';
import CollectionCreateForm from './form';
import type { ChannelCollectionData } from '@tempo/dashboard/oldSrc/channels/utils';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import SeoForm from '@tempo/dashboard/components/forms/SeoForm';
import SaveBar from '@tempo/dashboard/components/core/SaveBar';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import Metadata from '@tempo/dashboard/components/core/Metadata';
import { CardSpacer } from '@tempo/dashboard/components/core/CardSpacer';
import ChannelsAvailabilityCard from '@tempo/dashboard/components/cards/ChannelsAvailabilityCard';

export interface CollectionCreatePageProps {
  channelsCount: number;
  channelsErrors: CollectionChannelListingErrorFragment[];
  currentChannels: ChannelCollectionData[];
  disabled: boolean;
  errors: CollectionErrorFragment[];
  saveButtonBarState: ConfirmButtonTransitionState;
  onSubmit: (data: CollectionCreateData) => SubmitPromise;
  onChannelsChange: (data: ChannelCollectionData[]) => void;
  openChannelsModal: () => void;
}

const CollectionCreatePage: FC<CollectionCreatePageProps> = ({
  channelsCount,
  channelsErrors,
  currentChannels = [],
  disabled,
  errors,
  saveButtonBarState,
  onChannelsChange,
  openChannelsModal,
  onSubmit,
}: CollectionCreatePageProps) => {
  const router = useRouter();

  return (
    <CollectionCreateForm
      onSubmit={onSubmit}
      currentChannels={currentChannels}
      setChannels={onChannelsChange}
      disabled={disabled}
    >
      {({ change, data, handlers, submit, isSaveDisabled }) => (
        <Container>
          <Backlink href={'/collections'}>{m.dashboard_collections() ?? 'Collections'}</Backlink>
          <PageHeader
            title={
              m.dashboard_xa_xp() ?? 'Add Collection' // page header
            }
          />
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
                image={
                  data?.backgroundImage?.url
                    ? {
                        __typename: 'Image',
                        alt: data?.backgroundImageAlt,
                        url: data?.backgroundImage?.url,
                      }
                    : null
                }
                onImageDelete={() =>
                  change({
                    target: {
                      name: 'backgroundImage',
                      value: {
                        url: null,
                        value: null,
                      },
                    },
                  } as unknown)
                }
                onImageUpload={(file) =>
                  change({
                    target: {
                      name: 'backgroundImage',
                      value: {
                        url: URL.createObjectURL(file),
                        value: file,
                      },
                    },
                  } as unknown)
                }
                onChange={change}
                data={data}
              />
              <CardSpacer />
              <SeoForm
                allowEmptySlug={true}
                description={data?.seoDescription}
                disabled={disabled}
                descriptionPlaceholder=""
                helperText={
                  m.dashboard_j_LxK() ??
                  'Add search engine title and description to make this collection easier to find'
                }
                slug={data?.slug}
                slugPlaceholder={data?.name}
                title={data?.seoTitle}
                titlePlaceholder={data?.name}
                onChange={change}
              />
              <CardSpacer />
              <Metadata data={data} onChange={handlers.changeMetadata} />
            </div>
            <div>
              <ChannelsAvailabilityCard
                messages={{
                  hiddenLabel: t(
                    'dashboard_8FhTt',
                    'Hidden'
                    // collection label
                  ),

                  visibleLabel: t(
                    'dashboard_vQR6c',
                    'Visible'
                    // collection label
                  ),
                }}
                managePermissions={[PermissionCode.ManageProducts]}
                errors={channelsErrors}
                allChannelsCount={channelsCount}
                channels={data?.channelListings}
                disabled={disabled}
                onChange={handlers.changeChannels}
                openModal={openChannelsModal}
              />
            </div>
          </Grid>
          <SaveBar
            state={saveButtonBarState}
            disabled={isSaveDisabled}
            onCancel={() => router.push('/collections')}
            onSubmit={submit}
          />
        </Container>
      )}
    </CollectionCreateForm>
  );
};
CollectionCreatePage.displayName = 'CollectionCreatePage';
export default CollectionCreatePage;
