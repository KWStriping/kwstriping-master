import Link from '@tempo/ui/components/Link';
import { makeStyles } from '@tempo/ui/theme/styles';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import type { FC, MutableRefObject, ReactNode } from 'react';

const useStyles = makeStyles(
  (theme) => ({
    container: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      position: 'relative',
    },
  }),
  { name: 'CardAddItemsFooter' }
);

interface CardAddItemsFooterProps {
  title: string;
  onAdd: () => void;
  testIds: {
    link: string;
    button: string;
  };
  ref?: MutableRefObject<HTMLDivElement>;
  children?: ReactNode;
}

const CardAddItemsFooter: FC<CardAddItemsFooterProps> = ({
  title,
  onAdd,
  testIds,
  ref,
  children,
}) => {
  const styles = {};
  return (
    <div className={styles.container ?? ''} ref={ref}>
      <Link data-test-id={testIds.link} onClick={onAdd}>
        {title}
      </Link>
      <IconButton color="secondary" data-test-id={testIds.button} onClick={onAdd}>
        <AddIcon />
      </IconButton>
      {children}
    </div>
  );
};

export default CardAddItemsFooter;
