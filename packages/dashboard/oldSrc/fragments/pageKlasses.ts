import { graphql as gql } from '@core/api/gql';

export const pageKlassFragment = gql(`
  fragment PageKlass on PageKlass {
    id
    name
    hasPages
  }
`);

export const pageKlassesDetailsFragment = gql(`
  fragment PageKlassDetails on PageKlass {
    ...PageKlass
    ...Metadata
    attributes {
      ...Attribute
    }
  }
`);
