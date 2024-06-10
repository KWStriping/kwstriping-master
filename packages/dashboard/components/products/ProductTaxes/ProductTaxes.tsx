import { useTranslation } from '@core/i18n';
import { makeStyles } from '@core/ui/theme/styles';
import CardTitle from '@dashboard/components/core/CardTitle';
import SingleAutocompleteSelectField from '@dashboard/components/fields/SingleAutocompleteSelectField';
import type { TaxClassBaseFragment } from '@core/api/graphql';
import type { FetchMoreProps } from '@dashboard/oldSrc/types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { ChangeEvent, FC } from 'react';

import type { ProductCreateFormData } from '../ProductCreatePage';

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

  const { t } = useTranslation();

  return (
    <Card className={styles.root ?? ''}>
      <CardTitle title={t('dashboard.taxes', 'Taxes')} />
      <CardContent>
        <SingleAutocompleteSelectField
          disabled={disabled}
          displayValue={taxClassDisplayName}
          label={t('dashboard.taxClass', 'Tax class')}
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
