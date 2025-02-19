import * as m from '@paraglide/messages';
import type { FC, ReactNode } from 'react';
import { Button } from '@tempo/ui/components/buttons/Button';

interface EditButtonProps {
  onClick: () => void;
  label?: string | ReactNode;
  disabled?: boolean;
  testId?: string;
}

const EditButton: FC<EditButtonProps> = ({ onClick, label, disabled = false }) => {
  return (
    <Button onClick={onClick} disabled={disabled}>
      {label || (m.edit() ?? 'Edit')}
    </Button>
  );
};

export default EditButton;
