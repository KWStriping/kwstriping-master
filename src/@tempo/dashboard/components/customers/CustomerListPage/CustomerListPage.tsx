import * as m from '@paraglide/messages';
import { useUserPermissions } from '@tempo/api/auth/react/hooks/permissions';
// import { useTranslation } from '@tempo/next/i18n';
import ButtonWithSelect from '@tempo/ui/components/buttons/ButtonWithSelect';
import type { ListCustomersQuery } from '@tempo/api/generated/graphql';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

import CustomerList from '../CustomerList';
import type { CustomerFilterKeys, CustomerListFilterOpts } from './filters';
import { useFilterStructure } from './filters';
import type {
  FilterPageProps,
  ListActions,
  PageListProps,
  RelayToFlat,
  SortPage,
  TabPageProps,
} from '@tempo/dashboard/oldSrc/types';
import { customerAddUrl } from '@tempo/dashboard/oldSrc/customers/urls';
import type { CustomerListUrlOrdering } from '@tempo/dashboard/oldSrc/customers/urls';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import FilterBar from '@tempo/dashboard/components/bars/FilterBar';

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
  const router = useRouter();

  const userPermissions = useUserPermissions();

  const structure = useFilterStructure(filterOpts, userPermissions ?? null);

  return (
    <Container>
      <PageHeader title={m.dashboard_customers() ?? 'Customers'}>
        <ButtonWithSelect
          onClick={() => router.push(customerAddUrl)}
          options={[]}
          data-test-id="create-customer"
        >
          <>
            {/* button */}

            {m.dashboard_LVddq() ?? 'Create customer'}
          </>
        </ButtonWithSelect>
      </PageHeader>
      <Card>
        <FilterBar
          allTabLabel={
            m.dashboard_QK_EC() ?? 'All Customers'
            // tab name
          }
          currentTab={currentTab}
          structure={structure}
          initialSearch={initialSearch}
          searchPlaceholder={m.dashboard_mRLis() ?? 'Search Customer'}
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
