import DragIcon from '@mui/icons-material/DragIndicator';
import clsx from 'clsx';
import { makeStyles } from '@tempo/ui/theme/styles';

const useStyles = makeStyles(
  {
    drag: {
      cursor: 'grab',
    },
  },
  { name: 'SortableHandle' }
);

interface SortableHandleProps {
  className?: string;
}

const SortableHandle = (props: SortableHandleProps) => {
  const { className, ...restProps } = props;
  const styles = useStyles(props);

  return <DragIcon className={clsx(styles.drag, className)} tabIndex={0} {...restProps} />;
};

export default SortableHandle;
