import * as m from '@paraglide/messages';
import BackButton from '@tempo/ui/components/buttons/BackButton';
import ConfirmButton from '@tempo/ui/components/buttons/ConfirmButton';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import { makeStyles } from '@tempo/ui/theme/styles';
import SingleAutocompleteSelectField from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import Form from '@tempo/dashboard/components/forms/Form';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';
import type { OrderErrorFragment, WarehouseFragment } from '@tempo/api/generated/graphql';
import getOrderErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/order';
import createSingleAutocompleteSelectHandler from '@tempo/dashboard/oldSrc/utils/handlers/singleAutocompleteSelectChangeHandler';
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
  const styles = {};
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

                  {m.dashboard_b_nSp() ?? 'Cancel Fulfillment'}
                </>
              </DialogTitle>
              <DialogContent className={styles.enableOverflow ?? ''}>
                <DialogContentText className={styles.paragraph ?? ''}>
                  <>
                    {m.dashboard_co_tZ() ??
                      'Are you sure you want to cancel fulfillment? Canceling a fulfillment will restock products at a selected warehouse.'}
                  </>
                </DialogContentText>
                <div
                  className={styles.selectCcontainer ?? ''}
                  data-test-id="cancel-fulfillment-select-field"
                >
                  <SingleAutocompleteSelectField
                    choices={choices}
                    displayValue={displayValue}
                    label={
                      m.dashboard_Hc__n() ?? 'Select Warehouse'
                      // select warehouse to restock items
                    }
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
                  {m.dashboard_ccept() ?? 'Accept'}
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
