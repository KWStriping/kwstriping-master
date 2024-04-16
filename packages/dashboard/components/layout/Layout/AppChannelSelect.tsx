import type { FC } from 'react';
import SingleSelectField from '@dashboard/components/fields/SingleSelectField';
import type { ChannelFragment } from '@core/api/graphql';
import type { ChannelProps } from '@dashboard/oldSrc/types';
import { mapNodeToChoice } from '@dashboard/oldSrc/utils/maps';

export interface AppChannelSelectProps extends ChannelProps {
  channels: ChannelFragment[];
  onChannelSelect: (id: string) => void;
}

const AppChannelSelect: FC<AppChannelSelectProps> = ({
  channels,
  onChannelSelect,
  selectedChannelId,
}) => {
  return (
    <SingleSelectField
      InputProps={{
        className: 'h-[40px] pl-2',
      }}
      testId="app-channel-select"
      choices={mapNodeToChoice(channels)}
      value={selectedChannelId}
      onChange={(event) => onChannelSelect(event.target.value)}
    />
  );
};

AppChannelSelect.displayName = 'AppChannelSelect';
export default AppChannelSelect;
