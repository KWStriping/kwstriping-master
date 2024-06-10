import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import type { FC } from 'react';
import CardTitle from '@dashboard/components/core/CardTitle';

interface CreateVariantTitleProps {
  onManageClick: () => void;
}

export const CreateVariantTitle: FC<CreateVariantTitleProps> = ({ onManageClick }) => {
  const { t } = useTranslation();

  return (
    <CardTitle
      title={t('dashboard.title', 'Availability')}
      toolbar={
        <Button
          color="secondary"
          data-testId="manage-channels-button"
          disabled={false}
          onClick={onManageClick}
        >
          {t('dashboard.anageButtonText', 'Manage')}
        </Button>
      }
    />
  );
};
