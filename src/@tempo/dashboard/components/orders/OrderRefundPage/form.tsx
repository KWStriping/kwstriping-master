import type { ReactNode, FC } from 'react';
import { useEffect } from 'react';
import type { OrderRefundDataQuery } from '@tempo/api/generated/graphql';
import { refundFulfilledStatuses } from './OrderRefundPage';
import { useExitFormDialog } from '@tempo/dashboard/components/forms/Form/useExitFormDialog';
import type {
  CommonUseFormResultWithHandlers,
  SubmitPromise,
} from '@tempo/dashboard/hooks/useForm';
import useForm from '@tempo/dashboard/hooks/useForm';
import type { FormsetChange, FormsetData } from '@tempo/dashboard/hooks/useFormset';
import useFormset from '@tempo/dashboard/hooks/useFormset';
import useHandleFormSubmit from '@tempo/dashboard/hooks/useHandleFormSubmit';

export enum OrderRefundType {
  Miscellaneous = 'miscellaneous',
  Products = 'products',
}
export enum OrderRefundAmountCalculationMode {
  Automatic = 'automatic',
  Manual = 'manual',
  None = 'none',
}

export interface OrderRefundData {
  amount: string;
  type: OrderRefundType;
  refundShipmentCosts: boolean;
  amountCalculationMode: OrderRefundAmountCalculationMode;
}

export interface OrderRefundHandlers {
  changeRefundedProductQuantity: FormsetChange<string>;
  setMaximalRefundedProductQuantities: () => void;
  changeRefundedFulfilledProductQuantity: FormsetChange<string>;
  setMaximalRefundedFulfilledProductQuantities: (fulfillmentId: string) => void;
}

export interface OrderRefundFormData extends OrderRefundData {
  refundedProductQuantities: FormsetData<null, string>;
  refundedFulfilledProductQuantities: FormsetData<null, string>;
}

export type OrderRefundSubmitData = OrderRefundFormData;

export interface UseOrderRefundFormResult
  extends CommonUseFormResultWithHandlers<OrderRefundFormData, OrderRefundHandlers> {
  disabled: boolean;
}

interface OrderRefundFormProps {
  children: (props: UseOrderRefundFormResult) => ReactNode;
  order: OrderRefundDataQuery['order'];
  defaultType: OrderRefundType;
  onSubmit: (data: OrderRefundSubmitData) => SubmitPromise;
  disabled: boolean;
}

function getOrderRefundPageFormData(defaultType: OrderRefundType): OrderRefundData {
  return {
    amount: undefined,
    amountCalculationMode: OrderRefundAmountCalculationMode.Automatic,
    refundShipmentCosts: false,
    type: defaultType,
  };
}

function useOrderRefundForm(
  order: OrderRefundDataQuery['order'],
  defaultType: OrderRefundType,
  onSubmit: (data: OrderRefundSubmitData) => SubmitPromise,
  disabled: boolean
): UseOrderRefundFormResult {
  const {
    handleChange,
    triggerChange,
    data: formData,
    formId,
    setIsSubmitDisabled,
  } = useForm(getOrderRefundPageFormData(defaultType), undefined, {
    confirmLeave: true,
  });

  const { setExitDialogSubmitRef } = useExitFormDialog({
    formId,
  });

  const refundedProductQuantities = useFormset<null, string>(
    order?.lines
      .filter((line) => line.quantityToFulfill > 0)
      .map((line) => ({
        data: null,
        id: line.id,
        label: null,
        value: '0',
      }))
  );
  const refundedFulfilledProductQuantities = useFormset<null, string>(
    order?.fulfillments
      .filter(({ status }) => refundFulfilledStatuses.includes(status))
      .reduce(
        (linesQty, fulfillemnt) =>
          linesQty.concat(
            fulfillemnt.lines.map((fulfillmentLine) => ({
              data: null,
              id: fulfillmentLine.id,
              label: null,
              value: '0',
            }))
          ),
        []
      )
  );

  const handleRefundedProductQuantityChange: FormsetChange<string> = (id, value) => {
    triggerChange();
    refundedProductQuantities.change(id, value);
  };
  const handleRefundedFulFilledProductQuantityChange = (id: string, value: string) => {
    triggerChange();
    refundedFulfilledProductQuantities.change(id, value);
  };
  const handleMaximalRefundedProductQuantitiesSet = () => {
    const newQuantities: FormsetData<null, string> = refundedProductQuantities.data?.map(
      (selectedLine) => {
        const line = order.lines.find((line) => line.id === selectedLine.id);

        return {
          data: null,
          id: line.id,
          label: null,
          value: line.quantityToFulfill.toString(),
        };
      }
    );
    refundedProductQuantities.set(newQuantities);
    triggerChange();
  };
  const handleMaximalRefundedFulfilledProductQuantitiesSet = (fulfillmentId: string) => {
    const fulfillment = order.fulfillments.find(
      (fulfillment) => fulfillment.id === fulfillmentId
    );
    const newQuantities: FormsetData<null, string> = refundedFulfilledProductQuantities.data?.map(
      (selectedLine) => {
        const line = fulfillment.lines.find((line) => line.id === selectedLine.id);

        if (line) {
          return {
            data: null,
            id: line.id,
            label: null,
            value: line.quantity.toString(),
          };
        }
        return selectedLine;
      }
    );
    refundedFulfilledProductQuantities.set(newQuantities);
    triggerChange();
  };

  const data: OrderRefundFormData = {
    ...formData,
    refundedFulfilledProductQuantities: refundedFulfilledProductQuantities.data,
    refundedProductQuantities: refundedProductQuantities.data,
  };

  const handleFormSubmit = useHandleFormSubmit({
    formId,
    onSubmit,
  });

  const submit = () => handleFormSubmit(data);

  useEffect(() => setExitDialogSubmitRef(submit), [submit]);

  const isSaveDisabled = disabled || !order;
  setIsSubmitDisabled(isSaveDisabled);

  return {
    change: handleChange,
    data,
    disabled,
    handlers: {
      changeRefundedFulfilledProductQuantity: handleRefundedFulFilledProductQuantityChange,
      changeRefundedProductQuantity: handleRefundedProductQuantityChange,
      setMaximalRefundedFulfilledProductQuantities:
        handleMaximalRefundedFulfilledProductQuantitiesSet,
      setMaximalRefundedProductQuantities: handleMaximalRefundedProductQuantitiesSet,
    },
    submit,
    isSaveDisabled,
  };
}

const OrderRefundForm: FC<OrderRefundFormProps> = ({
  children,
  order,
  defaultType,
  onSubmit,
  disabled,
}) => {
  const props = useOrderRefundForm(order, defaultType, onSubmit, disabled);

  return <form onSubmit={props.submit}>{children(props)}</form>;
};

OrderRefundForm.displayName = 'OrderRefundForm';
export default OrderRefundForm;
