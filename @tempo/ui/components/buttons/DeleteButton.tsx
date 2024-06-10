import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import type { FC, ReactNode } from 'react';

interface DeleteButtonProps {
  onClick: () => void;
  label?: string | ReactNode;
  disabled?: boolean;
  testId?: string;
}

const DeleteButton: FC<DeleteButtonProps> = ({ onClick, label, testId, disabled = false }) => {
  return (
    <Button
      color="error"
      onClick={onClick}
      data-test-id={testId ? 'confirm-delete' : 'button-bar-delete'}
      disabled={disabled}
    >
      {label || (m.delete() ?? 'Delete')}
    </Button>
  );
};

export default DeleteButton;
