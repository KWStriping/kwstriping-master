import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import type { FC } from 'react';

import PageList from '../PageList';
import PageListSearchAndFilters from './PageListSearchAndFilters';
import type { ListActions, PageListProps, SortPage } from '@dashboard/oldSrc/types';
import type {
  PageListUrlDialog,
  PageListUrlQueryParams,
  PageListUrlOrdering,
} from '@dashboard/oldSrc/pages/urls';
import type { PageFragment } from '@core/api/graphql';
import PageHeader from '@dashboard/components/core/PageHeader';

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
  const { t } = useTranslation();

  return (
    <Container>
      <PageHeader title={t('dashboard.pages', 'Pages')}>
        <Button onClick={onAdd} color="primary" data-test-id="create-page">
          <>
            {/* button */}

            {t('dashboard.HRDWt', 'Create page')}
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
