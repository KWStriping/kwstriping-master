import * as m from '@paraglide/messages';
import { makeStyles } from '@tempo/ui/theme/styles';
import Skeleton from '@mui/material/Skeleton';
import clsx from 'clsx';
import reduce from 'lodash-es/reduce';
import type { FC } from 'react';
import type { IMoney } from '@tempo/dashboard/components/core/Money';
import Money from '@tempo/dashboard/components/core/Money';

const useStyles = makeStyles(
  (theme) => ({
    container: {
      ...theme.typography.body1,
      lineHeight: 1.9,
      width: '100%',
    },
    highlightedRow: {
      fontWeight: 600,
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(2),
      textAlign: 'right',
    },
  }),
  { name: 'OrderRefundAmountValues' }
);

export interface OrderRefundAmountValuesProps {
  amountAuthorized: IMoney;
  shipmentCost?: IMoney;
  selectedProductsValue?: IMoney;
  previouslyRefunded: IMoney;
  maxRefund: IMoney;
  proposedRefundAmount?: IMoney;
  replacedProductsValue?: IMoney;
  refundTotalAmount?: IMoney;
}

const messages = {
  amountAuthorized: {
    id: 'L/O4LQ',
    defaultMessage: 'Authorized Amount',
    description: 'order refund amount',
  },
  maxRefund: {
    id: 'I7HyJZ',
    defaultMessage: 'Max Refund',
    description: 'order refund amount',
  },
  previouslyRefunded: {
    id: 'Q55cTG',
    defaultMessage: 'Previously refunded',
    description: 'order refund amount',
  },
  proposedRefundAmount: {
    id: 'wDUBLR',
    defaultMessage: 'Proposed refund amount',
    description: 'order refund amount',
  },
  refundTotalAmount: {
    id: 'C6bb6x',
    defaultMessage: 'Refund total amount',
    description: 'order refund amount',
  },
  replacedProductsValue: {
    id: 'i56GGQ',
    defaultMessage: 'Replaced Products Value',
    description: 'order refund amount',
  },
  selectedProductsValue: {
    id: 'kak5vT',
    defaultMessage: 'Selected Products Value',
    description: 'order refund amount',
  },
  shipmentCost: {
    id: 'WGp+Fw',
    defaultMessage: 'Shipment Cost',
    description: 'order refund amount',
  },
};

const OrderRefundAmountValues: FC<OrderRefundAmountValuesProps> = (props) => {
  // const styles = useStyles();
  const styles = {};

  const orderedKeys: Array<keyof OrderRefundAmountValuesProps> = [
    'amountAuthorized',
    'shipmentCost',
    'selectedProductsValue',
    'previouslyRefunded',
    'replacedProductsValue',
    'maxRefund',
    'refundTotalAmount',
  ];

  const highlightedItems: Array<keyof OrderRefundAmountValuesProps> = [
    'maxRefund',
    'refundTotalAmount',
  ];

  const items = reduce(
    orderedKeys,
    (result, key) => {
      const value = props[key];

      if (!value) {
        return result;
      }

      return [...result, { data: value, highlighted: highlightedItems.includes(key), key }];
    },
    []
  );

  return (
    <div className={styles.container ?? ''}>
      {items.map(({ key, data, highlighted }) => (
        <div className={clsx(styles.row, highlighted && styles.highlightedRow)} key={key}>
          {m[messages[key]]}
          <div>{data?.amount !== undefined ? <Money money={data} /> : <Skeleton />}</div>
        </div>
      ))}
    </div>
  );
};

OrderRefundAmountValues.displayName = 'OrderRefundAmountValues';
export default OrderRefundAmountValues;
