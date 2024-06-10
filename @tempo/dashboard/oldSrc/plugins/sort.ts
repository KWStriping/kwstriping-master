import { PluginOrdering } from '@tempo/api/generated/constants';
import { PluginListUrlOrdering } from '@tempo/dashboard/oldSrc/plugins/urls';
import { createGetSortQueryVariables } from '@tempo/dashboard/oldSrc/utils/sort';

export function getSortQueryField(sort: PluginListUrlOrdering): PluginOrdering {
  switch (sort) {
    case PluginListUrlOrdering.name:
      return PluginOrdering.Name;
    case PluginListUrlOrdering.active:
      return PluginOrdering.IsActive;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(getSortQueryField);
