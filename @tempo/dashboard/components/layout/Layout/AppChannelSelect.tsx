import type { FC } from 'react';
import type { ChannelFragment } from '@tempo/api/generated/graphql';
import SingleSelectField from '@tempo/dashboard/components/fields/SingleSelectField';
import type { ChannelProps } from '@tempo/dashboard/oldSrc/types';
import { mapNodeToChoice } from '@tempo/dashboard/oldSrc/utils/maps';

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
