import type { TFunction } from '@core/i18n';
import type { CheckIfOrderExistsQuery } from '@core/api/graphql';
import { transformOrderStatus } from '@dashboard/oldSrc/misc';
import { orderUrl } from '@dashboard/oldSrc/orders/urls';

import type { QuickSearchAction } from '../types';

export function isQueryValidOrderNumber(query: string): boolean {
  return query === parseInt(query, 10).toString();
}

export function getGqlOrderId(orderNumber: string): string {
  return btoa(`Order:${orderNumber}`);
}

function getOrdersModeActions(
  query: string,
  t: TFunction,
  router: NextRouter,
  order: CheckIfOrderExistsQuery['order']
): QuickSearchAction[] {
  const gqlId = getGqlOrderId(query);

  if (isQueryValidOrderNumber(query) && order.id === gqlId) {
    return [
      {
        extraInfo: transformOrderStatus(order.status, t).localized,
        label: t('dashboard.oToOrder', 'Go to order #{{orderNumber}}', {
          orderNumber: query,
        }),
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
