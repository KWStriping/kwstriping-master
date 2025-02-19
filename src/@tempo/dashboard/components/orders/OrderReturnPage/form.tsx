import { getById } from '@tempo/utils';
import { FulfillmentStatus } from '@tempo/api/generated/constants';
import type { OrderDetailsFragment } from '@tempo/api/generated/graphql';
import { useEffect } from 'react';
import type { ReactNode, FC } from 'react';
import { OrderRefundAmountCalculationMode } from '../OrderRefundPage/form';
import {
  getLineItem,
  getOrderUnfulfilledLines,
  getParsedLineData,
  getParsedLineDataForFulfillmentStatus,
} from './utils';
import { useExitFormDialog } from '@tempo/dashboard/components/forms/Form/useExitFormDialog';
import type {
  CommonUseFormResultWithHandlers,
  SubmitPromise,
} from '@tempo/dashboard/hooks/useForm';
import useForm from '@tempo/dashboard/hooks/useForm';
import type { FormsetChange, FormsetData } from '@tempo/dashboard/hooks/useFormset';
import useFormset from '@tempo/dashboard/hooks/useFormset';
import useHandleFormSubmit from '@tempo/dashboard/hooks/useHandleFormSubmit';

export interface LineItemOptions<T> {
  initialValue: T;
  isFulfillment?: boolean;
  isRefunded?: boolean;
}

export interface LineItemData {
  isFulfillment: boolean;
  isRefunded: boolean;
}

export type FormsetQuantityData = FormsetData<LineItemData, number>;
export type FormsetReplacementData = FormsetData<LineItemData, boolean>;

export interface OrderReturnData {
  amount: number;
  refundShipmentCosts: boolean;
  amountCalculationMode: OrderRefundAmountCalculationMode;
}

export interface OrderReturnHandlers {
  changeFulfiledItemsQuantity: FormsetChange<number>;
  changeWaitingItemsQuantity: FormsetChange<number>;
  changeUnfulfiledItemsQuantity: FormsetChange<number>;
  changeItemsToBeReplaced: FormsetChange<boolean>;
  handleSetMaximalItemsQuantities;
  handleSetMaximalUnfulfiledItemsQuantities;
}

export interface OrderReturnFormData extends OrderReturnData {
  itemsToBeReplaced: FormsetReplacementData;
  fulfilledItemsQuantities: FormsetQuantityData;
  waitingItemsQuantities: FormsetQuantityData;
  unfulfilledItemsQuantities: FormsetQuantityData;
}

export type OrderRefundSubmitData = OrderReturnFormData;

export type UseOrderRefundFormResult = CommonUseFormResultWithHandlers<
  OrderReturnFormData,
  OrderReturnHandlers
>;

interface OrderReturnProps {
  children: (props: UseOrderRefundFormResult) => ReactNode;
  order: Maybe<OrderDetailsFragment>;
  onSubmit: (data: OrderRefundSubmitData) => SubmitPromise;
}

const getOrderRefundPageFormData = (): OrderReturnData => ({
  amount: undefined,
  amountCalculationMode: OrderRefundAmountCalculationMode.Automatic,
  refundShipmentCosts: false,
});

function useOrderReturnForm(
  order: OrderDetailsFragment,
  onSubmit: (data: OrderRefundSubmitData) => SubmitPromise
): UseOrderRefundFormResult {
  const {
    handleChange,
    data: formData,
    triggerChange,
    formId,
    setIsSubmitDisabled,
  } = useForm(getOrderRefundPageFormData(), undefined, {
    confirmLeave: true,
  });

  const { setExitDialogSubmitRef } = useExitFormDialog({
    formId,
  });

  const unfulfiledItemsQuantites = useFormset<LineItemData, number>(
    getOrderUnfulfilledLines(order).map(getParsedLineData({ initialValue: 0 }))
  );

  const getItemsFulfilled = () => {
    const commonOptions = {
      initialValue: 0,
      isFulfillment: true,
    };

    const refundedFulfilmentsItems = getParsedLineDataForFulfillmentStatus(
      order,
      FulfillmentStatus.Refunded,
      { ...commonOptions, isRefunded: true }
    );

    const fulfilledFulfillmentsItems = getParsedLineDataForFulfillmentStatus(
      order,
      FulfillmentStatus.Fulfilled,
      commonOptions
    );

    return refundedFulfilmentsItems.concat(fulfilledFulfillmentsItems);
  };

  const getItemsWaiting = () => {
    const commonOptions = {
      initialValue: 0,
      isFulfillment: true,
    };

    return getParsedLineDataForFulfillmentStatus(
      order,
      FulfillmentStatus.WaitingForApproval,
      commonOptions
    );
  };

  const fulfiledItemsQuatities = useFormset<LineItemData, number>(getItemsFulfilled());

  const waitingItemsQuantities = useFormset<LineItemData, number>(getItemsWaiting());

  const getItemsToBeReplaced = () => {
    if (!order) {
      return [];
    }

    const orderLinesItems = getOrderUnfulfilledLines(order).map(
      getParsedLineData({ initialValue: false })
    );

    const refundedFulfilmentsItems = getParsedLineDataForFulfillmentStatus(
      order,
      FulfillmentStatus.Refunded,
      { initialValue: false, isFulfillment: true }
    );

    const fulfilledFulfillmentsItems = getParsedLineDataForFulfillmentStatus(
      order,
      FulfillmentStatus.Fulfilled,
      { initialValue: false, isFulfillment: true }
    );

    const waitingFulfillmentsItems = getParsedLineDataForFulfillmentStatus(
      order,
      FulfillmentStatus.WaitingForApproval,
      { initialValue: false, isFulfillment: true }
    );

    return [
      ...orderLinesItems,
      ...refundedFulfilmentsItems,
      ...fulfilledFulfillmentsItems,
      ...waitingFulfillmentsItems,
    ];
  };

  const itemsToBeReplaced = useFormset<LineItemData, boolean>(getItemsToBeReplaced());

  const handleSetMaximalUnfulfiledItemsQuantities = () => {
    const newQuantities: FormsetQuantityData = unfulfiledItemsQuantites.data?.map(({ id }) => {
      const line = order.lines.find(getById(id));
      const initialValue = line.quantityToFulfill;

      return getLineItem(line, { initialValue });
    });

    triggerChange();
    unfulfiledItemsQuantites.set(newQuantities);
  };

  const handleSetMaximalItemsQuantities = (fulfillmentId: string) => () => {
    const fulfillment = order.fulfillments.find(getById(fulfillmentId));

    const quantities =
      fulfillment.status === FulfillmentStatus.WaitingForApproval
        ? waitingItemsQuantities
        : fulfiledItemsQuatities;

    const newQuantities: FormsetQuantityData = quantities.data?.map((item) => {
      const line = fulfillment.lines.find(getById(item.id));

      if (!line) {
        return item;
      }

      return getLineItem(line, {
        initialValue: line.quantity,
        isRefunded: item.data?.isRefunded,
      });
    });

    triggerChange();
    quantities.set(newQuantities);
  };

  const data: OrderReturnFormData = {
    fulfilledItemsQuantities: fulfiledItemsQuatities.data,
    waitingItemsQuantities: waitingItemsQuantities.data,
    itemsToBeReplaced: itemsToBeReplaced.data,
    unfulfilledItemsQuantities: unfulfiledItemsQuantites.data,
    ...formData,
  };

  const handleFormSubmit = useHandleFormSubmit({
    formId,
    onSubmit,
  });

  const submit = () => handleFormSubmit(data);

  useEffect(() => setExitDialogSubmitRef(submit), [submit]);

  function handleHandlerChange<T>(callback: (id: string, value: T) => void) {
    return (id: string, value: T) => {
      triggerChange();
      callback(id, value);
    };
  }

  const hasAnyItemsSelected =
    fulfiledItemsQuatities.data?.some(({ value }) => !!value) ||
    waitingItemsQuantities.data?.some(({ value }) => !!value) ||
    unfulfiledItemsQuantites.data?.some(({ value }) => !!value);

  const isSaveDisabled = !hasAnyItemsSelected;
  setIsSubmitDisabled(isSaveDisabled);

  return {
    change: handleChange,
    data,
    handlers: {
      changeFulfiledItemsQuantity: handleHandlerChange(fulfiledItemsQuatities.change),
      changeWaitingItemsQuantity: handleHandlerChange(waitingItemsQuantities.change),
      changeItemsToBeReplaced: handleHandlerChange(itemsToBeReplaced.change),
      changeUnfulfiledItemsQuantity: handleHandlerChange(unfulfiledItemsQuantites.change),
      handleSetMaximalItemsQuantities,
      handleSetMaximalUnfulfiledItemsQuantities,
    },
    submit,
    isSaveDisabled,
  };
}

const OrderReturnForm: FC<OrderReturnProps> = ({ children, order, onSubmit }) => {
  const props = useOrderReturnForm(order, onSubmit);

  return <form>{children(props)}</form>;
};

export default OrderReturnForm;
