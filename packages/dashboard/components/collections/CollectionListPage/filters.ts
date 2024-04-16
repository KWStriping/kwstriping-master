import { useTranslation } from '@core/i18n';
import type { IFilter } from '@dashboard/components/core/Filter';
import type { MultiAutocompleteChoiceType } from '@dashboard/components/fields/MultiAutocompleteSelectField';
import { CollectionPublished } from '@core/api/constants';
import type { FilterOpts } from '@dashboard/oldSrc/types';
import { createOptionsField } from '@dashboard/oldSrc/utils/filters/fields';

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
  const { t } = useTranslation();
  return [
    {
      ...createOptionsField(
        CollectionFilterKeys.status,
        t('dashboard.status', 'Status'),
        [opts.status.value],
        false,
        [
          {
            label: t('dashboard.published', 'Published'),
            value: CollectionPublished.Published,
          },
          {
            label: t('dashboard.hidden', 'Hidden'),
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
        t('dashboard.channel', 'Channel'),
        [opts.channel?.value],
        false,
        opts.channel?.choices
      ),
      active: opts.channel?.active,
    },
  ];
}
