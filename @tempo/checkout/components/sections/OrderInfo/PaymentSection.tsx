import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import { useFetch } from '@tempo/ui/hooks/useFetch';
import CheckIcon from '@mui/icons-material/Check';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { orderInfoLabels, orderInfoMessages } from './messages';
import { Section } from './Section';
import { CHECKOUT_API_URL } from '@tempo/checkout/constants';
import { getOrderPaymentStatus } from '@tempo/checkout/fetch';
import { usePay } from '@tempo/checkout/hooks/usePay';

export const PaymentSection = ({ orderId }: { orderId: string }) => {
  const { loading: orderPayLoading, orderPay } = usePay();

  const [{ data: paymentData, loading: paymentStatusLoading }] = useFetch(getOrderPaymentStatus, {
    args: { orderId, checkoutApiUrl: CHECKOUT_API_URL },
  });

  const handlePay = () => {
    return orderPay({
      provider: 'mollie', // TODO: Hardcoded payment provider
      method: 'creditCard', // TODO: Hardcoded payment provider
      orderId,
    });
  };

  const renderPaymentDetails = () => {
    if (paymentStatusLoading) {
      return <Skeleton className="w-1/2" />;
    }

    if (paymentData?.status === 'PAID') {
      return (
        <div className="flex flex-row items-center">
          <Typography color="success" className="mr-1">
            {m[orderInfoMessages.orderPaid.id] ?? orderInfoMessages.orderPaid.defaultMessage}
          </Typography>
          <CheckIcon aria-label={m.checkout_checkIcon() ?? 'check icon'} />
        </div>
      );
    }

    if (paymentData?.status === 'PENDING') {
      return (
        <Typography color="success">
          {m[orderInfoMessages.paymentPending.id] ??
            orderInfoMessages.paymentPending.defaultMessage}
        </Typography>
      );
    }

    if (paymentData?.status === 'UNPAID') {
      return (
        <div>
          <Typography color="error">
            {m[orderInfoMessages.orderUnpaid.id] ?? orderInfoMessages.orderUnpaid.defaultMessage}
          </Typography>
          <Button
            className="mt-2"
            aria-label={m[orderInfoLabels.orderPay.id] ?? orderInfoLabels.orderPay.defaultMessage}
            onClick={() => {
              void handlePay();
            }}
            disabled={orderPayLoading}
          >
            {m[orderInfoMessages.orderPay.id] ?? orderInfoMessages.orderPay.defaultMessage}
          </Button>
        </div>
      );
    }

    return (
      <Typography color="error">
        {m[orderInfoMessages.orderPaymentStatusMissing.id] ??
          orderInfoMessages.orderPaymentStatusMissing.defaultMessage}
      </Typography>
    );
  };

  return (
    <Section
      title={
        m[orderInfoMessages.paymentSection.id] ?? orderInfoMessages.paymentSection.defaultMessage
      }
    >
      <div>{renderPaymentDetails()}</div>
    </Section>
  );
};
