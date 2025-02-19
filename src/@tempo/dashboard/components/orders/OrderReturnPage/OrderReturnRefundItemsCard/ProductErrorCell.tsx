import * as m from '@paraglide/messages';
import { makeStyles } from '@tempo/ui/theme/styles';
import Popper from '@mui/material/Popper';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import ErrorExclamationCircleIcon from '@tempo/dashboard/oldSrc/icons/ErrorExclamationCircle';

const useStyles = makeStyles(
  (theme) => ({
    container: {
      position: 'relative',
    },
    errorBox: {
      backgroundColor: theme.vars.palette.error.main,
      borderRadius: 8,
      marginRight: theme.spacing(3),
      padding: theme.spacing(2, 3),
      width: 280,
      zIndex: 1000,
    },
    errorText: {
      color: 'white',
      fontSize: 14,
    },
    errorTextHighlighted: {
      color: theme.vars.palette.error.main,
      fontSize: 12,
      marginRight: theme.spacing(1),
    },
    titleContainer: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  }),
  { name: 'ProductErrorCell' }
);

const messages = {
  description: {
    id: 'RlbhwF',
    defaultMessage: 'This product is no longer in database so it can’t be replaced, nor returned',
    description: 'product no longer exists error description',
  },
  title: {
    id: 'p4zuQp',
    defaultMessage: 'Product no longer exists',
    description: 'product no longer exists error title',
  },
};

interface ProductErrorCellProps {
  hasVariant: boolean;
}

const ProductErrorCell: FC<ProductErrorCellProps> = ({ hasVariant }) => {
  // const styles = useStyles();
  const styles = {};
  const popperAnchorRef = useRef<HTMLButtonElement | null>(null);

  const [showErrorBox, setShowErrorBox] = useState<boolean>(false);

  if (hasVariant) {
    return <TableCell />;
  }

  return (
    <TableCell align="right" className={styles.container ?? ''} ref={popperAnchorRef}>
      <div
        className={styles.titleContainer ?? ''}
        onMouseEnter={() => setShowErrorBox(true)}
        onMouseLeave={() => setShowErrorBox(false)}
      >
        <Typography className={styles.errorTextHighlighted ?? ''}>
          {m.dashboard_title() ?? 'Product no longer exists'}
        </Typography>
        <ErrorExclamationCircleIcon />
      </div>
      <Popper placement="bottom-end" open={showErrorBox} anchorEl={popperAnchorRef.current}>
        <div className={styles.errorBox ?? ''}>
          <Typography className={styles.errorText ?? ''}>
            {m.dashboard_description() ??
              'This product is no longer in database so it can’t be replaced, nor returned'}
          </Typography>
        </div>
      </Popper>
    </TableCell>
  );
};

export default ProductErrorCell;
