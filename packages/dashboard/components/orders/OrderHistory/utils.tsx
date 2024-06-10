import { OrderEventType } from '@core/api/constants';
import type { OrderEventFragment } from '@core/api/graphql';
import { getFullName } from '@dashboard/oldSrc/misc';

export const getEventSecondaryTitle = (event: OrderEventFragment): [MessageDescriptor, any?] => {
  switch (event.type) {
    case OrderEventType.OrderMarkedAsPaid: {
      return [
        {
          defaultMessage: 'Transaction Reference {transactionReference}',
          description: 'transaction reference',
          id: 'transaction-reference-order-history',
        },
        { transactionReference: event.transactionReference },
      ];
    }
  }
};

const timelineEventTypes = {
  discount: [
    OrderEventType.OrderDiscountAdded,
    OrderEventType.OrderDiscountUpdated,
    OrderEventType.OrderLineDiscountUpdated,
    OrderEventType.OrderDiscountAutomaticallyUpdated,
  ],
  extendable: [
    OrderEventType.FulfillmentRefunded,
    OrderEventType.FulfillmentReplaced,
    OrderEventType.FulfillmentReturned,
    OrderEventType.DraftCreated_FROM_REPLACE,
    OrderEventType.OrderMarkedAsPaid,
    OrderEventType.OrderDiscountAdded,
    OrderEventType.OrderDiscountAutomaticallyUpdated,
    OrderEventType.OrderDiscountUpdated,
    OrderEventType.OrderLineDiscountUpdated,
  ],
  linked: [
    OrderEventType.OrderReplacementCreated,
    OrderEventType.OrderDiscountDeleted,
    OrderEventType.OrderLineDiscountRemoved,
  ],
  note: [OrderEventType.NoteAdded],
  rawMessage: [
    OrderEventType.Other,
    OrderEventType.ExternalServiceNotification,
    OrderEventType.TransactionEvent,
  ],
  secondaryTitle: [OrderEventType.OrderMarkedAsPaid],
};

export const isTimelineEventOfType = (
  type: 'extendable' | 'secondaryTitle' | 'rawMessage' | 'note' | 'linked' | 'discount',
  eventType: OrderEventType
) => !!timelineEventTypes[type]?.includes(eventType);

export const isTimelineEventOfDiscountType = (eventType: OrderEventType) =>
  isTimelineEventOfType('discount', eventType);

const selectEmployeeName = ({ firstName, lastName, email }: OrderEventFragment['user']) => {
  if (firstName) {
    return getFullName({ firstName, lastName }).trim();
  }

  return email;
};

export const getEmployeeNameLink = (event: OrderEventFragment) => {
  if (!hasEnsuredOrderEventFields(event, ['user'])) {
    return null;
  }

  const { id } = event.user;

  return {
    link: { pathname: '/staff/[id]', query: { id } },
    text: selectEmployeeName(event.user),
  };
};

export const hasOrderLineDiscountWithNoPreviousValue = ({ type, lines }: OrderEventFragment) =>
  type === OrderEventType.OrderLineDiscountUpdated &&
  lines?.[0]?.discount &&
  !lines?.[0].discount?.oldValue;

export const getOrderNumberLink = (event: OrderEventFragment) => {
  if (!hasEnsuredOrderEventFields(event, ['relatedOrder'])) {
    return null;
  }

  const { id, number } = event.relatedOrder;

  return getOrderNumberLinkObject({ id, number });
};

const hasEnsuredOrderEventFields = (
  event: OrderEventFragment,
  fields: Array<keyof OrderEventFragment>
) => !fields.some((field: keyof OrderEventFragment) => !event[field]);

export const getOrderNumberLinkObject = ({ id, number }: { id: string; number: string }) => ({
  link: { pathname: '/orders/[id]', query: { id } },
  text: `#${number}`,
});
