import { useQuery } from '@core/urql/hooks';
import { GiftCardDetailsDocument } from '@core/api/graphql';
import type { GiftCardDetailsQuery } from '@core/api/graphql';
import type { FC, ReactNode } from 'react';
import { createContext } from 'react';

import type { ExtendedGiftCard } from './types';
import { getExtendedGiftCard } from './utils';

interface GiftCardDetailsProviderProps {
  children: ReactNode;
  id: string;
}

export interface GiftCardDetailsConsumerProps {
  giftCard: ExtendedGiftCard<GiftCardDetailsQuery['giftCard']> | undefined;
  loading: boolean;
}

export const GiftCardDetailsContext = createContext<GiftCardDetailsConsumerProps>(null);

const GiftCardDetailsProvider: FC<GiftCardDetailsProviderProps> = ({ children, id }) => {
  const [{ data, fetching: loading }] = useQuery(GiftCardDetailsDocument, {
    displayLoader: true,
    variables: { id },
  });

  const providerValues: GiftCardDetailsConsumerProps = {
    giftCard: getExtendedGiftCard(data?.giftCard),
    loading,
  };

  return (
    <GiftCardDetailsContext.Provider value={providerValues}>
      {children}
    </GiftCardDetailsContext.Provider>
  );
};

export default GiftCardDetailsProvider;
