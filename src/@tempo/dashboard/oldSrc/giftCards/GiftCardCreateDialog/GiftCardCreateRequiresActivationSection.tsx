import * as m from '@paraglide/messages';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import { createGiftCardMessages as messages } from './messages';
import ControlledCheckbox from '@tempo/dashboard/components/forms/ControlledCheckbox';
import type { ControlledCheckboxProps } from '@tempo/dashboard/components/forms/ControlledCheckbox';

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
        {m.dashboard_equiresActivationLabel() ?? messages.requiresActivationLabel.defaultMessage}
        <Typography variant="caption">
          {m.dashboard_equiresActivationCaption() ??
            messages.requiresActivationCaption.defaultMessage}
        </Typography>
      </>
    }
    checked={checked}
    onChange={onChange}
  />
);

export default GiftCardCreateRequiresActivationSection;
