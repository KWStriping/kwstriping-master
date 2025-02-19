import type { PermissionCode } from '@tempo/api/generated/graphql';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { Fragment } from 'react';

import ChannelAvailabilityItemContent from './Channel/ChannelAvailabilityItemContent';
import ChannelAvailabilityItemWrapper from './Channel/ChannelAvailabilityItemWrapper';
import type { ChannelsAvailabilityWrapperProps } from './ChannelsAvailabilityCardWrapper';
import ChannelsAvailabilityCardWrapper from './ChannelsAvailabilityCardWrapper';
import styles from './index.module.css';
import type { ChannelOpts, ChannelsAvailabilityError, Messages } from './types';
import { getChannelsAvailabilityMessages } from './utils';
import type { Channel as ChannelList, ChannelData } from '@tempo/dashboard/oldSrc/channels/utils';
import useDateLocalize from '@tempo/dashboard/hooks/useDateLocalize';

export interface ChannelsAvailability
  extends Omit<ChannelsAvailabilityWrapperProps, 'children' | 'selectedChannelsCount'> {
  channels: Maybe<ChannelData[]>;
  /** Channels that have no settings */
  channelsList: Maybe<ChannelList[]>;
  errors?: ChannelsAvailabilityError[];
  disabled?: boolean;
  messages?: Messages;
  managePermissions: PermissionCode[];
  onChange?: (id: string, data: ChannelOpts) => void;
}

export type ChannelsAvailabilityCardProps = RequireOnlyOne<
  ChannelsAvailability,
  'channels' | 'channelsList'
>;

export const ChannelsAvailabilityCard: FC<ChannelsAvailabilityCardProps> = ({
  channelsList,
  errors = [],
  allChannelsCount = 0,
  channels,
  messages,
  managePermissions,
  onChange,
  openModal,
}) => {
  const localizeDate = useDateLocalize();

  const channelsMessages = getChannelsAvailabilityMessages({
    messages,
    channels: channels ?? [],
    t,
    localizeDate,
  });

  return (
    <ChannelsAvailabilityCardWrapper
      selectedChannelsCount={(channels ?? channelsList)?.length ?? 0}
      allChannelsCount={allChannelsCount}
      managePermissions={managePermissions}
      openModal={openModal}
    >
      {channels
        ? channels.map((data) => {
            const channelErrors =
              errors?.filter((error) => error.channels?.includes(data?.id)) || [];

            return (
              <ChannelAvailabilityItemWrapper messages={messages} data={data} key={data?.id}>
                <ChannelAvailabilityItemContent
                  data={data}
                  onChange={onChange}
                  messages={channelsMessages[data?.id]}
                  errors={channelErrors}
                />
              </ChannelAvailabilityItemWrapper>
            );
          })
        : channelsList
          ? channelsList.map((data) => (
              <Fragment key={data?.id}>
                <Box className={styles.channelItem ?? ''}>
                  <div className={styles.channelName ?? ''}>
                    <Typography>{data?.name}</Typography>
                  </div>
                </Box>
                <Divider className={styles.hr ?? ''} />
              </Fragment>
            ))
          : null}
    </ChannelsAvailabilityCardWrapper>
  );
};

export default ChannelsAvailabilityCard;
