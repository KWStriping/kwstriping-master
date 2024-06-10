import * as m from '@paraglide/messages';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import type { DiscountErrorFragment } from '@tempo/api/generated/graphql';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import getDiscountErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/discounts';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import type { ChangeEvent, FC } from 'react';

import type { SaleDetailsPageFormData } from './SaleDetailsPage';

export interface SaleInfoProps {
  data: SaleDetailsPageFormData;
  disabled: boolean;
  errors: DiscountErrorFragment[];
  onChange: (event: ChangeEvent<unknown>) => void;
}

const SaleInfo: FC<SaleInfoProps> = ({ data, disabled, errors, onChange }) => {
  const formErrors = getFormErrors(['name'], errors);

  return (
    <Card>
      <CardTitle title={m.dashboard_generalInformation() ?? 'General Information'} />
      <CardContent>
        <TextField
          disabled={disabled}
          error={!!formErrors.name}
          helperText={getDiscountErrorMessage(formErrors.name, t)}
          name={'name' as keyof SaleDetailsPageFormData}
          onChange={onChange}
          label={m.dashboard___hOz() ?? 'Name'}
          value={data?.name}
          fullWidth
        />
      </CardContent>
    </Card>
  );
};
SaleInfo.displayName = 'SaleInfo';
export default SaleInfo;
