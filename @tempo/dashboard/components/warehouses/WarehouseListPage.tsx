import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import LimitReachedAlert from '@tempo/dashboard/components/alerts/LimitReachedAlert';
import SearchBar from '@tempo/dashboard/components/bars/SearchBar';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';

import type {
  RefreshLimitsQuery,
  WarehouseWithShippingFragment,
} from '@tempo/api/generated/graphql';
import type {
  PageListProps,
  SearchPageProps,
  SortPage,
  TabPageProps,
} from '@tempo/dashboard/oldSrc/types';
import { hasLimits, isLimitReached } from '@tempo/dashboard/oldSrc/utils/limits';
import type { WarehouseListUrlOrdering } from '@tempo/dashboard/oldSrc/warehouses/urls';
import { warehouseAddUrl } from '@tempo/dashboard/oldSrc/warehouses/urls';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import type { FC } from 'react';

import WarehouseList from './WarehouseList';

export interface WarehouseListPageProps
  extends PageListProps,
    SearchPageProps,
    SortPage<WarehouseListUrlOrdering>,
    TabPageProps {
  limits: RefreshLimitsQuery['shop']['limits'];
  warehouses: WarehouseWithShippingFragment[];
  onRemove: (id: string) => void;
}

export const WarehouseListPage: FC<WarehouseListPageProps> = ({
  warehouses,
  currentTab,
  disabled,
  limits,
  initialSearch,
  settings,
  tabs,
  onAll,
  onRemove,
  onSearchChange,
  onTabChange,
  onTabDelete,
  onTabSave,
  onUpdateListSettings,
  ...listProps
}) => {
  const limitReached = isLimitReached(limits, 'warehouses');

  return (
    <Container>
      <Backlink href={'/configuration'}>
        {m.dashboard_configuration() ?? 'Configuration'}
      </Backlink>
      <PageHeader
        title={m.dashboard_warehouses() ?? 'Warehouses'}
        subtitle={
          hasLimits(limits, 'warehouses') &&
          (m.dashboard_kOzse({
            count: limits.currentUsage.warehouses,
            max: limits.allowedUsage.warehouses,
          }) ??
            '{{count}}/{{max}} warehouses used')
        }
      >
        <Button
          data-test-id="create-warehouse"
          disabled={limitReached}
          color="primary"
          href={warehouseAddUrl}
        >
          <>
            {/* button */}

            {m.dashboard_mdHhD() ?? 'Create Warehouse'}
          </>
        </Button>
      </PageHeader>
      {limitReached && (
        <LimitReachedAlert
          title={
            m.dashboard_HwLx_() ?? 'Warehouse limit reached'
            // alert
          }
        >
          <>
            {m.dashboard_FQvXv() ??
              'You have reached your warehouse limit, you will be no longer able to add warehouses to your store. If you would like to up your limit, contact your administration staff about raising your limits.'}
          </>
        </LimitReachedAlert>
      )}
      <Card>
        <SearchBar
          allTabLabel={t(
            'dashboard_yU+q9',
            'All Warehouses'
            // tab name
          )}
          currentTab={currentTab}
          initialSearch={initialSearch}
          searchPlaceholder={m.dashboard_aMMWN() ?? 'Search Warehouse'}
          tabs={tabs}
          onAll={onAll}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
        />
        <WarehouseList
          warehouses={warehouses}
          disabled={disabled}
          settings={settings}
          onRemove={onRemove}
          onUpdateListSettings={onUpdateListSettings}
          {...listProps}
        />
      </Card>
    </Container>
  );
};
WarehouseListPage.displayName = 'WarehouseListPage';
export default WarehouseListPage;
