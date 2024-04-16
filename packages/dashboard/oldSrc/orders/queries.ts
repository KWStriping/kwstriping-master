import { graphql as gql } from '@core/api/gql';

export const orderListQuery = gql(`
  query OrderList(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $filter: OrderFilter
    $sort: OrderOrderingInput
  ) {
    orders(
      before: $before
      after: $after
      first: $first
      last: $last
      filters: $filter
      sortBy: $sort
    ) {
      edges {
        node {
          __typename
          billingAddress {
            ...Address
          }
          createdAt
          id
          number
          paymentStatus
          status
          total {
            __typename
            gross {
              __typename
              amount
              currency
            }
          }
          userEmail
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`);
export const orderDraftListQuery = gql(`
  query OrderDraftList(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $filter: OrderDraftFilter
    $sort: OrderOrderingInput
  ) {
    orderDrafts(
      before: $before
      after: $after
      first: $first
      last: $last
      filters: $filter
      sortBy: $sort
    ) {
      edges {
        node {
          __typename
          billingAddress {
            ...Address
          }
          createdAt
          id
          number
          paymentStatus
          status
          total {
            __typename
            gross {
              __typename
              amount
              currency
            }
          }
          userEmail
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`);

export const orderDetailsQuery = gql(`
  query OrderDetails($id: ID!) {
    order(id: $id) {
      ...OrderDetails
    }
    shop {
      id
      countries {
        code
        name
      }
      defaultWeightUnit
      fulfillmentAllowUnpaid
      autoApproveFulfillment
    }
  }
`);

export const fulfillOrderData = gql(`
  query OrderFulfillData($orderId: ID!) {
    order(id: $orderId) {
      id
      isPaid
      fulfillmentMethod {
        __typename
        ... on ShippingMethod {
          id
        }
        ... on Warehouse {
          id
          clickAndCollectOption
        }
      }
      lines {
        ...OrderFulfillmentLine
      }
      number
    }
  }
`);

export const fulfillOrderSettingsQuery = gql(`
  query OrderFulfillSettings {
    shop {
      ...ShopOrderSettings
    }
  }
`);

export const orderSettingsQuery = gql(`
  query OrderSettings {
    orderSettings {
      ...OrderSettings
    }
    shop {
      ...ShopOrderSettings
    }
  }
`);
export const refundOrderData = gql(`
  query OrderRefundData($orderId: ID!) {
    order(id: $orderId) {
      id
      number
      total {
        gross {
          ...Money
        }
      }
      totalCaptured {
        ...Money
      }
      shippingPrice {
        gross {
          ...Money
        }
      }
      lines {
        ...RefundOrderLine
        quantityToFulfill
      }
      fulfillments {
        id
        status
        fulfillmentOrder
        lines {
          id
          quantity
          orderLine {
            ...RefundOrderLine
          }
        }
      }
    }
  }
`);

export const channelUsabilityData = gql(`
  query ChannelUsabilityData($channel: String!) {
    products(channel: $channel) {
      totalCount
    }
  }
`);
