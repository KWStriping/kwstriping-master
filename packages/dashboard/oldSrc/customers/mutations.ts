import { graphql as gql } from '@core/api/gql';

export const updateUser = gql(`
  mutation UpdateCustomer($id: ID!, $input: UserUpdateInput!) {
    updateUser(id: $id, data: $input) {
      errors {
        ...Error
      }
      result {
        ...CustomerDetails
      }
    }
  }
`);

export const createUser = gql(`
  mutation CreateCustomer($input: UserCreationInput!) {
    createUser(data: $input) {
      errors {
        ...Error
      }
      user {
        id
      }
    }
  }
`);

export const removeCustomer = gql(`
  mutation RemoveCustomer($id: ID!) {
    deleteCustomer(id: $id) {
      errors {
        ...Error
      }
    }
  }
`);

export const setCustomerDefaultAddress = gql(`
  mutation SetCustomerDefaultAddress(
    $addressId: ID!
    $userId: ID!
    $type: AddressType!
  ) {
    setDefaultAddress(addressId: $addressId, userId: $userId, type: $type) {
      errors {
        ...Error
      }
      result {
        ...CustomerAddresses
      }
    }
  }
`);

export const createUserAddress = gql(`
  mutation CreateCustomerAddress($id: ID!, $input: AddressUpdateInput!) {
    addAddress(userId: $id, data: $input) {
      errors {
        ...Error
      }
      address {
        ...Address
      }
      user {
        ...CustomerAddresses
      }
    }
  }
`);

export const updateUserAddress = gql(`
  mutation UpdateCustomerAddress($id: ID!, $input: AddressUpdateInput!) {
    updateAddress(id: $id, data: $input) {
      errors {
        ...Error
      }
      address {
        ...Address
      }
    }
  }
`);

export const removeCustomerAddress = gql(`
  mutation RemoveCustomerAddress($id: ID!) {
    deleteAddress(id: $id) {
      errors {
        ...Error
      }
      user {
        ...CustomerAddresses
      }
    }
  }
`);

export const bulkRemoveCustomers = gql(`
  mutation BulkRemoveCustomers($ids: [ID!]!) {
    deleteCustomers(ids: $ids) {
      errors {
        ...Error
      }
    }
  }
`);
