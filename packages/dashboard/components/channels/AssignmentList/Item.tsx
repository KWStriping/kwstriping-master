import DeletableItem from '@dashboard/components/core/DeletableItem';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import type { FC, ReactNode } from 'react';

import SortableHandle from './SortableHandle';
import { useStyles } from './styles';
import type { AssignItem } from './types';

interface ItemProps {
  item: AssignItem;
  sortable?: boolean;
  onDelete: (id: string) => void;
  children?: ReactNode;
}

const Item: FC<ItemProps> = ({ item, sortable = false, onDelete }: ItemProps) => {
  const { id, name } = item;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const styles = useStyles();
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className={styles.container ?? ''}>
        <div className={styles.containerContent ?? ''}>
          {sortable && (
            <SortableHandle
              className={styles.sortableHandle ?? ''}
              data-test-id="button-drag-handle"
            />
          )}
          <Typography>{name}</Typography>
        </div>
        <DeletableItem id={id} onDelete={onDelete} />
      </div>
      <Divider />
    </div>
  );
};

export default Item;
