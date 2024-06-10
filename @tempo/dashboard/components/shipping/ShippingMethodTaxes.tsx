import * as m from '@paraglide/messages';
import { makeStyles } from '@tempo/ui/theme/styles';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import SingleAutocompleteSelectField from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import type { TaxClassBaseFragment } from '@tempo/api/generated/graphql';
import type { FetchMoreProps } from '@tempo/dashboard/oldSrc/types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { FC, ChangeEvent } from 'react';

import type { ShippingZoneRateUpdateFormData } from '../ShippingZoneRatesPage/types';

interface ShippingMethodTaxesProps {
  value: string;
  taxClassDisplayName: string;
  taxClasses: Maybe<TaxClassBaseFragment[]>;
  disabled: boolean;
  onChange: (event: ChangeEvent<unknown>) => void;
  onFetchMore: FetchMoreProps;
}

const useStyles = makeStyles(
  {
    root: {
      overflow: 'visible',
    },
  },
  { name: 'ShippingMethodTaxes' }
);

const ShippingMethodTaxes: FC<ShippingMethodTaxesProps> = (props) => {
  const { value, disabled, taxClasses, taxClassDisplayName, onChange, onFetchMore } = props;
  const styles = useStyles(props);

  return (
    <Card className={styles.root ?? ''}>
      <CardTitle title={m.dashboard_taxes() ?? 'Taxes'} />
      <CardContent>
        <SingleAutocompleteSelectField
          emptyOption
          disabled={disabled}
          displayValue={taxClassDisplayName}
          label={m.dashboard_taxClass() ?? 'Tax class'}
          name={'taxClassId' as keyof ShippingZoneRateUpdateFormData}
          onChange={onChange}
          value={value}
          choices={
            taxClasses?.map((choice) => ({
              label: choice.name,
              value: choice.id,
            })) ?? []
          }
          InputProps={{ autoComplete: 'off' }}
          {...onFetchMore}
        />
      </CardContent>
    </Card>
  );
};
ShippingMethodTaxes.displayName = 'ShippingMethodTaxes';
export default ShippingMethodTaxes;
