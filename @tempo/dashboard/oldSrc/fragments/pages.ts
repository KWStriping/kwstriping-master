import { gql } from '@tempo/api';

export const pageFragment = gql(`
  fragment Page on Page {
    id
    title
    slug
    isPublished
    content
  }
`);

export const pageSelectedAttribute = gql(`
  fragment PageSelectedAttribute on Attribute {
    id
    slug
    name
    inputType
    entityType
    valueRequired
    unit
    values(
      first: $firstValues
      after: $afterValues
      last: $lastValues
      before: $beforeValues
    ) {
      ...ValueList
    }
    # values {
    #   edges {
    #     node {
    #       ...ValueDetails
    #     }
    #   }
    # }
  }
`);

export const pageAttributesFragment = gql(`
  fragment PageAttributes on Page {
    attributes {
      ...PageSelectedAttribute
    }
    pageKlass {
      id
      name
      attributes {
        id
        name
        inputType
        entityType
        valueRequired
        values(
          first: $firstValues
          after: $afterValues
          last: $lastValues
          before: $beforeValues
        ) {
          ...ValueList
        }
      }
    }
  }
`);

export const pageDetailsFragment = gql(`
  fragment PageDetails on Page {
    ...Page
    ...PageAttributes
    ...Metadata
    content
    seoTitle
    seoDescription
    publishedAt
  }
`);
