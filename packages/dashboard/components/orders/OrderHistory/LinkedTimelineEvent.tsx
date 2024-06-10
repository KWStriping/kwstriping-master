import { OrderEventType } from '@core/api/constants';
import { useTranslation } from '@core/i18n';
import type { FC } from 'react';
import { TimelineEvent } from '@dashboard/components/core/Timeline';
import type { TitleElement } from '@dashboard/components/core/Timeline/TimelineEventHeader';
import type { OrderEventFragment } from '@core/api/graphql';
import { orderUrl } from '@dashboard/oldSrc/orders/urls';
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
  const { t } = useTranslation();

  const getTitleElements = (): TitleElement[] => {
    const { type, relatedOrder, lines } = event;

    switch (type) {
      case OrderEventType.OrderReplacementCreated: {
        return [
          {
            link: relatedOrder?.id ? orderUrl(relatedOrder.id) : undefined,
            text: t('dashboard.draftNumber', 'Draft #{{orderNumber}} ', {
              orderNumber: relatedOrder?.number,
            }),
          },
          { text: t('dashboard.description', 'was created for replaced products') },
        ];
      }
      case OrderEventType.OrderDiscountDeleted: {
        return [
          {
            text: t('dashboard.orderDiscountRemoved', 'Order discount was removed by '),
          },
          getEmployeeNameLink(event),
        ];
      }
      case OrderEventType.OrderLineDiscountRemoved: {
        return [
          {
            text: t(
              'dashboard.productDiscountRemoved',
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
