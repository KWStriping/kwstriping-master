import type { GiftCardDetailsQuery, GiftCardDetailsQueryVariables } from '@tempo/api/generated/graphql';
import { useQuery } from '@tempo/api/hooks';
import { GiftCardDetailsDocument } from '@tempo/api/generated/graphql';
import type { GiftCardDetailsQuery } from '@tempo/api/generated/graphql';
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
  const { data, loading } = useQuery(GiftCardDetailsDocument, {
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
