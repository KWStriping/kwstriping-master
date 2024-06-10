import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import FilterBar from '@dashboard/components/bars/FilterBar';
import { getByName } from '@dashboard/components/core/Filter/utils';
import PageHeader from '@dashboard/components/core/PageHeader';
import type {
  FilterPageProps,
  PageListProps,
  SearchPageProps,
  TabPageProps,
} from '@dashboard/oldSrc/types';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import type { FC } from 'react';

import type { CollectionListProps } from '../CollectionList';
import CollectionList from '../CollectionList';
import type { CollectionFilterKeys, CollectionListFilterOpts } from './filters';
import { useFilterStructure } from './filters';
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
  const { t } = useTranslation();
  const filterStructure = useFilterStructure(filterOpts);

  const filterDependency = filterStructure.find(getByName('channel'));

  return (
    <Container>
      <PageHeader title={t('dashboard.collections', 'Collections')}>
        <Button
          disabled={disabled}
          color="primary"
          href={'/collections/add'}
          data-test-id="create-collection"
        >
          <>
            {/* button */}

            {t('dashboard.yaAlB', 'Create collection')}
          </>
        </Button>
      </PageHeader>
      <Card>
        <FilterBar
          allTabLabel={t(
            'dashboard.4g5Ii',
            'All Collections'
            // tab name
          )}
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
          searchPlaceholder={t('dashboard.97tLq', 'Search Collections')}
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
