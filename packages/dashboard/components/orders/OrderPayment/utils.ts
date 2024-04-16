import compact from 'lodash-es/compact';
import type { IMoney } from '@dashboard/components/core/Money';
import { subtractMoney } from '@dashboard/components/core/Money';
import { GiftCardEventsEnum, ChargeStatus } from '@core/api/constants';
import type { OrderDetailsFragment } from '@core/api/graphql';

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
