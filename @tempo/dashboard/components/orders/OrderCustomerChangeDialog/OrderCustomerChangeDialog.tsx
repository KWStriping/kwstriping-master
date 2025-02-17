import * as m from '@paraglide/messages';
import ConfirmButton from '@tempo/ui/components/buttons/ConfirmButton';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import type { OrderCustomerChangeData } from './form';
import OrderCustomerChangeForm, { CustomerChangeActionEnum } from './form';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';

export interface OrderCustomerChangeDialogProps {
  open: boolean;
  onConfirm: (data: OrderCustomerChangeData) => void;
  onClose();
}

const OrderCustomerChangeDialog: FC<OrderCustomerChangeDialogProps> = (props) => {
  const { open, onClose, onConfirm } = props;

  return (
    <Dialog onClose={onClose} open={open}>
      <OrderCustomerChangeForm onSubmit={onConfirm}>
        {({ change, data }) => (
          <>
            <DialogTitle>{m.dashboard_title() ?? 'Changed Customer'}</DialogTitle>
            <DialogContent className={styles.overflow ?? ''}>
              <Typography>
                {m.dashboard_description() ??
                  'You have changed customer assigned to this order. What would you like to do with the shipping address?'}
              </Typography>
              <FormSpacer />
              <RadioGroup
                className={styles.container ?? ''}
                value={data?.changeActionOption}
                name="changeActionOption"
                onChange={(event) => change(event)}
              >
                <FormControlLabel
                  value={CustomerChangeActionEnum.KeepAddress}
                  control={<Radio color="primary" />}
                  label={m.dashboard_eepAddress() ?? 'Keep address'}
                  className={styles.optionLabel ?? ''}
                />
                <FormControlLabel
                  value={CustomerChangeActionEnum.ChangeAddress}
                  control={<Radio color="primary" />}
                  label={m.dashboard_hangeAddress() ?? 'Change address'}
                  className={styles.optionLabel ?? ''}
                />
              </RadioGroup>
            </DialogContent>
            <DialogActions>
              <ConfirmButton transitionState="default" type="submit">
                {m.dashboard_ontinue() ?? 'Continue'}
              </ConfirmButton>
            </DialogActions>
          </>
        )}
      </OrderCustomerChangeForm>
    </Dialog>
  );
};

OrderCustomerChangeDialog.displayName = 'OrderCustomerChangeDialog';
export default OrderCustomerChangeDialog;
