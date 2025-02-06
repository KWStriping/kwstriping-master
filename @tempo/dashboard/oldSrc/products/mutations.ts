import { gql } from '@tempo/api';

export const createProductMediaMutation = gql(`
  mutation ProductMediaCreate(
    $product: ID!
    $image: Upload
    $alt: String!
    $mediaUrl: String
  ) {
    createProductMediaItem(
      data: { alt: $alt, image: $image, product: $product, mediaUrl: $mediaUrl }
    ) {
      errors {
        ...Error
      }
      media {
        ...ProductMediaItem
      }
    }
  }
`);

export const deleteProductMutation = gql(`
  mutation ProductDelete($id: ID!) {
    deleteProduct(id: $id) {
      errors {
        ...Error
      }
      result {
        id
      }
    }
  }
`);

export const reorderProductMedia = gql(`
  mutation ProductMediaReorder($productId: ID!, $mediaItemIds: [ID!]!) {
    reorderProductMedia(productId: $productId, mediaItemIds: $mediaItemIds) {
      errors {
        ...Error
      }
      media {
        id
        alt
        sortOrder
        url
      }
    }
  }
`);

export const setDefaultProduct = gql(`
  mutation ProductSetDefaultVariant($productId: ID!, $variantId: ID!) {
    setDefaultVariant(productId: $productId, variantId: $variantId) {
      errors {
        ...Error
      }
      result {
        id
        defaultVariant {
          id
          name
        }
        variants {
          id
          name
        }
      }
    }
  }
`);

// export const variantDeleteMutation = gql(`
//   mutation ProductDelete($id: ID!) {
//     deleteProduct(id: $id) {
//       errors {
//         ...Error
//       }
//       result {
//         id
//       }
//     }
//   }
// `);

export const variantDatagridUpdateMutation = gql(`
  mutation ProductDatagridUpdate($id: ID!, $input: ProductInput!) {
    updateProduct(id: $id, data: $input) {
      errors {
        ...ProductErrorWithAttributes
      }
    }
  }
`);

export const variantDatagridStockUpdateMutation = gql(`
  mutation ProductDatagridStockUpdate(
    $stocks: [StockInput!]!
    $removeStocks: [ID!]!
    $id: ID!
  ) {
    deleteProductStocks(warehouseIds: $removeStocks, productId: $id) {
      errors {
        ...Error
      }
    }
    updateProductStocks(stocks: $stocks, productId: $id) {
      errors {
        ...BulkStockError
      }
    }
  }
`);

export const variantDatagridChannelListingUpdateMutation = gql(`
  mutation ProductDatagridChannelListingUpdate(
    $id: ID!
    $input: [ProductChannelListingAddInput!]!
  ) {
    updateProductChannelListing(id: $id, data: $input) {
      errors {
        ...ProductChannelListingError
      }
    }
  }
`);

// TODO
// export const updateProductMutation = gql(`
//   mutation ProductUpdate($id: ID!, $input: ProductInput!) {
//     updateProduct(id: $id, data: $input) {
//       errors {
//         ...ProductErrorWithAttributes
//       }
//     }
//   }
// `);

export const PRODUCT_UPDATE = gql(`
  mutation ProductUpdate(
    $addStocks: [StockInput!]!
    $removeStocks: [ID!]!
    $id: ID!
    $attributes: [ValueInput!]
    $sku: String
    $quantityLimitPerCustomer: Int
    $trackInventory: Boolean!
    $stocks: [StockInput!]!
    $preorder: PreorderSettingsInput
    $weight: Weight
    $firstValues: Int
    $afterValues: String
    $lastValues: Int
    $beforeValues: String
    $name: String!
  ) {
    deleteProductStocks(warehouseIds: $removeStocks, productId: $id) {
      errors {
        ...Error
      }
      result {
        id
        stocks {
          ...Stock
        }
      }
    }
    createProductStocks(stocks: $addStocks, productId: $id) {
      errors {
        ...BulkStockError
      }
      result {
        id
        stocks {
          ...Stock
        }
      }
    }
    updateProductStocks(stocks: $stocks, productId: $id) {
      errors {
        ...BulkStockError
      }
      result {
        ...Product
      }
    }
    updateProduct(
      id: $id
      data: {
        attributes: $attributes
        sku: $sku
        trackInventory: $trackInventory
        preorder: $preorder
        weight: $weight
        quantityLimitPerCustomer: $quantityLimitPerCustomer
        name: $name
      }
    ) {
      errors {
        ...ProductErrorWithAttributes
      }
      result {
        ...Product
      }
    }
  }
`);

export const deleteProductMediaMutation = gql(`
  mutation ProductMediaDelete($id: ID!) {
    deleteProductMediaItem(id: $id) {
      errors {
        ...Error
      }
      product {
        id
        media {
          id
        }
      }
    }
  }
`);

export const updateProductMediaMutation = gql(`
  mutation ProductMediaUpdate($id: ID!, $alt: String!) {
    updateProductMedia(id: $id, data: { alt: $alt }) {
      errors {
        ...Error
      }
      product {
        id
        media {
          ...ProductMediaItem
        }
      }
    }
  }
`);

export const assignProductMediaMutation = gql(`
  mutation ProductMediaAssign($productId: ID!, $mediaItemId: ID!) {
    assignProductMedia(productId: $productId, mediaItemId: $mediaItemId) {
      errors {
        ...Error
      }
      product {
        id
        media {
          ...ProductMediaItem
        }
        parent {
          id
          media {
            ...ProductMediaItem
          }
          variants {
            id
            name
            ... on ConcreteProduct {
              sku
            }
            media {
              ...ProductMediaItem
            }
          }
        }
      }
    }
  }
`);

export const unassignProductMediaMutation = gql(`
  mutation ProductMediaUnassign($productId: ID!, $mediaItemId: ID!) {
    unassignProductMedia(productId: $productId, mediaItemId: $mediaItemId) {
      errors {
        ...Error
      }
      product {
        id
        media {
          ...ProductMediaItem
        }
        parent {
          id
          media {
            ...ProductMediaItem
          }
          variants {
            id
            name
            ... on ConcreteProduct {
              sku
            }
            media {
              ...ProductMediaItem
            }
          }
        }
      }
    }
  }
`);

export const ProductBulkCreateMutation = gql(`
  mutation ProductBulkCreate($id: ID!, $inputs: [ProductBulkCreationInput!]!) {
    createProducts(productId: $id, variants: $inputs) {
      errors {
        ...BulkProductError
      }
      objects {
        id
      }
    }
  }
`);

export const PRODUCT_BULK_DELETE = gql(`
  mutation ProductBulkDelete($ids: [ID!]!) {
    deleteProducts(ids: $ids) {
      errors {
        ...Error
      }
    }
  }
`);

// export const ProductChannelListingUpdateMutation = gql(`
//   mutation ProductChannelListingUpdate(
//     $id: ID!
//     $input: ProductChannelListingUpdateInput!
//   ) {
//     updateProductChannelListing(id: $id, data: $input) {
//       errors {
//         ...ProductChannelListingError
//       }
//     }
//   }
// `);

export const reorderProduct = gql(`
  mutation ProductReorder($move: ReorderInput!, $productId: ID!) {
    reorderProductVariants(moves: [$move], productId: $productId) {
      errors {
        ...Error
      }
      result {
        id
        variants {
          id
        }
      }
    }
  }
`);

export const ProductChannelListingUpdateMutation = gql(`
  mutation ProductChannelListingUpdate(
    $id: ID!
    $input: [ProductChannelListingAddInput!]!
  ) {
    updateProductChannelListing(id: $id, data: $input) {
      result {
        id
        channelListings {
          ...ChannelListingProduct
        }
        # parent {
        #   id
        #   channelListings {
        #     ...ChannelListingProductWithoutPricing
        #   }
        # }
      }
      errors {
        ...ProductChannelListingError
      }
    }
  }
`);

export const PRODUCT_PREORDER_DEACTIVATE = gql(`
  mutation ProductPreorderDeactivate($id: ID!) {
    deactivateProductPreorder(id: $id) {
      productVariant {
        id
        preorder {
          ...Preorder
        }
      }
      errors {
        ...Error
      }
    }
  }
`);
