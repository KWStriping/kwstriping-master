import type { LanguageCode, Money } from '@core/api';
import { useChannel } from '@core/auth/storage';
import { useCheckout } from '@core/checkout/providers/CheckoutProvider';
import type { Channel } from '@core/utils/regions';
import { CHANNELS, DEFAULT_CHANNEL } from '@core/utils/regions';
import { createContext, useContext } from 'react';
import type { ReactNode, Context } from 'react';
import { formatAsMoney } from '@core/ui/utils/money';
import { useLocale } from '../hooks/useLocale';

export interface LocalizationConsumerProps {
  channels: Channel[];
  defaultChannel: Channel;
  currentChannel: Channel;
  locale: string;
  query: {
    channel: string;
    languageCode: LanguageCode;
  };
  setCurrentChannel: (slug: string) => Promise<void>;
  formatPrice: (price?: Pick<Money, 'currency' | 'amount'>) => string;
}

export const LocalizationContext: Context<LocalizationConsumerProps> =
  createContext<LocalizationConsumerProps>({} as LocalizationConsumerProps);

export interface LocalizationProviderProps {
  children: ReactNode;
}

export function LocalizationProvider({ children }: { children: ReactNode }) {
  const { locale, languageCode } = useLocale();
  const { resetCheckoutId } = useCheckout();
  const [currentChannelSlug, setCurrentChannelSlug] = useChannel();

  const setCurrentChannel = async (channel: string) => {
    console.log('-----> setCurrentChannel', channel);
    resetCheckoutId();
    setCurrentChannelSlug(channel);
    // await apolloClient.resetStore(); // TODO
  };

  const currentChannel =
    CHANNELS.find(({ slug }) => slug === currentChannelSlug) || DEFAULT_CHANNEL;

  const formatPrice = (price?: Pick<Money, 'currency' | 'amount'>) =>
    formatAsMoney(price?.amount || 0, price?.currency || currentChannel.currencyCode, locale);

  return (
    <LocalizationContext.Provider
      value={{
        locale,
        channels: CHANNELS,
        defaultChannel: DEFAULT_CHANNEL,
        currentChannel,
        setCurrentChannel,
        query: {
          channel: currentChannel.slug,
          languageCode,
        },
        formatPrice,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
}

export const useLocalization = () => useContext(LocalizationContext);

export default LocalizationProvider;
