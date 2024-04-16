import { useTranslation } from '@core/i18n';
import type { FC } from 'react';
import LimitReachedAlert from '@dashboard/components/alerts/LimitReachedAlert';

export const OrderLimitReached: FC = () => {
  const { t } = useTranslation();

  return (
    <LimitReachedAlert
      title={t(
        '+svQBN',
        'Order limit reached'
        // alert
      )}
    >
      <>
        {t(
          'dashboard.PW2tP',
          'You have reached your order limit, you will be billed extra for orders above limit. If you would like to up your limit, contact your administration staff about raising your limits.'
        )}
      </>
    </LimitReachedAlert>
  );
};

OrderLimitReached.displayName = 'OrderLimitReached';
export default OrderLimitReached;
