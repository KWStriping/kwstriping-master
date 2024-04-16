import { useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import useNotifier, { useDefaultNotifierSuccessErrorData } from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { getById } from '@core/utils';
import { createContext, useState } from 'react';
import type { FC, ReactNode } from 'react';

import type {
  GetOrderLineDiscountContextConsumerProps,
  OrderDiscountConsumerCommonProps,
  OrderLineDiscountConsumerProps,
  OrderLineDiscountData,
} from './types';
import { getOrderLineDiscount, getParsedDiscountData, useDiscountDialog } from './utils';
import type { OrderDetailsFragment } from '@core/api/graphql';
import { OrderLineDiscountRemoveDocument } from '@core/api/graphql';
import type { OrderDiscountCommonInput } from '@dashboard/components/orders/OrderDiscountCommonModal/types';

export interface OrderLineDiscountContextConsumerProps extends OrderDiscountConsumerCommonProps {
  addOrderLineDiscount: (data: OrderDiscountCommonInput) => void;
  removeOrderLineDiscount: () => void;
  orderLineDiscount?: OrderLineDiscountData;
  updateOrderLineDiscountStatus: ConfirmButtonTransitionState;
  removeOrderLineDiscountStatus: ConfirmButtonTransitionState;
}

interface DiscountProviderProps {
  children: ReactNode;
  order: Maybe<OrderDetailsFragment>;
}

export const OrderLineDiscountContext =
  createContext<GetOrderLineDiscountContextConsumerProps>(null);

export const OrderLineDiscountProvider: FC<DiscountProviderProps> = ({ children, order }) => {
  const { t } = useTranslation();
  const notify = useNotifier();
  const { isDialogOpen, openDialog, closeDialog } = useDiscountDialog();
  const [currentLineId, setCurrentLineId] = useState<string | null>(null);

  const handleOpenDialog = (orderLineId: string) => () => {
    setCurrentLineId(orderLineId);
    openDialog();
  };

  const handleCloseDialog = () => {
    setCurrentLineId(null);
    closeDialog();
  };

  const [orderLineDiscountAddOrUpdate, orderLineDiscountAddOrUpdateOpts] = useMutation(
    OrderLineDiscountUpdateDocument,
    {
      onCompleted: ({ updateOrderLineDiscount: { errors } }) =>
        handleDiscountDataSubmission(errors),
    }
  );

  const [removeOrderLineDiscount, removeOrderLineDiscountOpts] = useMutation(
    OrderLineDiscountRemoveDocument,
    {
      onCompleted: ({ removeOrderLineDiscount: { errors } }) =>
        handleDiscountDataSubmission(errors),
    }
  );

  const handleDiscountDataSubmission = (errors: unknown[]) => {
    closeDialog();
    notify(useDefaultNotifierSuccessErrorData(errors, t));
  };

  const addOrUpdateOrderLineDiscount =
    (orderLineId: string) => (input: OrderDiscountCommonInput) =>
      orderLineDiscountAddOrUpdate({
        orderLineId,
        input: getParsedDiscountData(input),
      });

  const isOrderLineDialogOpen = (orderLineId: string) =>
    isDialogOpen && currentLineId === orderLineId;

  const getOrderLine = (orderLineId: string) => order?.lines.find(getById(orderLineId));

  const getDiscountProviderValues = (
    orderLineId: string
  ): OrderLineDiscountContextConsumerProps => ({
    addOrderLineDiscount: addOrUpdateOrderLineDiscount(orderLineId),
    removeOrderLineDiscount: removeOrderLineDiscount({ orderLineId }),
    orderLineDiscount: getOrderLineDiscount(order, orderLineId),
    isDialogOpen: isOrderLineDialogOpen(orderLineId),
    updateOrderLineDiscountStatus: orderLineDiscountAddOrUpdateOpts.status,
    removeOrderLineDiscountStatus: removeOrderLineDiscountOpts.status,
    closeDialog: handleCloseDialog,
    openDialog: handleOpenDialog(orderLineId),
    discountedPrice: getOrderLine(orderLineId).unitPrice.gross,
    undiscountedPrice: getOrderLine(orderLineId).undiscountedUnitPrice.gross,
  });

  return (
    <OrderLineDiscountContext.Provider value={getDiscountProviderValues}>
      {children}
    </OrderLineDiscountContext.Provider>
  );
};

export const OrderLineDiscountConsumer: FC<OrderLineDiscountConsumerProps> = ({
  children,
  orderLineId,
}) => (
  <OrderLineDiscountContext.Consumer>
    {(getValues: GetOrderLineDiscountContextConsumerProps) => children(getValues(orderLineId))}
  </OrderLineDiscountContext.Consumer>
);
