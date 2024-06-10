import type { TransactionActionPayloadFragment } from '@tempo/api/generated/graphql';
import { unpackPromise } from '@tempo/utils/promises';
import { PaymentStatus } from '@mollie/api-client';
import {
  getMollieEventName,
  getMollieClient,
} from '@tempo/checkout/payments/providers/mollie/utils';
import { updateTransaction } from '@tempo/checkout/payments/updateTransaction';
import { getActionsAfterRefund } from '@tempo/checkout/payments/utils';
import type { TransactionReversal } from '@tempo/checkout/types/refunds';

export async function handleMollieRefund(
  refund: TransactionReversal,
  transaction: TransactionActionPayloadFragment['transaction']
) {
  const mollieClient = await getMollieClient();

  const { id, amount, currency } = refund;
  if (!transaction?.id) {
    throw new Error('Transaction id was not provided');
  }

  const order = await mollieClient.orders.get(id);
  const payments = await order.getPayments();
  const payment = payments.find(
    (payment) => payment.status === PaymentStatus.paid && payment.isRefundable()
  );

  if (!payment) {
    throw new Error("Couldn't find Mollie payment to refund");
  }

  const transactionActions = getActionsAfterRefund(transaction, amount);

  const [refundError, mollieRefund] = await unpackPromise(
    mollieClient.payments_refunds.create({
      paymentId: payment?.id,
      amount: {
        value: String(amount),
        currency,
      },
    })
  );

  const updateSucceeded = await updateTransaction({
    id: transaction.id,
    transaction: {
      availableActions: transactionActions,
    },
    transactionEvent: {
      status: refundError ? 'FAILURE' : 'PENDING',
      name: getMollieEventName('refund requested'),
      reference: refundError?.message ?? mollieRefund?.id,
    },
  });

  if (!updateSucceeded) {
    throw new Error("Transaction couldn't be updated in Tempo");
  }
}
