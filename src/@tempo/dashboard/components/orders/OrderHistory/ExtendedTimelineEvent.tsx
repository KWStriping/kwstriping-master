import * as m from '@paraglide/messages';
import { OrderEventType } from '@tempo/api/generated/constants';
// import { useTranslation } from '@tempo/next/i18n';
import { makeStyles } from '@tempo/ui/theme/styles';
import Typography from '@mui/material/Typography';
import camelCase from 'lodash-es/camelCase';
import type { FC } from 'react';
import type { OrderEventFragment } from '@tempo/api/generated/graphql';
import ExtendedDiscountTimelineEvent from './ExtendedDiscountTimelineEvent';
import Label from './Label';
import {
  getEmployeeNameLink,
  getOrderNumberLink,
  hasOrderLineDiscountWithNoPreviousValue,
  isTimelineEventOfDiscountType,
} from './utils';
import Money from '@tempo/dashboard/components/core/Money';
import { TimelineEvent } from '@tempo/dashboard/components/core/Timeline';

const useStyles = makeStyles(
  (theme) => ({
    header: {
      fontWeight: 500,
      marginBottom: theme.spacing(1),
    },
    linesTableCell: {
      paddingRight: theme.spacing(3),
    },
    root: { marginTop: theme.spacing(4) },
    topSpacer: {
      marginTop: theme.spacing(3),
    },
    user: {
      marginBottom: theme.spacing(1),
    },
  }),
  { name: 'OrderHistory' }
);

export const productTitles = {
  draftCreatedFromReplace: {
    id: 'a1uffz',
    defaultMessage: 'Products replaced',
    description: 'draft created from replace products list title',
  },
  fulfillmentRefunded: {
    id: 'sHON47',
    defaultMessage: 'Products refunded',
    description: 'refunded products list title',
  },
  fulfillmentReplaced: {
    id: 'nki0o/',
    defaultMessage: 'Products replaced',
    description: 'replaced products list title',
  },
  fulfillmentReturned: {
    id: 'L5io1l',
    defaultMessage: 'Products returned',
    description: 'returned products list title',
  },
};

export const titles = {
  draftCreatedFromReplace: {
    id: '5R4VMl',
    defaultMessage: 'Draft was reissued from order ',
    description: 'draft created from replace event title',
  },
  fulfillmentRefunded: {
    id: 'VDwkEZ',
    defaultMessage: 'Products were refunded by ',
    description: 'refunded event title',
  },
  fulfillmentReplaced: {
    id: '1GTU/3',
    defaultMessage: 'Products were replaced by ',
    description: 'replaced event title',
  },
  fulfillmentReturned: {
    id: 'nayZY0',
    defaultMessage: 'Products were returned by',
    description: 'returned event title',
  },
  addDiscountToOrdered: {
    id: 'Zptsep',
    defaultMessage: 'Order was discounted by',
    description: 'order was discounted event title',
  },
  orderDiscountAutomaticallyUpdated: {
    id: 'AQSmqG',
    defaultMessage: 'Order discount was updated automatically updated',
    description: 'order discount was updated automatically event title',
  },
  updateOrderDiscountd: {
    id: '/KWNJW',
    defaultMessage: 'Order discount was updated by',
    description: 'order discount was updated event title',
  },
  orderLineDiscountAdded: {
    id: '9TAzb5',
    defaultMessage: '{productName} discount was added by ',
    description: 'order line discount added title',
  },
  updateOrderLineDiscountd: {
    id: 'NgCb99',
    defaultMessage: '{productName} discount was updated by ',
    description: 'order line discount updated title',
  },
  orderMarkedAsPaid: {
    id: '/0JckE',
    defaultMessage: 'Order was marked as paid by',
    description: 'order marked as paid event title',
  },
};

interface ExtendedTimelineEventProps {
  event: Maybe<OrderEventFragment>;
  orderCurrency: string;
}

const ExtendedTimelineEvent: FC<ExtendedTimelineEventProps> = ({ event, orderCurrency }) => {
  const { id, date, type, lines, amount, transactionReference, shippingCostsIncluded } = event;
  // const styles = useStyles();
  const styles = {};

  const eventTypeInCamelCase = camelCase(type);

  const getEventTitleMessageInCamelCase = () => {
    if (hasOrderLineDiscountWithNoPreviousValue(event)) {
      return titles.orderLineDiscountAdded;
    }

    return titles[eventTypeInCamelCase];
  };

  const getTitleProps = () => {
    if (type === OrderEventType.OrderLineDiscountUpdated) {
      return { productName: lines[0]?.itemName };
    }

    return {};
  };

  const titleElements = {
    by: { text: m.dashboard_y() ?? 'by' },
    employeeName: getEmployeeNameLink(event),
    orderNumber: getOrderNumberLink(event),
    title: {
      text: m[getEventTitleMessageInCamelCase()] ?? getTitleProps(),
    },
  };

  const selectTitleElements = () => {
    const { title, by, employeeName, orderNumber } = titleElements;

    switch (type) {
      case OrderEventType.DraftCreated_FROM_REPLACE: {
        return [title, orderNumber, by, employeeName];
      }
      case OrderEventType.OrderDiscountAutomaticallyUpdated: {
        return [title];
      }
      default: {
        return [title, employeeName];
      }
    }
  };

  if (isTimelineEventOfDiscountType(type)) {
    return <ExtendedDiscountTimelineEvent event={event} titleElements={selectTitleElements()} />;
  }

  return (
    <TimelineEvent date={date} titleElements={selectTitleElements()} key={id}>
      {lines && (
        <>
          <Label text={m[productTitles[eventTypeInCamelCase]]} />
          <table>
            <tbody>
              {lines.map(({ orderLine, quantity, itemName }, i) => (
                <tr key={`${itemName}-${i}`}>
                  <td className={styles.linesTableCell ?? ''}>
                    {orderLine?.productName || itemName}
                  </td>
                  <td className={styles.linesTableCell ?? ''}>
                    <Label text={orderLine?.productName} />
                  </td>
                  <td className={styles.linesTableCell ?? ''}>
                    <Label text={`qty: ${quantity}`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(amount || amount === 0) && (
            <>
              <Label text={m.dashboard_amountRefunded() ?? 'Refunded amount'} />
              <Money
                money={{
                  amount,
                  currency: orderCurrency,
                }}
              />
            </>
          )}
          {shippingCostsIncluded && (
            <Typography>{m.dashboard_refundedShipment() ?? 'Shipment was refunded'}</Typography>
          )}
        </>
      )}

      {!!transactionReference && (
        <>
          <Label text={m.dashboard_ransactionReference() ?? 'Transaction reference'} />
          <Typography>{transactionReference}</Typography>
        </>
      )}
    </TimelineEvent>
  );
};

export default ExtendedTimelineEvent;
