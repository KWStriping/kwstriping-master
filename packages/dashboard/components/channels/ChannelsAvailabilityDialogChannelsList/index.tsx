import { ControlledCheckbox } from '@dashboard/components/forms/ControlledCheckbox';
import type { ChannelFragment } from '@core/api/graphql';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import styles from './index.module.css';

type PartialChannel = Pick<ChannelFragment, 'id' | 'name'>;

export interface ChannelsAvailabilityContentProps<TChannel extends PartialChannel> {
  isChannelSelected: (channel: TChannel) => boolean;
  channels: TChannel[];
  onChange: (option: TChannel) => void;
}

function ChannelsAvailabilityContent<TChannel extends { id: string; name: string }>({
  isChannelSelected,
  channels,
  onChange,
}: ChannelsAvailabilityContentProps<TChannel>) {
  return (
    <>
      {channels.map((option) => (
        <div key={option.id} className={styles.option ?? ''} data-test-id="channel-row">
          <ControlledCheckbox
            checked={isChannelSelected(option)}
            name={option.name}
            label={<Typography className={styles.label ?? ''}>{option.name}</Typography>}
            onChange={() => onChange(option)}
          />
          <Divider />
        </div>
      ))}
    </>
  );
}

export default ChannelsAvailabilityContent;
