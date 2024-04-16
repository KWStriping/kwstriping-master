import { useTranslation } from '@core/i18n';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import { Button } from '@core/ui/components/buttons/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import type { FC } from 'react';
import StaffList from '../StaffList';
import type { StaffFilterKeys, StaffListFilterOpts } from './filters';
import { useFilterStructure } from './filters';
import LimitReachedAlert from '@dashboard/components/alerts/LimitReachedAlert';
import FilterBar from '@dashboard/components/bars/FilterBar';
import PageHeader from '@dashboard/components/core/PageHeader';
import type { RefreshLimitsQuery, StaffListQuery } from '@core/api/graphql';
import type { StaffListUrlOrdering } from '@dashboard/oldSrc/staff/urls';
import type {
  FilterPageProps,
  ListProps,
  RelayToFlat,
  SortPage,
  TabPageProps,
} from '@dashboard/oldSrc/types';
import { hasLimits, isLimitReached } from '@dashboard/oldSrc/utils/limits';

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
  const { t } = useTranslation();

  const structure = useFilterStructure(filterOpts);
  const reachedLimit = isLimitReached(limits, 'staffUsers');

  return (
    <Container>
      <Backlink href={'/configuration'}>{t('dashboard.configuration', 'Configuration')}</Backlink>
      <PageHeader
        title={t('dashboard.staff', 'Staff Members')}
        subtitle={
          hasLimits(limits, 'staffUsers') &&
          t('dashboard.xlPgt', '{{count}}/{{max}} members', {
            count: limits.currentUsage.staffUsers,
            max: limits.allowedUsage.staffUsers,
          })
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

            {t('dashboard.JcNaA', 'Invite staff member')}
          </>
        </Button>
      </PageHeader>
      {reachedLimit && (
        <LimitReachedAlert
          title={t(
            'dashboard.A8Mlv',
            'Staff Member limit reached'
            // alert
          )}
        >
          <>
            {t(
              'dashboard.aA0f9',
              'You have reached your staff member limit, you will be no longer able to add staff members to your store. If you would like to up your limit, contact your administration staff about raising your limits.'
            )}
          </>
        </LimitReachedAlert>
      )}
      <Card>
        <FilterBar
          allTabLabel={t(
            'dashboard.J4TXc',
            'All Staff Members'
            // tab name
          )}
          currentTab={currentTab}
          structure={structure}
          initialSearch={initialSearch}
          searchPlaceholder={t('dashboard.DbrOK', 'Search Staff Member')}
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
