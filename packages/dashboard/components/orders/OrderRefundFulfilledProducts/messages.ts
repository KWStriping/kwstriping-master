import type { TFunction } from '@core/i18n';
import { FulfillmentStatus } from '@core/api/constants';

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
      return t('dashboard.ulfillmentReturned', 'Fulfillment returned');
    case FulfillmentStatus.WaitingForApproval:
      return t('dashboard.ulfillmentWaitingForApproval', 'Fulfillment waiting for approval');
    default:
      return t('dashboard.ulfillment', 'Fulfillment');
  }
};
