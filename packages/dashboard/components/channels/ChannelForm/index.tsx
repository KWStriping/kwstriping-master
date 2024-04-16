import { useTranslation } from '@core/i18n';
import CardSpacer from '@dashboard/components/core/CardSpacer';
import CardTitle from '@dashboard/components/core/CardTitle';
import type { SingleAutocompleteChoiceType } from '@dashboard/components/fields/SingleAutocompleteSelectField';
import SingleAutocompleteSelectField from '@dashboard/components/fields/SingleAutocompleteSelectField';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
import type {
  ChannelErrorFragment,
  CountryCode,
  StockSettingsInput,
} from '@core/api/graphql';
import useClipboard from '@dashboard/hooks/useClipboard';
import type { ChangeEvent, FormChange } from '@dashboard/hooks/useForm';
import type {
  ChannelShippingZones,
  ChannelWarehouses,
} from '@dashboard/oldSrc/channels/pages/ChannelDetailsPage/types';
import { getFormErrors } from '@dashboard/oldSrc/utils/errors';
import getChannelsErrorMessage from '@dashboard/oldSrc/utils/errors/channels';
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
  const { t } = useTranslation();
  const [copied, copy] = useClipboard();
  const formErrors = getFormErrors<keyof FormData, ChannelErrorFragment>(
    [
      'name',
      'slug',
      'currencyCode',
      'defaultCountry',
    ],
    errors
  );

  return (
    <>
      <Card>
        <CardTitle title={t('dashboard.generalInformation', 'General Information')} />
        <CardContent>
          <TextField
            error={!!formErrors.name}
            helperText={getChannelsErrorMessage(formErrors?.name, t)}
            disabled={disabled}
            fullWidth
            label={t(
              'dashboard.ymotP',
              'Channel name'
              // channel name
            )}
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
              'dashboard.4Zo/H',
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

                      {t('dashboard.86alc', 'Copied')}
                    </>
                  ) : (
                    <>
                      {/* button */}

                      {t('dashboard.haXLU', 'Copy')}
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
            'dashboard.y4r+z',
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
              label={t(
                'dashboard.Sz0By',
                'Currency'
                // channel currency
              )}
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

                  {t('dashboard.9yi8w', 'Selected currency')}
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
            label={t('dashboard.V+Dcm', 'Default country')}
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
