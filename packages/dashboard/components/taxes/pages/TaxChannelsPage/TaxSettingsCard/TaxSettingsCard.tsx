import { useTranslation } from '@core/i18n';
import CardTitle from '@dashboard/components/core/CardTitle';
import Grid from '@core/ui/components/Grid';
import SingleSelectField from '@dashboard/components/fields/SingleSelectField';
import type { Choice } from '@dashboard/components/fields/SingleSelectField';
import ControlledCheckbox from '@dashboard/components/forms/ControlledCheckbox';
import type { TaxConfigurationUpdateInput } from '@core/api/graphql';
import type { FormChange } from '@dashboard/hooks/useForm';
import { Card, CardContent, Divider, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import type { TaxConfigurationFormData } from '../TaxChannelsPage';

export interface TaxSettingsCardProps {
  values: TaxConfigurationFormData;
  strategyChoices: Choice[];
  onChange: FormChange;
}

export const TaxSettingsCard: FC<TaxSettingsCardProps> = ({
  values,
  strategyChoices,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardTitle title={t('dashboard.efaultSettings', 'Default settings')} />
      <CardContent>
        <Typography className={styles.supportHeader ?? ''}>
          {t('dashboard.hargeTaxesHeader', 'Charge taxes')}
        </Typography>
        <div className={styles.taxStrategySection ?? ''}>
          <ControlledCheckbox
            checked={values.chargeTaxes}
            name={'chargeTaxes' as keyof TaxConfigurationUpdateInput}
            onChange={onChange}
            label={t('dashboard.hargeTaxes', 'Charge taxes for this channel')}
          />
          <div className={styles.singleSelectWrapper ?? ''}>
            <span className={styles.hint ?? ''}>
              {t('dashboard.taxStrategyHint', 'Select the method of tax calculation')}{' '}
            </span>
            <SingleSelectField
              className={styles.singleSelectField ?? ''}
              choices={strategyChoices}
              disabled={!values.chargeTaxes}
              value={values.taxCalculationStrategy}
              name={'taxCalculationStrategy' as keyof TaxConfigurationUpdateInput}
              onChange={onChange}
            />
          </div>
        </div>
      </CardContent>
      <Divider />
      <CardContent>
        <Grid variant="uniform">
          <RadioGroup
            value={values.pricesEnteredWithTax}
            name={'pricesEnteredWithTax' as keyof TaxConfigurationUpdateInput}
            onChange={(e) => {
              onChange({
                target: {
                  name: e.target.name,
                  value: e.target.value === 'true',
                },
              });
            }}
            className={styles.showCheckboxShadows ?? ''}
          >
            <Typography className={styles.supportHeader ?? ''}>
              {t('dashboard.nteredPrices', 'Entered prices')}
            </Typography>
            <FormControlLabel
              value={true}
              control={<Radio />}
              label={t('dashboard.pricesWithTaxLabel', 'Product prices are entered with tax')}
            />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label={t(
                'dashboard.pricesWithoutTaxLabel',
                'Product prices are entered without tax'
              )}
            />
          </RadioGroup>
          <div className={styles.showCheckboxShadows ?? ''}>
            <Typography className={styles.supportHeader ?? ''}>
              {t('dashboard.enderedPrices', 'Rendered prices')}
            </Typography>
            <ControlledCheckbox
              label={t('dashboard.showGrossHeader', 'Show gross prices in storefront')}
              name={'displayGrossPrices' as keyof TaxConfigurationUpdateInput}
              checked={values.displayGrossPrices}
              onChange={onChange}
            />
          </div>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TaxSettingsCard;
