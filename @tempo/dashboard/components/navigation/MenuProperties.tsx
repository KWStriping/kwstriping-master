import * as m from '@paraglide/messages';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import type { ChangeEvent, FC } from 'react';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import type { MenuErrorFragment } from '@tempo/api/generated/graphql';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import getMenuErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/menu';

import type { MenuDetailsFormData } from '../MenuDetailsPage';

export interface MenuPropertiesProps {
  data: MenuDetailsFormData;
  disabled: boolean;
  errors: MenuErrorFragment[];
  onChange: (event: ChangeEvent<unknown>) => void;
}

const MenuProperties: FC<MenuPropertiesProps> = ({ data, disabled, errors, onChange }) => {
  const formErrors = getFormErrors(['name'], errors);

  return (
    <Card>
      <CardTitle title={m.dashboard_generalInformation() ?? 'General Information'} />
      <CardContent>
        <TextField
          disabled={disabled}
          error={!!formErrors.name}
          name={'name' as keyof MenuDetailsFormData}
          fullWidth
          label={m.dashboard_hh() / D6 ?? 'Menu Title'}
          helperText={getMenuErrorMessage(formErrors.name, t)}
          value={data?.name}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};
MenuProperties.displayName = 'MenuProperties';
export default MenuProperties;
