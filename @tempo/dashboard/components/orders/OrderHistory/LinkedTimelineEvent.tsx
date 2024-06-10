import * as m from '@paraglide/messages';
import { OrderEventType } from '@tempo/api/generated/constants';
// import { useTranslation } from '@tempo/next/i18n';
import type { FC } from 'react';
import { TimelineEvent } from '@tempo/dashboard/components/core/Timeline';
import type { TitleElement } from '@tempo/dashboard/components/core/Timeline/TimelineEventHeader';
import type { OrderEventFragment } from '@tempo/api/generated/graphql';
import { orderUrl } from '@tempo/dashboard/oldSrc/orders/urls';
import { getEmployeeNameLink } from './utils';

export const replacementCreatedMessages = {
  description: {
    id: 'kvSYZh',
    defaultMessage: 'was created for replaced products',
    description: 'replacement created order history message description',
  },
  draftNumber: {
    id: 'kkIw+l',
    defaultMessage: 'Draft #{{orderNumber}} ',
    description: 'replacement created order history message draft number',
  },
};

export const discountRemovedMessages = {
  orderDiscountRemoved: {
    id: 'KXkdMH',
    defaultMessage: 'Order discount was removed by ',
    description: 'order discount removed title',
  },
  productDiscountRemoved: {
    id: 'A0Wlg7',
    defaultMessage: '{productName} discount was removed by',
    description: 'product discount removed title',
  },
};

interface LinkedTimelineEventProps {
  event: Maybe<OrderEventFragment>;
}

const LinkedTimelineEvent: FC<LinkedTimelineEventProps> = ({ event }) => {
  const getTitleElements = (): TitleElement[] => {
    const { type, relatedOrder, lines } = event;

    switch (type) {
      case OrderEventType.OrderReplacementCreated: {
        return [
          {
            link: relatedOrder?.id ? orderUrl(relatedOrder.id) : undefined,
            text:
              m.dashboard_draftNumber({
                orderNumber: relatedOrder?.number,
              }) ?? 'Draft #{{orderNumber}} ',
          },
          { text: m.dashboard_description() ?? 'was created for replaced products' },
        ];
      }
      case OrderEventType.OrderDiscountDeleted: {
        return [
          {
            text: m.dashboard_orderDiscountRemoved() ?? 'Order discount was removed by ',
          },
          getEmployeeNameLink(event),
        ];
      }
      case OrderEventType.OrderLineDiscountRemoved: {
        return [
          {
            text: t(
              'dashboard_productDiscountRemoved',
              '{{productName}} discount was removed by',
              {
                productName: lines?.[0]?.itemName ?? '...',
              }
            ),
          },
          getEmployeeNameLink(event),
        ];
      }
      default:
        return [];
    }
  };

  return <TimelineEvent titleElements={getTitleElements()} date={event.date} />;
};

export default LinkedTimelineEvent;
