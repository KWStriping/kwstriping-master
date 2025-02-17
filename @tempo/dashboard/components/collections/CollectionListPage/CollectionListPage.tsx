import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import type { FC } from 'react';

import type { CollectionListProps } from '../CollectionList';
import CollectionList from '../CollectionList';
import type { CollectionFilterKeys, CollectionListFilterOpts } from './filters';
import { useFilterStructure } from './filters';
import type {
  FilterPageProps,
  PageListProps,
  SearchPageProps,
  TabPageProps,
} from '@tempo/dashboard/oldSrc/types';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import { getByName } from '@tempo/dashboard/components/core/Filter/utils';
import FilterBar from '@tempo/dashboard/components/bars/FilterBar';
export interface CollectionListPageProps
  extends PageListProps,
    SearchPageProps,
    TabPageProps,
    FilterPageProps<CollectionFilterKeys, CollectionListFilterOpts>,
    CollectionListProps {}

const CollectionListPage: FC<CollectionListPageProps> = ({
  currentTab,
  disabled,
  initialSearch,
  onAll,
  onSearchChange,
  onTabChange,
  onTabDelete,
  onTabSave,
  selectedChannelId,
  tabs,
  filterOpts,
  onFilterChange,
  onFilterAttributeFocus,
  ...listProps
}) => {
  const filterStructure = useFilterStructure(filterOpts);

  const filterDependency = filterStructure.find(getByName('channel'));

  return (
    <Container>
      <PageHeader title={m.dashboard_collections() ?? 'Collections'}>
        <Button
          disabled={disabled}
          color="primary"
          href={'/collections/add'}
          data-test-id="create-collection"
        >
          <>
            {/* button */}

            {m.dashboard_yaAlB() ?? 'Create collection'}
          </>
        </Button>
      </PageHeader>
      <Card>
        <FilterBar
          allTabLabel={
            m.dashboard__g_Ii() ?? 'All Collections' // tab name
          }
          currentTab={currentTab}
          structure={filterStructure}
          initialSearch={initialSearch}
          onAll={onAll}
          onFilterChange={onFilterChange}
          onFilterAttributeFocus={onFilterAttributeFocus}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
          searchPlaceholder={m.dashboard___tLq() ?? 'Search Collections'}
          tabs={tabs}
        />
        <CollectionList
          disabled={disabled}
          selectedChannelId={selectedChannelId}
          filterDependency={filterDependency}
          {...listProps}
        />
      </Card>
    </Container>
  );
};
CollectionListPage.displayName = 'CollectionListPage';
export default CollectionListPage;
