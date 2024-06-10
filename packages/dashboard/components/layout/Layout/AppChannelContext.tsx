import { useUser } from '@core/auth/react/hooks';
import { useChannel } from '@core/auth/storage';
import { useAuthorizedQuery } from '@core/urql/hooks';
import type { ChannelFragment } from '@core/api/graphql';
import { BaseChannelsDocument } from '@core/api/graphql';
import type { FC, ReactNode } from 'react';
import { useEffect, useContext, createContext, useState } from 'react';

interface UseAppChannel {
  availableChannels: ChannelFragment[];
  channel: ChannelFragment | null | undefined;
  isPickerActive: boolean;
  refreshChannels: () => void;
  setChannel: (id: string) => void;
}
export interface AppChannelContextData extends UseAppChannel {
  setPickerActive: (isActive: boolean) => void;
}

const AppChannelContext = createContext<AppChannelContextData>({
  availableChannels: [],
  channel: undefined,
  isPickerActive: false,
  refreshChannels: () => undefined,
  setChannel: () => undefined,
  setPickerActive: () => undefined,
});

const isValidChannel = (channelSlug: string, channelList?: ChannelFragment[]) => {
  if (!channelSlug) return false;
  return channelList?.some((channel) => channel.slug === channelSlug);
};

export const AppChannelProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedChannelSlug, setSelectedChannelSlug] = useChannel();
  const { authenticated } = useUser();
  const [{ data: channelData }, refetch] = useAuthorizedQuery(BaseChannelsDocument, {
    pause: !authenticated,
  });

  const [isPickerActive, setPickerActive] = useState(false);
  useEffect(() => {
    if (!channelData?.channels?.[0]) return;
    if (!isValidChannel(selectedChannelSlug, channelData.channels)) {
      setSelectedChannelSlug(channelData.channels[0].slug);
    }
  }, [channelData, selectedChannelSlug, setSelectedChannelSlug]);

  const availableChannels = channelData?.channels || [];

  const channel =
    (channelData && availableChannels.find(({ slug }) => slug === selectedChannelSlug)) || null;

  return (
    <AppChannelContext.Provider
      value={{
        channel,
        availableChannels,
        isPickerActive,
        refreshChannels: refetch,
        setChannel: setSelectedChannelSlug,
        setPickerActive,
      }}
    >
      {children}
    </AppChannelContext.Provider>
  );
};

AppChannelProvider.displayName = 'AppChannelProvider';

function useAppChannel(enablePicker = true): UseAppChannel {
  const { setPickerActive, ...data } = useContext(AppChannelContext);
  useEffect(() => {
    if (enablePicker) setPickerActive(true);
    return () => setPickerActive(false);
  }, [enablePicker, setPickerActive]);
  return data;
}

export default useAppChannel;
