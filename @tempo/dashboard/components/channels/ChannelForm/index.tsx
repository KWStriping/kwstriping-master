import * as m from '@paraglide/messages';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import type { SingleAutocompleteChoiceType } from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import SingleAutocompleteSelectField from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';
import type {
  ChannelErrorFragment,
  CountryCode,
  StockSettingsInput,
} from '@tempo/api/generated/graphql';
import useClipboard from '@tempo/dashboard/hooks/useClipboard';
import type { ChangeEvent, FormChange } from '@tempo/dashboard/hooks/useForm';
import type {
  ChannelShippingZones,
  ChannelWarehouses,
} from '@tempo/dashboard/oldSrc/channels/pages/ChannelDetailsPage/types';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import getChannelsErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/channels';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import { useStyles } from '../styles';
import type { ExtendedFormHelperTextProps } from './types';

export interface FormData extends StockSettingsInput {
  name: string;
  currencyCode: string;
  slug: string;
  shippingZonesIdsToAdd: string[];
  shippingZonesIdsToRemove: string[];
  warehousesIdsToAdd: string[];
  warehousesIdsToRemove: string[];
  shippingZonesToDisplay: ChannelShippingZones;
  warehousesToDisplay: ChannelWarehouses;
  defaultCountry: CountryCode;
}

export interface ChannelFormProps {
  data: FormData;
  disabled: boolean;
  currencyCodes?: SingleAutocompleteChoiceType[];
  errors: ChannelErrorFragment[];
  selectedCurrencyCode?: string;
  selectedCountryName: string;
  countries: SingleAutocompleteChoiceType[];
  onChange: FormChange;
  onCurrencyCodeChange?: (event: ChangeEvent) => void;
  onDefaultCountryChange: (event: ChangeEvent) => void;
}

export const ChannelForm: FC<ChannelFormProps> = ({
  currencyCodes,
  data,
  disabled,
  errors,
  selectedCurrencyCode,
  selectedCountryName,
  countries,
  onChange,
  onCurrencyCodeChange,
  onDefaultCountryChange,
}) => {
  const styles = useStyles({});
  const [copied, copy] = useClipboard();
  const formErrors = getFormErrors<keyof FormData, ChannelErrorFragment>(
    ['name', 'slug', 'currencyCode', 'defaultCountry'],
    errors
  );

  return (
    <>
      <Card>
        <CardTitle title={m.dashboard_generalInformation() ?? 'General Information'} />
        <CardContent>
          <TextField
            error={!!formErrors.name}
            helperText={getChannelsErrorMessage(formErrors?.name, t)}
            disabled={disabled}
            fullWidth
            label={
              m.dashboard_ymotP() ?? 'Channel name' // channel name
            }
            name="name"
            value={data?.name}
            onChange={onChange}
          />
          <FormSpacer />
          <TextField
            error={!!formErrors.slug}
            helperText={getChannelsErrorMessage(formErrors?.slug, t)}
            disabled={disabled}
            fullWidth
            FormHelperTextProps={
              {
                'data-test-id': 'slug-text-input-helper-text',
              } as ExtendedFormHelperTextProps
            }
            label={t(
              'dashboard_4Zo/H',
              'Slug'
              // channel slug
            )}
            name="slug"
            value={data?.slug}
            onChange={onChange}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  className={styles.copyBtn ?? ''}
                  position="end"
                  disableTypography
                  onClick={() => copy(data?.slug)}
                >
                  {copied ? (
                    <>
                      {/* button */}

                      {m.dashboard___alc() ?? 'Copied'}
                    </>
                  ) : (
                    <>
                      {/* button */}

                      {m.dashboard_haXLU() ?? 'Copy'}
                    </>
                  )}
                </InputAdornment>
              ),
            }}
          />
          <FormSpacer />
        </CardContent>
      </Card>
      <CardSpacer />
      <Card>
        <CardTitle
          title={t(
            'dashboard_y4r+z',
            'Channel Settings'
            // channel settings
          )}
        />
        <CardContent>
          {currencyCodes ? (
            <SingleAutocompleteSelectField
              data-test-id="channel-currency-select-input"
              allowCustomValues
              error={!!formErrors.currencyCode}
              FormHelperTextProps={
                {
                  'data-test-id': 'currency-text-input-helper-text',
                } as ExtendedFormHelperTextProps
              }
              helperText={getChannelsErrorMessage(formErrors?.currencyCode, t)}
              disabled={disabled}
              label={
                m.dashboard_Sz_By() ?? 'Currency' // channel currency
              }
              choices={currencyCodes}
              name="currencyCode"
              displayValue={selectedCurrencyCode}
              value={selectedCurrencyCode}
              onChange={onCurrencyCodeChange}
            />
          ) : (
            <>
              <Typography variant="caption" className={styles.label ?? ''}>
                <>
                  {/* selected currency */}

                  {m.dashboard__yi_w() ?? 'Selected currency'}
                </>
              </Typography>
              <Typography>{data?.currencyCode}</Typography>
            </>
          )}
          <FormSpacer />
          <SingleAutocompleteSelectField
            data-test-id="country-select-input"
            error={!!formErrors.defaultCountry}
            FormHelperTextProps={
              {
                'data-test-id': 'country-text-input-helper-text',
              } as ExtendedFormHelperTextProps
            }
            helperText={getChannelsErrorMessage(formErrors?.defaultCountry, t)}
            disabled={disabled}
            label={m.dashboard_V() + Dcm ?? 'Default country'}
            choices={countries}
            name="defaultCountry"
            displayValue={selectedCountryName}
            value={data?.defaultCountry}
            onChange={onDefaultCountryChange}
          />
        </CardContent>
      </Card>
    </>
  );
};

ChannelForm.displayName = 'ChannelForm';
export default ChannelForm;
