import { gql } from '@tempo/api/gql';

export const pluginsList = gql(`
  query Plugins(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $filter: PluginFilter
    $sort: PluginOrderingInput
  ) {
    plugins(
      before: $before
      after: $after
      first: $first
      last: $last
      filters: $filter
      sortBy: $sort
    ) {
      edges {
        node {
          ...PluginBase
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`);

export const pluginsDetails = gql(`
  query Plugin($id: ID!) {
    plugin(id: $id) {
      ...PluginsDetails
    }
  }
`);
