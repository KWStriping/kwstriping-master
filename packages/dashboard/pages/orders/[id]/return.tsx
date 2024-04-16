import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { extractMutationErrors } from '@core/urql/utils';
import { useRouter } from 'next/router';
import OrderReturnPage from '@dashboard/components/orders/OrderReturnPage';
import type { OrderReturnFormData } from '@dashboard/components/orders/OrderReturnPage/form';
import { OrderErrorCode } from '@core/api/constants';
import {
  FulfillmentReturnProductsDocument,
  OrderDetailsDocument,
} from '@core/api/graphql';
import ReturnFormDataParser from '@dashboard/oldSrc/orders/OrderReturn/utils';
import { orderUrl } from '@dashboard/oldSrc/orders/urls';

export const messages = {
  cannotRefundDescription: {
    id: 'XQBVEJ',
    defaultMessage:
      'We’ve encountered a problem while refunding the products. Product’s were not refunded. Please try again.',
    description: 'order return error description when cannot refund',
  },
  cannotRefundTitle: {
    id: 'l9Lwjh',
    defaultMessage: "Couldn't refund products",
    description: 'order return error title when cannot refund',
  },
  successAlert: {
    id: '/z9uo1',
    defaultMessage: 'Successfully returned products!',
    description: 'order returned success message',
  },
};

interface OrderReturnProps {
  orderId: string;
}

const OrderReturn = () => {
  const router = useRouter();
  const { id: orderId } = router.query;
  const notify = useNotifier();
  const { t } = useTranslation();

  const [{ data, fetching: loading }] = useQuery(OrderDetailsDocument, {
    displayLoader: true,
    variables: {
      id: orderId,
    },
  });

  const [returnCreate, returnCreateOpts] = useMutation(FulfillmentReturnProductsDocument, {
    onCompleted: ({ returnFulfilledProducts: { errors, replaceOrder } }) => {
      if (!errors?.length) {
        notify(t('dashboard.successAlert', 'Successfully returned products!'), {
          type: 'success',
        });

        void router.push(orderUrl(replaceOrder?.id || orderId));

        return;
      }

      if (errors.some((err) => err.code === OrderErrorCode.CannotRefund)) {
        notify(
          t(
            'dashboard.cannotRefundDescription',
            'We’ve encountered a problem while refunding the products. Product’s were not refunded. Please try again.'
          ),
          {
            autohide: 5000,
            type: 'error',

            title: t('dashboard.cannotRefundTitle', "Couldn't refund products"),
          }
        );

        return;
      }

      notify(t('dashboard.somethingWentWrong', 'Tempo ran into an unexpected problem'), {
        autohide: 5000,
        type: 'error',
      });
    },
  });

  const handleSubmit = async (formData: OrderReturnFormData) => {
    if (!data?.order) return;

    return extractMutationErrors(
      returnCreate({
        variables: {
          id: data?.order?.id,
          input: new ReturnFormDataParser(data?.order, formData).getParsedData(),
        },
      })
    );
  };

  return (
    <OrderReturnPage
      errors={returnCreateOpts.data?.returnFulfilledProducts.errors}
      order={data?.order}
      loading={loading || returnCreateOpts.fetching}
      onSubmit={handleSubmit}
    />
  );
};

export default OrderReturn;
