import type { CollectionListFilterOpts } from '@tempo/dashboard/components/CollectionListPage';
import * as richTextEditorFixtures from '@tempo/ui/components/inputs/RichTextEditor/fixtures.json';
import type { CollectionDetailsQuery, CollectionListQuery } from '@tempo/api/generated/graphql';
import { CollectionPublished } from '@tempo/api/generated/graphql';
import type { RelayToFlat } from '@tempo/dashboard/oldSrc/types';

const content = richTextEditorFixtures.richTextEditor;

export const collectionListFilterOpts: CollectionListFilterOpts = {
  channel: {
    active: false,
    value: 'default',
    choices: [
      {
        value: 'default',
        label: 'Default channel',
      },
    ],
  },
  status: {
    active: false,
    value: CollectionPublished.Published,
  },
};

export const collections: RelayToFlat<NonNullable<CollectionListQuery['collections']>> = [
  {
    __typename: 'Collection',
    channelListings: [
      {
        __typename: 'CollectionChannelListing',
        channel: {
          __typename: 'Channel',
          id: '123',
          name: 'Channel',
        },
        isPublished: false,
        publishedAt: null,
      },
    ],
    id: 'Q29sbGVjdGlvbjox',
    name: 'Summer collection',
    products: {
      __typename: 'ProductConnection',
      totalCount: 4,
    },
  },
  {
    __typename: 'Collection',
    channelListings: [
      {
        __typename: 'CollectionChannelListing',
        channel: {
          __typename: 'Channel',
          id: '124',
          name: 'Channel',
        },
        isPublished: false,
        publishedAt: null,
      },
    ],
    id: 'Q29sbGVjdGlvbjoy',
    name: 'Winter sale',
    products: {
      __typename: 'ProductConnection',
      totalCount: 4,
    },
  },
  {
    __typename: 'Collection',
    channelListings: [
      {
        __typename: 'CollectionChannelListing',
        channel: {
          __typename: 'Channel',
          id: '125',
          name: 'Channel',
        },
        isPublished: false,
        publishedAt: null,
      },
    ],
    id: 'Q29sbGVjdGlvbjoz',
    name: 'Vintage vibes',
    products: {
      __typename: 'ProductConnection',
      totalCount: 4,
    },
  },
  {
    __typename: 'Collection',
    channelListings: [
      {
        __typename: 'CollectionChannelListing',
        channel: {
          __typename: 'Channel',
          id: '126',
          name: 'Channel',
        },
        isPublished: false,
        publishedAt: null,
      },
    ],
    id: 'Q29sbGVjdGlvbjoa',
    name: 'Merry Christmas',
    products: {
      __typename: 'ProductConnection',
      totalCount: 4,
    },
  },
  {
    __typename: 'Collection',
    channelListings: [
      {
        __typename: 'CollectionChannelListing',
        channel: {
          __typename: 'Channel',
          id: '127',
          name: 'Channel',
        },
        isPublished: false,
        publishedAt: null,
      },
    ],
    id: 'Q29sbGVjdGlvbjob',
    name: '80s Miami',
    products: {
      __typename: 'ProductConnection',
      totalCount: 4,
    },
  },
  {
    __typename: 'Collection',
    channelListings: [
      {
        __typename: 'CollectionChannelListing',
        channel: {
          __typename: 'Channel',
          id: '128',
          name: 'Channel',
        },
        isPublished: false,
        publishedAt: null,
      },
    ],
    id: 'Q29sbGVjdGlvbjoc',
    name: 'Yellow Submarine 2019',
    products: {
      __typename: 'ProductConnection',
      totalCount: 4,
    },
  },
];
export const collection: (
  placeholderCollectionImage: string,
  placeholderProductImage: string
) => CollectionDetailsQuery['collection'] = (placeholderCollectionImage, placeholderImage) => ({
  __typename: 'Collection',
  backgroundImage: {
    __typename: 'Image',
    alt: 'Alt text',
    oembedData: '{}',
    url: placeholderCollectionImage,
  },
  channelListings: [
    {
      __typename: 'CollectionChannelListing',
      channel: {
        __typename: 'Channel',
        id: '223',
        name: 'Channel',
      },
      isPublished: false,
      publishedAt: null,
    },
  ],
  description: JSON.stringify(content),
  id: 'Q29sbGVjdGlvbjox',
  metadata: [
    {
      __typename: 'MetadataItem',
      key: 'integration.id',
      value: '100023123',
    },
  ],
  name: 'Summer collection',
  privateMetadata: [],
  products: {
    __typename: 'ProductConnection',
    edges: [
      {
        __typename: 'ProductCountableEdge',
        node: {
          __typename: 'Product',
          channelListings: [
            {
              __typename: 'ProductChannelListing',
              availableForPurchase: null,
              channel: {
                __typename: 'Channel',
                currencyCode: 'USD',
                id: '123',
                name: 'Channel1',
              },
              isAvailableForPurchase: false,
              isPublished: true,
              publishedAt: '2020-07-14',
              visibleInListings: true,
            },
            {
              __typename: 'ProductChannelListing',
              availableForPurchase: null,
              channel: {
                __typename: 'Channel',
                currencyCode: 'USD',
                id: '124',
                name: 'Channel2',
              },
              isAvailableForPurchase: false,
              isPublished: false,
              publishedAt: '2020-07-30',
              visibleInListings: true,
            },
          ],
          id: 'UHJvZHVjdDoxNw==',
          name: 'Murray Inc',
          productKlass: {
            __typename: 'ProductKlass',
            id: 'UHJvZHVjdFR5cGU6Mg==',
            name: 'Mugs',
          },
          thumbnail: { __typename: 'Image', url: placeholderImage },
        },
      },
      {
        __typename: 'ProductCountableEdge',
        node: {
          __typename: 'Product',
          channelListings: [
            {
              __typename: 'ProductChannelListing',
              availableForPurchase: null,
              channel: {
                __typename: 'Channel',
                currencyCode: 'USD',
                id: '123',
                name: 'Channel1',
              },
              isAvailableForPurchase: false,
              isPublished: true,
              publishedAt: '2020-07-14',
              visibleInListings: true,
            },
            {
              __typename: 'ProductChannelListing',
              availableForPurchase: null,
              channel: {
                __typename: 'Channel',
                currencyCode: 'USD',
                id: '124',
                name: 'Channel2',
              },
              isAvailableForPurchase: false,
              isPublished: false,
              publishedAt: '2020-07-30',
              visibleInListings: true,
            },
          ],
          id: 'UHJvZHVjdDoyNw==',
          name: 'Williams-Taylor',
          productKlass: {
            __typename: 'ProductKlass',
            id: 'UHJvZHVjdFR5cGU6Mw==',
            name: 'Coffee',
          },
          thumbnail: { __typename: 'Image', url: placeholderImage },
        },
      },
      {
        __typename: 'ProductCountableEdge',
        node: {
          __typename: 'Product',
          channelListings: [
            {
              __typename: 'ProductChannelListing',
              availableForPurchase: null,
              channel: {
                __typename: 'Channel',
                currencyCode: 'USD',
                id: '123',
                name: 'Channel1',
              },
              isAvailableForPurchase: false,
              isPublished: true,
              publishedAt: '2020-07-14',
              visibleInListings: false,
            },
            {
              __typename: 'ProductChannelListing',
              availableForPurchase: null,
              channel: {
                __typename: 'Channel',
                currencyCode: 'USD',
                id: '124',
                name: 'Channel2',
              },
              isAvailableForPurchase: false,
              isPublished: false,
              publishedAt: '2020-07-30',
              visibleInListings: false,
            },
          ],
          id: 'UHJvZHVjdDoyOQ==',
          name: 'Hebert-Sherman',
          productKlass: {
            __typename: 'ProductKlass',
            id: 'UHJvZHVjdFR5cGU6Mw==',
            name: 'Coffee',
          },
          thumbnail: { __typename: 'Image', url: placeholderImage },
        },
      },
      {
        __typename: 'ProductCountableEdge',
        node: {
          __typename: 'Product',
          channelListings: [
            {
              __typename: 'ProductChannelListing',
              availableForPurchase: null,
              channel: {
                __typename: 'Channel',
                currencyCode: 'USD',
                id: '123',
                name: 'Channel1',
              },
              isAvailableForPurchase: false,
              isPublished: true,
              publishedAt: '2020-07-14',
              visibleInListings: false,
            },
            {
              __typename: 'ProductChannelListing',
              availableForPurchase: null,
              channel: {
                __typename: 'Channel',
                currencyCode: 'USD',
                id: '124',
                name: 'Channel2',
              },
              isAvailableForPurchase: false,
              isPublished: false,
              publishedAt: '2020-07-30',
              visibleInListings: false,
            },
          ],
          id: 'UHJvZHVjdDo1Mw==',
          name: 'Estes, Johnson and Graham',
          productKlass: {
            __typename: 'ProductKlass',
            id: 'UHJvZHVjdFR5cGU6Ng==',
            name: 'Books',
          },
          thumbnail: { __typename: 'Image', url: placeholderImage },
        },
      },
    ],
    pageInfo: {
      __typename: 'PageInfo',
      endCursor: '',
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: '',
    },
  },
  seoDescription: '',
  seoTitle: '',
  slug: 'summer-collection',
});
