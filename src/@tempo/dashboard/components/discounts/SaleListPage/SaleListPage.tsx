import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import type { FC } from 'react';
import SaleList from '../SaleList';
import type { SaleFilterKeys, SaleListFilterOpts } from './filters';
import { useFilterStructure } from './filters';
import FilterBar from '@tempo/dashboard/components/bars/FilterBar';
import { getByName } from '@tempo/dashboard/components/core/Filter/utils';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import type { SaleFragment } from '@tempo/api/generated/graphql';
import type { SaleListUrlOrdering } from '@tempo/dashboard/oldSrc/discounts/urls';
import type {
  ChannelProps,
  FilterPageProps,
  ListActions,
  PageListProps,
  SortPage,
  TabPageProps,
} from '@tempo/dashboard/oldSrc/types';

export interface SaleListPageProps
  extends PageListProps,
    ListActions,
    FilterPageProps<SaleFilterKeys, SaleListFilterOpts>,
    SortPage<SaleListUrlOrdering>,
    TabPageProps,
    ChannelProps {
  sales: SaleFragment[];
}

const SaleListPage: FC<SaleListPageProps> = ({
  currentTab,
  filterOpts,
  initialSearch,
  onAll,
  onFilterChange,
  onSearchChange,
  onTabChange,
  onTabDelete,
  onTabSave,
  tabs,
  ...listProps
}) => {
  const structure = useFilterStructure(filterOpts);

  const filterDependency = structure.find(getByName('channel'));

  return (
    <Container>
      <PageHeader title={m.dashboard_sales() ?? 'Sales'}>
        <Button href={'/discounts/sales/add'} color="primary" data-test-id="create-sale">
          <>
            {/* button */}

            {m.dashboard_HfbXR() ?? 'Create Sale'}
          </>
        </Button>
      </PageHeader>
      <Card>
        <FilterBar
          allTabLabel={(m.dashboard_jhgle() ?? 'All Sales'
            // tab name
          )}
          currentTab={currentTab}
          structure={structure}
          initialSearch={initialSearch}
          searchPlaceholder={m.dashboard_SD3A/ ?? 'Search Sale'}
          tabs={tabs}
          onAll={onAll}
          onFilterChange={onFilterChange}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
        />
        <SaleList filterDependency={filterDependency} {...listProps} />
      </Card>
    </Container>
  );
};
SaleListPage.displayName = 'SaleListPage';
export default SaleListPage;
