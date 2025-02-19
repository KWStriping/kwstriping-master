import compact from 'lodash-es/compact';
import { GiftCardEventsEnum, ChargeStatus } from '@tempo/api/generated/constants';
import type { OrderDetailsFragment } from '@tempo/api/generated/graphql';
import type { IMoney } from '@tempo/dashboard/components/core/Money';
import { subtractMoney } from '@tempo/dashboard/components/core/Money';

export const extractOrderGiftCardUsedAmount = (
  order?: OrderDetailsFragment
): number | undefined => {
  if (!order) {
    return undefined;
  }

  const { id, giftCards } = order;

  const usedInOrderEvents = compact(
    giftCards.map(({ events }) =>
      events.find(
        ({ orderId, type }) => type === GiftCardEventsEnum.UsedInOrder && orderId === id
      )
    )
  );

  if (!usedInOrderEvents.length) {
    return undefined;
  }

  return usedInOrderEvents.reduce((resultAmount, { balance }) => {
    const { currentBalance, oldCurrentBalance } = balance;

    const amountToAdd = oldCurrentBalance.amount - currentBalance.amount;

    return resultAmount + amountToAdd;
  }, 0);
};

export const extractOutstandingBalance = (order: OrderDetailsFragment): IMoney =>
  order?.totalCaptured &&
  order?.total?.gross &&
  subtractMoney(order.total.gross, order.totalCaptured);

export const extractRefundedAmount = (order: OrderDetailsFragment): IMoney => {
  if (order?.paymentStatus === ChargeStatus.FullyRefunded) {
    return order?.total?.gross;
  }
  if (order?.paymentStatus === ChargeStatus.PartiallyRefunded) {
    return extractOutstandingBalance(order);
  }
  return (
    order?.total?.gross && {
      amount: 0,
      currency: order.total.gross.currency,
    }
  );
};
