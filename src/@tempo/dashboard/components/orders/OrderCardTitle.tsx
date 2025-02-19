import { Trans } from '@tempo/next/i18n';
import { CircleIndicator } from '@tempo/ui/components/CircleIndicator';
import { makeStyles } from '@tempo/ui/theme/styles';
import { FulfillmentStatus } from '@tempo/api/generated/constants';
import Typography from '@mui/material/Typography';
import type { FC, ReactNode } from 'react';
import { StatusType } from '@tempo/dashboard/oldSrc/types';
import DefaultCardTitle from '@tempo/dashboard/components/core/CardTitle';

const useStyles = makeStyles(
  (theme) => ({
    warehouseName: {
      float: 'right',
      alignSelf: 'center',
      color: theme.vars.palette.text.secondary,
      margin: `auto ${theme.spacing(1)} auto auto`,
    },
    cardHeader: {
      fontSize: '24px',
      fontWeight: 500,
      lineHeight: '29px',
      letterSpacing: '0.02em',
      textAlign: 'left',
    },
  }),
  { name: 'OrderCardTitle' }
);

type CardTitleStatus = FulfillmentStatus | 'unfulfilled';

type CardTitleLines = Array<{
  quantity: number;
  quantityToFulfill?: number;
}>;

interface OrderCardTitleProps {
  lines?: Maybe<CardTitleLines>;
  fulfillmentOrder?: number;
  status: CardTitleStatus;
  toolbar?: ReactNode;
  orderNumber?: string;
  warehouseName?: string;
  withStatus?: boolean;
  className?: string;
}

const selectStatus = (status: CardTitleStatus) => {
  switch (status) {
    case FulfillmentStatus.Fulfilled:
      return StatusType.Success;
    case FulfillmentStatus.Refunded:
      return StatusType.Info;
    case FulfillmentStatus.Returned:
      return StatusType.Info;
    case FulfillmentStatus.Replaced:
      return StatusType.Info;
    case FulfillmentStatus.RefundedAndReturned:
      return StatusType.Info;
    case FulfillmentStatus.WaitingForApproval:
      return StatusType.Warning;
    case FulfillmentStatus.Canceled:
      return StatusType.Error;
    default:
      return StatusType.Error;
  }
};

const OrderCardTitle: FC<OrderCardTitleProps> = ({
  lines = [],
  fulfillmentOrder,
  status,
  orderNumber = '',
  warehouseName,
  withStatus = false,
  toolbar,
  className,
}) => {
  // const styles = useStyles();
  const styles = {};
  const fulfillmentName =
    orderNumber && fulfillmentOrder ? `#${orderNumber}-${fulfillmentOrder}` : '';

  const totalQuantity =
    status === 'unfulfilled'
      ? lines.reduce(
          (resultQuantity, line) => resultQuantity + (line.quantityToFulfill ?? line.quantity),
          0
        )
      : lines.reduce((resultQuantity, { quantity }) => resultQuantity + quantity, 0);

  const messageForStatus = useFulfillmentStatusMessage(status, { count: totalQuantity });

  return (
    <DefaultCardTitle
      toolbar={toolbar}
      className={className}
      title={
        <div className={'w-full flex justify-start gap-2'}>
          {withStatus && (
            <div className={'flex items-center'}>
              <CircleIndicator color={selectStatus(status)} />
            </div>
          )}
          <Typography className={styles.cardHeader ?? ''}>{messageForStatus}</Typography>
          {!!warehouseName && (
            <Typography className={styles.warehouseName ?? ''} variant="caption">
              <Trans
                {...messages.fulfilledFrom}
                values={{
                  warehouseName,
                }}
              />
            </Typography>
          )}
        </div>
      }
    />
  );
};

OrderCardTitle.displayName = 'OrderCardTitle';
export default OrderCardTitle;

interface FulfillmentStatusMessageArgs {
  count: number;
}

function useFulfillmentStatusMessage(
  status: CardTitleStatus,
  args: FulfillmentStatusMessageArgs
) {
  switch (status) {
    case FulfillmentStatus.Canceled:
      return t(
        'fulfillmentStatus_canceled',
        args.count === 1 ? 'Canceled' : 'Canceled ({{count}})',
        args
      );
    case FulfillmentStatus.Fulfilled:
      return t(
        'fulfillmentStatus_fulfilled',
        args.count === 1 ? 'Fulfilled' : 'Fulfilled ({{count}})',
        args
      );
    case FulfillmentStatus.Refunded:
      return t(
        'fulfillmentStatus_refunded',
        args.count === 1 ? 'Refunded' : 'Refunded ({{count}})',
        args
      );
    case FulfillmentStatus.RefundedAndReturned:
      return t(
        'fulfillmentStatus_refundedAndReturned',
        args.count === 1 ? 'Refunded and returned' : 'Refunded and returned ({{count}})',
        args
      );
    case FulfillmentStatus.Replaced:
      return t(
        'fulfillmentStatus_replaced',
        args.count === 1 ? 'Replaced' : 'Replaced ({{count}})',
        args
      );
    case FulfillmentStatus.Returned:
      return t(
        'fulfillmentStatus_returned',
        args.count === 1 ? 'Returned' : 'Returned ({{count}})',
        args
      );
    case FulfillmentStatus.WaitingForApproval:
      return t(
        'fulfillmentStatus_waitingForApproval',
        args.count === 1 ? 'Waiting for approval' : 'Waiting for approval ({{count}})',
        args
      );
    // case FulfillmentStatus.FulfilledFrom:
    //   return t('fulfillmentStatus_fulfilledFrom', 'Fulfilled from {warehouseName}', args);
    case 'unfulfilled':
      return t(
        'fulfillmentStatus_unfulfilled',
        args.count === 1 ? 'Unfulfilled' : 'Unfulfilled ({{count}})',
        args
      );
    default:
      return '';
  }
}
