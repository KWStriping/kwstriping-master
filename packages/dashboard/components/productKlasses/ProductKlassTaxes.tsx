import { useTranslation } from '@core/i18n';
import { makeStyles } from '@core/ui/theme/styles';
import CardTitle from '@dashboard/components/core/CardTitle';
import SingleAutocompleteSelectField from '@dashboard/components/fields/SingleAutocompleteSelectField';
import type { TaxClassBaseFragment } from '@core/api/graphql';
import type { FetchMoreProps } from '@dashboard/oldSrc/types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { FC, ChangeEvent } from 'react';

import type { ProductKlassForm } from '../ProductKlassDetailsPage/ProductKlassDetailsPage';

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

  const { t } = useTranslation();

  return (
    <Card className={styles.root ?? ''}>
      <CardTitle title={t('dashboard.taxes', 'Taxes')} />
      <CardContent>
        <SingleAutocompleteSelectField
          emptyOption
          disabled={disabled}
          displayValue={taxClassDisplayName}
          label={t('dashboard.taxClass', 'Tax class')}
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
