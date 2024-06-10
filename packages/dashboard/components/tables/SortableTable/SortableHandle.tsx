import DragIcon from '@mui/icons-material/DragIndicator';
import TableCell from '@mui/material/TableCell';
import styles from './index.module.css';

const SortableHandle = () => {
  return (
    <TableCell className={styles.columnDrag ?? ''}>
      <DragIcon color="primary" />
    </TableCell>
  );
};

export default SortableHandle;
