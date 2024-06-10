import urlJoin from 'url-join';

import type {
  ActiveTab,
  Dialog,
  Filters,
  Pagination,
  SingleAction,
  Sort,
  TabActionDialog,
} from '../types';
import { stringifyQs } from '@tempo/dashboard/oldSrc/utils/urls';

export const pluginSection = '/plugins/';

export const pluginListPath = pluginSection;

export enum PluginListUrlFiltersEnum {
  query = 'query',
  active = 'active',
  channels = 'channels',
  type = 'type',
}

export type PluginListUrlFilters = Filters<PluginListUrlFiltersEnum> & {
  channels?: string[];
};
export type PluginListUrlDialog = TabActionDialog;
export enum PluginListUrlOrdering {
  name = 'name',
  active = 'active',
}
export type PluginListUrlSort = Sort<PluginListUrlOrdering>;
export type PluginListUrlQueryParams = ActiveTab &
  Dialog<PluginListUrlDialog> &
  PluginListUrlFilters &
  Pagination &
  PluginListUrlSort &
  SingleAction;
export const pluginListUrl = (params?: PluginListUrlQueryParams) => ({
  pathname: pluginListPath,
  query: params,
});

export const pluginPath = (id: string) => urlJoin(pluginSection, id);
export type PluginUrlDialog = 'clear' | 'edit';
export type PluginUrlQueryParams = Dialog<PluginUrlDialog> & SingleAction;
export const pluginUrl = (id: string, params?: PluginUrlQueryParams) =>
  pluginPath(encodeURIComponent(id)) + '/?' + stringifyQs(params);
