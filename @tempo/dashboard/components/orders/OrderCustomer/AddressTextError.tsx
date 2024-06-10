import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';
import type { OrderErrorFragment } from '@tempo/api/generated/graphql';
import getOrderErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/order';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

// import { useAddressTextErrorStyles } from "./styles";

interface AddressTextErrorProps {
  orderError: Maybe<OrderErrorFragment>;
}

export const AddressTextError: FC<AddressTextErrorProps> = ({ orderError }) => {
  // const styles = useAddressTextErrorStyles();

  const styles = {};
  return (
    <>
      <Typography variant="body2" className={styles.textError ?? ''}>
        {getOrderErrorMessage(orderError, t)}
      </Typography>
      <FormSpacer />
    </>
  );
};
