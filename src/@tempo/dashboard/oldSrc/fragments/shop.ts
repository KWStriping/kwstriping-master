import { gql } from '@tempo/api/gql';

export const countryFragment = gql(`
  fragment CountryWithCode on Country {
    name
    code
  }
`);

export const languageFragment = gql(`
  fragment Language on LanguageDisplay {
    code
    language
  }
`);

export const limitFragment = gql(`
  fragment LimitInfo on Limits {
    channels @include(if: $channels)
    orders @include(if: $orders)
    productVariants @include(if: $productVariants)
    staffUsers @include(if: $staffUsers)
    warehouses @include(if: $warehouses)
  }

  fragment ShopLimit on Site {
    limits {
      currentUsage {
        ...LimitInfo
      }
      allowedUsage {
        ...LimitInfo
      }
    }
  }
`);

export const shopFragment = gql(`
  fragment Shop on Site {
    companyAddress {
      ...Address
    }
    countries {
      code
      name
    }
    customerSetPasswordUrl
    defaultMailSenderAddress
    defaultMailSenderName
    description
    domain
    name
    reserveStockDurationAnonymousUser
    reserveStockDurationAuthenticatedUser
    maxItemCountPerCheckout
  }
`);
