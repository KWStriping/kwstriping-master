import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import type { FC } from 'react';
import VoucherList from '../VoucherList';
import type { VoucherFilterKeys, VoucherListFilterOpts } from './filters';
import { useFilterStructure } from './filters';
import FilterBar from '@tempo/dashboard/components/bars/FilterBar';
import { getByName } from '@tempo/dashboard/components/core/Filter/utils';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import type { VoucherFragment } from '@tempo/api/generated/graphql';
import type { VoucherListUrlOrdering } from '@tempo/dashboard/oldSrc/discounts/urls';
import type {
  ChannelProps,
  FilterPageProps,
  ListActions,
  PageListProps,
  SortPage,
  TabPageProps,
} from '@tempo/dashboard/oldSrc/types';

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
  const structure = useFilterStructure(filterOpts);

  const filterDependency = structure.find(getByName('channel'));

  return (
    <Container>
      <PageHeader title={m.dashboard_vouchers() ?? 'Vouchers'}>
        <Button href={'/discounts/vouchers/add'} color="primary" data-test-id="create-voucher">
          <>
            {/* button */}

            {m.dashboard_bhZJ_() ?? 'Create voucher'}
          </>
        </Button>
      </PageHeader>
      <Card>
        <FilterBar
          allTabLabel={
            m.dashboard_NrF__() ?? 'All Vouchers'
            // tab name
          }
          currentTab={currentTab}
          structure={structure}
          initialSearch={initialSearch}
          searchPlaceholder={m.dashboard_ruP_T() ?? 'Search Voucher'}
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
