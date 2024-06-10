import * as m from '@paraglide/messages';
import { makeStyles } from '@tempo/ui/theme/styles';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import FormattedDateTime from '@tempo/dashboard/components/core/Date';
import RequirePermissions from '@tempo/dashboard/components/core/RequirePermissions';
import { PermissionCode } from '@tempo/api/generated/constants';
import type { CustomerDetailsQuery } from '@tempo/api/generated/graphql';
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

  return (
    <Card>
      <CardTitle
        title={
          m.dashboard__Nyu_() ?? 'Customer History'
          // section header
        }
      />
      <CardContent>
        <Typography className={styles.label ?? ''} variant="caption">
          {m.dashboard_NAZoh() ?? 'Last login'}
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
            {m.dashboard_MD() + ib ?? 'Last order'}
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
