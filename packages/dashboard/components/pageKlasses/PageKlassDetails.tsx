import { useTranslation } from '@core/i18n';
import CardTitle from '@dashboard/components/core/CardTitle';
import type { PageErrorFragment } from '@core/api/graphql';
import { getFormErrors } from '@dashboard/oldSrc/utils/errors';
import getPageErrorMessage from '@dashboard/oldSrc/utils/errors/page';
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
  const { t } = useTranslation();

  const formErrors = getFormErrors(['name'], errors);

  return (
    <Card>
      <CardTitle title={t('dashboard.generalInformation', 'General Information')} />
      <CardContent>
        <TextField
          disabled={disabled}
          fullWidth
          error={!!formErrors.name}
          helperText={getPageErrorMessage(formErrors.name, t)}
          label={t('dashboard.Wna9Q', 'Content Type Name')}
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
