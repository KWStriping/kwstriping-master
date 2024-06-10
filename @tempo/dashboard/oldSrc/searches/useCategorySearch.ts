import { useSearch } from '@tempo/api/hooks';
import { gql } from '@tempo/api/gql';
import { SearchCategoriesDocument } from '@tempo/api/generated/graphql';

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
