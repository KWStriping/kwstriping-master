import type { TransactionActionPayloadFragment } from '@tempo/api/generated/graphql';
import { unpackPromise } from '@tempo/utils/promises';
import invariant from 'ts-invariant';
import { getAdyenClient } from './utils';
import { updateTransaction } from '@tempo/checkout/payments/updateTransaction';
import { getActionsAfterRefund, getIntegerAmountFromTempo } from '@tempo/checkout/payments/utils';
import type { TransactionReversal } from '@tempo/checkout/types/refunds';

export async function handleAdyenRefund(
  refund: TransactionReversal,
  transaction: TransactionActionPayloadFragment['transaction']
) {
  const { id, amount, currency } = refund;
  const { payments, config } = await getAdyenClient();

  invariant(transaction?.id, 'Transaction id is missing');
  const transactionActions = getActionsAfterRefund(transaction, amount);
  const refundRequest = {
    originalReference: 'TODO', // TODO: The pspReference of the original payment
    modificationAmount: {
      currency,
      value: getIntegerAmountFromTempo(amount),
    },
    merchantAccount: config.merchantAccount,
    reference: 'TODO', // TODO: Your reference for the refund
  };
  const [refundError, refundResult] = await unpackPromise(payments.refund(refundRequest));
  if (!refundResult?.pspReference) {
    console.error('No pspReference');
  }
  const status = refundError ? 'FAILURE' : 'PENDING';
  const updateSucceeded = await updateTransaction({
    id: transaction.id,
    transaction: {
      availableActions: transactionActions,
      status,
      type: '', // TODO
    },
    transactionEvent: {
      status,
      name: 'REQUEST_REFUND',
      reference: refundError?.message ?? refundResult?.pspReference ?? '',
    },
  });

  if (!updateSucceeded) {
    console.error("Transaction status couldn't be updated in Tempo");
    throw new Error("Transaction couldn't be updated in Tempo");
  }
}
