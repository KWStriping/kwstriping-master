import type { ProductKlass } from '@tempo/api/auth/dist/apollo/types';
import * as richTextEditorFixtures from '@tempo/ui/components/inputs/RichTextEditor/fixtures.json';
import type {
  ProductFragment,
  ProductListQuery,
  ProductCreateDataQuery,
  ProductFragment,
} from '@tempo/api/generated/graphql';
import { AttributeInputType, ProductMediaType } from '@tempo/api/generated/graphql';
import { WeightUnit } from '@tempo/api/generated/constants';
import { channelsList } from '@tempo/dashboard/oldSrc/channels/fixtures';
import type { RelayToFlat } from '@tempo/dashboard/oldSrc/types';

const content = richTextEditorFixtures.richTextEditor;

export const product: (
  placeholderImage: string
) => ProductFragment & ProductCreateDataQuery['product'] = (placeholderImage) => ({
  __typename: 'Product' as const,
  attributes: [
    {
      __typename: 'Attribute',
      attribute: {
        __typename: 'Attribute' as const,
        entityType: null,
        id: 'pta18161',
        inputType: AttributeInputType.Dropdown,
        name: 'Borders',
        slug: 'Borders',
        valueRequired: false,
        unit: null,
        choices: {
          __typename: 'ValueConnection',
          pageInfo: {
            endCursor: 'WyI4IiwgIjMiXQ==',
            hasNextPage: false,
            hasPreviousPage: false,
            startCursor: 'WyIwIiwgIjQ5Il0=',
            __typename: 'PageInfo',
          },
          edges: [
            {
              __typename: 'ValueCountableEdge',
              cursor: '',
              node: {
                __typename: 'Value',
                file: null,
                id: 'ptav47282',
                name: 'portals',
                reference: null,
                slug: 'portals',
                plainText: null,
                richText: null,
                boolean: null,
                date: null,
                dateTime: null,
                value: null,
              },
            },
            {
              __typename: 'ValueCountableEdge',
              cursor: '',
              node: {
                __typename: 'Value',
                file: null,
                id: 'ptav17253',
                name: 'Baht',
                reference: null,
                slug: 'Baht',
                plainText: null,
                richText: null,
                boolean: null,
                date: null,
                dateTime: null,
                value: null,
              },
            },
          ],
        },
      },
      values: [
        {
          __typename: 'Value',
          file: null,
          id: 'ptav47282',
          name: 'portals',
          reference: null,
          slug: 'portals',
          plainText: null,
          richText: null,
          boolean: null,
          date: null,
          dateTime: null,
          value: null,
        },
      ],
    },
    {
      __typename: 'Attribute',
      attribute: {
        __typename: 'Attribute' as const,
        entityType: null,
        id: 'pta22785',
        inputType: AttributeInputType.Multiselect,
        name: 'Legacy',
        slug: 'Legacy',
        valueRequired: true,
        unit: null,
        choices: {
          __typename: 'ValueConnection',
          pageInfo: {
            endCursor: 'WyI4IiwgIjMiXQ==',
            hasNextPage: false,
            hasPreviousPage: false,
            startCursor: 'WyIwIiwgIjQ5Il0=',
            __typename: 'PageInfo',
          },
          edges: [
            {
              __typename: 'ValueCountableEdge',
              cursor: '',
              node: {
                __typename: 'Value',
                file: null,
                id: 'ptav31282',
                name: 'payment',
                reference: null,
                slug: 'payment',
                plainText: null,
                richText: null,
                boolean: null,
                date: null,
                dateTime: null,
                value: null,
              },
            },
            {
              __typename: 'ValueCountableEdge',
              cursor: '',
              node: {
                __typename: 'Value',
                file: null,
                id: 'ptav14907',
                name: 'Auto Loan Account',
                reference: null,
                slug: 'Auto-Loan-Account',
                plainText: null,
                richText: null,
                boolean: null,
                date: null,
                dateTime: null,
                value: null,
              },
            },
            {
              __typename: 'ValueCountableEdge',
              cursor: '',
              node: {
                __typename: 'Value',
                file: null,
                id: 'ptav27366',
                name: 'Garden',
                reference: null,
                slug: 'Garden',
                plainText: null,
                richText: null,
                boolean: null,
                date: null,
                dateTime: null,
                value: null,
              },
            },
            {
              __typename: 'ValueCountableEdge',
              cursor: '',
              node: {
                __typename: 'Value',
                file: null,
                id: 'ptav11873',
                name: 'override',
                reference: null,
                slug: 'override',
                plainText: null,
                richText: null,
                boolean: null,
                date: null,
                dateTime: null,
                value: null,
              },
            },
          ],
        },
      },
      values: [
        {
          __typename: 'Value',
          file: null,
          id: 'ptav14907',
          name: 'Auto Loan Account',
          reference: null,
          slug: 'Auto-Loan-Account',
          plainText: null,
          richText: null,
          boolean: null,
          date: null,
          dateTime: null,
          value: null,
        },
      ],
    },
  ],
  availableForPurchase: null,
  category: {
    __typename: 'Category',
    id: 'Q2F0ZWdvcnk6MQ==',
    name: 'Apparel',
  },
  channelListings: [
    {
      __typename: 'ProductChannelListing',
      availableForPurchase: null,
      channel: channelsList[0],
      isAvailableForPurchase: false,
      isPublished: true,
      pricing: {
        __typename: 'ProductPricingInfo',
        priceRange: {
          __typename: 'TaxedMoneyRange',
          start: {
            __typename: 'TaxedMoney',
            net: {
              __typename: 'Money',
              amount: 1.2,
              currency: 'USD',
            },
          },
          stop: {
            __typename: 'TaxedMoney',
            net: {
              __typename: 'Money',
              amount: 3.5,
              currency: 'USD',
            },
          },
        },
      },
      publishedAt: '2020-07-14',
      visibleInListings: true,
    },
    {
      __typename: 'ProductChannelListing',
      availableForPurchase: null,
      channel: channelsList[1],
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
              amount: 1.2,
              currency: 'USD',
            },
          },
          stop: {
            __typename: 'TaxedMoney',
            net: {
              __typename: 'Money',
              amount: 3.5,
              currency: 'USD',
            },
          },
        },
      },
      publishedAt: '2020-07-30',
      visibleInListings: true,
    },
  ],
  chargeTaxes: true,
  collections: [
    {
      __typename: 'Collection',
      id: 'Q29sbGVjdGlvbjoy',
      name: 'Winter sale',
    },
  ],
  defaultVariant: { __typename: 'Product', id: 'pv75934' },
  description: JSON.stringify(content),
  id: 'p10171',
  isAvailable: false,
  isAvailableForPurchase: false,
  isFeatured: false,
  margin: { __typename: 'Margin', start: 2, stop: 7 },
  media: [
    {
      __typename: 'ProductMediaItem',
      alt: 'Id sit dolores adipisci',
      id: 'UHJvZHVjdEltYWdlOjE=',
      sortOrder: 0,
      type: ProductMediaType.Image,
      oembedData: '{}',
      url: placeholderImage,
    },
    {
      __typename: 'ProductMediaItem',
      alt: 'Id sit dolores adipisci',
      id: 'UHJvZHVjdEltYWdlOaE=',
      sortOrder: 2,
      type: ProductMediaType.Image,
      oembedData: '{}',
      url: placeholderImage,
    },
    {
      __typename: 'ProductMediaItem',
      alt: 'Id sit dolores adipisci',
      id: 'UPJvZHVjdEltYWdlOjV=',
      sortOrder: 1,
      type: ProductMediaType.Image,
      oembedData: '{}',
      url: placeholderImage,
    },
    {
      __typename: 'ProductMediaItem',
      alt: 'Id sit dolores adipisci',
      id: 'UHJvZHVjdEltYHdlOjX=',
      sortOrder: 3,
      type: ProductMediaType.Image,
      oembedData: '{}',
      url: placeholderImage,
    },
    {
      __typename: 'ProductMediaItem',
      alt: 'Id sit dolores adipisci',
      id: 'UHJvZHVjdIlnYWdlOjX=',
      sortOrder: 4,
      type: ProductMediaType.Image,
      oembedData: '{}',
      url: placeholderImage,
    },
  ],
  metadata: [
    {
      __typename: 'MetadataItem',
      key: 'integration.id',
      value: '100023123',
    },
  ],
  name: 'Ergonomic Plastic Bacon',
  privateMetadata: [],
  productKlass: {
    __typename: 'ProductKlass',
    hasVariants: true,
    id: 'pt76406',
    name: 'Versatile',
    nonSelectionVariantAttributes: [
      {
        __typename: 'Attribute',
        entityType: null,
        id: 'isdugfhud',
        inputType: AttributeInputType.File,
        name: 'Attachment',
        slug: 'attachment',
        valueRequired: true,
        unit: null,
        choices: {
          __typename: 'ValueConnection',
          pageInfo: {
            endCursor: 'WyI4IiwgIjMiXQ==',
            hasNextPage: false,
            hasPreviousPage: false,
            startCursor: 'WyIwIiwgIjQ5Il0=',
            __typename: 'PageInfo',
          },
          edges: [
            {
              __typename: 'ValueCountableEdge',
              cursor: '',
              node: {
                __typename: 'Value',
                file: {
                  __typename: 'File',
                  contentType: 'image/png',
                  url: 'some-non-existing-url',
                },
                id: 'gdghdgdhkkdae',
                name: 'File First Value',
                reference: null,
                slug: 'file-first-value',
                plainText: null,
                richText: null,
                boolean: null,
                date: null,
                dateTime: null,
                value: null,
              },
            },
          ],
        },
      },
    ],
    selectionVariantAttributes: [
      {
        __typename: 'Attribute',
        entityType: null,
        id: 'pta18161',
        inputType: AttributeInputType.Dropdown,
        name: 'Color',
        slug: 'color',
        valueRequired: true,
        unit: null,
        choices: {
          __typename: 'ValueConnection',
          pageInfo: {
            endCursor: 'WyI4IiwgIjMiXQ==',
            hasNextPage: false,
            hasPreviousPage: false,
            startCursor: 'WyIwIiwgIjQ5Il0=',
            __typename: 'PageInfo',
          },
          edges: [
            {
              __typename: 'ValueCountableEdge',
              cursor: '',
              node: {
                __typename: 'Value',
                file: null,
                id: 'ptvav47282',
                name: 'Black',
                reference: null,
                slug: 'black',
                plainText: null,
                richText: null,
                boolean: null,
                date: null,
                dateTime: null,
                value: null,
              },
            },
            {
              __typename: 'ValueCountableEdge',
              cursor: '',
              node: {
                __typename: 'Value',
                file: null,
                id: 'ptvav17253',
                name: 'White',
                reference: null,
                slug: 'white',
                plainText: null,
                richText: null,
                boolean: null,
                date: null,
                dateTime: null,
                value: null,
              },
            },
          ],
        },
      },
    ],
    taxClass: {
      __typename: 'TaxClass',
      name: 'standard',
      id: 'standard',
    },
    variantAttributes: [
      {
        __typename: 'Attribute',
        id: 'isdugfhud',
        name: 'Attachment',
        inputType: AttributeInputType.Dropdown,
        valueRequired: false,
        unit: null,
        choices: {
          __typename: 'ValueConnection',
          pageInfo: {
            endCursor: 'WyI4IiwgIjMiXQ==',
            hasNextPage: false,
            hasPreviousPage: false,
            startCursor: 'WyIwIiwgIjQ5Il0=',
            __typename: 'PageInfo',
          },
          edges: [
            {
              __typename: 'ValueCountableEdge',
              cursor: '',
              node: {
                __typename: 'Value',
                file: {
                  __typename: 'File',
                  contentType: 'image/png',
                  url: 'some-non-existing-url',
                },
                id: 'gdghdgdhkkdae',
                name: 'File First Value',
                reference: null,
                slug: 'file-first-value',
                plainText: null,
                richText: null,
                boolean: null,
                date: null,
                dateTime: null,
                value: null,
              },
            },
          ],
        },
      },
      {
        __typename: 'Attribute',
        id: 'pta18161',
        name: 'Color',
        inputType: AttributeInputType.Dropdown,
        valueRequired: false,
        unit: null,
        choices: {
          __typename: 'ValueConnection',
          pageInfo: {
            endCursor: 'WyI4IiwgIjMiXQ==',
            hasNextPage: false,
            hasPreviousPage: false,
            startCursor: 'WyIwIiwgIjQ5Il0=',
            __typename: 'PageInfo',
          },
          edges: [
            {
              __typename: 'ValueCountableEdge',
              cursor: '',
              node: {
                __typename: 'Value',
                file: null,
                id: 'ptvav47282',
                name: 'Black',
                reference: null,
                slug: 'black',
                plainText: null,
                richText: null,
                boolean: null,
                date: null,
                dateTime: null,
                value: null,
              },
            },
            {
              __typename: 'ValueCountableEdge',
              cursor: '',
              node: {
                __typename: 'Value',
                file: null,
                id: 'ptvav17253',
                name: 'White',
                reference: null,
                slug: 'white',
                plainText: null,
                richText: null,
                boolean: null,
                date: null,
                dateTime: null,
                value: null,
              },
            },
          ],
        },
      },
    ],
  },
  publishedAt: '2018-08-25T18:45:54.125Z',
  purchaseCost: {
    __typename: 'MoneyRange',
    start: {
      __typename: 'Money',
      amount: 339.39,
      currency: 'NZD',
      localized: '339.39 NZD',
    },
    stop: {
      __typename: 'Money',
      amount: 678.78,
      currency: 'NZD',
      localized: '678.78 NZD',
    },
  },
  rating: 100,
  seoDescription: 'Seo description',
  seoTitle: 'Seo title',
  sku: '59661-34207',
  slug: 'Borders',
  taxClass: {
    __typename: 'TaxClass',
    name: 'standard',
    id: 'standard',
  },
  thumbnail: { __typename: 'Image' as const, url: placeholderImage },
  url: '/example-url',
  variants: [
    {
      id: 'UHJvZHVjdFZhcmlhbnQ6MjAz',
      sku: '43226647',
      name: '1l',
      margin: null,
      attributes: [
        {
          attribute: {
            id: 'QXR0cmlidXRlOjE1',
            name: 'Bottle Size',
            __typename: 'Attribute',
          },
          values: [
            {
              id: 'QXR0cmlidXRlVmFsdWU6NDc=',
              name: '1l',
              __typename: 'Value',
            },
          ],
          __typename: 'Attribute',
        },
      ],
      media: [
        {
          id: '1',
          type: ProductMediaType.Image,
          url: placeholderImage,
          __typename: 'ProductMediaItem',
        },
      ],
      stocks: [
        {
          id: 'U3RvY2s6MTY0',
          quantity: 272,
          quantityAllocated: 0,
          warehouse: {
            id: 'V2FyZWhvdXNlOjI2NDNiNmIwLWExMTQtNGRiMC1hM2U4LTFkZGY3ZGM3NDVkMg==',
            name: 'Europe for click and collect',
            __typename: 'Warehouse',
          },
          __typename: 'Stock',
        },
        {
          id: 'U3RvY2s6MTY1',
          quantity: 272,
          quantityAllocated: 0,
          warehouse: {
            id: 'V2FyZWhvdXNlOmFmZDA4YjY4LWQwYmMtNGQ1My1iNjJkLTg1YWMxOWI3MjliYg==',
            name: 'Europe',
            __typename: 'Warehouse',
          },
          __typename: 'Stock',
        },
        {
          id: 'U3RvY2s6MTY2',
          quantity: 274,
          quantityAllocated: 2,
          warehouse: {
            id: 'V2FyZWhvdXNlOjMxOTRjNjY5LTY1YjItNDBjYy04ZDI5LWI3M2Q0YTUwODBmMQ==',
            name: 'Asia',
            __typename: 'Warehouse',
          },
          __typename: 'Stock',
        },
        {
          id: 'U3RvY2s6MTYz',
          quantity: 272,
          quantityAllocated: 0,
          warehouse: {
            id: 'V2FyZWhvdXNlOjI5YzBlYmYwLWVkNzktNDlmOS1hYmQ0LWQwNDBlOGNlZmI3Mg==',
            name: 'Oceania',
            __typename: 'Warehouse',
          },
          __typename: 'Stock',
        },
        {
          id: 'U3RvY2s6MTY4',
          quantity: 272,
          quantityAllocated: 0,
          warehouse: {
            id: 'V2FyZWhvdXNlOjRiNjc1ZmVlLTE3OWYtNGMwNS04YmJlLWE0ZDJjOTc0OWQzMA==',
            name: 'Africa',
            __typename: 'Warehouse',
          },
          __typename: 'Stock',
        },
        {
          id: 'U3RvY2s6MTY3',
          quantity: 274,
          quantityAllocated: 2,
          warehouse: {
            id: 'V2FyZWhvdXNlOmQwODA2MzM5LTVhNjAtNDAxNi1hNGUwLTRjNDYxNTZlY2IzMQ==',
            name: 'Americas',
            __typename: 'Warehouse',
          },
          __typename: 'Stock',
        },
      ],
      trackInventory: true,
      preorder: null,
      channelListings: [
        {
          channel: {
            id: 'Q2hhbm5lbDox',
            name: 'Channel-USD',
            currencyCode: 'USD',
            __typename: 'Channel',
          },
          price: {
            amount: 5.0,
            currency: 'USD',
            __typename: 'Money',
          },
          costPrice: {
            amount: 1.5,
            currency: 'USD',
            __typename: 'Money',
          },
          preorderThreshold: {
            quantity: null,
            soldUnits: 0,
            __typename: 'PreorderThreshold',
          },
          __typename: 'ProductChannelListing',
        },
        {
          channel: {
            id: 'Q2hhbm5lbDoy',
            name: 'Channel-PLN',
            currencyCode: 'PLN',
            __typename: 'Channel',
          },
          price: {
            amount: 20.0,
            currency: 'PLN',
            __typename: 'Money',
          },
          costPrice: {
            amount: 6.0,
            currency: 'PLN',
            __typename: 'Money',
          },
          preorderThreshold: {
            quantity: null,
            soldUnits: 0,
            __typename: 'PreorderThreshold',
          },
          __typename: 'ProductChannelListing',
        },
      ],
      quantityLimitPerCustomer: null,
      __typename: 'Product',
    },
    {
      id: 'UHJvZHVjdFZhcmlhbnQ6MjA0',
      sku: '80884671',
      name: '80884671',
      margin: null,
      attributes: [
        {
          attribute: {
            id: 'QXR0cmlidXRlOjE1',
            name: 'Bottle Size',
            __typename: 'Attribute',
          },
          values: [
            {
              id: 'QXR0cmlidXRlVmFsdWU6NDg=',
              name: '2l',
              __typename: 'Value',
            },
          ],
          __typename: 'Attribute',
        },
      ],
      media: [
        {
          id: '1',
          type: ProductMediaType.Image,
          url: placeholderImage,
          __typename: 'ProductMediaItem',
        },
      ],
      stocks: [],
      trackInventory: true,
      preorder: null,
      channelListings: [
        {
          channel: {
            id: 'Q2hhbm5lbDox',
            name: 'Channel-USD',
            currencyCode: 'USD',
            __typename: 'Channel',
          },
          price: {
            amount: 7.0,
            currency: 'USD',
            __typename: 'Money',
          },
          costPrice: {
            amount: 2.0,
            currency: 'USD',
            __typename: 'Money',
          },
          preorderThreshold: {
            quantity: null,
            soldUnits: 0,
            __typename: 'PreorderThreshold',
          },
          __typename: 'ProductChannelListing',
        },
        {
          channel: {
            id: 'Q2hhbm5lbDoy',
            name: 'Channel-PLN',
            currencyCode: 'PLN',
            __typename: 'Channel',
          },
          price: {
            amount: 28.0,
            currency: 'PLN',
            __typename: 'Money',
          },
          costPrice: {
            amount: 8.0,
            currency: 'PLN',
            __typename: 'Money',
          },
          preorderThreshold: {
            quantity: null,
            soldUnits: 0,
            __typename: 'PreorderThreshold',
          },
          __typename: 'ProductChannelListing',
        },
      ],
      quantityLimitPerCustomer: null,
      __typename: 'Product',
    },
    {
      id: 'UHJvZHVjdFZhcmlhbnQ6MjAy',
      sku: '93855755',
      name: '500ml',
      margin: null,
      attributes: [
        {
          attribute: {
            id: 'QXR0cmlidXRlOjE1',
            name: 'Bottle Size',
            __typename: 'Attribute',
          },
          values: [
            {
              id: 'QXR0cmlidXRlVmFsdWU6NDY=',
              name: '500ml',
              __typename: 'Value',
            },
          ],
          __typename: 'Attribute',
        },
      ],
      media: [
        {
          id: '1',
          type: ProductMediaType.Image,
          url: placeholderImage,
          __typename: 'ProductMediaItem',
        },
      ],
      stocks: [
        {
          id: 'U3RvY2s6MTU5',
          quantity: 418,
          quantityAllocated: 0,
          warehouse: {
            id: 'V2FyZWhvdXNlOmFmZDA4YjY4LWQwYmMtNGQ1My1iNjJkLTg1YWMxOWI3MjliYg==',
            name: 'Europe',
            __typename: 'Warehouse',
          },
          __typename: 'Stock',
        },
        {
          id: 'U3RvY2s6MTYw',
          quantity: 418,
          quantityAllocated: 0,
          warehouse: {
            id: 'V2FyZWhvdXNlOjMxOTRjNjY5LTY1YjItNDBjYy04ZDI5LWI3M2Q0YTUwODBmMQ==',
            name: 'Asia',
            __typename: 'Warehouse',
          },
          __typename: 'Stock',
        },
        {
          id: 'U3RvY2s6MTYx',
          quantity: 418,
          quantityAllocated: 0,
          warehouse: {
            id: 'V2FyZWhvdXNlOmQwODA2MzM5LTVhNjAtNDAxNi1hNGUwLTRjNDYxNTZlY2IzMQ==',
            name: 'Americas',
            __typename: 'Warehouse',
          },
          __typename: 'Stock',
        },
        {
          id: 'U3RvY2s6MTU3',
          quantity: 418,
          quantityAllocated: 0,
          warehouse: {
            id: 'V2FyZWhvdXNlOjI5YzBlYmYwLWVkNzktNDlmOS1hYmQ0LWQwNDBlOGNlZmI3Mg==',
            name: 'Oceania',
            __typename: 'Warehouse',
          },
          __typename: 'Stock',
        },
        {
          id: 'U3RvY2s6MTU4',
          quantity: 418,
          quantityAllocated: 0,
          warehouse: {
            id: 'V2FyZWhvdXNlOjI2NDNiNmIwLWExMTQtNGRiMC1hM2U4LTFkZGY3ZGM3NDVkMg==',
            name: 'Europe for click and collect',
            __typename: 'Warehouse',
          },
          __typename: 'Stock',
        },
        {
          id: 'U3RvY2s6MTYy',
          quantity: 418,
          quantityAllocated: 0,
          warehouse: {
            id: 'V2FyZWhvdXNlOjRiNjc1ZmVlLTE3OWYtNGMwNS04YmJlLWE0ZDJjOTc0OWQzMA==',
            name: 'Africa',
            __typename: 'Warehouse',
          },
          __typename: 'Stock',
        },
      ],
      trackInventory: true,
      preorder: null,
      channelListings: [
        {
          channel: {
            id: 'Q2hhbm5lbDox',
            name: 'Channel-USD',
            currencyCode: 'USD',
            __typename: 'Channel',
          },
          price: {
            amount: 5.0,
            currency: 'USD',
            __typename: 'Money',
          },
          costPrice: {
            amount: 1.0,
            currency: 'USD',
            __typename: 'Money',
          },
          preorderThreshold: {
            quantity: null,
            soldUnits: 0,
            __typename: 'PreorderThreshold',
          },
          __typename: 'ProductChannelListing',
        },
        {
          channel: {
            id: 'Q2hhbm5lbDoy',
            name: 'Channel-PLN',
            currencyCode: 'PLN',
            __typename: 'Channel',
          },
          price: {
            amount: 20.0,
            currency: 'PLN',
            __typename: 'Money',
          },
          costPrice: {
            amount: 4.0,
            currency: 'PLN',
            __typename: 'Money',
          },
          preorderThreshold: {
            quantity: null,
            soldUnits: 0,
            __typename: 'PreorderThreshold',
          },
          __typename: 'ProductChannelListing',
        },
      ],
      quantityLimitPerCustomer: null,
      __typename: 'Product',
    },
  ],
  visibleInListings: true,
  weight: {
    __typename: 'Weight',
    unit: WeightUnit.Kg,
    value: 5,
  },
});
export const products = (
  placeholderImage: string
): RelayToFlat<NonNullable<ProductListQuery['products']>> => [
  {
    __typename: 'Product',
    updatedAt: '2020-06-22T13:52:05.094636+00:00',
    attributes: [],
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
        publishedAt: '2020-07-30',
        visibleInListings: true,
      },
    ],
    id: 'UHJvZHVjdDo2MQ==',
    name: 'Nebula Night Sky Paint',
    productKlass: {
      __typename: 'ProductKlass',
      hasVariants: true,
      id: 'UHJvZHVjdFR5cGU6Nw==',
      name: 'Paint',
    },
    thumbnail: {
      __typename: 'Image',
      url: placeholderImage,
    },
  },
  {
    __typename: 'Product',
    updatedAt: '2020-06-22T13:52:05.094636+00:00',
    attributes: [],
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
        publishedAt: '2020-07-30',
        visibleInListings: false,
      },
    ],
    id: 'UHJvZHVjdDo2NA==',
    name: 'Light Speed Yellow Paint',
    productKlass: {
      __typename: 'ProductKlass',
      hasVariants: true,
      id: 'UHJvZHVjdFR5cGU6Nw==',
      name: 'Paint',
    },
    thumbnail: {
      __typename: 'Image',
      url: placeholderImage,
    },
  },
  {
    __typename: 'Product',
    updatedAt: '2020-06-22T13:52:05.094636+00:00',
    attributes: [],
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
        publishedAt: '2020-07-30',
        visibleInListings: false,
      },
    ],
    id: 'UHJvZHVjdDo2NQ==',
    name: 'Hyperspace Turquoise Paint',
    productKlass: {
      __typename: 'ProductKlass',
      hasVariants: true,
      id: 'UHJvZHVjdFR5cGU6Nw==',
      name: 'Paint',
    },
    thumbnail: {
      __typename: 'Image',
      url: placeholderImage,
    },
  },
  {
    __typename: 'Product',
    updatedAt: '2020-06-22T13:52:05.094636+00:00',
    attributes: [
      {
        __typename: 'Attribute',
        attribute: {
          __typename: 'Attribute',
          id: 'QXR0cmlidXRlOjE2',
        },
        values: [
          {
            __typename: 'Value',
            file: null,
            id: 'QXR0cmlidXRlVmFsdWU6MQ==',
            name: 'Pineapple',
            reference: null,
            slug: 'pineapple',
            boolean: null,
            date: null,
            dateTime: null,
            value: null,
          },
        ],
      },
    ],
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
        publishedAt: '2020-07-30',
        visibleInListings: false,
      },
    ],
    id: 'UHJvZHVjdDo3NQ==',
    name: 'Pineapple Juice',
    productKlass: {
      __typename: 'ProductKlass',
      hasVariants: true,
      id: 'UHJvZHVjdFR5cGU6OQ==',
      name: 'Juice',
    },
    thumbnail: {
      __typename: 'Image',
      url: placeholderImage,
    },
  },
  {
    __typename: 'Product',
    updatedAt: '2020-06-22T13:52:05.094636+00:00',
    attributes: [
      {
        __typename: 'Attribute',
        attribute: {
          __typename: 'Attribute',
          id: 'QXR0cmlidXRlOjE2',
        },
        values: [
          {
            __typename: 'Value',
            file: null,
            id: 'QXR0cmlidXRlVmFsdWU6Mg==',
            name: 'Coconut',
            reference: null,
            slug: 'coconut',
            boolean: null,
            date: null,
            dateTime: null,
            value: null,
          },
        ],
      },
    ],
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
        publishedAt: '2020-07-30',
        visibleInListings: false,
      },
    ],
    id: 'UHJvZHVjdDo3Ng==',
    name: 'Coconut Juice',
    productKlass: {
      __typename: 'ProductKlass',
      hasVariants: true,
      id: 'UHJvZHVjdFR5cGU6OQ==',
      name: 'Juice',
    },
    thumbnail: {
      __typename: 'Image',
      url: placeholderImage,
    },
  },
  {
    __typename: 'Product',
    updatedAt: '2020-06-22T13:52:05.094636+00:00',
    attributes: [
      {
        __typename: 'Attribute',
        attribute: {
          __typename: 'Attribute',
          id: 'QXR0cmlidXRlOjE2',
        },
        values: [
          {
            __typename: 'Value',
            file: null,
            id: 'QXR0cmlidXRlVmFsdWU6Mw==',
            name: 'Apple',
            reference: null,
            slug: 'apple',
            boolean: null,
            date: null,
            dateTime: null,
            value: null,
          },
        ],
      },
    ],
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
        publishedAt: '2020-07-30',
        visibleInListings: false,
      },
    ],
    id: 'UHJvZHVjdDo3Mg==',
    name: 'Apple Juice',
    productKlass: {
      __typename: 'ProductKlass',
      hasVariants: true,
      id: 'UHJvZHVjdFR5cGU6OQ==',
      name: 'Juice',
    },
    thumbnail: {
      __typename: 'Image',
      url: placeholderImage,
    },
  },
  {
    __typename: 'Product',
    updatedAt: '2020-06-22T13:52:05.094636+00:00',
    attributes: [
      {
        __typename: 'Attribute',
        attribute: {
          __typename: 'Attribute',
          id: 'QXR0cmlidXRlOjE2',
        },
        values: [
          {
            __typename: 'Value',
            file: null,
            id: 'QXR0cmlidXRlVmFsdWU6NDk=',
            name: 'Orange',
            reference: null,
            slug: 'orange',
            boolean: null,
            date: null,
            dateTime: null,
            value: null,
          },
        ],
      },
    ],
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
        publishedAt: '2020-07-30',
        visibleInListings: false,
      },
    ],
    id: 'UHJvZHVjdDo3MQ==',
    name: 'Orange Juice',
    productKlass: {
      __typename: 'ProductKlass',
      hasVariants: true,
      id: 'UHJvZHVjdFR5cGU6OQ==',
      name: 'Juice',
    },
    thumbnail: {
      __typename: 'Image',
      url: placeholderImage,
    },
  },
  {
    __typename: 'Product',
    updatedAt: '2020-06-22T13:52:05.094636+00:00',
    attributes: [
      {
        __typename: 'Attribute',
        attribute: {
          __typename: 'Attribute',
          id: 'QXR0cmlidXRlOjE2',
        },
        values: [
          {
            __typename: 'Value',
            file: null,
            id: 'QXR0cmlidXRlVmFsdWU6NTA=',
            name: 'Banana',
            reference: null,
            slug: 'banana',
            boolean: null,
            date: null,
            dateTime: null,
            value: null,
          },
        ],
      },
    ],
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
        publishedAt: '2020-07-30',
        visibleInListings: false,
      },
    ],
    id: 'UHJvZHVjdDo3NA==',
    name: 'Banana Juice',
    productKlass: {
      __typename: 'ProductKlass',
      hasVariants: true,
      id: 'UHJvZHVjdFR5cGU6OQ==',
      name: 'Juice',
    },
    thumbnail: {
      __typename: 'Image',
      url: placeholderImage,
    },
  },
  {
    __typename: 'Product',
    updatedAt: '2020-06-22T13:52:05.094636+00:00',
    attributes: [
      {
        __typename: 'Attribute',
        attribute: {
          __typename: 'Attribute',
          id: 'QXR0cmlidXRlOjE2',
        },
        values: [
          {
            __typename: 'Value',
            file: null,
            id: 'QXR0cmlidXRlVmFsdWU6NTE=',
            name: 'Bean',
            reference: null,
            slug: 'bean',
            boolean: null,
            date: null,
            dateTime: null,
            value: null,
          },
        ],
      },
    ],
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
        publishedAt: '2020-07-30',
        visibleInListings: true,
      },
    ],
    id: 'UHJvZHVjdDo3OQ==',
    name: 'Bean Juice',
    productKlass: {
      __typename: 'ProductKlass',
      hasVariants: true,
      id: 'UHJvZHVjdFR5cGU6OQ==',
      name: 'Juice',
    },
    thumbnail: {
      __typename: 'Image',
      url: placeholderImage,
    },
  },
  {
    __typename: 'Product',
    updatedAt: '2020-06-22T13:52:05.094636+00:00',
    attributes: [
      {
        __typename: 'Attribute',
        attribute: {
          __typename: 'Attribute',
          id: 'QXR0cmlidXRlOjE2',
        },
        values: [
          {
            __typename: 'Value',
            file: null,
            id: 'QXR0cmlidXRlVmFsdWU6NTI=',
            name: 'Carrot',
            reference: null,
            slug: 'carrot',
            boolean: null,
            date: null,
            dateTime: null,
            value: null,
          },
        ],
      },
    ],
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
        publishedAt: '2020-07-30',
        visibleInListings: false,
      },
    ],
    id: 'UHJvZHVjdDo3Mw==',
    name: 'Carrot Juice',
    productKlass: {
      __typename: 'ProductKlass',
      hasVariants: true,
      id: 'UHJvZHVjdFR5cGU6OQ==',
      name: 'Juice',
    },
    thumbnail: {
      __typename: 'Image',
      url: placeholderImage,
    },
  },
  {
    __typename: 'Product',
    updatedAt: '2020-06-22T13:52:05.094636+00:00',
    attributes: [
      {
        __typename: 'Attribute',
        attribute: {
          __typename: 'Attribute',
          id: 'QXR0cmlidXRlOjE2',
        },
        values: [
          {
            __typename: 'Value',
            file: null,
            id: 'QXR0cmlidXRlVmFsdWU6NTM=',
            name: 'Sprouty',
            reference: null,
            slug: 'sprouty',
            boolean: null,
            date: null,
            dateTime: null,
            value: null,
          },
        ],
      },
    ],
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
        publishedAt: '2020-07-30',
        visibleInListings: true,
      },
    ],
    id: 'UHJvZHVjdDo3OA==',
    name: 'Green Juice',
    productKlass: {
      __typename: 'ProductKlass',
      hasVariants: true,
      id: 'UHJvZHVjdFR5cGU6OQ==',
      name: 'Juice',
    },
    thumbnail: {
      __typename: 'Image',
      url: placeholderImage,
    },
  },
  {
    __typename: 'Product',
    updatedAt: '2020-06-22T13:52:05.094636+00:00',
    attributes: [
      {
        __typename: 'Attribute',
        attribute: {
          __typename: 'Attribute',
          id: 'QXR0cmlidXRlOjI1',
        },
        values: [
          {
            __typename: 'Value',
            file: null,
            id: 'QXR0cmlidXRlVmFsdWU6ODI=',
            name: 'Cotton',
            reference: null,
            slug: 'cotton',
            boolean: null,
            date: null,
            dateTime: null,
            value: null,
          },
        ],
      },
    ],
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
        publishedAt: '2020-07-30',
        visibleInListings: true,
      },
    ],
    id: 'UHJvZHVjdDo4OQ==',
    name: 'Code Division T-shirt',
    productKlass: {
      __typename: 'ProductKlass',
      hasVariants: true,
      id: 'UHJvZHVjdFR5cGU6MTQ=',
      name: 'Top (clothing)',
    },
    thumbnail: {
      __typename: 'Image',
      url: placeholderImage,
    },
  },
  {
    __typename: 'Product',
    updatedAt: '2020-06-22T13:52:05.094636+00:00',
    attributes: [
      {
        __typename: 'Attribute',
        attribute: {
          __typename: 'Attribute',
          id: 'QXR0cmlidXRlOjI1',
        },
        values: [
          {
            __typename: 'Value',
            file: null,
            id: 'QXR0cmlidXRlVmFsdWU6ODI=',
            name: 'Cotton',
            reference: null,
            slug: 'cotton',
            boolean: null,
            date: null,
            dateTime: null,
            value: null,
          },
        ],
      },
    ],
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
        publishedAt: '2020-07-30',
        visibleInListings: true,
      },
    ],
    id: 'UHJvZHVjdDoxMDc=',
    name: 'Polo Shirt',
    productKlass: {
      __typename: 'ProductKlass',
      hasVariants: true,
      id: 'UHJvZHVjdFR5cGU6MTQ=',
      name: 'Top (clothing)',
    },
    thumbnail: {
      __typename: 'Image',
      url: placeholderImage,
    },
  },
  {
    __typename: 'Product',
    updatedAt: '2020-06-22T13:52:05.094636+00:00',
    attributes: [
      {
        __typename: 'Attribute',
        attribute: {
          __typename: 'Attribute',
          id: 'QXR0cmlidXRlOjI1',
        },
        values: [
          {
            __typename: 'Value',
            file: null,
            id: 'QXR0cmlidXRlVmFsdWU6ODI=',
            name: 'Cotton',
            reference: null,
            slug: 'cotton',
            boolean: null,
            date: null,
            dateTime: null,
            value: null,
          },
        ],
      },
    ],
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
        publishedAt: '2020-07-30',
        visibleInListings: false,
      },
    ],
    id: 'UHJvZHVjdDoxMDg=',
    name: 'Polo Shirt',
    productKlass: {
      __typename: 'ProductKlass',
      hasVariants: true,
      id: 'UHJvZHVjdFR5cGU6MTQ=',
      name: 'Top (clothing)',
    },
    thumbnail: {
      __typename: 'Image',
      url: placeholderImage,
    },
  },
  {
    __typename: 'Product',
    updatedAt: '2020-06-22T13:52:05.094636+00:00',
    attributes: [
      {
        __typename: 'Attribute',
        attribute: {
          __typename: 'Attribute',
          id: 'QXR0cmlidXRlOjI1',
        },
        values: [
          {
            __typename: 'Value',
            file: null,
            id: 'QXR0cmlidXRlVmFsdWU6ODI=',
            name: 'Cotton',
            reference: null,
            slug: 'cotton',
            boolean: null,
            date: null,
            dateTime: null,
            value: null,
          },
        ],
      },
    ],
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
        publishedAt: '2020-07-30',
        visibleInListings: false,
      },
    ],
    id: 'UHJvZHVjdDoxMDk=',
    name: 'Polo Shirt',
    productKlass: {
      __typename: 'ProductKlass',
      hasVariants: true,
      id: 'UHJvZHVjdFR5cGU6MTQ=',
      name: 'Top (clothing)',
    },
    thumbnail: {
      __typename: 'Image',
      url: placeholderImage,
    },
  },
  {
    __typename: 'Product',
    updatedAt: '2020-06-22T13:52:05.094636+00:00',
    attributes: [
      {
        __typename: 'Attribute',
        attribute: {
          __typename: 'Attribute',
          id: 'QXR0cmlidXRlOjI1',
        },
        values: [
          {
            __typename: 'Value',
            file: null,
            id: 'QXR0cmlidXRlVmFsdWU6ODI=',
            name: 'Cotton',
            reference: null,
            slug: 'cotton',
            boolean: null,
            date: null,
            dateTime: null,
            value: null,
          },
        ],
      },
    ],
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
        publishedAt: '2020-07-30',
        visibleInListings: true,
      },
    ],
    id: 'UHJvZHVjdDoxMTA=',
    name: 'Polo Shirt',
    productKlass: {
      __typename: 'ProductKlass',
      hasVariants: true,
      id: 'UHJvZHVjdFR5cGU6MTQ=',
      name: 'Top (clothing)',
    },
    thumbnail: {
      __typename: 'Image',
      url: placeholderImage,
    },
  },
  {
    __typename: 'Product',
    updatedAt: '2020-06-22T13:52:05.094636+00:00',
    attributes: [
      {
        __typename: 'Attribute',
        attribute: {
          __typename: 'Attribute',
          id: 'QXR0cmlidXRlOjI1',
        },
        values: [
          {
            __typename: 'Value',
            file: null,
            id: 'QXR0cmlidXRlVmFsdWU6ODI=',
            name: 'Cotton',
            reference: null,
            slug: 'cotton',
            boolean: null,
            date: null,
            dateTime: null,
            value: null,
          },
        ],
      },
    ],
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
        publishedAt: '2020-07-30',
        visibleInListings: false,
      },
    ],
    id: 'UHJvZHVjdDoxMTU=',
    name: 'Black Hoodie',
    productKlass: {
      __typename: 'ProductKlass',
      hasVariants: true,
      id: 'UHJvZHVjdFR5cGU6MTQ=',
      name: 'Top (clothing)',
    },
    thumbnail: {
      __typename: 'Image',
      url: placeholderImage,
    },
  },
  {
    __typename: 'Product',
    updatedAt: '2020-06-22T13:52:05.094636+00:00',
    attributes: [
      {
        __typename: 'Attribute',
        attribute: {
          __typename: 'Attribute',
          id: 'QXR0cmlidXRlOjI1',
        },
        values: [
          {
            __typename: 'Value',
            file: null,
            id: 'QXR0cmlidXRlVmFsdWU6ODI=',
            name: 'Cotton',
            reference: null,
            slug: 'cotton',
            boolean: null,
            date: null,
            dateTime: null,
            value: null,
          },
        ],
      },
    ],
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
        publishedAt: '2020-07-30',
        visibleInListings: true,
      },
    ],
    id: 'UHJvZHVjdDoxMTY=',
    name: 'Blue Hoodie',
    productKlass: {
      __typename: 'ProductKlass',
      hasVariants: true,
      id: 'UHJvZHVjdFR5cGU6MTQ=',
      name: 'Top (clothing)',
    },
    thumbnail: {
      __typename: 'Image',
      url: placeholderImage,
    },
  },
  {
    __typename: 'Product',
    updatedAt: '2020-06-22T13:52:05.094636+00:00',
    attributes: [
      {
        __typename: 'Attribute',
        attribute: {
          __typename: 'Attribute',
          id: 'QXR0cmlidXRlOjI1',
        },
        values: [
          {
            __typename: 'Value',
            file: null,
            id: 'QXR0cmlidXRlVmFsdWU6ODI=',
            name: 'Cotton',
            reference: null,
            slug: 'cotton',
            boolean: null,
            date: null,
            dateTime: null,
            value: null,
          },
        ],
      },
    ],
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
        publishedAt: '2020-07-30',
        visibleInListings: true,
      },
    ],
    id: 'UHJvZHVjdDoxMTc=',
    name: 'Mustard Hoodie',
    productKlass: {
      __typename: 'ProductKlass',
      hasVariants: true,
      id: 'UHJvZHVjdFR5cGU6MTQ=',
      name: 'Top (clothing)',
    },
    thumbnail: {
      __typename: 'Image',
      url: placeholderImage,
    },
  },
  {
    __typename: 'Product',
    updatedAt: '2020-06-22T13:52:05.094636+00:00',
    attributes: [
      {
        __typename: 'Attribute',
        attribute: {
          __typename: 'Attribute',
          id: 'QXR0cmlidXRlOjIz',
        },
        values: [
          {
            __typename: 'Value',
            file: null,
            id: 'QXR0cmlidXRlVmFsdWU6NzI=',
            name: 'Cotton',
            reference: null,
            slug: 'cotton',
            boolean: null,
            date: null,
            dateTime: null,
            value: null,
          },
        ],
      },
    ],
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
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
        pricing: {
          __typename: 'ProductPricingInfo',
          priceRange: {
            __typename: 'TaxedMoneyRange',
            start: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 1.2,
                currency: 'USD',
              },
            },
            stop: {
              __typename: 'TaxedMoney',
              net: {
                __typename: 'Money',
                amount: 3.5,
                currency: 'USD',
              },
            },
          },
        },
        publishedAt: '2020-07-30',
        visibleInListings: true,
      },
    ],
    id: 'UHJvZHVjdDo4NQ==',
    name: 'Colored Parrot Cushion',
    productKlass: {
      __typename: 'ProductKlass',
      hasVariants: true,
      id: 'UHJvZHVjdFR5cGU6MTI=',
      name: 'Cushion',
    },
    thumbnail: {
      __typename: 'Image',
      url: placeholderImage,
    },
  },
];

export const variant = (placeholderImage: string): ProductFragment => ({
  __typename: 'Product',
  channelListings: [
    {
      __typename: 'ProductChannelListing',
      channel: {
        __typename: 'Channel',
        currencyCode: 'USD',
        id: 'test1',
        name: 'Test channel',
      },
      costPrice: {
        __typename: 'Money',
        amount: 10,
        currency: 'USD',
      },
      price: {
        __typename: 'Money',
        amount: 10,
        currency: 'USD',
      },
      preorderThreshold: {
        __typename: 'PreorderThreshold',
        quantity: 0,
        soldUnits: 0,
      },
    },
    {
      __typename: 'ProductChannelListing',
      channel: {
        __typename: 'Channel',
        currencyCode: 'USD',
        id: 'test2',
        name: 'Test channel other',
      },
      costPrice: {
        __typename: 'Money',
        amount: 10,
        currency: 'USD',
      },
      price: {
        __typename: 'Money',
        amount: 20,
        currency: 'USD',
      },
      preorderThreshold: {
        __typename: 'PreorderThreshold',
        quantity: 0,
        soldUnits: 0,
      },
    },
  ],
  id: 'var1',
  quantityLimitPerCustomer: 300,
  media: [
    {
      __typename: 'ProductMediaItem',
      id: 'img1',
      type: ProductMediaType.Image,
      oembedData: '{}',
      url: placeholderImage,
    },
    {
      __typename: 'ProductMediaItem',
      id: 'img2',
      type: ProductMediaType.Image,
      oembedData: '{}',
      url: placeholderImage,
    },
    {
      __typename: 'ProductMediaItem',
      id: 'img7',
      type: ProductMediaType.Image,
      oembedData: '{}',
      url: placeholderImage,
    },
    {
      __typename: 'ProductMediaItem',
      id: 'img8',
      type: ProductMediaType.Image,
      oembedData: '{}',
      url: placeholderImage,
    },
  ],
  metadata: [
    {
      __typename: 'MetadataItem',
      key: 'integration.id',
      value: '100023123',
    },
  ],
  name: 'Extended Hard',
  nonSelectionAttributes: [
    {
      __typename: 'Attribute',
      attribute: {
        __typename: 'Attribute',
        entityType: null,
        id: 'nfnyffcf8eyfm',
        inputType: AttributeInputType.File,
        name: 'Attachment',
        slug: 'attachment',
        valueRequired: true,
        unit: null,
        choices: {
          __typename: 'ValueConnection',
          pageInfo: {
            endCursor: 'WyI4IiwgIjMiXQ==',
            hasNextPage: false,
            hasPreviousPage: false,
            startCursor: 'WyIwIiwgIjQ5Il0=',
            __typename: 'PageInfo',
          },
          edges: [
            {
              __typename: 'ValueCountableEdge',
              cursor: '',
              node: {
                __typename: 'Value',
                file: {
                  __typename: 'File',
                  contentType: 'image/png',
                  url: 'some-non-existing-url',
                },
                id: 'gdghdgdhkkdae',
                name: 'File First Value',
                reference: null,
                slug: 'file-first-value',
                plainText: null,
                richText: null,
                boolean: null,
                date: null,
                dateTime: null,
                value: null,
              },
            },
          ],
        },
      },
      values: [
        {
          __typename: 'Value',
          file: {
            __typename: 'File',
            contentType: 'image/png',
            url: 'some-non-existing-url',
          },
          id: 'gdghdgdhkkdae',
          name: 'File First Value',
          reference: null,
          slug: 'file-first-value',
          plainText: null,
          richText: null,
          boolean: null,
          date: null,
          dateTime: null,
          value: null,
        },
      ],
    },
  ],
  privateMetadata: [],
  product: {
    __typename: 'Product' as const,
    channelListings: [
      {
        __typename: 'ProductChannelListing',
        id: '11',
        isPublished: false,
        publishedAt: null,
        channel: {
          __typename: 'Channel',
          currencyCode: 'USD',
          id: 'test1',
          name: 'Test channel',
        },
      },
      {
        __typename: 'ProductChannelListing',
        id: '12',
        isPublished: true,
        publishedAt: '2022-01-21',
        channel: {
          __typename: 'Channel',
          currencyCode: 'USD',
          id: 'test2',
          name: 'Test channel other',
        },
      },
    ],
    defaultVariant: {
      __typename: 'Product',
      id: 'var1',
    },
    id: 'prod1',
    media: [
      {
        __typename: 'ProductMediaItem',
        alt: 'Front',
        id: 'img1',
        sortOrder: 1,
        type: ProductMediaType.Image,
        oembedData: '{}',
        url: placeholderImage,
      },
      {
        __typename: 'ProductMediaItem',
        alt: 'Back',
        id: 'img2',
        sortOrder: 4,
        type: ProductMediaType.Image,
        oembedData: '{}',
        url: placeholderImage,
      },
      {
        __typename: 'ProductMediaItem',
        alt: 'Right side',
        id: 'img3',
        sortOrder: 2,
        type: ProductMediaType.Image,
        oembedData: '{}',
        url: placeholderImage,
      },
      {
        __typename: 'ProductMediaItem',
        alt: 'Left side',
        id: 'img4',
        sortOrder: 3,
        type: ProductMediaType.Image,
        oembedData: '{}',
        url: placeholderImage,
      },
      {
        __typename: 'ProductMediaItem',
        alt: 'Paper',
        id: 'img5',
        sortOrder: 0,
        type: ProductMediaType.Image,
        oembedData: '{}',
        url: placeholderImage,
      },
      {
        __typename: 'ProductMediaItem',
        alt: 'Hard cover',
        id: 'img6',
        sortOrder: 1,
        type: ProductMediaType.Image,
        oembedData: '{}',
        url: placeholderImage,
      },
      {
        __typename: 'ProductMediaItem',
        alt: 'Extended version',
        id: 'img7',
        sortOrder: 0,
        type: ProductMediaType.Image,
        oembedData: '{}',
        url: placeholderImage,
      },
      {
        __typename: 'ProductMediaItem',
        alt: 'Cut version',
        id: 'img8',
        sortOrder: 2,
        type: ProductMediaType.Image,
        oembedData: '{}',
        url: placeholderImage,
      },
      {
        __typename: 'ProductMediaItem',
        alt: 'Soft cover',
        id: 'img9',
        sortOrder: 2,
        type: ProductMediaType.Image,
        oembedData: '{}',
        url: placeholderImage,
      },
    ],
    name: 'Our Awesome Book',
    thumbnail: { __typename: 'Image' as const, url: placeholderImage },
    variants: [
      {
        __typename: 'Product',
        id: 'var1',
        media: [
          {
            __typename: 'ProductMediaItem',
            id: '23123',
            type: ProductMediaType.Image,
            oembedData: '{}',
            url: placeholderImage,
          },
        ],
        name: 'Extended Hard',
        sku: '13-1337',
      },
      {
        __typename: 'Product',
        id: 'var2',
        media: [
          {
            __typename: 'ProductMediaItem',
            id: '23123',
            type: ProductMediaType.Image,
            oembedData: '{}',
            url: placeholderImage,
          },
        ],
        name: 'Extended Soft',
        sku: '13-1338',
      },
      {
        __typename: 'Product',
        id: 'var3',
        media: [
          {
            __typename: 'ProductMediaItem',
            id: '23123',
            type: ProductMediaType.Image,
            oembedData: '{}',
            url: placeholderImage,
          },
        ],
        name: 'Normal Hard',
        sku: '13-1339',
      },
      {
        __typename: 'Product',
        id: 'var4',
        media: [
          {
            __typename: 'ProductMediaItem',
            id: '23123',
            type: ProductMediaType.Image,
            oembedData: '{}',
            url: placeholderImage,
          },
        ],
        name: 'Normal Soft',
        sku: '13-1340',
      },
    ],
  },
  selectionAttributes: [
    {
      __typename: 'Attribute',
      attribute: {
        __typename: 'Attribute' as const,
        entityType: null,
        id: 'pta18161',
        inputType: AttributeInputType.Dropdown,
        name: 'Borders',
        slug: 'Borders',
        valueRequired: true,
        unit: null,
        choices: {
          __typename: 'ValueConnection',
          pageInfo: {
            endCursor: 'WyI4IiwgIjMiXQ==',
            hasNextPage: false,
            hasPreviousPage: false,
            startCursor: 'WyIwIiwgIjQ5Il0=',
            __typename: 'PageInfo',
          },
          edges: [
            {
              __typename: 'ValueCountableEdge',
              cursor: '',
              node: {
                __typename: 'Value',
                file: null,
                id: 'ptav47282',
                name: 'portals',
                reference: null,
                slug: 'portals',
                plainText: null,
                richText: null,
                boolean: null,
                date: null,
                dateTime: null,
                value: null,
              },
            },
            {
              __typename: 'ValueCountableEdge',
              cursor: '',
              node: {
                __typename: 'Value',
                file: null,
                id: 'ptav17253',
                name: 'Baht',
                reference: null,
                slug: 'Baht',
                plainText: null,
                richText: null,
                boolean: null,
                date: null,
                dateTime: null,
                value: null,
              },
            },
          ],
        },
      },
      values: [
        {
          __typename: 'Value',
          file: null,
          id: 'ptav47282',
          name: 'portals',
          reference: null,
          slug: 'portals',
          plainText: null,
          richText: null,
          boolean: null,
          date: null,
          dateTime: null,
          value: null,
        },
      ],
    },
    {
      __typename: 'Attribute',
      attribute: {
        __typename: 'Attribute' as const,
        entityType: null,
        id: 'pta22785',
        inputType: AttributeInputType.Dropdown,
        name: 'Legacy',
        slug: 'Legacy',
        valueRequired: true,
        unit: null,
        choices: {
          __typename: 'ValueConnection',
          pageInfo: {
            endCursor: 'WyI4IiwgIjMiXQ==',
            hasNextPage: false,
            hasPreviousPage: false,
            startCursor: 'WyIwIiwgIjQ5Il0=',
            __typename: 'PageInfo',
          },
          edges: [
            {
              __typename: 'ValueCountableEdge',
              cursor: '',
              node: {
                __typename: 'Value',
                file: null,
                id: 'ptav31282',
                name: 'payment',
                reference: null,
                slug: 'payment',
                plainText: null,
                richText: null,
                boolean: null,
                date: null,
                dateTime: null,
                value: null,
              },
            },
            {
              __typename: 'ValueCountableEdge',
              cursor: '',
              node: {
                __typename: 'Value',
                file: null,
                id: 'ptav14907',
                name: 'Auto Loan Account',
                reference: null,
                slug: 'Auto-Loan-Account',
                plainText: null,
                richText: null,
                boolean: null,
                date: null,
                dateTime: null,
                value: null,
              },
            },
            {
              __typename: 'ValueCountableEdge',
              cursor: '',
              node: {
                __typename: 'Value',
                file: null,
                id: 'ptav27366',
                name: 'Garden',
                reference: null,
                slug: 'Garden',
                plainText: null,
                richText: null,
                boolean: null,
                date: null,
                dateTime: null,
                value: null,
              },
            },
            {
              __typename: 'ValueCountableEdge',
              cursor: '',
              node: {
                __typename: 'Value',
                file: null,
                id: 'ptav11873',
                name: 'override',
                reference: null,
                slug: 'override',
                plainText: null,
                richText: null,
                boolean: null,
                date: null,
                dateTime: null,
                value: null,
              },
            },
          ],
        },
      },
      values: [
        {
          __typename: 'Value',
          file: null,
          id: 'ptav14907',
          name: 'Auto Loan Account',
          reference: null,
          slug: 'Auto-Loan-Account',
          plainText: null,
          richText: null,
          boolean: null,
          date: null,
          dateTime: null,
          value: null,
        },
      ],
    },
  ],
  sku: '1230959124123',
  stocks: [
    {
      __typename: 'Stock',
      id: '1',
      quantity: 1,
      quantityAllocated: 1,
      warehouse: {
        __typename: 'Warehouse',
        id: '123',
        name: 'Warehouse 1',
      },
    },
    {
      __typename: 'Stock',
      id: '2',
      quantity: 4,
      quantityAllocated: 2,
      warehouse: {
        __typename: 'Warehouse',
        id: '1234',
        name: 'Warehouse 2',
      },
    },
  ],
  trackInventory: true,
  preorder: {
    __typename: 'PreorderData',
    endDate: null,
    globalSoldUnits: null,
    globalThreshold: 0,
  },
  weight: {
    __typename: 'Weight',
    unit: WeightUnit.Kg,
    value: 6,
  },
});
export const variantMedia = (placeholderImage: string) => variant(placeholderImage).media;
export const variantProductImages = (placeholderImage: string) =>
  variant(placeholderImage).product.media;
export const variantSiblings = (placeholderImage: string) =>
  variant(placeholderImage).product.variants;

export const productKlassesList: Array<Pick<ProductKlass, 'id' | 'name' | 'hasVariants'>> = [
  {
    hasVariants: true,
    id: 'UHJvZHVjdFR5cGU6Nw==',
    name: 'Salt',
  },
  {
    hasVariants: true,
    id: 'UHJvZHVjdFR5cGU6Nw==',
    name: 'Sugar',
  },
  {
    hasVariants: true,
    id: 'UHJvZHVjdFR5cGU6Nw==',
    name: 'Mushroom',
  },
];
