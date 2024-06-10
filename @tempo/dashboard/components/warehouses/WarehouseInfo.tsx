import * as m from '@paraglide/messages';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import type { FC } from 'react';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import type { WarehouseErrorFragment } from '@tempo/api/generated/graphql';
import type { FormChange } from '@tempo/dashboard/hooks/useForm';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import getWarehouseErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/warehouse';

export interface WarehouseInfoProps {
  data: Record<'name', string>;
  disabled: boolean;
  errors: WarehouseErrorFragment[];
  onChange: FormChange;
}

const WarehouseInfo: FC<WarehouseInfoProps> = ({ data, disabled, errors, onChange }) => {

  const formErrors = getFormErrors(['name'], errors);

  return (
    <Card data-test-id="general-information-section">
      <CardTitle title={m.dashboard_generalInformation() ?? 'General Information'} />
      <CardContent>
        <TextField
          disabled={disabled}
          error={!!formErrors.name}
          fullWidth
          helperText={getWarehouseErrorMessage(formErrors.name, t)}
          label={m.dashboard_lBnr+ ?? 'Warehouse Name'}
          name={'name' as keyof typeof data}
          value={data?.name}
          onChange={onChange}
          InputProps={{
            inputProps: {
              autoComplete: 'none',
            },
          }}
        />
      </CardContent>
    </Card>
  );
};

WarehouseInfo.displayName = 'WarehouseInfo';
export default WarehouseInfo;
