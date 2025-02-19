import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import type { DiscountErrorFragment } from '@tempo/api/generated/graphql';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';

import type { VoucherDetailsPageFormData } from './VoucherDetailsPage';
import getDiscountErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/discounts';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import { generateCode } from '@tempo/dashboard/oldSrc/misc';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

interface VoucherInfoProps {
  data: VoucherDetailsPageFormData;
  errors: DiscountErrorFragment[];
  disabled: boolean;
  variant: 'create' | 'update';
  onChange: (event: unknown) => void;
}

const VoucherInfo = ({ data, disabled, errors, variant, onChange }: VoucherInfoProps) => {
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
        title={m.dashboard_generalInformation() ?? 'General Information'}
        toolbar={
          variant === 'create' && (
            <Button onClick={onGenerateCode} data-test-id="generate-code">
              <>
                {/* voucher code, button */}

                {m.dashboard_SLr_d() ?? 'Generate Code'}
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
          label={m.dashboard_vKNMP() ?? 'Discount Code'}
          value={data?.code}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};
export default VoucherInfo;
