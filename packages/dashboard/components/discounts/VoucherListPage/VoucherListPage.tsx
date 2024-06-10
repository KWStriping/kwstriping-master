import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import type { FC } from 'react';
import VoucherList from '../VoucherList';
import type { VoucherFilterKeys, VoucherListFilterOpts } from './filters';
import { useFilterStructure } from './filters';
import FilterBar from '@dashboard/components/bars/FilterBar';
import { getByName } from '@dashboard/components/core/Filter/utils';
import PageHeader from '@dashboard/components/core/PageHeader';
import type { VoucherFragment } from '@core/api/graphql';
import type { VoucherListUrlOrdering } from '@dashboard/oldSrc/discounts/urls';
import type {
  ChannelProps,
  FilterPageProps,
  ListActions,
  PageListProps,
  SortPage,
  TabPageProps,
} from '@dashboard/oldSrc/types';

export interface VoucherListPageProps
  extends PageListProps,
    ListActions,
    FilterPageProps<VoucherFilterKeys, VoucherListFilterOpts>,
    SortPage<VoucherListUrlOrdering>,
    TabPageProps,
    ChannelProps {
  vouchers: VoucherFragment[];
}
const VoucherListPage: FC<VoucherListPageProps> = ({
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
      <PageHeader title={t('dashboard.vouchers', 'Vouchers')}>
        <Button href={'/discounts/vouchers/add'} color="primary" data-test-id="create-voucher">
          <>
            {/* button */}

            {t('dashboard.bhZJ4', 'Create voucher')}
          </>
        </Button>
      </PageHeader>
      <Card>
        <FilterBar
          allTabLabel={t(
            'dashboard.NrF72',
            'All Vouchers'
            // tab name
          )}
          currentTab={currentTab}
          structure={structure}
          initialSearch={initialSearch}
          searchPlaceholder={t('dashboard.ruP2T', 'Search Voucher')}
          tabs={tabs}
          onAll={onAll}
          onFilterChange={onFilterChange}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
        />
        <VoucherList filterDependency={filterDependency} {...listProps} />
      </Card>
    </Container>
  );
};
VoucherListPage.displayName = 'VoucherListPage';
export default VoucherListPage;
