import urlJoin from 'url-join';

import type { Dialog, Filters, SingleAction, Sort } from '../types';

export enum ChannelsListUrlFiltersEnum {
  query = 'query',
}
export enum ChannelsListUrlOrdering {
  name = 'name',
}
export type ChannelsListUrlSort = Sort<ChannelsListUrlOrdering>;
export type ChannelsListUrlFilters = Filters<ChannelsListUrlFiltersEnum>;
export type ChannelUrlDialog = 'remove';
export type ChannelUrlQueryParams = Dialog<ChannelUrlDialog>;
export type ChannelsListUrlDialog = 'remove';
export type ChannelsListUrlQueryParams = Dialog<ChannelsListUrlDialog> &
  ChannelsListUrlFilters &
  ChannelsListUrlSort &
  SingleAction;

export type ChannelsAction = 'open-channels-picker';

export const channelsSection = '/channels/';

export const channelsListPath = channelsSection;

export const channelsListUrl = (params?: ChannelsListUrlQueryParams) => ({
  pathname: channelsListPath,
  query: params,
});

export const channelAddPath = urlJoin(channelsSection, 'add');
export const channelAddUrl = channelAddPath;

export const channelPath = (id: string) => urlJoin(channelsSection, id);

export const channelUrl = (id: string, params?: ChannelsListUrlQueryParams) => ({
  pathname: '/channels/[id]',
  query: { ...params, id },
});
