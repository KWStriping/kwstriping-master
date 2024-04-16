import { useTranslation } from '@core/i18n';
import Pill from '@core/ui/components/pill/Pill';
import Card from '@mui/material/Card';
import Popper from '@mui/material/Popper';
import { useMemo, useRef, useState } from 'react';
import type { FC } from 'react';

import ChannelsAvailabilityMenuContent from '../ChannelsAvailabilityMenuContent';
import type { CollectionChannels } from './utils';
import { getDropdownColor, mapChannelsToPills } from './utils';

export interface ChannelsAvailabilityDropdownProps {
  channels: CollectionChannels[] | null;
}

export const ChannelsAvailabilityDropdown: FC<ChannelsAvailabilityDropdownProps> = ({
  channels,
}) => {
  const { t } = useTranslation();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const anchor = useRef<HTMLDivElement | null>(null);

  const dropdownColor = useMemo(() => getDropdownColor(channels ?? []), [channels]);

  if (!channels?.length) {
    return <Pill label={t('dashboard.oChannels', 'No channels')} color="error" />;
  }

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      ref={anchor}
      onMouseOver={() => setPopupOpen(true)}
      onFocus={() => setPopupOpen(true)}
      onMouseLeave={() => setPopupOpen(false)}
    >
      <div aria-controls="availability-menu" aria-haspopup="true" role="button">
        <Pill
          label={t(
            'dashboard.dropdownLabel',
            channels.length === 1 ? '1 Channel' : '{{count}} Channels',
            {
              count: channels.length,
            }
          )}
          color={dropdownColor}
          outlined
        />
      </div>
      <Popper anchorEl={anchor.current} open={isPopupOpen} placement={'left'}>
        <Card elevation={8}>
          <ChannelsAvailabilityMenuContent pills={mapChannelsToPills(channels)} />
        </Card>
      </Popper>
    </div>
  );
};
ChannelsAvailabilityDropdown.displayName = 'ChannelsAvailabilityDropdown';
export default ChannelsAvailabilityDropdown;
