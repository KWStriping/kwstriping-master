import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import type { FC } from 'react';

import type { OrderDraftListQuery, RefreshLimitsQuery } from '@tempo/api/generated/graphql';
import OrderDraftList from '../OrderDraftList';
import OrderLimitReached from '../OrderLimitReached';
import type { OrderDraftFilterKeys, OrderDraftListFilterOpts } from './filters';
import { useFilterStructure } from './filters';
import { hasLimits, isLimitReached } from '@tempo/dashboard/oldSrc/utils/limits';
import type {
  FilterPageProps,
  ListActions,
  PageListProps,
  RelayToFlat,
  SortPage,
  TabPageProps,
} from '@tempo/dashboard/oldSrc/types';
import type { OrderDraftListUrlOrdering } from '@tempo/dashboard/oldSrc/orders/urls';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import FilterBar from '@tempo/dashboard/components/bars/FilterBar';

export interface OrderDraftListPageProps
  extends PageListProps,
    ListActions,
    FilterPageProps<OrderDraftFilterKeys, OrderDraftListFilterOpts>,
    SortPage<OrderDraftListUrlOrdering>,
    TabPageProps {
  limits: RefreshLimitsQuery['shop']['limits'];
  orders: RelayToFlat<NonNullable<OrderDraftListQuery['orderDrafts']>>;
  onAdd: () => void;
}

const OrderDraftListPage: FC<OrderDraftListPageProps> = ({
  currentTab,
  disabled,
  filterOpts,
  initialSearch,
  limits,
  onAdd,
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
  const limitsReached = isLimitReached(limits, 'orders');

  return (
    <Container>
      <PageHeader
        title={m.dashboard_orderDrafts() ?? 'Draft Orders'}
        subtitle={
          hasLimits(limits, 'orders')
            ? (m.dashboard__eTzO({
                count: limits.currentUsage.orders,
                max: limits.allowedUsage.orders,
              }) ?? '{{count}}/{{max}} orders')
            : undefined
        }
      >
        <Button color="primary" disabled={disabled || limitsReached} onClick={onAdd}>
          <>
            {/* button */}

            {m.dashboard_shEVn() ?? 'Create order'}
          </>
        </Button>
      </PageHeader>
      {limitsReached && <OrderLimitReached />}
      <Card>
        <FilterBar
          allTabLabel={
            m.dashboard_a_S_K() ?? 'All Drafts'
            // tab name
          }
          currentTab={currentTab}
          structure={structure}
          initialSearch={initialSearch}
          searchPlaceholder={m.dashboard_JEe__() ?? 'Search Draft'}
          tabs={tabs}
          onAll={onAll}
          onFilterChange={onFilterChange}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
        />
        <OrderDraftList disabled={disabled} {...listProps} />
      </Card>
    </Container>
  );
};
OrderDraftListPage.displayName = 'OrderDraftListPage';
export default OrderDraftListPage;
