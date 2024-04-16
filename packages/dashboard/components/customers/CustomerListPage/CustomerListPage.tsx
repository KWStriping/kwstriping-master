import { useUserPermissions } from '@core/auth/react/hooks/permissions';
import { useTranslation } from '@core/i18n';
import ButtonWithSelect from '@core/ui/components/buttons/ButtonWithSelect';
import FilterBar from '@dashboard/components/bars/FilterBar';
import PageHeader from '@dashboard/components/core/PageHeader';
import type { ListCustomersQuery } from '@core/api/graphql';
import type { CustomerListUrlOrdering } from '@dashboard/oldSrc/customers/urls';
import { customerAddUrl } from '@dashboard/oldSrc/customers/urls';
import type {
  FilterPageProps,
  ListActions,
  PageListProps,
  RelayToFlat,
  SortPage,
  TabPageProps,
} from '@dashboard/oldSrc/types';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import type { FC } from 'react';

import CustomerList from '../CustomerList';
import type { CustomerFilterKeys, CustomerListFilterOpts } from './filters';
import { useFilterStructure } from './filters';

export interface CustomerListPageProps
  extends PageListProps,
    ListActions,
    FilterPageProps<CustomerFilterKeys, CustomerListFilterOpts>,
    SortPage<CustomerListUrlOrdering>,
    TabPageProps {
  customers: RelayToFlat<NonNullable<ListCustomersQuery['customers']>>;
  selectedCustomerIds: string[];
}

const CustomerListPage: FC<CustomerListPageProps> = ({
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
  selectedCustomerIds,
  ...customerListProps
}) => {
  const { t } = useTranslation();
  const router = useRouter();

  const userPermissions = useUserPermissions();

  const structure = useFilterStructure(filterOpts, userPermissions ?? null);

  return (
    <Container>
      <PageHeader title={t('dashboard.customers', 'Customers')}>
        <ButtonWithSelect
          onClick={() => router.push(customerAddUrl)}
          options={[]}
          data-test-id="create-customer"
        >
          <>
            {/* button */}

            {t('dashboard.LVddq', 'Create customer')}
          </>
        </ButtonWithSelect>
      </PageHeader>
      <Card>
        <FilterBar
          allTabLabel={t(
            'dashboard.QK2EC',
            'All Customers'
            // tab name
          )}
          currentTab={currentTab}
          structure={structure}
          initialSearch={initialSearch}
          searchPlaceholder={t('dashboard.mRLis', 'Search Customer')}
          tabs={tabs}
          onAll={onAll}
          // onFilterChange={onFilterChange}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
        />
        <CustomerList {...customerListProps} />
      </Card>
    </Container>
  );
};
CustomerListPage.displayName = 'CustomerListPage';
export default CustomerListPage;
