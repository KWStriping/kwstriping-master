import { useRouter } from 'next/navigation';

import type { HorizontalAlignment } from './BaseRegionsDropdown';
import { BaseRegionsDropdown } from './BaseRegionsDropdown';
import { BaseRegionsDropdownItem } from './BaseRegionsDropdownItem';
// import { useLocalization } from '@tempo/ui/providers/LocalizationProvider';

interface DropdownOption {
  label: string;
  chosen: boolean;
  channelSlug: string;
}

export interface ChannelDropdownProps {
  horizontalAlignment?: HorizontalAlignment;
}

export function ChannelDropdown({ horizontalAlignment }: ChannelDropdownProps) {
  const router = useRouter();
  const { locale, channels, currentChannel, setCurrentChannel } = useLocalization();

  const channelOptions: DropdownOption[] = channels.map((ch) => ({
    label: ch.name,
    chosen: ch.slug === currentChannel.slug,
    channelSlug: ch.slug,
  }));

  const onChannelChange = (channelSlug: string) => {
    if (channelSlug === currentChannel.slug) return;
    setCurrentChannel(channelSlug).catch(console.error);

    // Update current URL to use the chosen channel
    void router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        channel: channelSlug,
        locale,
      },
    });
  };

  return (
    <BaseRegionsDropdown
      label={currentChannel.currencyCode}
      horizontalAlignment={horizontalAlignment}
    >
      {channelOptions.map((option) => (
        <BaseRegionsDropdownItem
          key={option.label}
          chosen={option.chosen}
          label={option.label}
          onClick={() => onChannelChange(option.channelSlug)}
        />
      ))}
    </BaseRegionsDropdown>
  );
}

export default ChannelDropdown;
