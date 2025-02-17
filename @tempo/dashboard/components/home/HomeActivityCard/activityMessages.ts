import * as m from '@paraglide/messages';
import { OrderEventType } from '@tempo/api/generated/constants';
import type { TFunction } from '@tempo/next/i18n';
import type { ActivityFragment } from '@tempo/api/generated/graphql';

export const getActivityMessage = (
  activity: Pick<ActivityFragment, 'type' | 'relatedOrder' | 'user' | 'message'>,
  t: TFunction
) => {
  switch (activity.type) {
    case OrderEventType.OrderFullyPaid:
      return (
        m.dashboard_paid({
          orderId: activity.relatedOrder?.number,
        }) ?? 'Order #{{orderId}} was fully paid'
      );
    case OrderEventType.Placed: {
      return (
        m.dashboard_placed({
          orderId: activity.relatedOrder?.number,
        }) ?? 'Order #{{orderId}} was placed'
      );
    }
    case OrderEventType.PlacedFromDraft:
      if (activity.user?.email) {
        return (
          m.dashboard_draft({
            orderId: activity.relatedOrder?.number,
            userEmail: activity.user?.email,
          }) ?? 'Order #{{orderId}} was placed from draft by {{userEmail}}'
        );
      } else {
        return (
          m.dashboard_draft_no_email({
            orderId: activity.relatedOrder?.number,
          }) ?? 'Order #{{orderId}} was placed from draft'
        );
      }

    default:
      return activity.message;
  }
};
