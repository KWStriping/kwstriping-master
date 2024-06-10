import type { TransactionCreateMutationVariables } from '@core/api';
import { OrderStatus } from '@mollie/api-client';

import { getTransactionAmountGetter } from '@core/checkout/payments/utils';
import { getMollieEventName, getMollieClient } from './utils';

export const MOLLIE_PAYMENT_PREFIX = 'mollie';

export const verifyPayment = async (
  id: string
): Promise<TransactionCreateMutationVariables | undefined> => {
  const mollieClient = await getMollieClient();

  const { status, amountCaptured, amountRefunded, metadata, method, amount } =
    await mollieClient.orders.get(id);

  const type = `${MOLLIE_PAYMENT_PREFIX}-${method || '(unknown-payment-method)'}`;
  const reference = id;
  const eventName = getMollieEventName(status);

  const getAmount = getTransactionAmountGetter({
    authorized: amount?.value,
    voided: undefined,
    refunded: amountRefunded?.value,
    charged: amountCaptured?.value,
  });

  switch (status) {
    case OrderStatus.created:
    case OrderStatus.pending:
      return {
        id: metadata?.orderId,
        transaction: {
          status,
          reference,
          availableActions: ['VOID'],
          type,
        },
        transactionEvent: {
          status: 'PENDING',
          name: eventName,
        },
      };
    case OrderStatus.canceled:
    case OrderStatus.expired:
      return {
        id: metadata?.orderId,
        transaction: {
          status,
          reference,
          type,
          availableActions: [],
        },
        transactionEvent: {
          status: 'FAILURE',
          name: eventName,
        },
      };
    case OrderStatus.authorized:
      return {
        id: metadata?.orderId,
        transaction: {
          status,
          reference: id,
          type,
          amountAuthorized: {
            amount: getAmount('authorized').toString(),
            currency: amount.currency,
          },
          availableActions: ['CHARGE'],
        },
        transactionEvent: {
          status: 'PENDING',
          name: eventName,
        },
      };
    case OrderStatus.paid: {
      if (amountRefunded) {
        // Order was refunded in Mollie dashboard
        return {
          id: metadata?.orderId,
          transaction: {
            status,
            reference: id,
            type,
            amountRefunded: {
              amount: getAmount('refunded').toString(),
              currency: amountRefunded.currency,
            },
            amountCharged: {
              amount: getAmount('charged').toString(),
              currency: amountCaptured?.currency ?? amountRefunded.currency,
            },
            amountAuthorized: {
              amount: getAmount('authorized').toString(),
              currency: amount.currency,
            },
            availableActions: [],
          },
          transactionEvent: {
            status: 'FAILURE',
            name: getMollieEventName('payment refunded'),
          },
        };
      }
    }
  }
  return {
    id: metadata?.orderId,
    transaction: {
      status,
      reference: id,
      type,
      amountAuthorized: {
        amount: getAmount('authorized').toString(),
        currency: amount.currency,
      },
      amountCharged: amountCaptured && {
        amount: getAmount('charged').toString(),
        currency: amountCaptured.currency,
      },
      availableActions: ['REFUND'],
    },
    transactionEvent: {
      status: 'SUCCESS',
      name: eventName,
    },
  };
};
