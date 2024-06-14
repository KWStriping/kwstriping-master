import { OrderErrorCode } from '@tempo/api/generated/constants';
import type { OrderErrorFragment } from '@tempo/api/generated/graphql';

import { getCommonFormFieldErrorMessage } from './common';

const messages = {
  billingNotSet: {
    id: 'IFWHn0',
    defaultMessage: 'Billing address is not set',
    description: 'error message',
  },
  cannotCancelFulfillment: {
    id: 'ij7olm',
    defaultMessage: 'This fulfillment cannot be cancelled',
    description: 'error message',
  },
  cannotCancelOrder: {
    id: 'BM1JiJ',
    defaultMessage: 'This order cannot be cancelled',
    description: 'error message',
  },
  cannotFulfillLine: {
    id: 'nOo0oL',
    defaultMessage: 'Not enough items to fulfill',
    description: 'error message',
  },
  cannotRefund: {
    id: 'Xb6BJ9',
    defaultMessage: 'Manual payments can not be refunded',
    description: 'error message',
  },
  cannotVoid: {
    id: 'sZ27WU',
    defaultMessage: 'Only pre-authorized payments can be voided',
    description: 'error message',
  },
  captureInactive: {
    id: 'gKdGxP',
    defaultMessage: 'Only pre-authorized payments can be captured',
    description: 'error message',
  },
  insufficientStock: {
    id: 'd9UqaJ',
    defaultMessage: 'Cannot change the quantity because of insufficient stock',
    description: 'error message',
  },
  noShippingAddress: {
    id: 'Wlc67M',
    defaultMessage: 'Cannot choose a shipping method for an order without the shipping address',
    description: 'error message',
  },
  notEditable: {
    id: 'r+8q4B',
    defaultMessage: 'Only draft orders can be edited',
    description: 'error message',
  },
  paymentMissing: {
    id: 'Y1B0PN',
    defaultMessage: "There's no payment associated with the order",
    description: 'error message',
  },
  shippingNotApplicable: {
    id: 'VEE4gD',
    defaultMessage: 'Shipping method is not valid for chosen shipping address',
    description: 'error message',
  },
  shippingRequired: {
    id: 'ychKsb',
    defaultMessage: 'Shipping method is required for this order',
    description: 'error message',
  },
};

function getOrderErrorMessage(err: OrderErrorFragment, t: TFunction): string {
  if (err) {
    switch (err.code) {
      case OrderErrorCode.BillingAddressNotSet:
        return t('dashboard_illingNotSet', messages.billingNotSet.defaultMessage);
      case OrderErrorCode.CannotCancelFulfillment:
        return t(
          'dashboard_cannotCancelFulfillment',
          messages.cannotCancelFulfillment.defaultMessage
        );
      case OrderErrorCode.CannotCancelOrder:
        return t('dashboard_cannotCancelOrder', messages.cannotCancelOrder.defaultMessage);
      case OrderErrorCode.CannotRefund:
        return t('dashboard_cannotRefund', messages.cannotRefund.defaultMessage);
      case OrderErrorCode.CaptureInactivePayment:
        return t('dashboard_captureInactive', messages.captureInactive.defaultMessage);
      case OrderErrorCode.FulfillOrderLine:
        return t('dashboard_cannotFulfillLine', messages.cannotFulfillLine.defaultMessage);
      case OrderErrorCode.InsufficientStock:
        return t('dashboard_insufficientStock', messages.insufficientStock.defaultMessage);
      case OrderErrorCode.NotEditable:
        return t('dashboard_otEditable', messages.notEditable.defaultMessage);
      case OrderErrorCode.OrderNoShippingAddress:
        return t('dashboard_oShippingAddress', messages.noShippingAddress.defaultMessage);
      case OrderErrorCode.PaymentMissing:
        return t('dashboard_paymentMissing', messages.paymentMissing.defaultMessage);
      case OrderErrorCode.ShippingMethodNotApplicable:
        return t(
          'dashboard_shippingNotApplicable',
          messages.shippingNotApplicable.defaultMessage
        );
      case OrderErrorCode.ShippingMethodRequired:
        return t('dashboard_shippingRequired', messages.shippingRequired.defaultMessage);
      case OrderErrorCode.VoidInactivePayment:
        return t('dashboard_cannotVoid', messages.cannotVoid.defaultMessage);
    }
  }

  return getCommonFormFieldErrorMessage(err, t);
}

export default getOrderErrorMessage;
