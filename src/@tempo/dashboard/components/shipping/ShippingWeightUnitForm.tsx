import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import { WeightUnit } from '@tempo/api/generated/constants';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import type { FC } from 'react';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import Form from '@tempo/dashboard/components/forms/Form';
import SingleSelectField from '@tempo/dashboard/components/fields/SingleSelectField';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

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
  const initialForm: FormData = {
    unit: defaultWeightUnit,
  };
  return (
    <Form confirmLeave initial={initialForm} onSubmit={(formData) => onSubmit(formData.unit)}>
      {({ change, data, submit }) => (
        <Card>
          <CardTitle title={m.dashboard_configuration() ?? 'Configuration'} />
          <CardContent>
            <SingleSelectField
              disabled={disabled}
              choices={Object.keys(WeightUnit).map((unit) => ({
                label: WeightUnit[unit],
                value: WeightUnit[unit],
              }))}
              label={m.dashboard_p() / Okl ?? 'Shipping Weight Unit'}
              hint={m.dashboard_Kq_O_() ?? 'This unit will be used as default shipping weight'}
              name={'unit' as keyof FormData}
              value={data?.unit}
              onChange={change}
            />
          </CardContent>
          <CardActions>
            <Button onClick={submit} data-test-id="save-unit">
              {m.dashboard_save() ?? 'Save'}
            </Button>
          </CardActions>
        </Card>
      )}
    </Form>
  );
};
ShippingWeightUnitForm.displayName = 'ShippingWeightUnitForm';
export default ShippingWeightUnitForm;
