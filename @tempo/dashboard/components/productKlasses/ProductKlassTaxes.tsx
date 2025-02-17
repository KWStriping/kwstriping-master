import * as m from '@paraglide/messages';
import { makeStyles } from '@tempo/ui/theme/styles';
import type { TaxClassBaseFragment } from '@tempo/api/generated/graphql';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { FC, ChangeEvent } from 'react';

import type { ProductKlassForm } from '../ProductKlassDetailsPage/ProductKlassDetailsPage';
import type { FetchMoreProps } from '@tempo/dashboard/oldSrc/types';
import SingleAutocompleteSelectField from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

interface ProductKlassTaxesProps {
  data: {
    taxClassId: string;
  };
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
  { name: 'ProductKlassTaxes' }
);

const ProductKlassTaxes: FC<ProductKlassTaxesProps> = (props) => {
  const { data, disabled, taxClasses, taxClassDisplayName, onChange, onFetchMore } = props;
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
          name={'taxClassId' as keyof ProductKlassForm}
          onChange={onChange}
          value={data?.taxClassId}
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
ProductKlassTaxes.displayName = 'ProductKlassTaxes';
export default ProductKlassTaxes;
