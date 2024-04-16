import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import CardTitle from '@dashboard/components/core/CardTitle';
import SingleSelectField from '@dashboard/components/fields/SingleSelectField';
import Form from '@dashboard/components/forms/Form';
import { WeightUnit } from '@core/api/constants';
import type { SubmitPromise } from '@dashboard/hooks/useForm';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import type { FC } from 'react';

export interface FormData {
  unit: WeightUnit;
}

export interface ShippingWeightUnitFormProps {
  defaultWeightUnit: WeightUnit;
  disabled: boolean;
  onSubmit: (unit: WeightUnit) => SubmitPromise;
}

const ShippingWeightUnitForm: FC<ShippingWeightUnitFormProps> = ({
  defaultWeightUnit,
  disabled,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const initialForm: FormData = {
    unit: defaultWeightUnit,
  };
  return (
    <Form confirmLeave initial={initialForm} onSubmit={(formData) => onSubmit(formData.unit)}>
      {({ change, data, submit }) => (
        <Card>
          <CardTitle title={t('dashboard.configuration', 'Configuration')} />
          <CardContent>
            <SingleSelectField
              disabled={disabled}
              choices={Object.keys(WeightUnit).map((unit) => ({
                label: WeightUnit[unit],
                value: WeightUnit[unit],
              }))}
              label={t('dashboard.p/Okl', 'Shipping Weight Unit')}
              hint={t('dashboard.Kq3O6', 'This unit will be used as default shipping weight')}
              name={'unit' as keyof FormData}
              value={data?.unit}
              onChange={change}
            />
          </CardContent>
          <CardActions>
            <Button onClick={submit} data-test-id="save-unit">
              {t('dashboard.save', 'Save')}
            </Button>
          </CardActions>
        </Card>
      )}
    </Form>
  );
};
ShippingWeightUnitForm.displayName = 'ShippingWeightUnitForm';
export default ShippingWeightUnitForm;
