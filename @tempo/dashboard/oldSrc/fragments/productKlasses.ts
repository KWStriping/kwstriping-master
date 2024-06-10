import { gql } from '@tempo/api/gql';

export const productKlassFragment = gql(`
  fragment ProductKlass on ProductKlass {
    id
    name
    kind
    hasVariants
    isShippingRequired
    taxClass {
      id
      name
    }
  }
`);

export const productKlassDetailsFragment = gql(`
  fragment ProductKlassDetails on ProductKlass {
    ...ProductKlass
    ...Metadata
    productAttributes {
      ...Attribute
    }
    variantAttributes {
      ...Attribute
    }
    productVariantAttributeAssignments {
      attribute {
        ...Attribute
      }
      variantSelection
    }
    weight
    # {
    #   unit
    #   value
    # }
  }
`);
