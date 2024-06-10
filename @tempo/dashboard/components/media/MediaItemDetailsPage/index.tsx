import * as m from '@paraglide/messages';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import VisibilityCard from '@tempo/dashboard/components/cards/VisibilityCard';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
import Grid from '@tempo/ui/components/Grid';
import Metadata from '@tempo/dashboard/components/core/Metadata';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import SaveBar from '@tempo/dashboard/components/core/SaveBar';
import type {
  MediaItemDetailsFragment,
  MediaErrorFragment,
  useFileUploadMutation,
} from '@tempo/api/generated/graphql';
import useDateLocalize from '@tempo/dashboard/hooks/useDateLocalize';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

import MediaInfo from '../MediaInfo';
import type { MediaData } from './form';
import MediaForm from './form';

export interface MediaItemDetailsPageProps {
  loading: boolean;
  errors: MediaErrorFragment[];
  item: Maybe<MediaItemDetailsFragment>;
  mediaTypes?: Array<MediaItemDetailsFragment['type']>;
  allowEmptySlug?: boolean;
  saveButtonBarState: ConfirmButtonTransitionState;
  selectedMediaType?: MediaItemDetailsFragment['type'];
  onRemove: () => void;
  onSubmit: (data: MediaData) => SubmitPromise;
  onCloseDialog: () => void;
  onSelectMediaType?: (mediaTypeId: string) => void;
  uploadFile: ReturnType<typeof useFileUploadMutation>[0];
}

const MediaItemDetailsPage: FC<MediaItemDetailsPageProps> = ({
  loading,
  errors: apiErrors,
  item,
  mediaTypes: mediaTypeChoiceList,
  saveButtonBarState,
  selectedMediaType,
  onRemove,
  onSubmit,
  onSelectMediaType,
  uploadFile,
}) => {
  const localizeDate = useDateLocalize();
  const router = useRouter();

  const itemExists = item !== null;

  const handleSelectMediaType = (mediaTypeId: string) =>
    onSelectMediaType && onSelectMediaType(mediaTypeId);

  return (
    <MediaForm
      item={item}
      mediaTypes={mediaTypeChoiceList}
      selectedMediaType={selectedMediaType}
      onSelectMediaType={handleSelectMediaType}
      uploadFile={uploadFile}
      onSubmit={onSubmit}
      disabled={loading}
    >
      {({ change, data, validationErrors, handlers, submit, processing }) => {
        const errors = [...apiErrors, ...validationErrors];
        return (
          <Container>
            <Backlink href={'/media'}>{m.dashboard_media() ?? 'Media'}</Backlink>
            <PageHeader title={!itemExists ? m.dashboard_title() ?? 'Add Media' : item?.title} />
            <Grid>
              <div>
                <MediaInfo
                  data={data}
                  disabled={loading}
                  processing={processing}
                  onFileChange={handlers.selectFile}
                  errors={errors}
                  onChange={change}
                />
                <CardSpacer />
                <Metadata data={data} onChange={handlers.changeMetadata} />
              </div>
              <div>
                <VisibilityCard
                  data={data}
                  errors={errors}
                  disabled={loading}
                  messages={{
                    hiddenLabel: m.dashboard_hiddenLabel() ?? 'Hidden',
                    hiddenSecondLabel: t(
                      'dashboard_hiddenSecondLabel',
                      'will be visible from {{date}}',
                      {
                        date: localizeDate(data?.publishedAt),
                      }
                    ),
                    visibleLabel: m.dashboard_isibleLabel() ?? 'Visible',
                  }}
                  onChange={change}
                />
              </div>
            </Grid>
            <SaveBar
              disabled={loading}
              state={saveButtonBarState}
              onCancel={() => router.push('/media')}
              onDelete={data === null ? undefined : onRemove}
              onSubmit={submit}
            />
          </Container>
        );
      }}
    </MediaForm>
  );
};
MediaItemDetailsPage.displayName = 'MediaItemDetailsPage';
export default MediaItemDetailsPage;
