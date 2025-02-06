import { gql } from '@tempo/api';

export const cancelOrderMutation = gql(`
  mutation OrderCancel($id: ID!) {
    cancelOrder(id: $id) {
      errors {
        ...OrderError
      }
      result {
        ...OrderDetails
      }
    }
  }
`);

// Discounts
export const addDiscountToOrderMutation = gql(`
  mutation OrderDiscountAdd($input: OrderDiscountCommonInput!, $orderId: ID!) {
    addDiscountToOrder(data: $input, orderId: $orderId) {
      errors {
        ...OrderError
      }
      result {
        ...OrderDetails
      }
    }
  }
`);

export const deleteOrderDiscountMutation = gql(`
  mutation OrderDiscountDelete($discountId: ID!) {
    deleteOrderDiscount(discountId: $discountId) {
      errors {
        ...OrderError
      }
      result {
        ...OrderDetails
      }
    }
  }
`);

export const removeOrderLineDiscountMutation = gql(`
  mutation OrderLineDiscountRemove($orderLineId: ID!) {
    removeOrderLineDiscount(orderLineId: $orderLineId) {
      errors {
        ...OrderError
      }
      order {
        ...OrderDetails
      }
    }
  }
`);

export const updateOrderLineDiscountMutation = gql(`
  mutation OrderLineDiscountUpdate($input: OrderDiscountCommonInput!, $orderLineId: ID!) {
    updateOrderLineDiscount(data: $input, orderLineId: $orderLineId) {
      errors {
        ...OrderError
      }
      order {
        ...OrderDetails
      }
    }
  }
`);

export const updateOrderDiscountMutation = gql(`
  mutation OrderDiscountUpdate($input: OrderDiscountCommonInput!, $discountId: ID!) {
    updateOrderDiscount(data: $input, discountId: $discountId) {
      errors {
        ...OrderError
      }
      result {
        ...OrderDetails
      }
    }
  }
`);

// -----

export const orderDraftCancelMutation = gql(`
  mutation OrderDraftCancel($id: ID!) {
    deleteOrderDraft(id: $id) {
      errors {
        ...OrderError
      }
      result {
        ...OrderDetails
      }
    }
  }
`);

export const orderDraftBulkCancelMutation = gql(`
  mutation OrderDraftBulkCancel($ids: [ID!]!) {
    deleteOrderDrafts(ids: $ids) {
      errors {
        ...OrderError
      }
    }
  }
`);

export const confirmOrderMutation = gql(`
  mutation OrderConfirm($id: ID!) {
    confirmOrder(id: $id) {
      errors {
        ...OrderError
      }
      result {
        ...OrderDetails
      }
    }
  }
`);

export const orderDraftFinalizeMutation = gql(`
  mutation OrderDraftFinalize($id: ID!) {
    completeOrderDraft(id: $id) {
      errors {
        ...OrderError
      }
      result {
        ...OrderDetails
      }
    }
  }
`);

export const orderReturnCreateMutation = gql(`
  mutation FulfillmentReturnProducts($id: ID!, $input: OrderReturnProductsInput!) {
    returnFulfilledProducts(data: $input, order: $id) {
      errors {
        ...OrderError
      }
      result {
        fulfillment {
          id
        }
        order {
          id
        }
      }
    }
  }
`);

export const refundOrderMutation = gql(`
  mutation OrderRefund($id: ID!, $amount: PositiveDecimal!) {
    refundOrder(id: $id, amount: $amount) {
      errors {
        ...OrderError
      }
      result {
        ...OrderDetails
      }
    }
  }
`);

export const refundFulfilledProductsMutation = gql(`
  mutation OrderFulfillmentRefundProducts($input: OrderRefundProductsInput!, $order: ID!) {
    refundFulfilledProducts(data: $input, order: $order) {
      errors {
        ...OrderError
      }
      result {
        order {
          ...OrderDetails
        }
        fulfillment {
          ...Fulfillment
        }
      }
    }
  }
`);

export const voidOrderMutation = gql(`
  mutation OrderVoid($id: ID!) {
    voidOrder(id: $id) {
      errors {
        ...OrderError
      }
      result {
        ...OrderDetails
      }
    }
  }
`);

export const markOrderAsPaidMutation = gql(`
  mutation OrderMarkAsPaid($id: ID!, $transactionReference: String) {
    markOrderAsPaid(id: $id, transactionReference: $transactionReference) {
      errors {
        ...OrderError
      }
      result {
        ...OrderDetails
      }
    }
  }
`);

export const captureOrderMutation = gql(`
  mutation OrderCapture($id: ID!, $amount: PositiveDecimal!) {
    captureOrder(id: $id, amount: $amount) {
      errors {
        ...OrderError
      }
      result {
        ...OrderDetails
      }
    }
  }
`);

export const updateFulfillmentTrackingMutation = gql(`
  mutation OrderFulfillmentUpdateTracking(
    $id: ID!
    $input: FulfillmentUpdateTrackingInput!
  ) {
    updateFulfillmentTracking(id: $id, data: $input) {
      errors {
        ...OrderError
      }
      result {
        order {
          ...OrderDetails
        }
      }
    }
  }
`);

export const approveFulfillmentMutation = gql(`
  mutation OrderFulfillmentApprove(
    $id: ID!
    $notifyCustomer: Boolean!
    $allowStockToBeExceeded: Boolean
  ) {
    approveFulfillment(
      id: $id
      notifyCustomer: $notifyCustomer
      allowStockToBeExceeded: $allowStockToBeExceeded
    ) {
      errors {
        ...OrderError
      }
      result {
        order {
          ...OrderDetails
        }
      }
    }
  }
`);

export const cancelFulfillmentMutation = gql(`
  mutation OrderFulfillmentCancel($id: ID!, $input: FulfillmentCancelInput!) {
    cancelFulfillment(id: $id, data: $input) {
      errors {
        ...OrderError
      }
      result {
        order {
          ...OrderDetails
        }
      }
    }
  }
`);

export const addNoteToOrderMutation = gql(`
  mutation OrderAddNote($orderId: ID!, $input: OrderAddNoteInput!) {
    addNoteToOrder(id: $orderId, data: $input) {
      errors {
        ...OrderError
      }
      order {
        id
        events {
          ...OrderEvent
        }
      }
    }
  }
`);

export const updateOrderMutation = gql(`
  mutation OrderUpdate($id: ID!, $input: OrderUpdateInput!) {
    updateOrder(id: $id, data: $input) {
      errors {
        ...OrderError
      }
      result {
        ...OrderDetails
      }
    }
  }
`);

export const orderDraftUpdateMutation = gql(`
  mutation OrderDraftUpdate($id: ID!, $input: DraftOrderInput!) {
    updateDraftOrder(id: $id, data: $input) {
      errors {
        ...OrderError
      }
      result {
        ...OrderDetails
      }
    }
  }
`);

export const orderShippingMethodUpdateMutation = gql(`
  mutation OrderShippingMethodUpdate($id: ID!, $input: OrderUpdateShippingInput!) {
    updateOrderShipping(orderId: $id, data: $input) {
      errors {
        ...OrderError
      }
      result {
        shippingMethods {
          id
          name
        }
        total {
          tax {
            amount
            currency
          }
          gross {
            amount
            currency
          }
        }
        id
        shippingMethod {
          id
          name
          price {
            amount
            currency
          }
        }
        shippingMethodName
        shippingPrice {
          gross {
            amount
            currency
          }
        }
        ...OrderDetails
      }
    }
  }
`);

export const orderDraftCreateMutation = gql(`
  mutation OrderDraftCreate($input: DraftOrderCreationInput!) {
    createDraftOrder(data: $input) {
      errors {
        ...OrderError
      }
      result {
        id
      }
    }
  }
`);

export const deleteOrderLineMutation = gql(`
  mutation OrderLineDelete($id: ID!) {
    deleteOrderLine(id: $id) {
      errors {
        ...OrderError
      }
      order {
        id
        lines {
          ...OrderLine
        }
      }
    }
  }
`);

export const orderLinesAddMutation = gql(`
  mutation OrderLinesAdd($id: ID!, $input: [OrderLineCreationInput!]!) {
    createOrderLines(id: $id, data: $input) {
      errors {
        ...OrderError
      }
      order {
        id
        lines {
          ...OrderLine
        }
      }
    }
  }
`);

export const updateOrderLineMutation = gql(`
  mutation OrderLineUpdate($id: ID!, $input: OrderLineInput!) {
    updateOrderLine(id: $id, data: $input) {
      errors {
        ...OrderError
      }
      orderLine {
        ...OrderLine
      }
    }
  }
`);

export const fulfillOrder = gql(`
  mutation FulfillOrder($orderId: ID!, $input: OrderFulfillInput!) {
    fulfillOrder(order: $orderId, data: $input) {
      errors {
        ...OrderError
        ... on OrderError {
          warehouse
        }
      }
      result {
        order {
          ...OrderDetails
        }
      }
    }
  }
`);

export const requestInvoiceMutation = gql(`
  mutation InvoiceRequest($orderId: ID!) {
    requestInvoice(orderId: $orderId) {
      errors {
        ...Error
      }
      invoice {
        ...Invoice
      }
      order {
        id
        invoices {
          ...Invoice
        }
      }
    }
  }
`);

export const invoiceEmailSendMutation = gql(`
  mutation InvoiceEmailSend($id: ID!) {
    sendInvoiceNotification(id: $id) {
      errors {
        ...Error
      }
      result {
        ...Invoice
      }
    }
  }
`);

export const updateOrderSettingsMutation = gql(`
  mutation OrderSettingsUpdate(
    $orderSettingsInput: OrderSettingsUpdateInput!
    $shopSettingsInput: ShopSettingsUpdateInput!
  ) {
    updateOrderSettings(data: $orderSettingsInput) {
      errors {
        ...Error
      }
      result {
        ...OrderSettings
      }
    }
    updateShopSettings(data: $shopSettingsInput) {
      errors {
        ...Error
      }
      result {
        ...ShopOrderSettings
      }
    }
  }
`);
