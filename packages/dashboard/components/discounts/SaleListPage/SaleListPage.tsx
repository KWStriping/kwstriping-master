import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import type { FC } from 'react';
import SaleList from '../SaleList';
import type { SaleFilterKeys, SaleListFilterOpts } from './filters';
import { useFilterStructure } from './filters';
import FilterBar from '@dashboard/components/bars/FilterBar';
import { getByName } from '@dashboard/components/core/Filter/utils';
import PageHeader from '@dashboard/components/core/PageHeader';
import type { SaleFragment } from '@core/api/graphql';
import type { SaleListUrlOrdering } from '@dashboard/oldSrc/discounts/urls';
import type {
  ChannelProps,
  FilterPageProps,
  ListActions,
  PageListProps,
  SortPage,
  TabPageProps,
} from '@dashboard/oldSrc/types';

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
  const { t } = useTranslation();
  const structure = useFilterStructure(filterOpts);

  const filterDependency = structure.find(getByName('channel'));

  return (
    <Container>
      <PageHeader title={t('dashboard.sales', 'Sales')}>
        <Button href={'/discounts/sales/add'} color="primary" data-test-id="create-sale">
          <>
            {/* button */}

            {t('dashboard.HfbXR', 'Create Sale')}
          </>
        </Button>
      </PageHeader>
      <Card>
        <FilterBar
          allTabLabel={t(
            'dashboard.jhgle',
            'All Sales'
            // tab name
          )}
          currentTab={currentTab}
          structure={structure}
          initialSearch={initialSearch}
          searchPlaceholder={t('dashboard.SD3A/', 'Search Sale')}
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
