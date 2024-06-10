import { OrderEventType } from '@core/api/constants';
import type { TFunction } from '@core/i18n';
import type { ActivityFragment } from '@core/api/graphql';

export const getActivityMessage = (
  activity: Pick<ActivityFragment, 'type' | 'relatedOrder' | 'user' | 'message'>,
  t: TFunction
) => {
  switch (activity.type) {
    case OrderEventType.OrderFullyPaid:
      return t('dashboard.paid', 'Order #{{orderId}} was fully paid', {
        orderId: activity.relatedOrder?.number,
      });
    case OrderEventType.Placed: {
      return t('dashboard.placed', 'Order #{{orderId}} was placed', {
        orderId: activity.relatedOrder?.number,
      });
    }
    case OrderEventType.PlacedFromDraft:
      if (activity.user?.email) {
        return t('dashboard.draft', 'Order #{{orderId}} was placed from draft by {{userEmail}}', {
          orderId: activity.relatedOrder?.number,
          userEmail: activity.user?.email,
        });
      } else {
        return t('dashboard.draft_no_email', 'Order #{{orderId}} was placed from draft', {
          orderId: activity.relatedOrder?.number,
        });
      }

    default:
      return activity.message;
  }
};
