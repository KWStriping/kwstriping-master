import { useTranslation } from '@core/i18n';
import { makeStyles } from '@core/ui/theme/styles';
import CardTitle from '@dashboard/components/core/CardTitle';
import FormattedDateTime from '@dashboard/components/core/Date';
import RequirePermissions from '@dashboard/components/core/RequirePermissions';
import { PermissionCode } from '@core/api/constants';
import type { CustomerDetailsQuery } from '@core/api/graphql';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

const useStyles = makeStyles(
  (theme) => ({
    label: {
      marginBottom: theme.spacing(1),
    },
    value: {
      fontSize: 24,
    },
  }),
  { name: 'CustomerStats' }
);

export interface CustomerStatsProps {
  customer: CustomerDetailsQuery['user'];
}

const CustomerStats: FC<CustomerStatsProps> = (props) => {
  const { customer } = props;
  const styles = useStyles(props);

  const { t } = useTranslation();

  return (
    <Card>
      <CardTitle
        title={t(
          'dashboard.7Nyu7',
          'Customer History'
          // section header
        )}
      />
      <CardContent>
        <Typography className={styles.label ?? ''} variant="caption">
          {t('dashboard.NAZoh', 'Last login')}
        </Typography>
        {customer ? (
          <Typography variant="h6" className={styles.value ?? ''}>
            {customer.lastLogin === null ? '-' : <FormattedDateTime date={customer.lastLogin} />}
          </Typography>
        ) : (
          <Skeleton />
        )}
      </CardContent>
      <RequirePermissions requiredPermissions={[PermissionCode.ManageOrders]}>
        <Divider />
        <CardContent>
          <Typography className={styles.label ?? ''} variant="caption">
            {t('dashboard.MD+ib', 'Last order')}
          </Typography>
          {customer && customer.lastPlacedOrder ? (
            <Typography variant="h6" className={styles.value ?? ''}>
              {customer.lastPlacedOrder.edges.length === 0 ? (
                '-'
              ) : (
                <FormattedDateTime date={customer.lastPlacedOrder.edges[0].node.created} />
              )}
            </Typography>
          ) : (
            <Skeleton />
          )}
        </CardContent>
      </RequirePermissions>
    </Card>
  );
};
CustomerStats.displayName = 'CustomerStats';
export default CustomerStats;
