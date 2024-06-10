import { filter } from 'fuzzaldrin';
import { useState } from 'react';
import type { ChannelDetailsFragment } from '@tempo/api/generated/graphql';
import type { FetchMoreProps, Search, SearchProps } from '@tempo/dashboard/oldSrc/types';

export const useChannelsSearch = function <T extends { name: string }>(channels: T[]) {
  const [query, onQueryChange] = useState('');
  const filteredChannels = filter<T, 'name'>(channels, query, { key: 'name' }) || [];

  return { query, onQueryChange, filteredChannels };
};

export interface ChannelsWithLoadMoreProps extends FetchMoreProps, Search, SearchProps {
  channels: ChannelDetailsFragment[];
}
