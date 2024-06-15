import * as m from '@paraglide/messages';
import { PageHeader } from '@tempo/ui/components/PageHeader';
import Typography from '@mui/material/Typography';
import { Suspense } from 'react';
import { useOrder } from '@tempo/checkout/hooks/useOrder';
import { OrderInfo } from '@tempo/checkout/components/sections/OrderInfo';
import { orderInfoMessages } from '@tempo/checkout/components/sections/OrderInfo/messages';
import { Summary, SummarySkeleton } from '@tempo/checkout/components/sections/Summary';

export const OrderConfirmation = ({ orderId }: { orderId: string }) => {
  const { order } = useOrder(orderId);

  return (
    <div className="page">
      <header>
        <PageHeader>
          <Typography variant="h1" fontWeight="bold" className="mb-2">
            {m[orderInfoMessages.confirmOrderTitle.id]({
              number: order.number,
            }) ?? orderInfoMessages.confirmOrderTitle.defaultMessage}
          </Typography>
        </PageHeader>
        <Typography variant="subtitle1">
          {m[orderInfoMessages.confirmOrderSubtitle.id]({
            email: order.userEmail || '',
          }) ?? orderInfoMessages.confirmOrderSubtitle.defaultMessage}
        </Typography>
      </header>
      <main className="order-content overflow-hidden">
        <OrderInfo order={order} />
        <div className="order-divider" />
        <Suspense fallback={<SummarySkeleton />}>
          <Summary
            {...order}
            shippingPrice={order.shippingPrice.gross}
            // for now there can only be one voucher per order in the api
            discount={order?.discounts?.find(({ type }) => type === 'VOUCHER')?.amount}
            voucherCode={order?.voucher?.code}
            totalPrice={order?.total.gross}
            subtotalPrice={order?.subtotal.gross}
            editable={false}
          />
        </Suspense>
      </main>
    </div>
  );
};
