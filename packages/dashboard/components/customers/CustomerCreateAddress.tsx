import { useTranslation } from '@core/i18n';
import { makeStyles } from '@core/ui/theme/styles';
import CardTitle from '@dashboard/components/core/CardTitle';
import type { SingleAutocompleteChoiceType } from '@dashboard/components/fields/SingleAutocompleteSelectField';
import AddressEdit from '@dashboard/components/forms/AddressEdit';
import { FormSpacer } from '@dashboard/components/forms/Form/FormSpacer';
import type { AccountErrorFragment } from '@core/api/graphql';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { ChangeEvent, FC } from 'react';

import type { AddressTypeInput } from '../../types';

const useStyles = makeStyles(
  {
    overflow: {
      overflow: 'visible',
    },
  },
  { name: 'CustomerCreateAddress' }
);

export interface CustomerCreateAddressProps {
  countries: SingleAutocompleteChoiceType[];
  countryDisplayName: string;
  data: AddressTypeInput;
  disabled: boolean;
  errors: AccountErrorFragment[];
  onChange: (event: ChangeEvent<unknown>) => void;
  onCountryChange: (event: ChangeEvent<unknown>) => void;
}

const CustomerCreateAddress: FC<CustomerCreateAddressProps> = ({
  countries,
  countryDisplayName,
  data,
  disabled,
  errors,
  onChange,
  onCountryChange,
}) => {
  const styles = useStyles({});

  const { t } = useTranslation();

  return (
    <Card className={styles.overflow ?? ''}>
      <CardTitle
        title={t(
          'dashboard.GGnSZ',
          'Primary Address'
          // page header
        )}
      />
      <CardContent className={styles.overflow ?? ''}>
        <Typography>{t('dashboard.NQzS/', 'The primary address of this customer.')}</Typography>
        <FormSpacer />
        <AddressEdit
          countries={countries}
          data={data}
          disabled={disabled}
          countryDisplayValue={countryDisplayName}
          errors={errors}
          onChange={onChange}
          onCountryChange={onCountryChange}
        />
      </CardContent>
    </Card>
  );
};
CustomerCreateAddress.displayName = 'CustomerCreateAddress';
export default CustomerCreateAddress;
