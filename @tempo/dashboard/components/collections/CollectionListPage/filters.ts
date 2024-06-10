import * as m from '@paraglide/messages';
import type { IFilter } from '@tempo/dashboard/components/core/Filter';
import type { MultiAutocompleteChoiceType } from '@tempo/dashboard/components/fields/MultiAutocompleteSelectField';
import { CollectionPublished } from '@tempo/api/generated/constants';
import type { FilterOpts } from '@tempo/dashboard/oldSrc/types';
import { createOptionsField } from '@tempo/dashboard/oldSrc/utils/filters/fields';

export interface CollectionListFilterOpts {
  status: FilterOpts<CollectionPublished>;
  channel: FilterOpts<string> & { choices: MultiAutocompleteChoiceType[] };
}

export enum CollectionFilterKeys {
  status = 'status',
  channel = 'channel',
}

const messages = {
  hidden: {
    id: '9eC0MZ',
    defaultMessage: 'Hidden',
    description: 'collection',
  },
  published: {
    id: 'lL3YJO',
    defaultMessage: 'Published',
    description: 'collection',
  },
};

export function useFilterStructure(
  opts: CollectionListFilterOpts
): IFilter<CollectionFilterKeys> {
  return [
    {
      ...createOptionsField(
        CollectionFilterKeys.status,
        (m.dashboard_status() ?? 'Status'),
        [opts.status.value],
        false,
        [
          {
            label: (m.dashboard_published() ?? 'Published'),
            value: CollectionPublished.Published,
          },
          {
            label: (m.dashboard_hidden() ?? 'Hidden'),
            value: CollectionPublished.Hidden,
          },
        ]
      ),
      active: opts.status.active,
      dependencies: [CollectionFilterKeys.channel],
    },
    {
      ...createOptionsField(
        CollectionFilterKeys.channel,
        (m.dashboard_channel() ?? 'Channel'),
        [opts.channel?.value],
        false,
        opts.channel?.choices
      ),
      active: opts.channel?.active,
    },
  ];
}
