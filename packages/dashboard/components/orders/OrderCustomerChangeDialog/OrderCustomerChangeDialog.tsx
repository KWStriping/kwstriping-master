import { useTranslation } from '@core/i18n';
import ConfirmButton from '@core/ui/components/buttons/ConfirmButton';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
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

export interface OrderCustomerChangeDialogProps {
  open: boolean;
  onConfirm: (data: OrderCustomerChangeData) => void;
  onClose();
}

const OrderCustomerChangeDialog: FC<OrderCustomerChangeDialogProps> = (props) => {
  const { open, onClose, onConfirm } = props;
  const { t } = useTranslation();

  return (
    <Dialog onClose={onClose} open={open}>
      <OrderCustomerChangeForm onSubmit={onConfirm}>
        {({ change, data }) => (
          <>
            <DialogTitle>{t('dashboard.title', 'Changed Customer')}</DialogTitle>
            <DialogContent className={styles.overflow ?? ''}>
              <Typography>
                {t(
                  'dashboard.description',
                  'You have changed customer assigned to this order. What would you like to do with the shipping address?'
                )}
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
                  label={t('dashboard.eepAddress', 'Keep address')}
                  className={styles.optionLabel ?? ''}
                />
                <FormControlLabel
                  value={CustomerChangeActionEnum.ChangeAddress}
                  control={<Radio color="primary" />}
                  label={t('dashboard.hangeAddress', 'Change address')}
                  className={styles.optionLabel ?? ''}
                />
              </RadioGroup>
            </DialogContent>
            <DialogActions>
              <ConfirmButton transitionState="default" type="submit">
                {t('dashboard.ontinue', 'Continue')}
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
