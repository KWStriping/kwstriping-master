import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import type { FC, ReactNode } from 'react';

interface EditButtonProps {
  onClick: () => void;
  label?: string | ReactNode;
  disabled?: boolean;
  testId?: string;
}

const EditButton: FC<EditButtonProps> = ({ onClick, label, disabled = false }) => {
  const { t } = useTranslation();

  return (
    <Button onClick={onClick} disabled={disabled}>
      {label || t('edit', 'Edit')}
    </Button>
  );
};

export default EditButton;
