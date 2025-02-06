import useNotifier from '@tempo/ui/hooks/useNotifier';
import { useQuery } from '@tempo/api/hooks';
import type { GiftCardListQuery, GiftCardListQueryVariables } from '@tempo/api/generated/graphql';
import { GiftCardListDocument } from '@tempo/api/generated/graphql';
import type { UseBulkActionsProps } from '@tempo/dashboard/hooks/useBulkActions';
import useBulkActions from '@tempo/dashboard/hooks/useBulkActions';
import type { UseListSettings } from '@tempo/dashboard/hooks/useListSettings';
import useListSettings from '@tempo/dashboard/hooks/useListSettings';
import { usePaginationReset } from '@tempo/dashboard/hooks/usePaginationReset';
import type { PageInfo, PaginationState } from '@tempo/dashboard/hooks/usePaginator';
import { createPaginationState } from '@tempo/dashboard/hooks/usePaginator';
import type { ExtendedGiftCard } from '@tempo/dashboard/oldSrc/giftCards/GiftCardUpdate/providers/GiftCardDetailsProvider/types';
import { getExtendedGiftCard } from '@tempo/dashboard/oldSrc/giftCards/GiftCardUpdate/providers/GiftCardDetailsProvider/utils';
import { giftCardListUrl } from '@tempo/dashboard/oldSrc/giftCards/urls';
import type { SortPage } from '@tempo/dashboard/oldSrc/types';
import { ListViews } from '@tempo/dashboard/oldSrc/types';
import useSortHandler from '@tempo/dashboard/oldSrc/utils/handlers/sortHandler';
import { mapEdgesToItems } from '@tempo/ui/utils/maps';
import { getSortParams } from '@tempo/dashboard/oldSrc/utils/sort';
import type { ApolloError } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useMemo, createContext, useContext } from 'react';
import type { FC, ReactNode } from 'react';

import { getFilterVariables } from '../../GiftCardListSearchAndFilters/filters';
import type {
  GiftCardListColummns,
  GiftCardListUrlQueryParams,
  GiftCardUrlOrdering,
} from '../../types';
import { getSortQueryVariables } from './sort';

const numberOfColumns = 7;

interface GiftCardsListProviderProps {
  children: ReactNode;
  params: GiftCardListUrlQueryParams;
}

export interface GiftCardsListConsumerProps
  extends UseBulkActionsProps,
    UseListSettings<GiftCardListColummns>,
    SortPage<GiftCardUrlOrdering> {
  giftCards: Array<ExtendedGiftCard<GiftCardListQuery['giftCards']['edges'][0]['node']>>;
  pageInfo: PageInfo;
  loading: boolean;
  params: GiftCardListUrlQueryParams;
  paginationState: PaginationState;
  numberOfColumns: number;
  totalCount: number;
  selectedItemsCount: number;
}

export const GiftCardsListContext = createContext<GiftCardsListConsumerProps>(null);

export const useGiftCardList = () => useContext(GiftCardsListContext);

export const GiftCardsListProvider: FC<GiftCardsListProviderProps> = ({ children, params }) => {
  const router = useRouter();
  const notify = useNotifier();

  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions([]);

  const { updateListSettings, settings } = useListSettings<GiftCardListColummns>(
    ListViews.GiftCardList
  );

  usePaginationReset(giftCardListUrl, params, settings.rowNumber);

  const paginationState = createPaginationState(settings.rowNumber, params);

  const handleSort = useSortHandler(giftCardListUrl, params);

  const queryVariables = useMemo<GiftCardListQueryVariables>(
    () => ({
      ...paginationState,
      filter: getFilterVariables(params),
      sort: getSortQueryVariables(params),
    }),
    [params, paginationState]
  );

  const handleGiftCardListError = (error: ApolloError) => {
    const { message } = error?.graphQLErrors[0];

    if (message) {
      notify({
        type: 'error',
        text: message,
      });
    }
  };

  const { data, loading } = useQuery(GiftCardListDocument, {
    displayLoader: true,
    variables: queryVariables,
    handleError: handleGiftCardListError,
  });

  const giftCards = mapEdgesToItems(data?.giftCards)?.map(getExtendedGiftCard);

  const providerValues: GiftCardsListConsumerProps = {
    onSort: handleSort,
    sort: getSortParams(params),
    giftCards,
    totalCount: data?.giftCards?.totalCount || 0,
    loading,
    isSelected,
    listElements,
    reset,
    toggleAll,
    toggle,
    selectedItemsCount: listElements.length,
    pageInfo: data?.giftCards?.pageInfo,
    paginationState,
    params,
    settings,
    updateListSettings,
    numberOfColumns,
  };

  return (
    <GiftCardsListContext.Provider value={providerValues}>
      {children}
    </GiftCardsListContext.Provider>
  );
};
