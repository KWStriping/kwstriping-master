import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import type { FC, ReactNode } from 'react';

interface DeleteButtonProps {
  onClick: () => void;
  label?: string | ReactNode;
  disabled?: boolean;
  testId?: string;
}

const DeleteButton: FC<DeleteButtonProps> = ({ onClick, label, testId, disabled = false }) => {
  const { t } = useTranslation();

  return (
    <Button
      color="error"
      onClick={onClick}
      data-test-id={testId ? 'confirm-delete' : 'button-bar-delete'}
      disabled={disabled}
    >
      {label || t('delete', 'Delete')}
    </Button>
  );
};

export default DeleteButton;
