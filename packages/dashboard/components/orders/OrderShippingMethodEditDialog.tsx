import { useTranslation } from '@core/i18n';
import BackButton from '@core/ui/components/buttons/BackButton';
import ConfirmButton from '@core/ui/components/buttons/ConfirmButton';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import { makeStyles } from '@core/ui/theme/styles';
import Money from '@dashboard/components/core/Money';
import { SingleSelectField } from '@dashboard/components/fields/SingleSelectField';
import Form from '@dashboard/components/forms/Form';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
import type { OrderDetailsFragment, OrderErrorFragment } from '@core/api/graphql';
import useModalDialogErrors from '@dashboard/hooks/useModalDialogErrors';
import { getFormErrors } from '@dashboard/oldSrc/utils/errors';
import getOrderErrorMessage from '@dashboard/oldSrc/utils/errors/order';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

export interface FormData {
  shippingMethod: string;
}

const useStyles = makeStyles(
  (theme) => ({
    dialog: {
      overflowY: 'visible',
    },
    menuItem: {
      display: 'flex',
      width: '100%',
      flexWrap: 'wrap',
    },
    price: {
      marginRight: theme.spacing(3),
    },
    root: {
      overflowY: 'visible',
      width: theme.breakpoints.values.sm,
      margin: 0,
      padding: theme.spacing(3),
    },
    shippingMethodName: {
      flex: 1,
      overflowX: 'hidden',
      textOverflow: 'ellipsis',
    },
    message: {
      width: '100%',
    },
  }),
  { name: 'OrderShippingMethodEditDialog' }
);

export interface OrderShippingMethodEditDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  errors: OrderErrorFragment[];
  open: boolean;
  shippingMethod: string;
  shippingMethods?: OrderDetailsFragment['shippingMethods'];
  onClose();
  onSubmit?(data: FormData);
}

const OrderShippingMethodEditDialog: FC<OrderShippingMethodEditDialogProps> = (props) => {
  const {
    confirmButtonState,
    errors: apiErrors,
    open,
    shippingMethod,
    shippingMethods,
    onClose,
    onSubmit,
  } = props;
  const styles = useStyles(props);
  const errors = useModalDialogErrors(apiErrors, open);
  const { t } = useTranslation();

  const formFields = ['shippingMethod'];
  const formErrors = getFormErrors(formFields, errors);
  const nonFieldErrors = errors?.filter((err) => !formFields.includes(err.field));

  const choices = shippingMethods
    ? shippingMethods
        .map((s) => ({
          label: (
            <div className={styles.menuItem ?? ''}>
              <span className={styles.shippingMethodName ?? ''}>{s.name}</span>
              &nbsp;
              <span className={styles.price ?? ''}>
                <Money money={s.price} />
              </span>
              {!s.active && (
                <Typography className={styles.message ?? ''} variant="caption">
                  {s.message}
                </Typography>
              )}
            </div>
          ),
          disabled: !s.active,
          value: s.id,
        }))
        .sort((x, y) => (x.disabled === y.disabled ? 0 : x.disabled ? 1 : -1))
    : [];
  const initialForm: FormData = {
    shippingMethod,
  };

  return (
    <Dialog onClose={onClose} open={open} classes={{ paper: styles.dialog }}>
      <DialogTitle>
        <>
          {t(
            'dashboard./YxJa',
            'Edit Shipping method'
            // dialog header
          )}
        </>
      </DialogTitle>
      <Form initial={initialForm} onSubmit={onSubmit}>
        {({ change, data }) => (
          <>
            <DialogContent className={styles.root ?? ''}>
              <SingleSelectField
                choices={choices}
                error={!!formErrors.shippingMethod}
                hint={getOrderErrorMessage(formErrors.shippingMethod, t)}
                name="shippingMethod"
                value={data?.shippingMethod}
                onChange={change}
              />
              {!!nonFieldErrors?.length && (
                <>
                  <FormSpacer />
                  {nonFieldErrors.map((err, index) => (
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
                transitionState={confirmButtonState}
                type="submit"
                disabled={!data?.shippingMethod}
              >
                {t('dashboard.onfirm', 'Confirm')}
              </ConfirmButton>
            </DialogActions>
          </>
        )}
      </Form>
    </Dialog>
  );
};
OrderShippingMethodEditDialog.displayName = 'OrderShippingMethodEditDialog';
export default OrderShippingMethodEditDialog;
