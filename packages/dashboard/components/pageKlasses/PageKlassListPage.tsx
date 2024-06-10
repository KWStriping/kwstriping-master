import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import SearchBar from '@dashboard/components/bars/SearchBar';
import PageHeader from '@dashboard/components/core/PageHeader';
import type { PageKlassFragment } from '@core/api/graphql';
import type { PageKlassListUrlOrdering } from '@dashboard/oldSrc/pageKlasses/urls';
import { pageKlassAddUrl } from '@dashboard/oldSrc/pageKlasses/urls';

import type {
  ListActions,
  PageListProps,
  SearchPageProps,
  SortPage,
  TabPageProps,
} from '@dashboard/oldSrc/types';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import type { FC } from 'react';
import PageKlassList from './PageKlassList';

export interface PageKlassListPageProps
  extends PageListProps,
    ListActions,
    SearchPageProps,
    SortPage<PageKlassListUrlOrdering>,
    TabPageProps {
  pageKlasses: PageKlassFragment[];
}

const PageKlassListPage: FC<PageKlassListPageProps> = ({
  currentTab,
  initialSearch,
  onAll,
  onSearchChange,
  onTabChange,
  onTabDelete,
  onTabSave,
  tabs,
  ...listProps
}) => {
  const { t } = useTranslation();
  return (
    <Container>
      <Backlink href={'/configuration'}>{t('dashboard.configuration', 'Configuration')}</Backlink>
      <PageHeader title={t('dashboard.pageKlasses', 'Page Types')}>
        <Button color="primary" href={pageKlassesAddUrl} data-test-id="create-page-type">
          <>
            {/* button */}

            {t('dashboard.JlXeD', 'Create page type')}
          </>
        </Button>
      </PageHeader>
      <Card>
        <SearchBar
          allTabLabel={t(
            'dashboard.VDZUb',
            'All Page Types'
            // tab name
          )}
          currentTab={currentTab}
          initialSearch={initialSearch}
          searchPlaceholder={t('dashboard.msU70', 'Search Page Type')}
          tabs={tabs}
          onAll={onAll}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
        />
        <PageKlassList {...listProps} />
      </Card>
    </Container>
  );
};
PageKlassListPage.displayName = 'PageKlassListPage';
export default PageKlassListPage;
