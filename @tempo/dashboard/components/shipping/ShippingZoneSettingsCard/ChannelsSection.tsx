import * as m from '@paraglide/messages';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
import type { MultiAutocompleteChoiceType } from '@tempo/dashboard/components/fields/MultiAutocompleteSelectField';
import MultiAutocompleteSelectField from '@tempo/dashboard/components/fields/MultiAutocompleteSelectField';
import type { ChannelFragment } from '@tempo/api/generated/graphql';
import { useChannelsSearch } from '@tempo/dashboard/hooks/useChannelsSearch';
import type { FormChange } from '@tempo/dashboard/hooks/useForm';
import { mapNodeToChoice } from '@tempo/dashboard/oldSrc/utils/maps';
import type { FC } from 'react';

const messages = {
  subtitle: {
    id: 'avj76v',
    defaultMessage:
      'Assign channels to this shipping zone so we know which orders will be supported',
    description: 'ChannelsSection subtitle',
  },
  selectFieldLabel: {
    id: 'mLZMb6',
    defaultMessage: 'Channel',
    description: 'ChannelsSection select field label',
  },
  selectFieldPlaceholder: {
    id: 'cnvyqW',
    defaultMessage: 'Add Channel',
    description: 'ChannelsSection select field placeholder',
  },
};

interface ChannelsSectionProps {
  onChange: FormChange;
  selectedChannels: string[];
  allChannels?: Maybe<ChannelFragment[]>;
  channelsDisplayValues: MultiAutocompleteChoiceType[];
}

const ChannelsSection: FC<ChannelsSectionProps> = ({
  onChange,
  allChannels = [],
  selectedChannels,
  channelsDisplayValues,
}) => {
  const { onQueryChange, filteredChannels } = useChannelsSearch(allChannels);

  return (
    <>
      {m.dashboard_subtitle() ??
        'Assign channels to this shipping zone so we know which orders will be supported'}
      <CardSpacer />
      <MultiAutocompleteSelectField
        choices={mapNodeToChoice(filteredChannels)}
        displayValues={channelsDisplayValues}
        fetchChoices={onQueryChange}
        hasMore={false}
        label={m.dashboard_selectFieldLabel() ?? 'Channel'}
        loading={false}
        name="channels"
        onChange={onChange}
        placeholder={m.dashboard_selectFieldPlaceholder() ?? 'Add Channel'}
        value={selectedChannels}
        testId="channels"
      />
    </>
  );
};

export default ChannelsSection;
