import { PageHeader } from '@core/checkout/components/PageHeader';
import { useOrder } from '@core/checkout/hooks';
import { useTranslation } from '@core/i18n';
import Typography from '@mui/material/Typography';
import { Suspense } from 'react';
import { OrderInfo } from '@core/checkout/components/sections/OrderInfo';
import { orderInfoMessages } from '@core/checkout/components/sections/OrderInfo/messages';
import { Summary, SummarySkeleton } from '@core/checkout/components/sections/Summary';

export const OrderConfirmation = ({ orderId }: { orderId: string }) => {
  const { order } = useOrder(orderId);
  const { t } = useTranslation();

  return (
    <div className="page">
      <header>
        <PageHeader />
        <Typography variant="h1" fontWeight="bold" className="mb-2">
          {t(
            orderInfoMessages.confirmOrderTitle.id,
            orderInfoMessages.confirmOrderTitle.defaultMessage,
            {
              number: order.number,
            }
          )}
        </Typography>
        <Typography variant="subtitle1">
          {t(
            orderInfoMessages.confirmOrderSubtitle.id,
            orderInfoMessages.confirmOrderSubtitle.defaultMessage,
            {
              email: order.userEmail || '',
            }
          )}
        </Typography>
      </header>
      <main className="order-content overflow-hidden">
        <OrderInfo order={order} />
        <div className="order-divider" />
        <Suspense fallback={<SummarySkeleton />}>
          <Summary
            {...order}
            // for now there can only be one voucher per order in the api
            discount={order?.discounts?.find(({ type }) => type === 'VOUCHER')?.amount}
            voucherCode={order?.voucher?.code}
            totalPrice={order?.total}
            subtotalPrice={order?.subtotal}
            editable={false}
          />
        </Suspense>
      </main>
    </div>
  );
};
