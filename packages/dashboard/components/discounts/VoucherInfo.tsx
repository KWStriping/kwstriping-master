import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import CardTitle from '@dashboard/components/core/CardTitle';
import type { DiscountErrorFragment } from '@core/api/graphql';
import { generateCode } from '@dashboard/oldSrc/misc';
import { getFormErrors } from '@dashboard/oldSrc/utils/errors';
import getDiscountErrorMessage from '@dashboard/oldSrc/utils/errors/discounts';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';

import type { VoucherDetailsPageFormData } from './VoucherDetailsPage';

interface VoucherInfoProps {
  data: VoucherDetailsPageFormData;
  errors: DiscountErrorFragment[];
  disabled: boolean;
  variant: 'create' | 'update';
  onChange: (event: unknown) => void;
}

const VoucherInfo = ({ data, disabled, errors, variant, onChange }: VoucherInfoProps) => {
  const { t } = useTranslation();

  const formErrors = getFormErrors(['code'], errors);

  const onGenerateCode = () =>
    onChange({
      target: {
        name: 'code',
        value: generateCode(10),
      },
    });

  return (
    <Card>
      <CardTitle
        title={t('dashboard.generalInformation', 'General Information')}
        toolbar={
          variant === 'create' && (
            <Button onClick={onGenerateCode} data-test-id="generate-code">
              <>
                {/* voucher code, button */}

                {t('dashboard.SLr9d', 'Generate Code')}
              </>
            </Button>
          )
        }
      />
      <CardContent>
        <TextField
          disabled={variant === 'update' || disabled}
          error={!!formErrors.code}
          fullWidth
          helperText={getDiscountErrorMessage(formErrors.code, t)}
          name={'code' as keyof VoucherDetailsPageFormData}
          label={t('dashboard.vKNMP', 'Discount Code')}
          value={data?.code}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};
export default VoucherInfo;
