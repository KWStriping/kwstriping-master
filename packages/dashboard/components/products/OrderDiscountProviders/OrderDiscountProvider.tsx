import { useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import useNotifier, { useDefaultNotifierSuccessErrorData } from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { createContext } from 'react';
import type { FC, ReactNode } from 'react';

import type { OrderDiscountConsumerCommonProps, OrderDiscountData } from './types';
import { getManualOrderDiscount, getParsedDiscountData, useDiscountDialog } from './utils';
import type { OrderDetailsFragment } from '@core/api/graphql';
import {
  OrderDiscountAddDocument,
  OrderDiscountDeleteDocument,
  OrderDiscountUpdateDocument,
} from '@core/api/graphql';
import type { OrderDiscountCommonInput } from '@dashboard/components/orders/OrderDiscountCommonModal/types';

export interface OrderDiscountContextConsumerProps extends OrderDiscountConsumerCommonProps {
  addDiscountToOrderStatus: ConfirmButtonTransitionState;
  orderDiscountRemoveStatus: ConfirmButtonTransitionState;
  orderDiscount?: OrderDiscountData;
  addOrderDiscount: (data: OrderDiscountCommonInput) => void;
  removeOrderDiscount: () => void;
}

interface OrderDiscountProviderProps {
  children: ReactNode;
  order?: Maybe<OrderDetailsFragment>;
}

export const OrderDiscountProvider: FC<OrderDiscountProviderProps> = ({ children, order }) => {
  const { t } = useTranslation();
  const notify = useNotifier();

  const { id: orderId } = order;

  const { isDialogOpen, openDialog, closeDialog } = useDiscountDialog();

  const orderDiscount = getManualOrderDiscount(order);

  const [addDiscountToOrder, addDiscountToOrderOpts] = useMutation(OrderDiscountAddDocument, {
    onCompleted: ({ addDiscountToOrder: { errors } }) => handleDiscountDataSubmission(errors),
  });

  const [_updateOrderDiscount, updateOrderDiscountOpts] = useMutation(
    OrderDiscountUpdateDocument,
    {
      onCompleted: ({ updateOrderDiscount: { errors } }) => handleDiscountDataSubmission(errors),
    }
  );

  const [orderDiscountRemove, orderDiscountRemoveOpts] = useMutation(
    OrderDiscountDeleteDocument,
    {
      onCompleted: ({ deleteOrderDiscount: { errors } }) => handleDiscountDataSubmission(errors),
    }
  );

  const handleDiscountDataSubmission = (errors: unknown[]) => {
    closeDialog();
    notify(useDefaultNotifierSuccessErrorData(errors, t));
  };

  const addOrderDiscount = (data: OrderDiscountCommonInput) =>
    addDiscountToOrder({
      orderId,
      input: getParsedDiscountData(data),
    });

  const updateOrderDiscount = (data: OrderDiscountCommonInput) =>
    orderDiscount &&
    _updateOrderDiscount({
      discountId: orderDiscount?.id,
      input: getParsedDiscountData(data),
    });

  const removeOrderDiscount = () =>
    orderDiscount && orderDiscountRemove({ discountId: orderDiscount.id });

  const orderDiscountAction = orderDiscount ? updateOrderDiscount : addOrderDiscount;

  const addDiscountToOrderStatus = orderDiscount
    ? updateOrderDiscountOpts.status
    : addDiscountToOrderOpts.status;

  const discountProviderValues: OrderDiscountContextConsumerProps = {
    addDiscountToOrderStatus,
    orderDiscountRemoveStatus: orderDiscountRemoveOpts.status,
    orderDiscount,
    addOrderDiscount: orderDiscountAction,
    removeOrderDiscount,
    isDialogOpen,
    closeDialog,
    openDialog,
    discountedPrice: order.total.gross,
    undiscountedPrice: order.undiscountedTotal.gross,
  };

  return (
    <OrderDiscountContext.Provider value={discountProviderValues}>
      {children}
    </OrderDiscountContext.Provider>
  );
};

export const OrderDiscountContext = createContext<OrderDiscountContextConsumerProps>(null);
