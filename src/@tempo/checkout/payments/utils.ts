import type {
  TransactionActionType,
  TransactionActionPayloadFragment,
  TransactionItem,
} from '@tempo/api/generated/graphql';
import currency from 'currency.js';
import { ADYEN_PAYMENT_PREFIX } from './providers/adyen';
import { MOLLIE_PAYMENT_PREFIX } from './providers/mollie';

export const formatRedirectUrl = (redirectUrl: string, orderId: string) => {
  const url = new URL(redirectUrl);
  url.searchParams.set('order', orderId);

  return url.toString();
};

type Money = string | number | undefined;

type Amounts = {
  charged: Money;
  authorized: Money;
  refunded: Money;
  voided: Money;
};

const notNegative = (number: number) => (number < 0 ? 0 : number);

export const getTransactionAmountGetter = (amounts: Amounts) => {
  const charged = amounts?.charged ?? 0;
  const authorized = amounts?.authorized ?? 0;
  const refunded = amounts?.refunded ?? 0;
  const voided = amounts?.voided ?? 0;

  return (type: keyof Amounts): number => {
    switch (type) {
      case 'refunded':
        return currency(refunded).value;
      case 'voided':
        return currency(voided).value;
      case 'charged':
        return notNegative(currency(charged).subtract(refunded).subtract(voided).value);
      case 'authorized':
        return notNegative(
          currency(authorized).subtract(charged).subtract(refunded).subtract(voided).value
        );
    }
  };
};

export const getTransactionAmountGetterAsMoney = (amounts: Amounts) => (type: keyof Amounts) =>
  currency(getTransactionAmountGetter(amounts)(type));

export const getActionsAfterRefund = (
  transaction: TransactionActionPayloadFragment['transaction'],
  refundAmount: number
) => {
  const getTransactionAmount = getTransactionAmountGetter({
    voided: transaction?.amountVoided.amount,
    charged: transaction?.amountCharged.amount,
    refunded: transaction?.amountRefunded.amount,
    authorized: transaction?.amountAuthorized.amount,
  });

  const transactionActions: TransactionActionType[] = [];

  if (getTransactionAmount('charged') < Number(refundAmount)) {
    // Some money in transaction was not refunded
    transactionActions.push('REFUND');
  }

  if (Number(refundAmount) > getTransactionAmount('charged')) {
    // Refunded more than charged
    throw new Error('Cannot refund more than charged in transaction');
  }

  return transactionActions;
};

type TransactionWithType = Pick<TransactionItem, 'type'>;

export const isMollieTransaction = (transaction: TransactionWithType) => {
  return transaction.type.includes(MOLLIE_PAYMENT_PREFIX);
};

export const isAdyenTransaction = (transaction: TransactionWithType) => {
  return transaction.type.includes(ADYEN_PAYMENT_PREFIX);
};
// Some payment methods expect the amount to be in cents (integers)
// Tempo provides and expects the amount to be in dollars (decimal format / floats)
export const getIntegerAmountFromTempo = (dollars: number) =>
  Number.parseInt((dollars * 100).toFixed(0), 10);

// Some payment methods expect the amount to be in cents (integers)
// Tempo provides and expects the amount to be in dollars (decimal format / floats)
export const getTempoAmountFromInteger = (cents: number) =>
  Number.parseFloat((cents / 100).toFixed(2));
