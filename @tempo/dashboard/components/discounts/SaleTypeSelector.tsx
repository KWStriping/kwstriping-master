import { makeStyles } from '@tempo/ui/theme/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { FC } from 'react';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import type { RadioGroupFieldChoice } from '@tempo/dashboard/components/fields/RadioGroupField';
import RadioGroupField from '@tempo/dashboard/components/fields/RadioGroupField';
import { SaleType } from '@tempo/api/generated/constants';
import type { FormChange } from '@tempo/dashboard/hooks/useForm';
import type { SaleDetailsPageFormData } from './SaleDetailsPage';

export interface SaleTypeProps {
  data: SaleDetailsPageFormData;
  disabled: boolean;
  onChange: FormChange;
}

const useStyles = makeStyles(
  (theme) => ({
    root: {
      '&&': {
        paddingBottom: theme.spacing(1.5),
      },
    },
  }),
  {
    name: 'SaleType',
  }
);

function createChoices(t: TFunction): RadioGroupFieldChoice[] {
  return [
    {
      label: t(
        'dashboard_17U7u',
        'Percentage'
        // discount type
      ),
      value: SaleType.Percentage,
    },
    {
      label: t(
        'dashboard_nzDrI',
        'Fixed Amount'
        // discount type
      ),
      value: SaleType.Fixed,
    },
  ];
}

const SaleTypeSelector: FC<SaleTypeProps> = (props) => {
  const { data, disabled, onChange } = props;
  // const styles = useStyles();
  const styles = {};

  const choices = createChoices(t);

  return (
    <Card>
      <CardTitle
        title={t(
          'dashboard_kxE8/',
          'Discount Type'
          // percentage or fixed, header
        )}
      />
      <CardContent className={styles.root ?? ''}>
        <RadioGroupField
          choices={choices}
          disabled={disabled}
          name={'type' as keyof SaleDetailsPageFormData}
          value={data?.type}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};

SaleTypeSelector.displayName = 'SaleType';
export default SaleTypeSelector;
