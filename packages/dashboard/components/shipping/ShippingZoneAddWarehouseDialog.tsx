import { useTranslation } from '@core/i18n';
import BackButton from '@core/ui/components/buttons/BackButton';
import ConfirmButton from '@core/ui/components/buttons/ConfirmButton';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import { makeStyles } from '@core/ui/theme/styles';
import CompanyAddressForm from '@dashboard/components/forms/CompanyAddressInput/CompanyAddressForm';
import Form from '@dashboard/components/forms/Form';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
import type {
  CountryWithCodeFragment,
  WarehouseErrorFragment,
} from '@core/api/graphql';
import useAddressValidation from '@dashboard/hooks/useAddressValidation';
import type { SubmitPromise } from '@dashboard/hooks/useForm';
import useModalDialogErrors from '@dashboard/hooks/useModalDialogErrors';
import useModalDialogOpen from '@dashboard/hooks/useModalDialogOpen';
import useStateFromProps from '@dashboard/hooks/useStateFromProps';
import type { AddressTypeInput } from '@dashboard/oldSrc/customers/types';
import type { DialogProps } from '@dashboard/oldSrc/types';
import createSingleAutocompleteSelectHandler from '@dashboard/oldSrc/utils/handlers/singleAutocompleteSelectChangeHandler';
import { mapCountriesToChoices } from '@dashboard/oldSrc/utils/maps';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import type { FC } from 'react';

export interface ShippingZoneAddWarehouseDialogSubmitData extends AddressTypeInput {
  name: string;
}
export interface ShippingZoneAddWarehouseDialogProps extends DialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  countries: CountryWithCodeFragment[];
  disabled: boolean;
  errors: WarehouseErrorFragment[];
  onSubmit: (data: ShippingZoneAddWarehouseDialogSubmitData) => SubmitPromise;
}

const initialForm: ShippingZoneAddWarehouseDialogSubmitData = {
  city: '',
  cityArea: '',
  companyName: '',
  countryCode: '',
  countryArea: '',
  firstName: '',
  lastName: '',
  name: '',
  phone: '',
  postalCode: '',
  streetAddress1: '',
  streetAddress2: '',
};

const useStyles = makeStyles(
  {
    overflow: {
      overflowY: 'visible',
    },
  },
  {
    name: 'ShippingZoneAddWarehouseDialog',
  }
);

const ShippingZoneAddWarehouseDialog: FC<ShippingZoneAddWarehouseDialogProps> = ({
  confirmButtonState,
  countries,
  disabled,
  errors: apiErrors,
  open,
  onClose,
  onSubmit,
}) => {
  const [countryDisplayName, setCountryName] = useStateFromProps('');
  const { errors: validationErrors, submit: handleSubmit } = useAddressValidation(onSubmit);
  const errors = useModalDialogErrors([...apiErrors, ...validationErrors], open);
  useModalDialogOpen(open, {});
  const { t } = useTranslation();
  // const styles = useStyles();
  const styles = {};
  const countryChoices = mapCountriesToChoices(countries);

  return (
    <Dialog
      classes={{ paper: styles.overflow }}
      onClose={onClose}
      open={open}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{t('dashboard.createNewWarehouse', 'Create New Warehouse')}</DialogTitle>
      <Form initial={initialForm} onSubmit={handleSubmit}>
        {({ change, data }) => {
          const handleCountrySelect = createSingleAutocompleteSelectHandler(
            change,
            setCountryName,
            countryChoices
          );

          return (
            <>
              <DialogContent className={styles.overflow ?? ''}>
                <TextField
                  fullWidth
                  label={t('dashboard.lBnr+', 'Warehouse Name')}
                  name="name"
                  value={data?.name}
                  onChange={change}
                />
                <FormSpacer />
                <Divider />
                <FormSpacer />
                <CompanyAddressForm
                  countries={countryChoices}
                  data={data}
                  disabled={disabled}
                  displayCountry={countryDisplayName}
                  errors={errors}
                  onChange={change}
                  onCountryChange={handleCountrySelect}
                />
              </DialogContent>
              <DialogActions>
                <BackButton onClick={onClose} />
                <ConfirmButton transitionState={confirmButtonState} type="submit">
                  {t('dashboard.create', 'Create')}
                </ConfirmButton>
              </DialogActions>
            </>
          );
        }}
      </Form>
    </Dialog>
  );
};

ShippingZoneAddWarehouseDialog.displayName = 'ShippingZoneAddWarehouseDialog';
export default ShippingZoneAddWarehouseDialog;
