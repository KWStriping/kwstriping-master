import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import type { FC } from 'react';

import MediaList from '../MediaList';
import MediaListSearchAndFilters from './MediaListSearchAndFilters';
import type { ListActions, PageListProps, SortPage } from '@tempo/dashboard/oldSrc/types';
import type {
  MediaListUrlDialog,
  MediaListUrlQueryParams,
  MediaListUrlOrdering,
} from '@tempo/dashboard/oldSrc/media/urls';
import type { MediaFragment } from '@tempo/api/generated/graphql';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';

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
  return (
    <Container>
      <PageHeader title={m.dashboard_media() ?? 'Media'}>
        <Button onClick={onAdd} color="primary" data-test-id="create-media">
          <>
            {/* button */}

            {m.dashboard_kuqkF() ?? 'Add media'}
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
