import { AttributeEntityType, AttributeInputType } from '@tempo/api/generated/graphql';
import { MeasurementUnit } from '@tempo/api/generated/constants';
import type { AttributeInput } from './Attributes';

const DROPDOWN_ATTRIBUTE: AttributeInput = {
  data: {
    inputType: AttributeInputType.Dropdown,
    isRequired: true,
    values: [
      {
        __typename: 'Value',
        file: null,
        id: 'fdinugiffgffd',
        name: 'Dropdown First Value',
        reference: null,
        slug: 'dropdown-first-value',
        plainText: null,
        richText: null,
        boolean: null,
        date: null,
        dateTime: null,
        value: null,
      },
      {
        __typename: 'Value',
        file: null,
        id: 'fdhfdhdihidff',
        name: 'Dropdown Second Value',
        reference: null,
        slug: 'dropdown-second-value',
        plainText: null,
        richText: null,
        boolean: null,
        date: null,
        dateTime: null,
        value: null,
      },
    ],
  },
  id: 'ifudbgidfsb',
  label: 'Dropdown Attribute',
  value: [],
};

const MULTISELECT_ATTRIBUTE: AttributeInput = {
  data: {
    inputType: AttributeInputType.Multiselect,
    isRequired: true,
    values: [
      {
        __typename: 'Value',
        file: null,
        id: 'terteretregtt',
        name: 'Multiselect First Value',
        reference: null,
        slug: 'multiselect-first-value',
        plainText: null,
        richText: null,
        boolean: null,
        date: null,
        dateTime: null,
        value: null,
      },
      {
        __typename: 'Value',
        file: null,
        id: 'tyueyryetopwr',
        name: 'Multiselect Second Value',
        reference: null,
        slug: 'multiselect-second-value',
        plainText: null,
        richText: null,
        boolean: null,
        date: null,
        dateTime: null,
        value: null,
      },
      {
        __typename: 'Value',
        file: null,
        id: 'truiwrtweirqd',
        name: 'Multiselect Third Value',
        reference: null,
        slug: 'multiselect-third-value',
        plainText: null,
        richText: null,
        boolean: null,
        date: null,
        dateTime: null,
        value: null,
      },
    ],
  },
  id: 'idffuidhffl',
  label: 'Multiselect Attribute',
  value: [],
};

const FILE_ATTRIBUTE: AttributeInput = {
  data: {
    inputType: AttributeInputType.File,
    isRequired: true,
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
  id: 'fguygygugyu',
  label: 'File Attribute',
  value: [],
};

const REFERENCE_ATTRIBUTE: AttributeInput = {
  data: {
    entityType: AttributeEntityType.Page,
    inputType: AttributeInputType.Reference,
    isRequired: true,
    references: [
      {
        label: 'References First Value',
        value: 'vbnhgcvjhbvhj',
      },
      {
        label: 'References Second Value',
        value: 'gucngdfdfvdvd',
      },
      {
        label: 'References Third Value',
        value: 'dfdfdsfdsfdse',
      },
    ],
    values: [
      {
        __typename: 'Value',
        file: null,
        id: 'vbnhgcvjhbvhj',
        name: 'References First Value',
        reference: null,
        slug: 'references-first-value',
        plainText: null,
        richText: null,
        boolean: null,
        date: null,
        dateTime: null,
        value: null,
      },
      {
        __typename: 'Value',
        file: null,
        id: 'gucngdfdfvdvd',
        name: 'References Second Value',
        reference: null,
        slug: 'references-second-value',
        plainText: null,
        richText: null,
        boolean: null,
        date: null,
        dateTime: null,
        value: null,
      },
      {
        __typename: 'Value',
        file: null,
        id: 'dfdfdsfdsfdse',
        name: 'References Third Value',
        reference: null,
        slug: 'references-third-value',
        plainText: null,
        richText: null,
        boolean: null,
        date: null,
        dateTime: null,
        value: null,
      },
    ],
  },
  id: 'kclsmcdsmcs',
  label: 'References Attribute',
  value: [],
};

const PLAIN_TEXT_ATTRIBUTE: AttributeInput = {
  data: {
    inputType: AttributeInputType.PlainText,
    isRequired: true,
    values: [
      {
        __typename: 'Value',
        file: null,
        id: 'iuytqweytrqwe',
        name: 'Some cool text',
        reference: null,
        slug: 'text',
        plainText: 'Some cool text',
        richText: null,
        boolean: null,
        date: null,
        dateTime: null,
        value: null,
      },
    ],
    selectedValues: [],
  },
  id: 'iuytqweytrqwe',
  label: 'Plain Text Attribute',
  value: [],
};

const RICH_TEXT_ATTRIBUTE: AttributeInput = {
  data: {
    inputType: AttributeInputType.RichText,
    isRequired: true,
    values: [
      {
        __typename: 'Value',
        file: null,
        id: 'asdfafd',
        name: 'Some cool text',
        reference: null,
        slug: 'text',
        plainText: null,
        richText: JSON.stringify({
          time: 1617788754145,
          blocks: [{ data: { text: 'Some cool text' }, type: 'paragraph' }],
          version: '2.19.3',
        }),
        boolean: null,
        date: null,
        dateTime: null,
        value: null,
      },
    ],
    selectedValues: [],
  },
  id: 'asdfafd',
  label: 'Rich Text Attribute',
  value: [],
};

const NUMERIC_ATTRIBUTE: AttributeInput = {
  data: {
    inputType: AttributeInputType.Numeric,
    isRequired: true,
    unit: MeasurementUnit.Cm,
    values: [
      {
        __typename: 'Value',
        file: null,
        id: 'QXR0cmlidXRlVmFsdWU6MTAx',
        name: '12',
        reference: null,
        plainText: null,
        richText: null,
        boolean: null,
        date: null,
        dateTime: null,
        value: null,
        slug: '319_35',
      },
    ],
  },
  id: 'QXR0cmlidXRlOjM1',
  label: 'Numeric Attribute',
  value: [],
};

const BOOLEAN_ATTRIBUTE: AttributeInput = {
  data: {
    inputType: AttributeInputType.Boolean,
    isRequired: true,
    values: [
      {
        __typename: 'Value',
        file: null,
        id: 'asdfasdfasdfasdf',
        name: 'Boolean Attribute: Yes',
        reference: null,
        plainText: null,
        richText: null,
        boolean: true,
        slug: '319_True',
        date: null,
        dateTime: null,
        value: null,
      },
    ],
  },
  id: 'QXR0cmlidXRlOjMasdfasdf1',
  label: 'Boolean Attribute',
  value: [],
};

const DATE_ATTRIBUTE: AttributeInput = {
  data: {
    inputType: AttributeInputType.Date,
    isRequired: true,
    values: [
      {
        __typename: 'Value',
        file: null,
        id: 'asdfasdfasdfasdf',
        name: "Date Attribute: '2021-06-03 00:15:00+00:00'",
        reference: null,
        plainText: null,
        richText: null,
        boolean: true,
        slug: '319_True',
        date: '2021-06-03',
        dateTime: '2021-06-03 00:15:00+00:00',
        value: null,
      },
    ],
  },
  id: 'QXR0cmfsdfasfdjMasdfasdf1',
  label: 'Date Attribute',
  value: [],
};

const DATE_TIME_ATTRIBUTE: AttributeInput = {
  data: {
    inputType: AttributeInputType.DateTime,
    isRequired: true,
    values: [
      {
        __typename: 'Value',
        file: null,
        id: 'asdfasdfasdfasdf',
        name: "Date Time Attribute: '2021-06-03 00:15:00+00:00'",
        reference: null,
        plainText: null,
        richText: null,
        boolean: true,
        slug: '319_True',
        date: '2021-06-03',
        dateTime: '2021-06-03 00:15:00+00:00',
        value: null,
      },
    ],
  },
  id: 'QXR0cmlidXasdfasdfasdf1',
  label: 'Date Time Attribute',
  value: [],
};

const SWATCH_ATTRIBUTE: AttributeInput = {
  data: {
    inputType: AttributeInputType.Swatch,
    isRequired: true,
    values: [
      {
        __typename: 'Value',
        file: null,
        id: 'sdfgsdgsdfg',
        name: 'Red',
        reference: null,
        plainText: null,
        richText: null,
        boolean: true,
        slug: '315_11',
        date: null,
        dateTime: null,
        value: '#FF0000',
      },
    ],
  },
  id: 'QXR0cmlidXasdfasdfasdf1',
  label: 'Swatch Attribute',
  value: [],
};

export const ATTRIBUTES: AttributeInput[] = [
  DROPDOWN_ATTRIBUTE,
  MULTISELECT_ATTRIBUTE,
  FILE_ATTRIBUTE,
  REFERENCE_ATTRIBUTE,
  PLAIN_TEXT_ATTRIBUTE,
  RICH_TEXT_ATTRIBUTE,
  NUMERIC_ATTRIBUTE,
  BOOLEAN_ATTRIBUTE,
  DATE_ATTRIBUTE,
  DATE_TIME_ATTRIBUTE,
  SWATCH_ATTRIBUTE,
];

export const ATTRIBUTES_SELECTED: AttributeInput[] = [
  {
    ...DROPDOWN_ATTRIBUTE,
    value: [DROPDOWN_ATTRIBUTE.data?.values[0].slug],
  },
  {
    ...MULTISELECT_ATTRIBUTE,
    value: [
      MULTISELECT_ATTRIBUTE.data?.values[0].slug,
      MULTISELECT_ATTRIBUTE.data?.values[1].slug,
    ],
  },
  {
    ...FILE_ATTRIBUTE,
    value: [FILE_ATTRIBUTE.data?.values[0].slug],
  },
  {
    ...REFERENCE_ATTRIBUTE,
    value: [
      REFERENCE_ATTRIBUTE.data?.values[0].id,
      REFERENCE_ATTRIBUTE.data?.values[1].id,
      REFERENCE_ATTRIBUTE.data?.values[2].id,
    ],
  },
  {
    ...PLAIN_TEXT_ATTRIBUTE,
    value: [PLAIN_TEXT_ATTRIBUTE.data?.values[0].plainText],
  },
  {
    ...RICH_TEXT_ATTRIBUTE,
    data: {
      ...RICH_TEXT_ATTRIBUTE.data,
      selectedValues: [RICH_TEXT_ATTRIBUTE.data?.values[0]],
    },
    value: [],
  },
  {
    ...NUMERIC_ATTRIBUTE,
    value: [NUMERIC_ATTRIBUTE.data?.values[0].name],
  },
  {
    ...BOOLEAN_ATTRIBUTE,
    value: [JSON.stringify(BOOLEAN_ATTRIBUTE.data?.values[0].boolean)],
  },
  {
    ...DATE_ATTRIBUTE,
    value: [DATE_TIME_ATTRIBUTE.data?.values[0].date],
  },
  {
    ...DATE_TIME_ATTRIBUTE,
    value: [DATE_TIME_ATTRIBUTE.data?.values[0].dateTime],
  },
  {
    ...SWATCH_ATTRIBUTE,
    value: [SWATCH_ATTRIBUTE.data?.values[0].slug],
  },
];
