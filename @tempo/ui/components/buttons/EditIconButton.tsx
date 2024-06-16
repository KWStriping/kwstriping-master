import EditIcon from '@mui/icons-material/Edit';
import type { FC } from 'react';
import type { IconButtonProps } from '@tempo/ui/components/buttons/IconButton';
import IconButton from '@tempo/ui/components/buttons/IconButton';

export const EditIconButton: FC<IconButtonProps> = ({ onClick, title }) => {
  return (
    <IconButton onClick={onClick} title={title ?? 'Edit'}>
      <EditIcon />
    </IconButton>
  );
};

export default EditIconButton;
