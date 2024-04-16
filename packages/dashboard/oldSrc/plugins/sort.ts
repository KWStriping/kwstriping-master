import { PluginOrdering } from '@core/api/constants';
import { PluginListUrlOrdering } from '@dashboard/oldSrc/plugins/urls';
import { createGetSortQueryVariables } from '@dashboard/oldSrc/utils/sort';

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
