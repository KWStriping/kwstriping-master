import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import LimitReachedAlert from '@dashboard/components/alerts/LimitReachedAlert';
import SearchBar from '@dashboard/components/bars/SearchBar';
import PageHeader from '@dashboard/components/core/PageHeader';

import type {
  RefreshLimitsQuery,
  WarehouseWithShippingFragment,
} from '@core/api/graphql';
import type {
  PageListProps,
  SearchPageProps,
  SortPage,
  TabPageProps,
} from '@dashboard/oldSrc/types';
import { hasLimits, isLimitReached } from '@dashboard/oldSrc/utils/limits';
import type { WarehouseListUrlOrdering } from '@dashboard/oldSrc/warehouses/urls';
import { warehouseAddUrl } from '@dashboard/oldSrc/warehouses/urls';
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
  const { t } = useTranslation();

  const limitReached = isLimitReached(limits, 'warehouses');

  return (
    <Container>
      <Backlink href={'/configuration'}>{t('dashboard.configuration', 'Configuration')}</Backlink>
      <PageHeader
        title={t('dashboard.warehouses', 'Warehouses')}
        subtitle={
          hasLimits(limits, 'warehouses') &&
          t('dashboard.kOzse', '{{count}}/{{max}} warehouses used', {
            count: limits.currentUsage.warehouses,
            max: limits.allowedUsage.warehouses,
          })
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

            {t('dashboard.mdHhD', 'Create Warehouse')}
          </>
        </Button>
      </PageHeader>
      {limitReached && (
        <LimitReachedAlert
          title={t(
            'dashboard.HwLx9',
            'Warehouse limit reached'
            // alert
          )}
        >
          <>
            {t(
              'dashboard.FQvXv',
              'You have reached your warehouse limit, you will be no longer able to add warehouses to your store. If you would like to up your limit, contact your administration staff about raising your limits.'
            )}
          </>
        </LimitReachedAlert>
      )}
      <Card>
        <SearchBar
          allTabLabel={t(
            'dashboard.yU+q9',
            'All Warehouses'
            // tab name
          )}
          currentTab={currentTab}
          initialSearch={initialSearch}
          searchPlaceholder={t('dashboard.aMMWN', 'Search Warehouse')}
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
