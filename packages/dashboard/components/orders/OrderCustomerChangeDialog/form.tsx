import type { FormEvent, FC, ReactNode } from 'react';
import type { CommonUseFormResult } from '@dashboard/hooks/useForm';
import useForm from '@dashboard/hooks/useForm';
import useHandleFormSubmit from '@dashboard/hooks/useHandleFormSubmit';

export enum CustomerChangeActionEnum {
  KeepAddress = 'keepAddress',
  ChangeAddress = 'changeAddress',
}

export interface OrderCustomerChangeData {
  changeActionOption: CustomerChangeActionEnum;
}

type UseOrderCustomerChangeFormResult = CommonUseFormResult<OrderCustomerChangeData>;

export interface OrderCustomerChangeFormProps {
  children: (props: UseOrderCustomerChangeFormResult) => ReactNode;
  initial?: Partial<OrderCustomerChangeData>;
  onSubmit: (data: OrderCustomerChangeData) => void;
}

const defaultInitialFormData: OrderCustomerChangeData = {
  changeActionOption: CustomerChangeActionEnum.KeepAddress,
};

function useOrderCustomerChangeForm(
  initial: Partial<OrderCustomerChangeData> = {},
  onSubmit: (data: OrderCustomerChangeData) => void
): UseOrderCustomerChangeFormResult {
  const { handleChange, data } = useForm({
    ...initial,
    ...defaultInitialFormData,
  });

  const handleFormSubmit = useHandleFormSubmit({
    onSubmit,
  });

  const handleSubmit = () => handleFormSubmit(data);

  const submit = (event: FormEvent<unknown>) => {
    event.stopPropagation();
    event.preventDefault();
    return handleSubmit();
  };

  return {
    change: handleChange,
    submit,
    data,
  };
}

const OrderCustomerChangeForm: FC<OrderCustomerChangeFormProps> = ({
  children,
  initial,
  onSubmit,
}) => {
  const props = useOrderCustomerChangeForm(initial, onSubmit);

  return <form onSubmit={props.submit}>{children(props)}</form>;
};

OrderCustomerChangeForm.displayName = 'OrderCustomerChangeForm';
export default OrderCustomerChangeForm;
