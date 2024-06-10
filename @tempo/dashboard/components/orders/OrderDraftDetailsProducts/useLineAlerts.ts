import * as m from '@paraglide/messages';
import type { OrderErrorFragment, OrderLineFragment } from '@tempo/api/generated/graphql';
import getOrderErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/order';
import { useMemo } from 'react';

interface UseLineAlertsOpts {
  line: Maybe<OrderLineFragment>;
  error?: Maybe<OrderErrorFragment>;
}

const useLineAlerts = ({ line, error }: UseLineAlertsOpts) => {

  return useMemo(() => {
    const alerts: string[] = [];

    if (error) {
      alerts.push(getOrderErrorMessage(error, t));
    }

    const product = line?.product;

    if (!product) {
      alerts.push((m.dashboard_otExists() ?? 'This product does no longer exist.'));
    }

    const isAvailableForPurchase = product?.isAvailableForPurchase;

    if (product && !isAvailableForPurchase) {
      alerts.push(
        (m.dashboard_otAvailable() ?? 'This product is not available for sale in this channel.')
      );
    }

    return alerts;
  }, [line, error, intl]);
};
export default useLineAlerts;
