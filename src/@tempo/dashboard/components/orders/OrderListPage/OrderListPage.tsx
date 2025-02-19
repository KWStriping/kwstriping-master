import * as m from '@paraglide/messages';
import { ButtonWithSelect } from '@tempo/ui/components/buttons/ButtonWithSelect';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import type { FC } from 'react';
import type { OrderListQuery, RefreshLimitsQuery } from '@tempo/api/generated/graphql';
import OrderLimitReached from '../OrderLimitReached';
import OrderList from '../OrderList';
import type { OrderFilterKeys, OrderListFilterOpts } from './filters';
import { useFilterStructure } from './filters';
import FilterBar from '@tempo/dashboard/components/bars/FilterBar';
import CardMenu from '@tempo/dashboard/components/core/CardMenu';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import type { OrderListUrlOrdering } from '@tempo/dashboard/oldSrc/orders/urls';
import type {
  FilterPageProps,
  PageListProps,
  RelayToFlat,
  SortPage,
} from '@tempo/dashboard/oldSrc/types';
import { hasLimits, isLimitReached } from '@tempo/dashboard/oldSrc/utils/limits';

export interface OrderListPageProps
  extends PageListProps,
    FilterPageProps<OrderFilterKeys, OrderListFilterOpts>,
    SortPage<OrderListUrlOrdering> {
  limits: RefreshLimitsQuery['shop']['limits'];
  orders: RelayToFlat<NonNullable<OrderListQuery['orders']>>;
  onSettingsOpen: () => void;
  onAdd: () => void;
}

const OrderListPage: FC<OrderListPageProps> = ({
  currentTab,
  initialSearch,
  filterOpts,
  limits,
  tabs,
  onAdd,
  onAll,
  onSearchChange,
  onSettingsOpen,
  onFilterChange,
  onTabChange,
  onTabDelete,
  onTabSave,
  ...listProps
}) => {
  const filterStructure = useFilterStructure(filterOpts);
  const limitsReached = isLimitReached(limits, 'orders');

  return (
    <Container>
      <PageHeader
        title={m.dashboard_orders() ?? 'Orders'}
        subtitle={
          hasLimits(limits, 'orders') &&
          (m.dashboard_yceue({
            count: limits.currentUsage.orders,
            max: limits.allowedUsage.orders,
          }) ??
            '{{count}}/{{max}} orders')
        }
        cardMenu={
          !!onSettingsOpen && (
            <CardMenu
              className={'mr-2'}
              menuItems={[
                {
                  label: m.dashboard_orderSettings() ?? 'Order Settings',
                  onSelect: onSettingsOpen,
                },
              ]}
            />
          )
        }
      >
        <ButtonWithSelect
          disabled={limitsReached}
          options={[]}
          data-test-id="create-order-button"
          onClick={onAdd}
        >
          {m.dashboard_createOrder() ?? 'Create order'}
        </ButtonWithSelect>
      </PageHeader>
      {limitsReached && <OrderLimitReached />}
      <Card>
        <FilterBar
          currentTab={currentTab}
          initialSearch={initialSearch}
          onAll={onAll}
          onFilterChange={onFilterChange}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
          tabs={tabs}
          allTabLabel={m.dashboard_allOrders() ?? 'All Orders'}
          structure={filterStructure}
          searchPlaceholder={m.dashboard_THjt_() ?? 'Search Orders...'}
        />
        <OrderList {...listProps} />
      </Card>
    </Container>
  );
};
OrderListPage.displayName = 'OrderListPage';
export default OrderListPage;
