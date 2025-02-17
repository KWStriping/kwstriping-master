import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import type { PageKlassFragment } from '@tempo/api/generated/graphql';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import type { FC } from 'react';
import PageKlassList from './PageKlassList';
import SearchBar from '@tempo/dashboard/components/bars/SearchBar';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import type { PageKlassListUrlOrdering } from '@tempo/dashboard/oldSrc/pageKlasses/urls';

import type {
  ListActions,
  PageListProps,
  SearchPageProps,
  SortPage,
  TabPageProps,
} from '@tempo/dashboard/oldSrc/types';

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
  return (
    <Container>
      <Backlink href={'/configuration'}>
        {m.dashboard_configuration() ?? 'Configuration'}
      </Backlink>
      <PageHeader title={m.dashboard_pageKlasses() ?? 'Page Types'}>
        <Button color="primary" href={pageKlassesAddUrl} data-test-id="create-page-type">
          <>
            {/* button */}

            {m.dashboard_JlXeD() ?? 'Create page type'}
          </>
        </Button>
      </PageHeader>
      <Card>
        <SearchBar
          allTabLabel={
            m.dashboard_VDZUb() ?? 'All Page Types'
            // tab name
          }
          currentTab={currentTab}
          initialSearch={initialSearch}
          searchPlaceholder={m.dashboard_msU__() ?? 'Search Page Type'}
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
