import type { OrderFragment, OrderLineFragment } from '@tempo/api/generated/graphql';
import type { CreateOrderParams } from '@mollie/api-client';
import createMollieClient, { OrderLineType } from '@mollie/api-client';

export const getMollieClient = async () => {
  const metadata = {} as any; // TODO: await getPrivateSettings(API_URL, false);
  const apiKey = metadata?.paymentProviders?.mollie?.apiKey as string;

  return createMollieClient({
    apiKey,
  });
};

export const parseAmountToString = (amount: number, negative = false) => {
  const value = amount.toFixed(2).toString();

  return negative ? '-' + value : value;
};

const getProductKlass = (line: OrderLineFragment): OrderLineType | undefined => {
  if (!line.variant) {
    return undefined;
  }
  const { isDigital, kind } = line.product.productKlass;
  if (isDigital || kind === 'GIFT_CARD') {
    return OrderLineType.digital;
  }
  if (kind === 'NORMAL') {
    return OrderLineType.physical;
  }
  throw new Error('Unknown product type: ' + kind);
};

export const getDiscountLines = (
  discounts: OrderFragment['discounts']
): CreateOrderParams['lines'] =>
  discounts
    ? discounts.map((discount) => ({
        name: discount.name || 'Discount',
        quantity: 1,
        vatRate: '0.00',
        vatAmount: {
          currency: discount.amount.currency,
          value: '0.00',
        },
        unitPrice: {
          currency: discount.amount.currency,
          value: parseAmountToString(discount.amount.amount, true),
        },
        totalAmount: {
          currency: discount.amount.currency,
          value: parseAmountToString(discount.amount.amount, true),
        },
        type: OrderLineType.discount,
      }))
    : [];

export const getShippingLines = (data: OrderFragment): CreateOrderParams['lines'] => [
  {
    name: data?.shippingMethodName || 'Shipping',
    quantity: 1,
    vatRate: parseAmountToString(data?.shippingTaxRate * 100),
    vatAmount: {
      currency: data?.shippingPrice?.tax?.currency,
      value: parseAmountToString(data?.shippingPrice?.tax?.amount),
    },
    unitPrice: {
      currency: data?.shippingPrice?.gross?.currency,
      value: parseAmountToString(data?.shippingPrice?.gross?.amount),
    },
    totalAmount: {
      currency: data?.shippingPrice?.gross?.currency,
      value: parseAmountToString(data?.shippingPrice?.gross?.amount),
    },
    type: OrderLineType.shipping_fee,
  },
];

export const getLines = (lines: OrderFragment['lines']) =>
  lines.map((line) => ({
    name: line.productName + ' - ' + line.productName,
    quantity: line.quantity,
    vatRate: parseAmountToString(line.taxRate * 100),
    vatAmount: {
      currency: line.totalPrice.tax.currency,
      value: parseAmountToString(line.totalPrice.tax.amount),
    },
    unitPrice: {
      currency: line.unitPrice.gross.currency,
      value: parseAmountToString(line.unitPrice.gross.amount),
    },
    totalAmount: {
      currency: line.totalPrice.gross.currency,
      value: parseAmountToString(line.totalPrice.gross.amount),
    },
    type: getProductKlass(line),
  }));

export const getMollieEventName = (status: string) => {
  return `Mollie status update: ${status}`;
};
