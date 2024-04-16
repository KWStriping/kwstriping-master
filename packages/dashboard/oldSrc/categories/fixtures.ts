import * as richTextEditorFixtures from '@core/ui/components/inputs/RichTextEditor/fixtures.json';
import type { CategoryDetailsQuery, CategoryFragment } from '@core/api/graphql';

const content = richTextEditorFixtures.richTextEditor;

export const categories: CategoryFragment[] = [
  {
    __typename: 'Category',
    children: {
      __typename: 'CategoryConnection',
      totalCount: 2,
    },
    id: '123123',
    name: 'Lorem ipsum dolor',
    products: {
      __typename: 'ProductConnection',
      totalCount: 4,
    },
  },
  {
    __typename: 'Category',
    children: {
      __typename: 'CategoryConnection',
      totalCount: 54,
    },
    id: '876752',
    name: 'Mauris vehicula tortor vulputate',
    products: {
      __typename: 'ProductConnection',
      totalCount: 3,
    },
  },
  {
    __typename: 'Category',
    children: {
      __typename: 'CategoryConnection',
      totalCount: 2,
    },
    id: '876542',
    name: 'Excepteur sint occaecat cupidatat non proident',
    products: {
      __typename: 'ProductConnection',
      totalCount: 6,
    },
  },
  {
    __typename: 'Category',
    children: {
      __typename: 'CategoryConnection',
      totalCount: 6,
    },
    id: '875352',
    name: 'Ut enim ad minim veniam',
    products: {
      __typename: 'ProductConnection',
      totalCount: 12,
    },
  },
  {
    __typename: 'Category',
    children: {
      __typename: 'CategoryConnection',
      totalCount: 76,
    },
    id: '865752',
    name: 'Duis aute irure dolor in reprehenderit',
    products: {
      __typename: 'ProductConnection',
      totalCount: 43,
    },
  },
  {
    __typename: 'Category',
    children: {
      __typename: 'CategoryConnection',
      totalCount: 11,
    },
    id: '878752',
    name: 'Neque porro quisquam est',
    products: {
      __typename: 'ProductConnection',
      totalCount: 21,
    },
  },
];
export const category: (placeholderImage: string) => CategoryDetailsQuery['category'] = (
  placeholderImage: string
) => ({
  __typename: 'Category',
  backgroundImage: {
    __typename: 'Image',
    alt: 'Alt text',
    oembedData: '{}',
    url: placeholderImage,
  },
  children: {
    __typename: 'CategoryConnection',
    edges: [],
    pageInfo: {
      __typename: 'PageInfo',
      endCursor: 'YXJyYXljb25uZWN0aW9uOjk=',
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
    },
  },
  description: JSON.stringify(content),
  id: 'Q2F0ZWdvcnk6NA==',
  metadata: [
    {
      __typename: 'MetadataItem',
      key: 'integration.id',
      value: '100023123',
    },
  ],
  name: 'Coffees',
  parent: {
    __typename: 'Category',
    id: 'Q2F0ZWdvcnk6Mw==',
  },
  privateMetadata: [],
  products: {
    __typename: 'ProductConnection',
    edges: [
      {
        __typename: 'ProductCountableEdge',
        cursor: 'YXJyYXljb25uZWN0aW9uOjA=',
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
              currency: 'USD',
              isAvailableForPurchase: false,
              isPublished: false,
              pricing: {
                __typename: 'ProductPricingInfo',
                priceRange: {
                  __typename: 'TaxedMoneyRange',
                  start: {
                    __typename: 'TaxedMoney',
                    net: {
                      __typename: 'Money',
                      amount: 30.1,
                      currency: 'USD',
                    },
                  },
                  stop: {
                    __typename: 'TaxedMoney',
                    net: {
                      __typename: 'Money',
                      amount: 44.9,
                      currency: 'USD',
                    },
                  },
                },
              },
              publishedAt: null,
              visibleInListings: false,
            },
            {
              __typename: 'ProductChannelListing',
              availableForPurchase: null,
              channel: {
                __typename: 'Channel',
                currencyCode: 'USD',
                id: '12345',
                name: 'Channel2',
              },
              currency: 'USD',
              isAvailableForPurchase: false,
              isPublished: false,
              pricing: {
                __typename: 'ProductPricingInfo',
                priceRange: {
                  __typename: 'TaxedMoneyRange',
                  start: {
                    __typename: 'TaxedMoney',
                    net: {
                      __typename: 'Money',
                      amount: 30.1,
                      currency: 'USD',
                    },
                  },
                  stop: {
                    __typename: 'TaxedMoney',
                    net: {
                      __typename: 'Money',
                      amount: 44.9,
                      currency: 'USD',
                    },
                  },
                },
              },
              publishedAt: null,
              visibleInListings: false,
            },
          ],
          id: 'UHJvZHVjdDoyMQ==',
          name: 'Gardner-Schultz',
          productKlass: {
            __typename: 'ProductKlass',
            id: 'UHJvZHVjdFR5cGU6Mw==',
            name: 'Coffee',
          },
          thumbnail: {
            __typename: 'Image',
            oembedData: '{}',
            url: placeholderImage,
          },
        },
      },
      {
        __typename: 'ProductCountableEdge',
        cursor: 'YXJyYXljb25uZWN0aW9uOjE=',
        node: {
          __typename: 'Product',
          channelListings: [
            {
              __typename: 'ProductChannelListing',
              availableForPurchase: null,
              channel: {
                __typename: 'Channel',
                currencyCode: 'USD',
                id: '523',
                name: 'Channel1',
              },
              currency: 'USD',
              isAvailableForPurchase: false,
              isPublished: false,
              pricing: {
                __typename: 'ProductPricingInfo',
                priceRange: {
                  __typename: 'TaxedMoneyRange',
                  start: {
                    __typename: 'TaxedMoney',
                    net: {
                      __typename: 'Money',
                      amount: 30.1,
                      currency: 'USD',
                    },
                  },
                  stop: {
                    __typename: 'TaxedMoney',
                    net: {
                      __typename: 'Money',
                      amount: 44.9,
                      currency: 'USD',
                    },
                  },
                },
              },
              publishedAt: null,
              visibleInListings: false,
            },
          ],
          id: 'UHJvZHVjdDoyMg==',
          name: 'James, Martinez and Murray',
          productKlass: {
            __typename: 'ProductKlass',
            id: 'UHJvZHVjdFR5cGU6Mw==',
            name: 'Coffee',
          },
          thumbnail: {
            __typename: 'Image',
            oembedData: '{}',
            url: placeholderImage,
          },
        },
      },
      {
        __typename: 'ProductCountableEdge',
        cursor: 'YXJyYXljb25uZWN0aW9uOjI=',
        node: {
          __typename: 'Product',
          channelListings: [
            {
              __typename: 'ProductChannelListing',
              availableForPurchase: null,
              channel: {
                __typename: 'Channel',
                currencyCode: 'USD',
                id: '1234',
                name: 'Channel1',
              },
              currency: 'USD',
              isAvailableForPurchase: false,
              isPublished: false,
              pricing: {
                __typename: 'ProductPricingInfo',
                priceRange: {
                  __typename: 'TaxedMoneyRange',
                  start: {
                    __typename: 'TaxedMoney',
                    net: {
                      __typename: 'Money',
                      amount: 30.1,
                      currency: 'USD',
                    },
                  },
                  stop: {
                    __typename: 'TaxedMoney',
                    net: {
                      __typename: 'Money',
                      amount: 44.9,
                      currency: 'USD',
                    },
                  },
                },
              },
              publishedAt: null,
              visibleInListings: false,
            },
          ],
          id: 'UHJvZHVjdDoyMw==',
          name: 'Curtis, Joyce and Turner',
          productKlass: {
            __typename: 'ProductKlass',
            id: 'UHJvZHVjdFR5cGU6Mw==',
            name: 'Coffee',
          },
          thumbnail: {
            __typename: 'Image',
            oembedData: '{}',
            url: placeholderImage,
          },
        },
      },
      {
        __typename: 'ProductCountableEdge',
        cursor: 'YXJyYXljb25uZWN0aW9uOjM=',
        node: {
          __typename: 'Product',
          channelListings: [
            {
              __typename: 'ProductChannelListing',
              availableForPurchase: null,
              channel: {
                __typename: 'Channel',
                currencyCode: 'USD',
                id: '1235',
                name: 'Channel1',
              },
              currency: 'USD',
              isAvailableForPurchase: false,
              isPublished: false,
              pricing: {
                __typename: 'ProductPricingInfo',
                priceRange: {
                  __typename: 'TaxedMoneyRange',
                  start: {
                    __typename: 'TaxedMoney',
                    net: {
                      __typename: 'Money',
                      amount: 30.1,
                      currency: 'USD',
                    },
                  },
                  stop: {
                    __typename: 'TaxedMoney',
                    net: {
                      __typename: 'Money',
                      amount: 44.9,
                      currency: 'USD',
                    },
                  },
                },
              },
              publishedAt: null,
              visibleInListings: false,
            },
          ],
          id: 'UHJvZHVjdDoyNA==',
          name: 'Davis, Brown and Ray',
          productKlass: {
            __typename: 'ProductKlass',
            id: 'UHJvZHVjdFR5cGU6Mw==',
            name: 'Coffee',
          },
          thumbnail: {
            __typename: 'Image',
            oembedData: '{}',
            url: placeholderImage,
          },
        },
      },
      {
        __typename: 'ProductCountableEdge',
        cursor: 'YXJyYXljb25uZWN0aW9uOjQ=',
        node: {
          __typename: 'Product',
          channelListings: [
            {
              __typename: 'ProductChannelListing',
              availableForPurchase: null,
              channel: {
                __typename: 'Channel',
                currencyCode: 'USD',
                id: '1236',
                name: 'Channel1',
              },
              currency: 'USD',
              isAvailableForPurchase: false,
              isPublished: false,
              pricing: {
                __typename: 'ProductPricingInfo',
                priceRange: {
                  __typename: 'TaxedMoneyRange',
                  start: {
                    __typename: 'TaxedMoney',
                    net: {
                      __typename: 'Money',
                      amount: 30.1,
                      currency: 'USD',
                    },
                  },
                  stop: {
                    __typename: 'TaxedMoney',
                    net: {
                      __typename: 'Money',
                      amount: 44.9,
                      currency: 'USD',
                    },
                  },
                },
              },
              publishedAt: null,
              visibleInListings: false,
            },
          ],
          id: 'UHJvZHVjdDoyNQ==',
          name: 'Gallegos Ltd',
          productKlass: {
            __typename: 'ProductKlass',
            id: 'UHJvZHVjdFR5cGU6Mw==',
            name: 'Coffee',
          },
          thumbnail: {
            __typename: 'Image',
            oembedData: '{}',
            url: placeholderImage,
          },
        },
      },
      {
        __typename: 'ProductCountableEdge',
        cursor: 'YXJyYXljb25uZWN0aW9uOjU=',
        node: {
          __typename: 'Product',
          channelListings: [
            {
              __typename: 'ProductChannelListing',
              availableForPurchase: null,
              channel: {
                __typename: 'Channel',
                currencyCode: 'USD',
                id: '1237',
                name: 'Channel1',
              },
              currency: 'USD',
              isAvailableForPurchase: false,
              isPublished: false,
              pricing: {
                __typename: 'ProductPricingInfo',
                priceRange: {
                  __typename: 'TaxedMoneyRange',
                  start: {
                    __typename: 'TaxedMoney',
                    net: {
                      __typename: 'Money',
                      amount: 30.1,
                      currency: 'USD',
                    },
                  },
                  stop: {
                    __typename: 'TaxedMoney',
                    net: {
                      __typename: 'Money',
                      amount: 44.9,
                      currency: 'USD',
                    },
                  },
                },
              },
              publishedAt: null,
              visibleInListings: false,
            },
          ],
          id: 'UHJvZHVjdDoyNg==',
          name: 'Franklin Inc',
          productKlass: {
            __typename: 'ProductKlass',
            id: 'UHJvZHVjdFR5cGU6Mw==',
            name: 'Coffee',
          },
          thumbnail: {
            __typename: 'Image',
            oembedData: '{}',
            url: placeholderImage,
          },
        },
      },
      {
        __typename: 'ProductCountableEdge',
        cursor: 'YXJyYXljb25uZWN0aW9uOjY=',
        node: {
          __typename: 'Product',
          channelListings: [
            {
              __typename: 'ProductChannelListing',
              availableForPurchase: null,
              channel: {
                __typename: 'Channel',
                currencyCode: 'USD',
                id: '1238',
                name: 'Channel1',
              },
              currency: 'USD',
              isAvailableForPurchase: false,
              isPublished: false,
              pricing: {
                __typename: 'ProductPricingInfo',
                priceRange: {
                  __typename: 'TaxedMoneyRange',
                  start: {
                    __typename: 'TaxedMoney',
                    net: {
                      __typename: 'Money',
                      amount: 30.1,
                      currency: 'USD',
                    },
                  },
                  stop: {
                    __typename: 'TaxedMoney',
                    net: {
                      __typename: 'Money',
                      amount: 44.9,
                      currency: 'USD',
                    },
                  },
                },
              },
              publishedAt: null,
              visibleInListings: false,
            },
          ],
          id: 'UHJvZHVjdDoyNw==',
          name: 'Williams-Taylor',
          productKlass: {
            __typename: 'ProductKlass',
            id: 'UHJvZHVjdFR5cGU6Mw==',
            name: 'Coffee',
          },
          thumbnail: {
            __typename: 'Image',
            oembedData: '{}',
            url: placeholderImage,
          },
        },
      },
      {
        __typename: 'ProductCountableEdge',
        cursor: 'YXJyYXljb25uZWN0aW9uOjc=',
        node: {
          __typename: 'Product',
          channelListings: [
            {
              __typename: 'ProductChannelListing',
              availableForPurchase: null,
              channel: {
                __typename: 'Channel',
                currencyCode: 'USD',
                id: '1239',
                name: 'Channel1',
              },
              currency: 'USD',
              isAvailableForPurchase: false,
              isPublished: false,
              pricing: {
                __typename: 'ProductPricingInfo',
                priceRange: {
                  __typename: 'TaxedMoneyRange',
                  start: {
                    __typename: 'TaxedMoney',
                    net: {
                      __typename: 'Money',
                      amount: 30.1,
                      currency: 'USD',
                    },
                  },
                  stop: {
                    __typename: 'TaxedMoney',
                    net: {
                      __typename: 'Money',
                      amount: 44.9,
                      currency: 'USD',
                    },
                  },
                },
              },
              publishedAt: null,
              visibleInListings: false,
            },
          ],
          id: 'UHJvZHVjdDoyOA==',
          name: 'Riddle, Evans and Hicks',
          productKlass: {
            __typename: 'ProductKlass',
            id: 'UHJvZHVjdFR5cGU6Mw==',
            name: 'Coffee',
          },
          thumbnail: {
            __typename: 'Image',
            oembedData: '{}',
            url: placeholderImage,
          },
        },
      },
      {
        __typename: 'ProductCountableEdge',
        cursor: 'YXJyYXljb25uZWN0aW9uOjg=',
        node: {
          __typename: 'Product',
          channelListings: [
            {
              __typename: 'ProductChannelListing',
              availableForPurchase: null,
              channel: {
                __typename: 'Channel',
                currencyCode: 'USD',
                id: '223',
                name: 'Channel1',
              },
              currency: 'USD',
              isAvailableForPurchase: false,
              isPublished: false,
              pricing: {
                __typename: 'ProductPricingInfo',
                priceRange: {
                  __typename: 'TaxedMoneyRange',
                  start: {
                    __typename: 'TaxedMoney',
                    net: {
                      __typename: 'Money',
                      amount: 30.1,
                      currency: 'USD',
                    },
                  },
                  stop: {
                    __typename: 'TaxedMoney',
                    net: {
                      __typename: 'Money',
                      amount: 44.9,
                      currency: 'USD',
                    },
                  },
                },
              },
              publishedAt: null,
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
          thumbnail: {
            __typename: 'Image',
            oembedData: '{}',
            url: placeholderImage,
          },
        },
      },
      {
        __typename: 'ProductCountableEdge',
        cursor: 'YXJyYXljb25uZWN0aW9uOjk=',
        node: {
          __typename: 'Product',
          channelListings: [
            {
              __typename: 'ProductChannelListing',
              availableForPurchase: null,
              channel: {
                __typename: 'Channel',
                currencyCode: 'USD',
                id: '323',
                name: 'Channel1',
              },
              currency: 'USD',
              isAvailableForPurchase: false,
              isPublished: false,
              pricing: {
                __typename: 'ProductPricingInfo',
                priceRange: {
                  __typename: 'TaxedMoneyRange',
                  start: {
                    __typename: 'TaxedMoney',
                    net: {
                      __typename: 'Money',
                      amount: 30.1,
                      currency: 'USD',
                    },
                  },
                  stop: {
                    __typename: 'TaxedMoney',
                    net: {
                      __typename: 'Money',
                      amount: 44.9,
                      currency: 'USD',
                    },
                  },
                },
              },
              publishedAt: null,
              visibleInListings: false,
            },
          ],
          id: 'UHJvZHVjdDozMA==',
          name: 'Carter and Sons',
          productKlass: {
            __typename: 'ProductKlass',
            id: 'UHJvZHVjdFR5cGU6Mw==',
            name: 'Coffee',
          },
          thumbnail: {
            __typename: 'Image',
            oembedData: '{}',
            url: placeholderImage,
          },
        },
      },
    ],
    pageInfo: {
      __typename: 'PageInfo',
      endCursor: 'YXJyYXljb25uZWN0aW9uOjk=',
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
    },
  },
  seoDescription: null,
  seoTitle: null,
  slug: 'coffees',
});
export const errors = [
  {
    field: 'name',
    message: 'To pole jest wymagane.',
  },
];
