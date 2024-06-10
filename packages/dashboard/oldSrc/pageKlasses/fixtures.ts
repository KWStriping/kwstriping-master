import type { PageKlassDetailsFragment, PageKlassFragment } from '@core/api/graphql';
import { AttributeInputType, AttributeType } from '@core/api/constants';

export const pageKlasses: PageKlassFragment[] = [
  {
    id: 'UGFnZVR5cGU6MQ==',
    name: 'Blog',
    hasPages: true,
    __typename: 'PageKlass',
  },
  {
    id: 'UGFnZVR5cGU6Mw==',
    name: 'Landing Page',
    hasPages: true,
    __typename: 'PageKlass',
  },
  {
    id: 'UGFnZVR5cGU6Mg==',
    name: 'Marketing Page',
    hasPages: false,
    __typename: 'PageKlass',
  },
];

export const pageKlass: PageKlassDetailsFragment = {
  id: 'UGFnZVR5cGU6MQ==',
  __typename: 'PageKlass',
  metadata: [
    {
      __typename: 'MetadataItem',
      key: 'integration.id',
      value: '100023123',
    },
  ],
  name: 'Blog',
  hasPages: true,
  attributes: [
    {
      __typename: 'Attribute' as const,
      id: 'UHJvZHVjdEF0dHJpYnV0ZTo5',
      name: 'Author',
      slug: 'author',
      visibleInStorefront: true,
      filterableInDashboard: true,
      filterableInStorefront: true,
      type: AttributeType.PageKlass,
      inputType: AttributeInputType.Dropdown,
      unit: null,
    },
    {
      __typename: 'Attribute' as const,
      id: 'UHJvZHVjdEF0dHJpYnV0ZToxMQ==',
      name: 'Language',
      slug: 'language',
      visibleInStorefront: true,
      filterableInDashboard: true,
      filterableInStorefront: true,
      type: AttributeType.PageKlass,
      inputType: AttributeInputType.Dropdown,
      unit: null,
    },
    {
      __typename: 'Attribute' as const,
      id: 'UHJvZHVjdEF0dHJpYnV0ZTo5',
      name: 'Author',
      slug: 'author',
      visibleInStorefront: true,
      filterableInDashboard: true,
      filterableInStorefront: true,
      type: AttributeType.PageKlass,
      inputType: AttributeInputType.Dropdown,
      unit: null,
    },
  ],
  privateMetadata: [],
};
