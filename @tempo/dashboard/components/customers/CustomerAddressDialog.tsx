import * as m from '@paraglide/messages';
import type { AddressFormData } from '@tempo/next/types';
import BackButton from '@tempo/ui/components/buttons/BackButton';
import ConfirmButton from '@tempo/ui/components/buttons/ConfirmButton';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import { makeStyles } from '@tempo/ui/theme/styles';
import AddressEdit from '@tempo/dashboard/components/forms/AddressEdit';
import { createCountryHandler } from '@tempo/dashboard/components/forms/AddressEdit/createCountryHandler';
import Form from '@tempo/dashboard/components/forms/Form';
import type {
  AccountErrorFragment,
  AddressFragment,
  AddressUpdateInput,
  CountryWithCodeFragment,
} from '@tempo/api/generated/graphql';
import useAddressValidation from '@tempo/dashboard/hooks/useAddressValidation';
import useModalDialogErrors from '@tempo/dashboard/hooks/useModalDialogErrors';
import useStateFromProps from '@tempo/dashboard/hooks/useStateFromProps';
import createSingleAutocompleteSelectHandler from '@tempo/dashboard/oldSrc/utils/handlers/singleAutocompleteSelectChangeHandler';
import { mapCountriesToChoices } from '@tempo/dashboard/oldSrc/utils/maps';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { FC } from 'react';

export interface CustomerAddressDialogProps {
  address: Maybe<AddressFragment>;
  confirmButtonState: ConfirmButtonTransitionState;
  countries: CountryWithCodeFragment[];
  errors: AccountErrorFragment[];
  open: boolean;
  variant: 'create' | 'edit';
  onClose: () => void;
  onConfirm: (data: AddressUpdateInput) => void;
}

const useStyles = makeStyles(
  {
    overflow: {
      overflowY: 'visible',
    },
  },
  { name: 'CustomerAddressDialog' }
);

const CustomerAddressDialog: FC<CustomerAddressDialogProps> = ({
  address,
  confirmButtonState,
  countries,
  errors,
  open,
  variant,
  onClose,
  onConfirm,
}) => {
  const [countryDisplayName, setCountryName] = useStateFromProps(address?.country.name || '');
  const styles = {};
  const { errors: validationErrors, submit: handleSubmit } = useAddressValidation(onConfirm);
  const dialogErrors = useModalDialogErrors([...errors, ...validationErrors], open);

  const initialForm: AddressFormData = {
    city: address?.city || '',
    cityArea: address?.cityArea || '',
    companyName: address?.companyName || '',
    countryCode: address?.country.code || '',
    countryArea: address?.countryArea || '',
    firstName: address?.firstName || '',
    lastName: address?.lastName || '',
    phone: address?.phone || '',
    postalCode: address?.postalCode || '',
    streetAddress1: address?.streetAddress1 || '',
    streetAddress2: address?.streetAddress2 || '',
  };

  const countryChoices = mapCountriesToChoices(countries || []);

  return (
    <Dialog
      onClose={onClose}
      open={open}
      classes={{ paper: styles.overflow }}
      fullWidth
      maxWidth="sm"
    >
      <Form initial={initialForm} onSubmit={handleSubmit}>
        {({ change, set, data }) => {
          const countrySelect = createSingleAutocompleteSelectHandler(
            change,
            setCountryName,
            countryChoices
          );
          const styles = {};

          const handleCountrySelect = createCountryHandler(countrySelect, set);

          return (
            <>
              <DialogTitle>
                {variant === 'create' ? (
                  <>
                    {t(
                      'dashboard_0kQd+',
                      'Add Address'
                      // dialog title
                    )}
                  </>
                ) : (
                  <>
                    {/* dialog title */}

                    {m.dashboard_QGUsN() ?? 'Edit Address'}
                  </>
                )}
              </DialogTitle>
              <DialogContent className={styles.overflow ?? ''}>
                <AddressEdit
                  countries={countryChoices}
                  data={data}
                  countryDisplayValue={countryDisplayName}
                  errors={dialogErrors}
                  onChange={change}
                  onCountryChange={handleCountrySelect}
                />
              </DialogContent>
              <DialogActions>
                <BackButton onClick={onClose} />
                <ConfirmButton
                  transitionState={confirmButtonState}
                  type="submit"
                  data-test-id="submit"
                >
                  {m.dashboard_save() ?? 'Save'}
                </ConfirmButton>
              </DialogActions>
            </>
          );
        }}
      </Form>
    </Dialog>
  );
};
CustomerAddressDialog.displayName = 'CustomerAddressDialog';
export default CustomerAddressDialog;
