import IconButton from '@tempo/ui/components/buttons/IconButton';
import Link from '@tempo/ui/components/Link';
import { makeStyles } from '@tempo/ui/theme/styles';
import Money from '@tempo/dashboard/components/core/Money';
import type { OrderLineDiscountContextConsumerProps } from '@tempo/dashboard/components/products/OrderDiscountProviders/OrderLineDiscountProvider';
import TableCellAvatar from '@tempo/dashboard/components/tables/TableCellAvatar';
import { AVATAR_MARGIN } from '@tempo/dashboard/components/tables/TableCellAvatar/Avatar';
import type {
  OrderErrorFragment,
  OrderLineFragment,
  OrderLineInput,
} from '@tempo/api/generated/graphql';
import DeleteIcon from '@mui/icons-material/Delete';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { useRef } from 'react';
import type { FC } from 'react';

import OrderDiscountCommonModal from '../OrderDiscountCommonModal';
import { ORDER_LINE_DISCOUNT } from '../OrderDiscountCommonModal/types';
import TableLineAlert from './TableLineAlert';
import TableLineForm from './TableLineForm';
import useLineAlerts from './useLineAlerts';

const useStyles = makeStyles(
  (theme) => ({
    colStatusEmpty: {
      '&:first-child:not(.MuiTableCell-paddingCheckbox)': {
        paddingRight: 0,
      },
    },
    colAction: {
      width: `calc(76px + ${theme.spacing(0.5)})`,
    },
    colName: {
      width: 'auto',
    },
    colNameLabel: {
      marginLeft: AVATAR_MARGIN,
    },
    colPrice: {
      textAlign: 'right',
    },
    colQuantity: {
      textAlign: 'right',
    },
    colTotal: {
      textAlign: 'right',
    },
    strike: {
      textDecoration: 'line-through',
      color: theme.vars.palette.grey[400],
    },
  }),
  { name: 'OrderDraftDetailsProducts' }
);

interface TableLineProps extends OrderLineDiscountContextConsumerProps {
  line: Maybe<OrderLineFragment>;
  error?: Maybe<OrderErrorFragment>;
  onOrderLineChange: (id: string, data: OrderLineInput) => void;
  onOrderLineRemove: (id: string) => void;
}

const TableLine: FC<TableLineProps> = ({
  line,
  error,
  onOrderLineChange,
  onOrderLineRemove,
  orderLineDiscount,
  addOrderLineDiscount,
  removeOrderLineDiscount,
  openDialog,
  closeDialog,
  removeOrderLineDiscountStatus,
  isDialogOpen,
  undiscountedPrice,
  discountedPrice,
  updateOrderLineDiscountStatus,
}) => {
  const popperAnchorRef = useRef<HTMLTableRowElement | null>(null);
  const styles = {};
  const { id, thumbnail, productName, productSku, quantity } = line;

  const alerts = useLineAlerts({
    line,
    error,
  });

  const getUnitPriceLabel = () => {
    const money = <Money money={undiscountedPrice} />;
      const styles = {};

    if (orderLineDiscount) {
      return (
        <>
          <Typography className={styles.strike ?? ''}>{money}</Typography>
          <Link onClick={openDialog}>
            <Money money={discountedPrice} />
          </Link>
        </>
      );
    }

    return <Link onClick={openDialog}>{money}</Link>;
  };

  return (
    <TableRow key={id}>
      <TableCell className={clsx(!alerts.length && styles.colStatusEmpty)}>
        {!!alerts.length && (
          <TableLineAlert alerts={alerts} variant={error ? 'error' : 'warning'} />
        )}
      </TableCell>
      <TableCellAvatar className={styles.colName ?? ''} thumbnail={thumbnail.url}>
        <Typography variant="body2">{productName}</Typography>
        <Typography variant="caption">{productSku}</Typography>
      </TableCellAvatar>
      <TableCell className={styles.colQuantity ?? ''}>
        <TableLineForm line={line} onOrderLineChange={onOrderLineChange} />
      </TableCell>
      <TableCell className={styles.colPrice ?? ''} ref={popperAnchorRef}>
        {getUnitPriceLabel()}
        <OrderDiscountCommonModal
          isOpen={isDialogOpen}
          anchorRef={popperAnchorRef}
          onClose={closeDialog}
          modalType={ORDER_LINE_DISCOUNT}
          maxPrice={undiscountedPrice}
          onConfirm={addOrderLineDiscount}
          onRemove={removeOrderLineDiscount}
          existingDiscount={orderLineDiscount}
          confirmStatus={updateOrderLineDiscountStatus}
          removeStatus={removeOrderLineDiscountStatus}
          dialogPlacement="bottom-end"
        />
      </TableCell>
      <TableCell className={styles.colTotal ?? ''}>
        <Money
          money={{
            amount: discountedPrice.amount * quantity,
            currency: discountedPrice.currency,
          }}
        />
      </TableCell>
      <TableCell className={styles.colAction ?? ''}>
        <IconButton color="secondary" onClick={() => onOrderLineRemove(id)}>
          <DeleteIcon color="primary" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default TableLine;
