import { gql } from '@tempo/api';

export const valueFragment = gql(`
  fragment Value on Value {
    id
    name
    slug
    file {
      ...File
    }
    reference
    boolean
    date
    dateTime
    value
  }
`);

export const valueDetailsFragment = gql(`
  fragment ValueDetails on Value {
    ...Value
    plainText
    richText
  }
`);

export const valueListFragment = gql(`
  fragment ValueList on ValueConnection {
    pageInfo {
      ...PageInfo
    }
    edges {
      cursor
      node {
        ...ValueDetails
      }
    }
  }
`);

export const availableAttributeFragment = gql(`
  fragment AvailableAttribute on Attribute {
    id
    name
    slug
  }
`);
