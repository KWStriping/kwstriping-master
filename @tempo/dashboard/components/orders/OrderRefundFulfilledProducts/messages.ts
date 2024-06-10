import * as m from '@paraglide/messages';
import type { TFunction } from '@tempo/next/i18n';
import { FulfillmentStatus } from '@tempo/api/generated/constants';

export const messages = {
  fulfillment: {
    id: 'MewrtN',
    defaultMessage: 'Fulfillment',
    description: 'section header',
  },
  fulfillmentReturned: {
    id: 'H/f9KR',
    defaultMessage: 'Fulfillment returned',
    description: 'section header returned',
  },
  fulfillmentWaitingForApproval: {
    id: 'i/ZhxL',
    defaultMessage: 'Fulfillment waiting for approval',
    description: 'section header returned',
  },
};

export const getTitle = (fulfillmentStatus: FulfillmentStatus, t: TFunction) => {
  switch (fulfillmentStatus) {
    case FulfillmentStatus.Returned:
      return (m.dashboard_ulfillmentReturned() ?? 'Fulfillment returned');
    case FulfillmentStatus.WaitingForApproval:
      return (m.dashboard_ulfillmentWaitingForApproval() ?? 'Fulfillment waiting for approval');
    default:
      return (m.dashboard_ulfillment() ?? 'Fulfillment');
  }
};
