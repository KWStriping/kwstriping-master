import { gql } from '@tempo/api/gql';

export const valueTranslatableFragment = gql(`
  fragment ValueTranslatable on ValueTranslation {
    id
    name
    plainText
    richText
    value {
      id
      name
    }
    attribute {
      id
      name
    }
    # translation(languageCode: $language) {
    #   id
    #   name
    #   plainText
    #   richText
    #   language {
    #     code
    #     language
    #   }
    # }
  }
`);

export const categoryTranslationFragment = gql(`
  fragment CategoryTranslation on CategoryTranslation {
    id
    description
    language {
      language
    }
    name
    seoDescription
    seoTitle
    # translation(languageCode: $language) {
    #   id
    #   description
    #   language {
    #     language
    #   }
    #   name
    #   seoDescription
    #   seoTitle
    # }
    category {
      id
      name
      description
      seoDescription
      seoTitle
    }
  }
`);

export const collectionTranslationFragment = gql(`
  fragment CollectionTranslation on CollectionTranslation {
    collection {
      id
      name
      description
      seoDescription
      seoTitle
    }
    id
    description
    language {
      language
    }
    name
    seoDescription
    seoTitle
    # translation(languageCode: $language) {
    #   id
    #   description
    #   language {
    #     language
    #   }
    #   name
    #   seoDescription
    #   seoTitle
    # }
  }
`);

export const productTranslationFragment = gql(`
  fragment ProductTranslation on ProductTranslation {
    product {
      id
      name
      description
      seoDescription
      seoTitle
    }
    # values {
    #   ...ValueTranslatable
    # }
    id
    seoTitle
    seoDescription
    name
    description
    language {
      code
      language
    }
    # translation(languageCode: $language) {
    #   id
    #   seoTitle
    #   seoDescription
    #   name
    #   description
    #   language {
    #     code
    #     language
    #   }
    # }
  }
`);

export const productVariantTranslationFragment = gql(`
  fragment ProductVariantTranslation on ProductTranslation {
    id
    name
    language {
      code
      language
    }
    product {
      id
      name
    }
    # values {
    #   ...ValueTranslatable
    # }
    # translation(languageCode: $language) {
    #   id
    #   name
    #   language {
    #     code
    #     language
    #   }
    # }
  }
`);

export const saleTranslationFragment = gql(`
  fragment SaleTranslation on SaleTranslation {
    id
    name
    language {
      code
      language
    }
    sale {
      id
      name
    }
    # translation(languageCode: $language) {
    #   id
    #   language {
    #     code
    #     language
    #   }
    #   name
    # }
  }
`);
export const voucherTranslationFragment = gql(`
  fragment VoucherTranslation on VoucherTranslation {
    id
    language {
      code
      language
    }
    name
    voucher {
      id
      name
    }
    # translation(languageCode: $language) {
    #   id
    #   language {
    #     code
    #     language
    #   }
    #   name
    # }
  }
`);
export const shippingMethodTranslationFragment = gql(`
  fragment ShippingMethodTranslation on ShippingMethodTranslation {
    id
    language {
      code
      language
    }
    name
    description
    shippingMethod {
      id
    }
    # translation(languageCode: $language) {
    #   id
    #   language {
    #     code
    #     language
    #   }
    #   name
    #   description
    # }
  }
`);

export const pageTranslationFragment = gql(`
  fragment PageTranslation on PageTranslation {
    id
    content
    seoDescription
    seoTitle
    title
    language {
      code
      language
    }
    page {
      id
      content
      seoDescription
      seoTitle
      title
    }
    # values {
    #   ...ValueTranslatable
    # }
  }
`);

export const pageTranslatableFragment = gql(`
  fragment PageTranslatable on PageTranslation {
    id
    content
    seoDescription
    seoTitle
    title
    language {
      code
      language
    }
    # translation(languageCode: $language) {
    #   id
    #   content
    #   seoDescription
    #   seoTitle
    #   title
    #   language {
    #     code
    #     language
    #   }
    # }
  }
`);

export const attributeChoicesTranslationFragment = gql(`
  fragment AttributeChoicesTranslation on ValueConnection {
    pageInfo {
      ...PageInfo
    }
    edges {
      cursor
      node {
        id
        name
        plainText
        richText
        inputType
        translation(languageCode: $language) {
          id
          name
          plainText
          richText
        }
      }
    }
  }
`);

export const attributeTranslationFragment = gql(`
  fragment AttributeTranslation on AttributeTranslation {
    id
    name
    # translation(languageCode: $language) {
    #   id
    #   name
    # }
    attribute {
      id
      name
      inputType
    }
  }
`);

export const attributeTranslationDetailsFragment = gql(`
  fragment AttributeTranslationDetails on AttributeTranslation {
    id
    name
    # translation(languageCode: $language) {
    #   id
    #   name
    # }
    attribute {
      id
      name
      inputType
      withChoices
      values(
        first: $firstValues
        after: $afterValues
        last: $lastValues
        before: $beforeValues
      ) {
        ...AttributeChoicesTranslation
      }
    }
  }
`);

export const menuItemTranslationFragment = gql(`
  fragment MenuItemTranslation on MenuItemTranslation {
    id
    language {
      language
    }
    name
    # translation(languageCode: $language) {
    #   id
    #   language {
    #     language
    #   }
    #   name
    # }
    menuItem {
      id
      name
    }
  }
`);
