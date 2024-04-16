import { useTranslation } from '@core/i18n';
import BackButton from '@core/ui/components/buttons/BackButton';
import ConfirmButton from '@core/ui/components/buttons/ConfirmButton';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import { makeStyles } from '@core/ui/theme/styles';
import SingleAutocompleteSelectField from '@dashboard/components/fields/SingleAutocompleteSelectField';
import Form from '@dashboard/components/forms/Form';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
import type { OrderErrorFragment, WarehouseFragment } from '@core/api/graphql';
import getOrderErrorMessage from '@dashboard/oldSrc/utils/errors/order';
import createSingleAutocompleteSelectHandler from '@dashboard/oldSrc/utils/handlers/singleAutocompleteSelectChangeHandler';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import type { FC } from 'react';

export interface OrderFulfillmentCancelDialogFormData {
  warehouseId: string;
}

const useStyles = makeStyles(
  (theme) => ({
    enableOverflow: {
      overflow: 'visible',
    },
    paragraph: {
      marginBottom: theme.spacing(2),
    },
    selectCcontainer: {
      width: '60%',
    },
  }),
  { name: 'OrderFulfillmentCancelDialog' }
);

export interface OrderFulfillmentCancelDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  errors: OrderErrorFragment[];
  open: boolean;
  warehouses: WarehouseFragment[];
  onClose();
  onConfirm(data: OrderFulfillmentCancelDialogFormData);
}

const OrderFulfillmentCancelDialog: FC<OrderFulfillmentCancelDialogProps> = (props) => {
  const { confirmButtonState, errors, open, warehouses, onConfirm, onClose } = props;
  // const styles = useStyles();
  const styles = {};
  const { t } = useTranslation();
  const [displayValue, setDisplayValue] = useState('');

  const choices = warehouses?.map((warehouse) => ({
    label: warehouse.name,
    value: warehouse.id,
  }));

  return (
    <Dialog
      classes={{
        paper: styles.enableOverflow ?? '',
      }}
      onClose={onClose}
      open={open}
      fullWidth
      maxWidth="sm"
    >
      <Form initial={{ warehouseId: null }} onSubmit={onConfirm}>
        {({ change, data: formData, submit }) => {
          const handleChange = createSingleAutocompleteSelectHandler(
            change,
            setDisplayValue,
            choices
          );
          // const styles = useStyles();
          const styles = {};
          return (
            <>
              <DialogTitle>
                <>
                  {/* dialog header */}

                  {t('dashboard.b4nSp', 'Cancel Fulfillment')}
                </>
              </DialogTitle>
              <DialogContent className={styles.enableOverflow ?? ''}>
                <DialogContentText className={styles.paragraph ?? ''}>
                  <>
                    {t(
                      'dashboard.co5tZ',
                      'Are you sure you want to cancel fulfillment? Canceling a fulfillment will restock products at a selected warehouse.'
                    )}
                  </>
                </DialogContentText>
                <div
                  className={styles.selectCcontainer ?? ''}
                  data-test-id="cancel-fulfillment-select-field"
                >
                  <SingleAutocompleteSelectField
                    choices={choices}
                    displayValue={displayValue}
                    label={t(
                      'dashboard.Hc89n',
                      'Select Warehouse'
                      // select warehouse to restock items
                    )}
                    name="warehouseId"
                    value={formData.warehouseId}
                    onChange={handleChange}
                  />
                </div>
                {!!errors?.length && (
                  <>
                    <FormSpacer />
                    {errors.map((err, index) => (
                      <DialogContentText color="error" key={index}>
                        {getOrderErrorMessage(err, t)}
                      </DialogContentText>
                    ))}
                  </>
                )}
              </DialogContent>
              <DialogActions>
                <BackButton onClick={onClose} />
                <ConfirmButton
                  data-test-id="submit"
                  disabled={formData.warehouseId === null}
                  transitionState={confirmButtonState}
                  onClick={submit}
                >
                  {t('dashboard.ccept', 'Accept')}
                </ConfirmButton>
              </DialogActions>
            </>
          );
        }}
      </Form>
    </Dialog>
  );
};
OrderFulfillmentCancelDialog.displayName = 'OrderFulfillmentCancelDialog';
export default OrderFulfillmentCancelDialog;
