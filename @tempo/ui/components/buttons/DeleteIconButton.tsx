import type { IconButtonProps } from '@tempo/ui/components/buttons/IconButton';
import IconButton from '@tempo/ui/components/buttons/IconButton/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import type { FC } from 'react';

const DeleteIconButton: FC<IconButtonProps> = ({ onClick }) => (
  <IconButton color="secondary" onClick={onClick} data-test-id="button-delete-items">
    <DeleteIcon />
  </IconButton>
);

export default DeleteIconButton;