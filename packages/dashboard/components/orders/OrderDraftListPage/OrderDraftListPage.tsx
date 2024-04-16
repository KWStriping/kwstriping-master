import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import type { FC } from 'react';

import OrderDraftList from '../OrderDraftList';
import OrderLimitReached from '../OrderLimitReached';
import type { OrderDraftFilterKeys, OrderDraftListFilterOpts } from './filters';
import { useFilterStructure } from './filters';
import { hasLimits, isLimitReached } from '@dashboard/oldSrc/utils/limits';
import type {
  FilterPageProps,
  ListActions,
  PageListProps,
  RelayToFlat,
  SortPage,
  TabPageProps,
} from '@dashboard/oldSrc/types';
import type { OrderDraftListUrlOrdering } from '@dashboard/oldSrc/orders/urls';
import type { OrderDraftListQuery, RefreshLimitsQuery } from '@core/api/graphql';
import PageHeader from '@dashboard/components/core/PageHeader';
import FilterBar from '@dashboard/components/bars/FilterBar';

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
  const { t } = useTranslation();
  const structure = useFilterStructure(filterOpts);
  const limitsReached = isLimitReached(limits, 'orders');

  return (
    <Container>
      <PageHeader
        title={t('dashboard.orderDrafts', 'Draft Orders')}
        subtitle={
          hasLimits(limits, 'orders')
            ? t('dashboard.2eTzO', '{{count}}/{{max}} orders', {
                count: limits.currentUsage.orders,
                max: limits.allowedUsage.orders,
              })
            : undefined
        }
      >
        <Button color="primary" disabled={disabled || limitsReached} onClick={onAdd}>
          <>
            {/* button */}

            {t('dashboard.shEVn', 'Create order')}
          </>
        </Button>
      </PageHeader>
      {limitsReached && <OrderLimitReached />}
      <Card>
        <FilterBar
          allTabLabel={t(
            'dashboard.a1S4K',
            'All Drafts'
            // tab name
          )}
          currentTab={currentTab}
          structure={structure}
          initialSearch={initialSearch}
          searchPlaceholder={t('dashboard.JEe12', 'Search Draft')}
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
