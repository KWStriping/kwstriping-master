import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import type { FC } from 'react';

import type { PageFragment } from '@tempo/api/generated/graphql';
import PageList from '../PageList';
import PageListSearchAndFilters from './PageListSearchAndFilters';
import type { ListActions, PageListProps, SortPage } from '@tempo/dashboard/oldSrc/types';
import type {
  PageListUrlDialog,
  PageListUrlQueryParams,
  PageListUrlOrdering,
} from '@tempo/dashboard/oldSrc/pages/urls';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';

export interface PageListActionDialogOpts {
  open: (action: PageListUrlDialog, newParams?: PageListUrlQueryParams) => void;
  close: () => void;
}
export interface PageListPageProps
  extends PageListProps,
    ListActions,
    SortPage<PageListUrlOrdering> {
  pages: PageFragment[];
  params: PageListUrlQueryParams;
  actionDialogOpts: PageListActionDialogOpts;
  onAdd: () => void;
}

const PageListPage: FC<PageListPageProps> = ({
  params,
  actionDialogOpts,
  onAdd,
  ...listProps
}) => {
  return (
    <Container>
      <PageHeader title={m.dashboard_pages() ?? 'Pages'}>
        <Button onClick={onAdd} color="primary" data-test-id="create-page">
          <>
            {/* button */}

            {m.dashboard_HRDWt() ?? 'Create page'}
          </>
        </Button>
      </PageHeader>
      <Card>
        <PageListSearchAndFilters params={params} actionDialogOpts={actionDialogOpts} />
        <PageList {...listProps} />
      </Card>
    </Container>
  );
};
PageListPage.displayName = 'PageListPage';
export default PageListPage;
