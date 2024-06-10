import * as m from '@paraglide/messages';
import type { FC } from 'react';
import LimitReachedAlert from '@tempo/dashboard/components/alerts/LimitReachedAlert';

export const OrderLimitReached: FC = () => {
  return (
    <LimitReachedAlert
      title={t(
        '+svQBN',
        'Order limit reached'
        // alert
      )}
    >
      <>
        {m.dashboard_PW_tP() ??
          'You have reached your order limit, you will be billed extra for orders above limit. If you would like to up your limit, contact your administration staff about raising your limits.'}
      </>
    </LimitReachedAlert>
  );
};

OrderLimitReached.displayName = 'OrderLimitReached';
export default OrderLimitReached;
