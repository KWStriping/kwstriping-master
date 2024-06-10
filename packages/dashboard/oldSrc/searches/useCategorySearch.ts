import { useSearch } from '@core/urql/hooks';
import { graphql as gql } from '@core/api/gql';
import { SearchCategoriesDocument } from '@core/api/graphql';

export const searchCategories = gql(`
  query SearchCategories($after: String, $first: Int!, $query: String!) {
    search: categories(after: $after, first: $first, filters: { search: $query }) {
      edges {
        node {
          id
          name
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`);

export default function useCategorySearch(options: any) {
  return useSearch(SearchCategoriesDocument, options);
}
