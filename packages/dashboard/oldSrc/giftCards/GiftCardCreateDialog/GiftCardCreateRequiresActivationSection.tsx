import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import { createGiftCardMessages as messages } from './messages';
import ControlledCheckbox from '@dashboard/components/forms/ControlledCheckbox';
import type { ControlledCheckboxProps } from '@dashboard/components/forms/ControlledCheckbox';

type GiftCardCreateRequiresActivationSectionProps = Pick<
  ControlledCheckboxProps,
  'checked' | 'onChange'
>;

const GiftCardCreateRequiresActivationSection: FC<
  GiftCardCreateRequiresActivationSectionProps
> = ({ checked, onChange }) => (
  <ControlledCheckbox
    name="requiresActivation"
    label={
      <>
        {t('dashboard.equiresActivationLabel', messages.requiresActivationLabel.defaultMessage)}
        <Typography variant="caption">
          {t(
            'dashboard.equiresActivationCaption',
            messages.requiresActivationCaption.defaultMessage
          )}
        </Typography>
      </>
    }
    checked={checked}
    onChange={onChange}
  />
);

export default GiftCardCreateRequiresActivationSection;
