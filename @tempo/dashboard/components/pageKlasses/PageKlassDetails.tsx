import * as m from '@paraglide/messages';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import type { PageErrorFragment } from '@tempo/api/generated/graphql';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import getPageErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/page';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import type { ChangeEvent, FC } from 'react';

interface PageKlassDetailsProps {
  data?: {
    name: string;
  };
  disabled: boolean;
  errors: PageErrorFragment[];
  onChange: (event: ChangeEvent<unknown>) => void;
}

const PageKlassDetails: FC<PageKlassDetailsProps> = (props) => {
  const { data, disabled, errors, onChange } = props;

  const formErrors = getFormErrors(['name'], errors);

  return (
    <Card>
      <CardTitle title={m.dashboard_generalInformation() ?? 'General Information'} />
      <CardContent>
        <TextField
          disabled={disabled}
          fullWidth
          error={!!formErrors.name}
          helperText={getPageErrorMessage(formErrors.name, t)}
          label={m.dashboard_Wna_Q() ?? 'Content Type Name'}
          name="name"
          onChange={onChange}
          value={data?.name}
        />
      </CardContent>
    </Card>
  );
};
PageKlassDetails.defaultProps = {
  errors: [],
};
PageKlassDetails.displayName = 'PageKlassDetails';
export default PageKlassDetails;
