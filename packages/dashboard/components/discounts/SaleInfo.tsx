import { useTranslation } from '@core/i18n';
import CardTitle from '@dashboard/components/core/CardTitle';
import type { DiscountErrorFragment } from '@core/api/graphql';
import { getFormErrors } from '@dashboard/oldSrc/utils/errors';
import getDiscountErrorMessage from '@dashboard/oldSrc/utils/errors/discounts';
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
  const { t } = useTranslation();

  const formErrors = getFormErrors(['name'], errors);

  return (
    <Card>
      <CardTitle title={t('dashboard.generalInformation', 'General Information')} />
      <CardContent>
        <TextField
          disabled={disabled}
          error={!!formErrors.name}
          helperText={getDiscountErrorMessage(formErrors.name, t)}
          name={'name' as keyof SaleDetailsPageFormData}
          onChange={onChange}
          label={t('dashboard.56hOz', 'Name')}
          value={data?.name}
          fullWidth
        />
      </CardContent>
    </Card>
  );
};
SaleInfo.displayName = 'SaleInfo';
export default SaleInfo;
