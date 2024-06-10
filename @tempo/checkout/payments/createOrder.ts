import type { OrderFragment, LanguageCode } from '@tempo/api/generated/graphql';
import { CheckoutDocument, CreateOrderDocument } from '@tempo/api/generated/graphql';
import { getClient } from '@tempo/api/server';
import type { RequestContext } from '@tempo/api/types';

import type { Errors } from './types';

export const createOrder = async (
  {
    checkoutId,
    totalAmount,
    languageCode,
  }: {
    checkoutId: string;
    totalAmount: number;
    languageCode: LanguageCode;
  },
  ctx: RequestContext
): Promise<
  | {
      data: OrderFragment;
    }
  | {
      errors: Errors;
    }
> => {
  // Start by checking if total amount is correct
  const client = getClient(ctx);
  const checkout = await client
    .query(CheckoutDocument, {
      id: checkoutId,
      languageCode,
    })
    .toPromise();
  console.log('checkout', checkout);
  if (checkout.error) {
    throw checkout.error;
  }

  if (!checkout.data?.checkout) {
    console.error('Checkout not found', checkout);
    return {
      errors: ['CHECKOUT_NOT_FOUND'],
    };
  }

  if (checkout.data?.checkout?.totalPrice.gross.amount !== totalAmount) {
    return {
      errors: ['TOTAL_AMOUNT_MISMATCH'],
    };
  }

  const { data, error } = await client
    .mutation(CreateOrderDocument, {
      id: checkoutId,
    })
    .toPromise();

  // if (error) throw error;

  if (!data?.createOrderFromCheckout?.result) {
    return {
      errors: error?.graphQLErrors.map((e) => {
        console.error(e.code, ':', e.message);
        return e.code;
      }) || ['COULD_NOT_CREATE_ORDER_FROM_CHECKOUT'],
    };
  }

  if (process.env.DEMO_MODE) {
    return {
      data: {
        ...data?.createOrderFromCheckout?.result,
        userEmail: 'checkout@example.com',
      },
    };
  }

  return { data: data?.createOrderFromCheckout?.result };
};
