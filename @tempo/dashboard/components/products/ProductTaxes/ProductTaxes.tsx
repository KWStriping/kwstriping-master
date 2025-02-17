import * as m from '@paraglide/messages';
import { makeStyles } from '@tempo/ui/theme/styles';
import type { TaxClassBaseFragment } from '@tempo/api/generated/graphql';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { ChangeEvent, FC } from 'react';

import type { ProductCreateFormData } from '../ProductCreatePage';
import type { FetchMoreProps } from '@tempo/dashboard/oldSrc/types';
import SingleAutocompleteSelectField from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

interface ProductTaxesProps {
  value: string;
  taxClassDisplayName: string;
  taxClasses: TaxClassBaseFragment[];
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
  { name: 'ProductTaxes' }
);

const ProductTaxes: FC<ProductTaxesProps> = (props) => {
  const { value, disabled, taxClasses, taxClassDisplayName, onChange, onFetchMore } = props;
  const styles = useStyles(props);

  return (
    <Card className={styles.root ?? ''}>
      <CardTitle title={m.dashboard_taxes() ?? 'Taxes'} />
      <CardContent>
        <SingleAutocompleteSelectField
          disabled={disabled}
          displayValue={taxClassDisplayName}
          label={m.dashboard_taxClass() ?? 'Tax class'}
          name={'taxClassId' as keyof ProductCreateFormData}
          onChange={onChange}
          value={value}
          choices={taxClasses.map((choice) => ({
            label: choice.name,
            value: choice.id,
          }))}
          InputProps={{
            autoComplete: 'off',
          }}
          {...onFetchMore}
        />
      </CardContent>
    </Card>
  );
};
ProductTaxes.displayName = 'ProductTaxes';
export default ProductTaxes;
