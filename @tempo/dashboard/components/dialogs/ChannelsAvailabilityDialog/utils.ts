import { filter } from 'fuzzaldrin';
import { useState } from 'react';

export const useChannelsSearch = function <T extends { name: string }>(channels: T[]) {
  const [query, onQueryChange] = useState('');
  const filteredChannels = filter<T, 'name'>(channels, query, { key: 'name' });

  return { query, onQueryChange, filteredChannels };
};
