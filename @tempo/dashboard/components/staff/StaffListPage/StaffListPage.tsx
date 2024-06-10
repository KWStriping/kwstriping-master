import * as m from '@paraglide/messages';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import { Button } from '@tempo/ui/components/buttons/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import type { FC } from 'react';
import StaffList from '../StaffList';
import type { StaffFilterKeys, StaffListFilterOpts } from './filters';
import { useFilterStructure } from './filters';
import LimitReachedAlert from '@tempo/dashboard/components/alerts/LimitReachedAlert';
import FilterBar from '@tempo/dashboard/components/bars/FilterBar';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import type { RefreshLimitsQuery, StaffListQuery } from '@tempo/api/generated/graphql';
import type { StaffListUrlOrdering } from '@tempo/dashboard/oldSrc/staff/urls';
import type {
  FilterPageProps,
  ListProps,
  RelayToFlat,
  SortPage,
  TabPageProps,
} from '@tempo/dashboard/oldSrc/types';
import { hasLimits, isLimitReached } from '@tempo/dashboard/oldSrc/utils/limits';

export interface StaffListPageProps
  extends ListProps,
    FilterPageProps<StaffFilterKeys, StaffListFilterOpts>,
    SortPage<StaffListUrlOrdering>,
    TabPageProps {
  limits: RefreshLimitsQuery['shop']['limits'];
  staffMembers: RelayToFlat<NonNullable<StaffListQuery['staffUsers']>>;
  onAdd: () => void;
}

const StaffListPage: FC<StaffListPageProps> = ({
  currentTab,
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
  const reachedLimit = isLimitReached(limits, 'staffUsers');

  return (
    <Container>
      <Backlink href={'/configuration'}>
        {m.dashboard_configuration() ?? 'Configuration'}
      </Backlink>
      <PageHeader
        title={m.dashboard_staff() ?? 'Staff Members'}
        subtitle={
          hasLimits(limits, 'staffUsers') &&
          (m.dashboard_xlPgt({
            count: limits.currentUsage.staffUsers,
            max: limits.allowedUsage.staffUsers,
          }) ??
            '{{count}}/{{max}} members')
        }
      >
        <Button
          data-test-id="invite-staff-member"
          disabled={reachedLimit}
          color="primary"
          onClick={onAdd}
        >
          <>
            {/* button */}

            {m.dashboard_JcNaA() ?? 'Invite staff member'}
          </>
        </Button>
      </PageHeader>
      {reachedLimit && (
        <LimitReachedAlert
          title={
            m.dashboard_A_Mlv() ?? 'Staff Member limit reached'
            // alert
          }
        >
          <>
            {m.dashboard_aA_f_() ??
              'You have reached your staff member limit, you will be no longer able to add staff members to your store. If you would like to up your limit, contact your administration staff about raising your limits.'}
          </>
        </LimitReachedAlert>
      )}
      <Card>
        <FilterBar
          allTabLabel={
            m.dashboard_J_TXc() ?? 'All Staff Members'
            // tab name
          }
          currentTab={currentTab}
          structure={structure}
          initialSearch={initialSearch}
          searchPlaceholder={m.dashboard_DbrOK() ?? 'Search Staff Member'}
          tabs={tabs}
          onAll={onAll}
          onFilterChange={onFilterChange}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
        />
        <StaffList {...listProps} />
      </Card>
    </Container>
  );
};
StaffListPage.displayName = 'StaffListPage';
export default StaffListPage;
