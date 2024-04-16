import type { PillColor } from '@core/ui/components/pill/Pill';
import type { CollectionFragment } from '@core/api/graphql';

import type { Pill } from '../ChannelsAvailabilityMenuContent';
import { channelStatusMessages } from './messages';

export type CollectionChannels = Pick<
  NonNullable<CollectionFragment['channelListings']>[0],
  'isPublished' | 'publishedAt' | 'channel'
>;
export type Channels = Pick<NonNullable<CollectionFragment['channelListings']>[0], 'channel'>;

export const isActive = (channelData: CollectionChannels) => channelData?.isPublished;
export const isScheduled = (channelData: CollectionChannels) =>
  channelData?.publishedAt && !channelData?.isPublished;

export const getDropdownColor = (channels: CollectionChannels[]) => {
  if (channels.some(isActive)) {
    return 'success';
  }
  if (channels.some(isScheduled)) {
    return 'warning';
  }
  return 'error';
};

export const getChannelAvailabilityColor = (channelData: CollectionChannels): PillColor => {
  if (isActive(channelData)) {
    return 'success';
  }
  if (isScheduled(channelData)) {
    return 'warning';
  }
  return 'error';
};

export const getChannelAvailabilityLabel = (
  channelData: CollectionChannels
): [string, string] => {
  if (isActive(channelData)) {
    return [channelStatusMessages.published.id, channelStatusMessages.published.defaultMessage];
  }
  if (isScheduled(channelData)) {
    return [channelStatusMessages.scheduled.id, channelStatusMessages.scheduled.defaultMessage];
  }
  return [channelStatusMessages.unpublished.id, channelStatusMessages.unpublished.defaultMessage];
};

export const mapChannelsToPills = (channelData: CollectionChannels[]): Pill[] =>
  channelData.map((channel) => ({
    channel: channel.channel,
    color: getChannelAvailabilityColor(channel),
    label: getChannelAvailabilityLabel(channel),
  }));
