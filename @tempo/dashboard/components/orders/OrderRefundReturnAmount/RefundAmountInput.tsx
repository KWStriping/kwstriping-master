import * as m from '@paraglide/messages';
import type { OrderErrorFragment } from '@tempo/api/generated/graphql';
import type { ChangeEvent, FC } from 'react';
import type { OrderRefundFormData } from '../OrderRefundPage/form';
import type { IMoney } from '@tempo/dashboard/components/core/Money';
import PriceField from '@tempo/dashboard/components/fields/PriceField';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import getOrderErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/order';

interface RefundAmountInputProps {
  data: OrderRefundFormData;
  maxRefund: IMoney;
  currencySymbol: string;
  amountTooSmall: boolean;
  amountTooBig: boolean;
  disabled: boolean;
  errors: OrderErrorFragment[];
  onChange: (event: ChangeEvent<unknown>) => void;
}

const messages = {
  amountTooBig: {
    id: 'fbH51z',
    defaultMessage: 'Amount cannot be bigger than max refund',
    description: 'Amount error message',
  },
  amountTooSmall: {
    id: 'IKvOK+',
    defaultMessage: 'Amount must be bigger than 0',
    description: 'Amount error message',
  },
  label: {
    id: 'lrq8O6',
    defaultMessage: 'Amount',
    description: 'order refund amount, input label',
  },
};

const RefundAmountInput: FC<RefundAmountInputProps> = (props) => {
  const {
    data,
    maxRefund,
    amountTooSmall,
    amountTooBig,
    currencySymbol,
    disabled,
    errors,
    onChange,
  } = props;
  const styles = useStyles(props);
  const formErrors = getFormErrors(['amount'], errors);

  const isError = !!formErrors.amount || amountTooSmall || amountTooBig;

  return (
    <PriceField
      disabled={disabled}
      onChange={onChange}
      currencySymbol={currencySymbol}
      name={'amount' as keyof FormData}
      value={data?.amount}
      label={m.dashboard_abel() ?? 'Amount'}
      className={styles.priceField ?? ''}
      InputProps={{ inputProps: { max: maxRefund?.amount } }}
      inputProps={{
        'data-test-id': 'amountInput',
        max: maxRefund?.amount,
      }}
      error={isError}
      hint={
        getOrderErrorMessage(formErrors.amount, t) ||
        (amountTooSmall && (m.dashboard_mountTooSmall() ?? 'Amount must be bigger than 0')) ||
        (amountTooBig && (m.dashboard_mountTooBig() ?? 'Amount cannot be bigger than max refund'))
      }
    />
  );
};

export default RefundAmountInput;
