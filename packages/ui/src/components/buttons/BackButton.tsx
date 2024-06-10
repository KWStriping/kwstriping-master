import { useTranslation } from '@core/i18n';
import type { FC } from 'react';
import type { ButtonProps } from '@core/ui/components/buttons/Button';
import { Button } from '@core/ui/components/buttons/Button';

const BackButton: FC<ButtonProps> = (props) => {
  const { t } = useTranslation();
  return (
    <Button data-test-id="back" color="secondary" {...props}>
      {t('back', 'Back')}
    </Button>
  );
};

BackButton.displayName = 'BackButton';
export default BackButton;
