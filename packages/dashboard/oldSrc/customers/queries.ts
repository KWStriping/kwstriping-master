import { graphql as gql } from '@core/api/gql';

export const customerList = gql(`
  query ListCustomers(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $filter: CustomerFilter
    $sort: UserOrderingInput
    $PERMISSION_MANAGE_ORDERS: Boolean!
  ) {
    customers(
      after: $after
      before: $before
      first: $first
      last: $last
      filters: $filter
      sortBy: $sort
    ) {
      edges {
        node {
          ...Customer
          orders @include(if: $PERMISSION_MANAGE_ORDERS) {
            totalCount
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`);

export const customerDetails = gql(`
  query CustomerDetails($id: ID!, $PERMISSION_MANAGE_ORDERS: Boolean!) {
    user(id: $id) {
      ...CustomerDetails
      orders(last: 5) @include(if: $PERMISSION_MANAGE_ORDERS) {
        edges {
          node {
            id
            createdAt
            number
            paymentStatus
            total {
              gross {
                currency
                amount
              }
            }
          }
        }
      }
      lastPlacedOrder: orders(last: 1) @include(if: $PERMISSION_MANAGE_ORDERS) {
        edges {
          node {
            id
            createdAt
          }
        }
      }
    }
  }
`);

export const customerAddresses = gql(`
  query CustomerAddresses($id: ID!) {
    user(id: $id) {
      ...CustomerAddresses
    }
  }
`);

export const createUserData = gql(`
  query CustomerCreateData {
    shop {
      id
      countries {
        code
        name
      }
    }
  }
`);
