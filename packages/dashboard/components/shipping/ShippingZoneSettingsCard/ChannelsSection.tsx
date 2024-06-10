import { useTranslation } from '@core/i18n';
import CardSpacer from '@dashboard/components/core/CardSpacer';
import type { MultiAutocompleteChoiceType } from '@dashboard/components/fields/MultiAutocompleteSelectField';
import MultiAutocompleteSelectField from '@dashboard/components/fields/MultiAutocompleteSelectField';
import type { ChannelFragment } from '@core/api/graphql';
import { useChannelsSearch } from '@dashboard/hooks/useChannelsSearch';
import type { FormChange } from '@dashboard/hooks/useForm';
import { mapNodeToChoice } from '@dashboard/oldSrc/utils/maps';
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

  const { t } = useTranslation();

  return (
    <>
      {t(
        'dashboard.subtitle',
        'Assign channels to this shipping zone so we know which orders will be supported'
      )}
      <CardSpacer />
      <MultiAutocompleteSelectField
        choices={mapNodeToChoice(filteredChannels)}
        displayValues={channelsDisplayValues}
        fetchChoices={onQueryChange}
        hasMore={false}
        label={t('dashboard.selectFieldLabel', 'Channel')}
        loading={false}
        name="channels"
        onChange={onChange}
        placeholder={t('dashboard.selectFieldPlaceholder', 'Add Channel')}
        value={selectedChannels}
        testId="channels"
      />
    </>
  );
};

export default ChannelsSection;
