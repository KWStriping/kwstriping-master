import * as m from '@paraglide/messages';
import type { CheckIfOrderExistsQuery } from '@tempo/api/generated/graphql';
import { transformOrderStatus } from '@tempo/dashboard/oldSrc/misc';
import { orderUrl } from '@tempo/dashboard/oldSrc/orders/urls';
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { QuickSearchAction } from '../types';

export function isQueryValidOrderNumber(query: string): boolean {
  return query === parseInt(query, 10).toString();
}

export function getGqlOrderId(orderNumber: string): string {
  return btoa(`Order:${orderNumber}`);
}

function getOrdersModeActions(
  query: string,
  router: AppRouterInstance,
  order: CheckIfOrderExistsQuery['order']
): QuickSearchAction[] {
  const gqlId = getGqlOrderId(query);

  if (isQueryValidOrderNumber(query) && order.id === gqlId) {
    return [
      {
        extraInfo: transformOrderStatus(order.status, t).localized,
        label: (m.dashboard_oToOrder({
          orderNumber: query,
        }) ?? 'Go to order #{{orderNumber}}'),
        onClick: () => {
          void router.push(orderUrl(gqlId));
          return false;
        },
        type: 'action',
      },
    ];
  }

  return [];
}

export default getOrdersModeActions;
