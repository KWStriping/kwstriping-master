import * as m from '@paraglide/messages';
import type { AlertProps } from '@tempo/ui/components/Alert';
import { Alert } from '@tempo/ui/components/Alert';
import type {
  ChannelUsabilityDataQuery,
  OrderDetailsFragment,
} from '@tempo/api/generated/graphql';
import type { FC } from 'react';

import OrderAlerts from '../OrderAlerts';
import { alertMessages } from './messages';
// import { useAlertStyles } from "./styles";

const getAlerts = (
  order?: OrderDetailsFragment,
  channelUsabilityData?: ChannelUsabilityDataQuery
) => {
  const canDetermineShippingMethods =
    order?.shippingAddress?.country.code && !!order?.lines?.length;

  const isChannelInactive = order && !order.channel.isActive;
  const noProductsInChannel = channelUsabilityData?.products.totalCount === 0;
  const noShippingMethodsInChannel =
    canDetermineShippingMethods && order?.shippingMethods.length === 0;

  let alerts: MessageDescriptor[] = [];

  if (isChannelInactive) {
    alerts = [...alerts, alertMessages.inactiveChannel];
  }
  if (noProductsInChannel) {
    alerts = [...alerts, alertMessages.noProductsInChannel];
  }
  if (noShippingMethodsInChannel) {
    alerts = [...alerts, alertMessages.noShippingMethodsInChannel];
  }

  return alerts;
};

export type OrderDraftAlertProps = Omit<AlertProps, 'variant' | 'close'> & {
  order?: Maybe<OrderDetailsFragment>;
  channelUsabilityData?: ChannelUsabilityDataQuery;
};

const OrderDraftAlert: FC<OrderDraftAlertProps> = (props) => {
  const { order, channelUsabilityData, ...alertProps } = props;
  // const styles = useAlertStyles();

  const styles = {};

  const alerts = getAlerts(order, channelUsabilityData);

  if (!alerts.length) return null;

  return (
    <Alert variant="warning" close className={styles.root ?? ''} {...alertProps}>
      <OrderAlerts
        alerts={alerts}
        alertsHeader={
          m.dashboard_anyAlerts() ?? 'You will not be able to finalize this draft because:'
        }
      />
    </Alert>
  );
};

OrderDraftAlert.displayName = 'OrderDraftAlert';
export default OrderDraftAlert;
