import { useTranslation } from '@core/i18n';
import type { OrderErrorFragment, OrderLineFragment } from '@core/api/graphql';
import getOrderErrorMessage from '@dashboard/oldSrc/utils/errors/order';
import { useMemo } from 'react';

interface UseLineAlertsOpts {
  line: Maybe<OrderLineFragment>;
  error?: Maybe<OrderErrorFragment>;
}

const useLineAlerts = ({ line, error }: UseLineAlertsOpts) => {
  const { t } = useTranslation();

  return useMemo(() => {
    const alerts: string[] = [];

    if (error) {
      alerts.push(getOrderErrorMessage(error, t));
    }

    const product = line?.product;

    if (!product) {
      alerts.push(t('dashboard.otExists', 'This product does no longer exist.'));
    }

    const isAvailableForPurchase = product?.isAvailableForPurchase;

    if (product && !isAvailableForPurchase) {
      alerts.push(
        t('dashboard.otAvailable', 'This product is not available for sale in this channel.')
      );
    }

    return alerts;
  }, [line, error, intl]);
};
export default useLineAlerts;
