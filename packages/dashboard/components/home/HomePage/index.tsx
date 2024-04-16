import CardSpacer from '@dashboard/components/core/CardSpacer';
import Grid from '@core/ui/components/Grid';
import Money from '@dashboard/components/core/Money';
import RequirePermissions from '@dashboard/components/core/RequirePermissions';

import HomeActivityCard from '@dashboard/components/home/HomeActivityCard';
import HomeAnalyticsCard from '@dashboard/components/home/HomeAnalyticsCard';
import HomeHeader from '@dashboard/components/home/HomeHeader';
import HomeNotificationTable from '@dashboard/components/home/HomeNotificationTable';
import HomeProductListCard from '@dashboard/components/home/HomeProductListCard';
import { PermissionCode } from '@core/api/constants';
import type {
  ActivityFragment,
  MoneyFragment,
  TopProductFragment,
} from '@core/api/graphql';
import Orders from '@dashboard/oldSrc/icons/Orders';
import Sales from '@dashboard/oldSrc/icons/Sales';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import type { FC } from 'react';

import styles from './index.module.css';

export interface HomePageProps {
  activities?: Maybe<ActivityFragment[]>;
  orders: number | null;
  ordersToCapture: Maybe<number>;
  ordersToConfirm: Maybe<number>;
  ordersToFulfill: Maybe<number>;
  productsOutOfStock: Maybe<number>;
  sales: MoneyFragment | null | undefined;
  topProducts?: Maybe<TopProductFragment[]>;
  userName: string;
  createNewChannelHref: string;
  ordersToConfirmHref: string;
  ordersToFulfillHref: string;
  ordersToCaptureHref: string;
  productsOutOfStockHref: string;
  noChannel: boolean;
}

const HomePage: FC<HomePageProps> = ({
  userName,
  orders,
  sales,
  topProducts,
  activities,
  createNewChannelHref,
  ordersToConfirmHref,
  ordersToFulfillHref,
  ordersToCaptureHref,
  productsOutOfStockHref,
  ordersToCapture,
  ordersToConfirm,
  ordersToFulfill,
  productsOutOfStock,
  noChannel,
}) => {
  return (
    <Container>
      <HomeHeader userName={userName} />
      <CardSpacer />
      <Grid>
        <div>
          <RequirePermissions requiredPermissions={[PermissionCode.ManageOrders]}>
            <div className={styles.cardContainer ?? ''}>
              <HomeAnalyticsCard
                title={'Sales'}
                testId="sales-analytics"
                icon={<Sales className={styles.icon ?? ''} viewBox="0 0 64 64" />}
              >
                {noChannel ? (
                  0
                ) : sales ? (
                  <Money money={sales} />
                ) : (
                  <Skeleton style={{ width: '5em' }} />
                )}
              </HomeAnalyticsCard>
              <HomeAnalyticsCard
                title={'Orders'}
                testId="orders-analytics"
                icon={
                  <Orders
                    className={styles.icon ?? ''}
                    fontSize={'inherit'}
                    viewBox="0 0 64 64"
                  />
                }
              >
                {noChannel ? (
                  0
                ) : orders !== undefined ? (
                  orders
                ) : (
                  <Skeleton style={{ width: '5em' }} />
                )}
              </HomeAnalyticsCard>
            </div>
          </RequirePermissions>
          <HomeNotificationTable
            createNewChannelHref={createNewChannelHref}
            ordersToFulfillHref={ordersToFulfillHref}
            ordersToConfirmHref={ordersToConfirmHref}
            ordersToCaptureHref={ordersToCaptureHref}
            productsOutOfStockHref={productsOutOfStockHref}
            ordersToCapture={ordersToCapture}
            ordersToConfirm={ordersToConfirm}
            ordersToFulfill={ordersToFulfill}
            productsOutOfStock={productsOutOfStock}
            noChannel={noChannel}
          />
          <CardSpacer />
          {topProducts && (
            <RequirePermissions
              requiredPermissions={[
                PermissionCode.ManageOrders,
                PermissionCode.ManageProducts,
              ]}
            >
              <HomeProductListCard testId="top-products" topProducts={topProducts} />
              <CardSpacer />
            </RequirePermissions>
          )}
        </div>
        {activities && (
          <div>
            <RequirePermissions requiredPermissions={[PermissionCode.ManageOrders]}>
              <HomeActivityCard activities={activities} testId="activity-card" />
            </RequirePermissions>
          </div>
        )}
      </Grid>
    </Container>
  );
};
HomePage.displayName = 'HomePage';
export default HomePage;
