import { useTranslation } from '@core/i18n';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import type { FC } from 'react';
import CardTitle from '@dashboard/components/core/CardTitle';
import type { GroupErrorFragment } from '@core/api/graphql';
import type { FormChange } from '@dashboard/hooks/useForm';
import { getFieldError, getFormErrors } from '@dashboard/oldSrc/utils/errors';
import getGroupErrorMessage from '@dashboard/oldSrc/utils/errors/groups';

export interface GroupInfoProps {
  disabled: boolean;
  errors: GroupErrorFragment[];
  onChange: FormChange;
  data: {
    name: string;
  };
}

const GroupInfo: FC<GroupInfoProps> = ({ disabled, onChange, data, errors }) => {
  const { t } = useTranslation();

  const formErrors = getFormErrors(['name'], errors);

  return (
    <Card>
      <CardTitle title={t('dashboard.generalInformation', 'General Information')}></CardTitle>
      <CardContent>
        <TextField
          name="name"
          label={t(
            'dashboard.s815i',
            'Group name'
            // text field label
          )}
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
