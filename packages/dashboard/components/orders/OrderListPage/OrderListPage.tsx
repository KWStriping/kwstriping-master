import { useTranslation } from '@core/i18n';
import { ButtonWithSelect } from '@core/ui/components/buttons/ButtonWithSelect';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import type { FC } from 'react';
import OrderLimitReached from '../OrderLimitReached';
import OrderList from '../OrderList';
import type { OrderFilterKeys, OrderListFilterOpts } from './filters';
import { useFilterStructure } from './filters';
import FilterBar from '@dashboard/components/bars/FilterBar';
import CardMenu from '@dashboard/components/core/CardMenu';
import PageHeader from '@dashboard/components/core/PageHeader';
import type { OrderListQuery, RefreshLimitsQuery } from '@core/api/graphql';
import type { OrderListUrlOrdering } from '@dashboard/oldSrc/orders/urls';
import type {
  FilterPageProps,
  PageListProps,
  RelayToFlat,
  SortPage,
} from '@dashboard/oldSrc/types';
import { hasLimits, isLimitReached } from '@dashboard/oldSrc/utils/limits';

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
  const { t } = useTranslation();
  const filterStructure = useFilterStructure(filterOpts);
  const limitsReached = isLimitReached(limits, 'orders');

  return (
    <Container>
      <PageHeader
        title={t('dashboard.orders', 'Orders')}
        subtitle={
          hasLimits(limits, 'orders') &&
          t('dashboard.yceue', '{{count}}/{{max}} orders', {
            count: limits.currentUsage.orders,
            max: limits.allowedUsage.orders,
          })
        }
        cardMenu={
          !!onSettingsOpen && (
            <CardMenu
              className={'mr-2'}
              menuItems={[
                {
                  label: t('dashboard.orderSettings', 'Order Settings'),
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
          {t('dashboard.createOrder', 'Create order')}
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
          allTabLabel={t('dashboard.allOrders', 'All Orders')}
          structure={filterStructure}
          searchPlaceholder={t('dashboard.THjt3', 'Search Orders...')}
        />
        <OrderList {...listProps} />
      </Card>
    </Container>
  );
};
OrderListPage.displayName = 'OrderListPage';
export default OrderListPage;
