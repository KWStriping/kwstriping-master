import { gql } from '@tempo/api/gql';

export const collectionFragment = gql(`
  fragment Collection on Collection {
    id
    name
    channelListings {
      id
      isPublished
      publishedAt
      channel {
        id
        name
      }
    }
  }
`);

// export const collectionDetailsFragment = gql(`
//   fragment CollectionDetails on Collection {
//     ...Collection
//     ...Metadata
//     backgroundImage {
//       alt
//       url
//     }
//     slug
//     description
//     seoDescription
//     seoTitle
//   }
// `);

export const collectionProductFragment = gql(`
  fragment CollectionProduct on Product {
    id
    name
    productKlass {
      id
      name
    }
    thumbnail {
      url
    }
    channelListings {
      ...ChannelListingProductWithoutPricing
    }
  }
`);
