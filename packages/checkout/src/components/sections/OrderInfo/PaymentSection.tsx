import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import { useFetch } from '@core/ui/hooks/useFetch';
import CheckIcon from '@mui/icons-material/Check';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { CHECKOUT_API_URL } from '@core/checkout/constants';
import { getOrderPaymentStatus } from '@core/checkout/fetch';
import { usePay } from '@core/checkout/hooks/usePay';

import { orderInfoLabels, orderInfoMessages } from './messages';
import { Section } from './Section';

export const PaymentSection = ({ orderId }: { orderId: string }) => {
  const { loading: orderPayLoading, orderPay } = usePay();

  const [{ data: paymentData, loading: paymentStatusLoading }] = useFetch(getOrderPaymentStatus, {
    args: { orderId, checkoutApiUrl: CHECKOUT_API_URL },
  });

  const { t } = useTranslation();

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
            {t(orderInfoMessages.orderPaid.id, orderInfoMessages.orderPaid.defaultMessage)}
          </Typography>
          <CheckIcon aria-label={t('checkout.checkIcon', 'check icon')} />
        </div>
      );
    }

    if (paymentData?.status === 'PENDING') {
      return (
        <Typography color="success">
          {t(
            orderInfoMessages.paymentPending.id,
            orderInfoMessages.paymentPending.defaultMessage
          )}
        </Typography>
      );
    }

    if (paymentData?.status === 'UNPAID') {
      return (
        <div>
          <Typography color="error">
            {t(orderInfoMessages.orderUnpaid.id, orderInfoMessages.orderUnpaid.defaultMessage)}
          </Typography>
          <Button
            className="mt-2"
            aria-label={t(orderInfoLabels.orderPay.id, orderInfoLabels.orderPay.defaultMessage)}
            onClick={() => {
              void handlePay();
            }}
            disabled={orderPayLoading}
          >
            {t(orderInfoMessages.orderPay.id, orderInfoMessages.orderPay.defaultMessage)}
          </Button>
        </div>
      );
    }

    return (
      <Typography color="error">
        {t(
          orderInfoMessages.orderPaymentStatusMissing.id,
          orderInfoMessages.orderPaymentStatusMissing.defaultMessage
        )}
      </Typography>
    );
  };

  return (
    <Section
      title={t(
        orderInfoMessages.paymentSection.id,
        orderInfoMessages.paymentSection.defaultMessage
      )}
    >
      <div>{renderPaymentDetails()}</div>
    </Section>
  );
};
