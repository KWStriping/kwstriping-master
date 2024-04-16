import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import type { FC } from 'react';

import MediaList from '../MediaList';
import MediaListSearchAndFilters from './MediaListSearchAndFilters';
import type { ListActions, PageListProps, SortPage } from '@dashboard/oldSrc/types';
import type {
  MediaListUrlDialog,
  MediaListUrlQueryParams,
  MediaListUrlOrdering,
} from '@dashboard/oldSrc/media/urls';
import type { MediaFragment } from '@core/api/graphql';
import PageHeader from '@dashboard/components/core/PageHeader';

export interface MediaListActionDialogOpts {
  open: (action: MediaListUrlDialog, newParams?: MediaListUrlQueryParams) => void;
  close: () => void;
}
export interface MediaListPageProps
  extends PageListProps,
    ListActions,
    SortPage<MediaListUrlOrdering> {
  media: MediaFragment[];
  params: MediaListUrlQueryParams;
  actionDialogOpts: MediaListActionDialogOpts;
  onAdd: () => void;
}

const MediaListPage: FC<MediaListPageProps> = ({
  params,
  actionDialogOpts,
  onAdd,
  ...listProps
}) => {
  const { t } = useTranslation();

  return (
    <Container>
      <PageHeader title={t('dashboard.media', 'Media')}>
        <Button onClick={onAdd} color="primary" data-test-id="create-media">
          <>
            {/* button */}

            {t('dashboard.kuqkF', 'Add media')}
          </>
        </Button>
      </PageHeader>
      <Card>
        <MediaListSearchAndFilters params={params} actionDialogOpts={actionDialogOpts} />
        <MediaList {...listProps} />
      </Card>
    </Container>
  );
};
MediaListPage.displayName = 'MediaListPage';
export default MediaListPage;
