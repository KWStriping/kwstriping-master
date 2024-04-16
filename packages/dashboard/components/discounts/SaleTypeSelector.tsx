import { useTranslation } from '@core/i18n';
import type { TFunction } from '@core/i18n';
import { makeStyles } from '@core/ui/theme/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { FC } from 'react';
import CardTitle from '@dashboard/components/core/CardTitle';
import type { RadioGroupFieldChoice } from '@dashboard/components/fields/RadioGroupField';
import RadioGroupField from '@dashboard/components/fields/RadioGroupField';
import { SaleType } from '@core/api/constants';
import type { FormChange } from '@dashboard/hooks/useForm';
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
        'dashboard.17U7u',
        'Percentage'
        // discount type
      ),
      value: SaleType.Percentage,
    },
    {
      label: t(
        'dashboard.nzDrI',
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
  const { t } = useTranslation();

  const choices = createChoices(t);

  return (
    <Card>
      <CardTitle
        title={t(
          'dashboard.kxE8/',
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
