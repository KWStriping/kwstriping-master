import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import { Pill } from '@core/ui/components/pill/Pill';
import CardTitle from '@dashboard/components/core/CardTitle';
import Money from '@dashboard/components/core/Money';
import { OrderAction, OrderDiscountType, OrderStatus } from '@core/api/constants';
import type { OrderDetailsFragment } from '@core/api/graphql';
import { transformPaymentStatus } from '@dashboard/oldSrc/misc';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import clsx from 'clsx';
import type { FC } from 'react';
import { useStyles } from './styles';

import { extractOrderGiftCardUsedAmount, extractRefundedAmount } from './utils';

interface OrderPaymentProps {
  order: Maybe<OrderDetailsFragment>;
  onCapture: () => void;
  onMarkAsPaid: () => void;
  onRefund: () => void;
  onVoid: () => void;
}

const OrderPayment: FC<OrderPaymentProps> = ({
  order,
  onCapture,
  onMarkAsPaid,
  onRefund,
  onVoid,
}) => {
  const styles = useStyles({});
  const { t } = useTranslation();

  const canCapture = (order?.actions ?? []).includes(OrderAction.Capture);
  const canVoid = (order?.actions ?? []).includes(OrderAction.Void);
  const canRefund = (order?.actions ?? []).includes(OrderAction.Refund);
  const canMarkAsPaid = (order?.actions ?? []).includes(OrderAction.MarkAsPaid);
  const payment = order ? transformPaymentStatus(order.paymentStatus, t) : undefined;
  const amountRefunded = order ? extractRefundedAmount(order) : undefined;
  const usedGiftCardAmount = order ? extractOrderGiftCardUsedAmount(order) : undefined;

  const getFulfillmentMethodName = (order: OrderDetailsFragment) => {
    if (
      order?.shippingMethodName === undefined &&
      order?.shippingPrice === undefined &&
      order?.collectionPointName === undefined
    ) {
      return <Skeleton />;
    }

    if (order.shippingMethodName === null) {
      return order.collectionPointName == null
        ? t('dashboard.shippingDoesNotApply', 'does not apply')
        : t('dashboard.lickAndCollectShippingMethod', 'click&collect');
    }
    return order.shippingMethodName;
  };

  return (
    <Card>
      <CardTitle
        title={
          !payment || !order?.paymentStatus ? (
            <Skeleton />
          ) : (
            <div className={'flex items-center gap-2'}>
              {t('dashboard.paymentTitle', 'Payment balance')}
              <Pill className={'mr-auto'} label={payment.localized} color={payment.status} />
            </div>
          )
        }
      />
      <CardContent>
        <div className={styles.root ?? ''}>
          {order?.discounts?.map((discount) => (
            <div key={discount.id}>
              {t('dashboard.discount', 'Discount')}
              <span className={styles.supportText ?? ''}>
                {discount.type === OrderDiscountType.Manual
                  ? t('dashboard.staffAdded', 'Staff added')
                  : t('dashboard.voucher', 'Voucher')}
              </span>
              <span className={clsx('ml-auto', styles.smallFont ?? '', styles.supportText)}>
                {t('dashboard.includedInSubtotal', 'Included in subtotal')}
              </span>
              <div className={styles.supportText ?? ''}>
                -<Money money={discount.amount} />
              </div>
            </div>
          ))}
          <div>
            {t('dashboard.subtotal', 'Subtotal')}
            <div className={'ml-auto'}>
              {<Money money={order?.subtotal.gross} /> ?? <Skeleton />}
            </div>
          </div>
          <div className={'gap-2'}>
            {t('dashboard.shipping', 'Shipping')}
            {order ? (
              <div className={styles.supportText ?? ''}>{getFulfillmentMethodName(order)}</div>
            ) : (
              <Skeleton />
            )}
            <div className={'ml-auto'}>
              {<Money money={order?.shippingPrice.gross} /> ?? <Skeleton />}
            </div>
          </div>
          <div>
            {t('dashboard.taxes', 'Taxes')}
            {!!order?.total.tax.amount && order.total.tax.amount > 0 && (
              <>
                <div className={clsx(styles.supportText, styles.smallFont ?? '', 'ml-auto')}>
                  {t('dashboard.includedInPrices', 'Included in prices')}{' '}
                </div>
              </>
            )}
            <div className={clsx(order?.total.tax.amount === 0 && 'ml-auto', styles.supportText)}>
              {<Money money={order?.total.tax} /> ?? <Skeleton />}
            </div>
          </div>
          <div className={styles.totalRow ?? ''}>
            {t('dashboard.total', 'Subtotal')}
            <div className={'ml-auto'}>
              {<Money money={order?.total.gross} /> ?? <Skeleton />}
            </div>
          </div>
        </div>
      </CardContent>
      <Divider />
      <CardContent>
        <div className={styles.root ?? ''}>
          {!!usedGiftCardAmount && (
            <div>
              {t('dashboard.paidWithGiftCard', 'Paid with Gift Card')}
              <div className={'ml-auto'}>
                <Money
                  money={{
                    amount: usedGiftCardAmount,
                    currency: order?.total?.gross?.currency,
                  }}
                />
              </div>
            </div>
          )}
          <div>
            {t('dashboard.preauthorized', 'Preauthorized amount')}
            <div className={'ml-auto'}>
              {<Money money={order?.totalAuthorized} /> ?? <Skeleton />}
            </div>
          </div>
          <div>
            {t('dashboard.captured', 'Captured amount')}
            <div className={'ml-auto'}>
              {<Money money={order?.totalCaptured} /> ?? <Skeleton />}
            </div>
          </div>
          {!!amountRefunded?.amount && (
            <div>
              {t('dashboard.refunded', 'Refunded amount')}
              <div className={'ml-auto'}>{<Money money={amountRefunded} />}</div>
            </div>
          )}
          <div
            className={clsx(order?.totalBalance.amount === 0 && (styles.success ?? ''), styles.totalRow)}
          >
            {t('dashboard.outstanding', 'Outstanding Balance')}
            <div className={'ml-auto'}>
              {order?.totalBalance.amount === 0
                ? t('dashboard.settled', 'Settled')
                : <Money money={order?.totalBalance} /> ?? <Skeleton />}
              {}
            </div>
          </div>
        </div>
      </CardContent>
      {order?.status !== OrderStatus.Canceled &&
        (canCapture || canRefund || canVoid || canMarkAsPaid) && (
          <CardActions className={'flex flex-wrap justify-end gap-1'}>
            {canCapture && (
              <Button onClick={onCapture}>{t('dashboard.capture', 'Capture')}</Button>
            )}
            {canRefund && (
              <Button onClick={onRefund} data-test-id="refund-button">
                {t('dashboard.refund', 'Refund')}
              </Button>
            )}
            {canVoid && <Button onClick={onVoid}>{t('dashboard.void', 'Refund')}</Button>}
            {canMarkAsPaid && (
              <Button onClick={onMarkAsPaid}>{t('dashboard.markAsPaid', 'Mark as paid')}</Button>
            )}
          </CardActions>
        )}
    </Card>
  );
};
OrderPayment.displayName = 'OrderPayment';
export default OrderPayment;
