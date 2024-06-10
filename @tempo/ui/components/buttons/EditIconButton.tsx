import * as m from '@paraglide/messages';
import type { IconButtonProps } from '@tempo/ui/components/buttons/IconButton';
import IconButton from '@tempo/ui/components/buttons/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import type { FC } from 'react';

export const EditIconButton: FC<IconButtonProps> = ({ onClick, title }) => {
  return (
    <IconButton onClick={onClick} title={title ?? m.edit() ?? 'Edit'}>
      <EditIcon />
    </IconButton>
  );
};

export default EditIconButton;
