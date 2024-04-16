import { useTranslation } from '@core/i18n';
import type { AddressFormData } from '@core/types';
import BackButton from '@core/ui/components/buttons/BackButton';
import ConfirmButton from '@core/ui/components/buttons/ConfirmButton';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import { makeStyles } from '@core/ui/theme/styles';
import AddressEdit from '@dashboard/components/forms/AddressEdit';
import { createCountryHandler } from '@dashboard/components/forms/AddressEdit/createCountryHandler';
import Form from '@dashboard/components/forms/Form';
import type {
  AccountErrorFragment,
  AddressFragment,
  AddressUpdateInput,
  CountryWithCodeFragment,
} from '@core/api/graphql';
import useAddressValidation from '@dashboard/hooks/useAddressValidation';
import useModalDialogErrors from '@dashboard/hooks/useModalDialogErrors';
import useStateFromProps from '@dashboard/hooks/useStateFromProps';
import createSingleAutocompleteSelectHandler from '@dashboard/oldSrc/utils/handlers/singleAutocompleteSelectChangeHandler';
import { mapCountriesToChoices } from '@dashboard/oldSrc/utils/maps';
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
  // const styles = useStyles();
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
          // const styles = useStyles();
          const styles = {};
          const { t } = useTranslation();

          const handleCountrySelect = createCountryHandler(countrySelect, set);

          return (
            <>
              <DialogTitle>
                {variant === 'create' ? (
                  <>
                    {t(
                      'dashboard.0kQd+',
                      'Add Address'
                      // dialog title
                    )}
                  </>
                ) : (
                  <>
                    {/* dialog title */}

                    {t('dashboard.QGUsN', 'Edit Address')}
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
                  {t('dashboard.save', 'Save')}
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
