import IconButton from '@core/ui/components/buttons/IconButton/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import type { FC } from 'react';

interface DeletableItemProps {
  onDelete: (id: string) => void;
  id: string;
}

const DeletableItem: FC<DeletableItemProps> = ({ onDelete, id }) => {
  const handleDelete = () => onDelete(id);

  return (
    <IconButton color="secondary" onClick={handleDelete}>
      <DeleteIcon />
    </IconButton>
  );
};

export default DeletableItem;
