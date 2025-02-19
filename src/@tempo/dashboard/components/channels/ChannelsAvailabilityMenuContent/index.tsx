import * as m from '@paraglide/messages';
import Pill from '@tempo/ui/components/pill/Pill';
import type { PillColor } from '@dashboard/components/core/Pill';
import type { CollectionFragment } from '@tempo/api/generated/graphql';
import type { MessageDescriptor } from '@dashboard/types/messages';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import styles from './index.module.css';

export interface ChannelsAvailabilityMenuContentProps {
  pills: Pill[];
}
export interface Pill {
  channel: CollectionFragment['channelListings'][0]['channel'];
  color: PillColor;
  label: MessageDescriptor;
}

export const ChannelsAvailabilityMenuContent: FC<ChannelsAvailabilityMenuContentProps> = ({
  pills,
}) => {
  return (
    <div className={styles.menuContainer ?? ''}>
      <div className={styles.row ?? ''}>
        <Typography variant="caption" className={styles.caption ?? ''}>
          {m.dashboard_channel() ?? 'Channel'}
        </Typography>
        <Typography variant="caption" className={styles.caption ?? ''}>
          {m.dashboard_status() ?? 'Status'}
        </Typography>
      </div>
      <div>
        {pills.map((pill) => (
          <div key={pill.channel.id} className={styles.row ?? ''}>
            <Typography>{pill.channel.name}</Typography>
            <Pill label={m[pill.label]} color={pill.color} />
          </div>
        ))}
      </div>
    </div>
  );
};
ChannelsAvailabilityMenuContent.displayName = 'ChannelsAvailabilityMenuContent';
export default ChannelsAvailabilityMenuContent;
