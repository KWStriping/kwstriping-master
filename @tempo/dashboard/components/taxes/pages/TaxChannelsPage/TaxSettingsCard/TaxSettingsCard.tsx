import * as m from '@paraglide/messages';
import Grid from '@tempo/ui/components/Grid';
import type { TaxConfigurationUpdateInput } from '@tempo/api/generated/graphql';
import { Card, CardContent, Divider, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import type { TaxConfigurationFormData } from '../TaxChannelsPage';
import type { FormChange } from '@tempo/dashboard/hooks/useForm';
import ControlledCheckbox from '@tempo/dashboard/components/forms/ControlledCheckbox';
import type { Choice } from '@tempo/dashboard/components/fields/SingleSelectField';
import SingleSelectField from '@tempo/dashboard/components/fields/SingleSelectField';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

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
  return (
    <Card>
      <CardTitle title={m.dashboard_efaultSettings() ?? 'Default settings'} />
      <CardContent>
        <Typography className={styles.supportHeader ?? ''}>
          {m.dashboard_hargeTaxesHeader() ?? 'Charge taxes'}
        </Typography>
        <div className={styles.taxStrategySection ?? ''}>
          <ControlledCheckbox
            checked={values.chargeTaxes}
            name={'chargeTaxes' as keyof TaxConfigurationUpdateInput}
            onChange={onChange}
            label={m.dashboard_hargeTaxes() ?? 'Charge taxes for this channel'}
          />
          <div className={styles.singleSelectWrapper ?? ''}>
            <span className={styles.hint ?? ''}>
              {m.dashboard_taxStrategyHint() ?? 'Select the method of tax calculation'}{' '}
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
              {m.dashboard_nteredPrices() ?? 'Entered prices'}
            </Typography>
            <FormControlLabel
              value={true}
              control={<Radio />}
              label={m.dashboard_pricesWithTaxLabel() ?? 'Product prices are entered with tax'}
            />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label={
                m.dashboard_pricesWithoutTaxLabel() ?? 'Product prices are entered without tax'
              }
            />
          </RadioGroup>
          <div className={styles.showCheckboxShadows ?? ''}>
            <Typography className={styles.supportHeader ?? ''}>
              {m.dashboard_enderedPrices() ?? 'Rendered prices'}
            </Typography>
            <ControlledCheckbox
              label={m.dashboard_showGrossHeader() ?? 'Show gross prices in storefront'}
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
