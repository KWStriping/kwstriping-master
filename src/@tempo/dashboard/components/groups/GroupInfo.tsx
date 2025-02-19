import * as m from '@paraglide/messages';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import type { FC } from 'react';
import type { GroupErrorFragment } from '@tempo/api/generated/graphql';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import type { FormChange } from '@tempo/dashboard/hooks/useForm';
import { getFieldError, getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import getGroupErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/groups';

export interface GroupInfoProps {
  disabled: boolean;
  errors: GroupErrorFragment[];
  onChange: FormChange;
  data: {
    name: string;
  };
}

const GroupInfo: FC<GroupInfoProps> = ({ disabled, onChange, data, errors }) => {
  const formErrors = getFormErrors(['name'], errors);

  return (
    <Card>
      <CardTitle title={m.dashboard_generalInformation() ?? 'General Information'}></CardTitle>
      <CardContent>
        <TextField
          name="name"
          label={
            m.dashboard_s___i() ?? 'Group name'
            // text field label
          }
          value={data?.name}
          onChange={onChange}
          disabled={disabled}
          error={!!getFieldError(errors, 'name')}
          helperText={getGroupErrorMessage(formErrors.name, t)}
          fullWidth
        />
      </CardContent>
    </Card>
  );
};

GroupInfo.displayName = 'GroupInfo';
export default GroupInfo;
