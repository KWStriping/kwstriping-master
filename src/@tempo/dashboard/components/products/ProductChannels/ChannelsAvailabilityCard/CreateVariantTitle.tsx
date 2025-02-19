import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import type { FC } from 'react';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

interface CreateVariantTitleProps {
  onManageClick: () => void;
}

export const CreateVariantTitle: FC<CreateVariantTitleProps> = ({ onManageClick }) => {
  return (
    <CardTitle
      title={m.dashboard_title() ?? 'Availability'}
      toolbar={
        <Button
          color="secondary"
          data-testId="manage-channels-button"
          disabled={false}
          onClick={onManageClick}
        >
          {m.dashboard_anageButtonText() ?? 'Manage'}
        </Button>
      }
    />
  );
};
