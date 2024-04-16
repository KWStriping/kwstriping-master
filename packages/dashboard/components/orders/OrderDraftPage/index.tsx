import { useTranslation } from '@core/i18n';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import CardMenu from '@dashboard/components/core/CardMenu';
import CardSpacer from '@dashboard/components/core/CardSpacer';
import FormattedDateTime from '@dashboard/components/core/Date';
import Grid from '@core/ui/components/Grid';
import PageHeader from '@dashboard/components/core/PageHeader';
import SaveBar from '@dashboard/components/core/SaveBar';
import OrderChannelSectionCard from '@dashboard/components/orders/OrderChannelSectionCard';
import type { OrderDetailsFragment, OrderErrorFragment } from '@core/api/graphql';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import type { FC } from 'react';

import OrderCustomer from '../OrderCustomer';
import OrderDraftDetails from '../OrderDraftDetails';
import OrderHistory from '../OrderHistory';
import OrderDraftAlert from './OrderDraftAlert';

export interface OrderDraftPageProps {
  id: string;
  order?: Maybe<OrderDetailsFragment>;
  errors?: OrderErrorFragment[];
  loading: boolean;
}

const OrderDraftPage: FC<OrderDraftPageProps> = ({ loading, order, errors }) => {
  // const styles = usePageStyles({});

  const styles = {};
  const router = useRouter();
  const { t } = useTranslation();
  const disabled = loading;
  return (
    <Container>
      <Backlink href={'/orders/drafts'}>{t('dashboard.orderDrafts', 'Draft Orders')}</Backlink>
      <PageHeader
        className={styles.header ?? ''}
        inline
        title={order?.number ? '#' + order?.number : undefined}
      >
        <CardMenu
          menuItems={[
            {
              label: t(
                'dashboard.Aqicb',
                'Cancel order'
                // button
              ),
              onSelect: onDraftRemove,
            },
          ]}
        />
      </PageHeader>
      <div className={styles.date ?? ''}>
        {order && order.created ? (
          <Typography variant="body2">
            <FormattedDateTime date={order.created} />
          </Typography>
        ) : (
          <Skeleton style={{ width: '10em' }} />
        )}
      </div>
      <Grid>
        <div>
          <OrderDraftAlert order={order} channelUsabilityData={channelUsabilityData} />
          <OrderDraftDetails
            order={order}
            channelUsabilityData={channelUsabilityData}
            errors={errors}
            onOrderLineAdd={onOrderLineAdd}
            onOrderLineChange={onOrderLineChange}
            onOrderLineRemove={onOrderLineRemove}
            onShippingMethodEdit={onShippingMethodEdit}
          />
          <OrderHistory
            history={order?.events}
            orderCurrency={order?.total?.gross.currency}
            onNoteAdd={onNoteAdd}
          />
        </div>
        <div>
          <OrderChannelSectionCard channel={order?.channel} />
          <CardSpacer />
          <OrderCustomer
            canEditAddresses={!!order?.user}
            canEditCustomer={true}
            fetchUsers={fetchUsers}
            hasMore={hasMore}
            loading={usersLoading}
            errors={errors}
            order={order}
            users={users}
            onBillingAddressEdit={onBillingAddressEdit}
            onCustomerEdit={onCustomerEdit}
            onFetchMore={onFetchMore}
            onProfileView={onProfileView}
            onShippingAddressEdit={onShippingAddressEdit}
          />
        </div>
      </Grid>
      <SaveBar
        state={saveButtonBarState}
        disabled={disabled}
        onCancel={() => router.push('/orders/drafts')}
        onSubmit={onDraftFinalize}
        labels={{
          confirm: t(
            'dashboard.Z14xW',
            'Finalize'
            // button
          ),
        }}
      />
    </Container>
  );
};
OrderDraftPage.displayName = 'OrderDraftPage';
export default OrderDraftPage;
