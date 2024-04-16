import { useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import Grid from '@core/ui/components/Grid';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import ChannelsAvailabilityCard from '@dashboard/components/cards/ChannelsAvailabilityCard';
import { CardSpacer } from '@dashboard/components/core/CardSpacer';
import Metadata from '@dashboard/components/core/Metadata';
import PageHeader from '@dashboard/components/core/PageHeader';
import SaveBar from '@dashboard/components/core/SaveBar';
import SeoForm from '@dashboard/components/forms/SeoForm';
import { PermissionCode } from '@core/api/constants';
import type {
  CollectionChannelListingErrorFragment,
  CollectionErrorFragment,
} from '@core/api/graphql';
import type { SubmitPromise } from '@dashboard/hooks/useForm';
import type { ChannelCollectionData } from '@dashboard/oldSrc/channels/utils';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import type { FC } from 'react';

import CollectionDetails from '../CollectionDetails';
import { CollectionImage } from '../CollectionImage';
import type { CollectionCreateData } from './form';
import CollectionCreateForm from './form';

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
  const { t } = useTranslation();
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
          <Backlink href={'/collections'}>{t('dashboard.collections', 'Collections')}</Backlink>
          <PageHeader
            title={t(
              'dashboard.xa6xp',
              'Add Collection'
              // page header
            )}
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
                helperText={t(
                  'dashboard.j8LxK',
                  'Add search engine title and description to make this collection easier to find'
                )}
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
