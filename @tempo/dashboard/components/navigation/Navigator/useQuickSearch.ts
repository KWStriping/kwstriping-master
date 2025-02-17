import { useSearch, useMutation } from '@tempo/api/hooks';
import { gql } from '@tempo/api/gql';
import {
  OrderDraftCreateDocument,
  SearchCatalogDocument,
  SearchCustomersDocument,
} from '@tempo/api/generated/graphql';
import { mapEdgesToItems } from '@tempo/ui/utils/maps';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

import getModeActions from './modes';
import { getGqlOrderId, isQueryValidOrderNumber } from './modes/orders';
import { getMode } from './modes/utils';
import useCheckIfOrderExists from './queries/useCheckIfOrderExists';
import type { QuickSearchAction, QuickSearchMode } from './types';
import { orderUrl } from '@tempo/dashboard/oldSrc/orders/urls';
import { DEFAULT_INITIAL_SEARCH_DATA } from '@tempo/dashboard/oldSrc/config';
import useModalDialogOpen from '@tempo/dashboard/hooks/useModalDialogOpen';
import type { ChangeEvent, FormChange } from '@tempo/dashboard/hooks/useForm';

export const searchCustomers = gql(`
  query SearchCustomers($after: String, $first: Int!, $query: String!) {
    search: customers(
      after: $after
      first: $first
      filters: { search: $query }
    ) {
      edges {
        node {
          id
          email
          firstName
          lastName
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`);

type UseQuickSearch = [string, QuickSearchMode, FormChange, QuickSearchAction[]];
function useQuickSearch(open: boolean, input: RefObject<HTMLInputElement>): UseQuickSearch {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<QuickSearchMode>('default');
  const router = useRouter();
  const [{ data: orderData }, getOrderData] = useCheckIfOrderExists();
  const { result: customers, search: searchCustomers } = useSearch(SearchCustomersDocument, {
    variables: {
      ...DEFAULT_INITIAL_SEARCH_DATA,
      first: 5,
    },
    pause: !query,
  });
  const { result: catalog, search: searchCatalog } = useSearch(SearchCatalogDocument, {
    variables: {
      ...DEFAULT_INITIAL_SEARCH_DATA,
      first: 5,
    },
    pause: !query,
  });
  const [createOrder] = useMutation(OrderDraftCreateDocument, {
    onCompleted: (result) => {
      if (!result.createDraftOrder?.order?.id) return;
      if (result.createDraftOrder?.errors?.length === 0) {
        void router.push(orderUrl(result.createDraftOrder.order.id));
      }
    },
  });

  useModalDialogOpen(open, {
    onClose: () => {
      setMode('default');
      setQuery('');
    },
  });

  const handleBack = (event: KeyboardEvent) => {
    // `any` type because of poorly typed `KeyboardEvent.EventTarget` which
    // has no `value` key. Which it would have if `KeyboardEvent` and
    // `EventTarget` would be generic types accepting HTMLDOM element types.
    if ((event.target as unknown).value === '' && event.keyCode === 8) {
      setMode('default');
    }
  };

  useEffect(() => {
    setQuery('');

    const inputInstance = input.current;

    if (mode !== 'default' && input.current) {
      inputInstance?.addEventListener('keyup', handleBack);

      return () => {
        if (inputInstance) {
          inputInstance.removeEventListener('keyup', handleBack);
        }
      };
    }
  }, [mode, open]);

  const change = (event: ChangeEvent) => {
    const value = event.target.value;

    if (mode === 'default' || mode === 'help') {
      const newMode = getMode(value);
      if (newMode) {
        setMode(newMode);
      }
    }
    if (mode === 'orders' && isQueryValidOrderNumber(value)) {
      getOrderData(getGqlOrderId(value));
    }
    if (mode === 'catalog') {
      searchCatalog(value);
    }
    if (mode === 'customers') {
      searchCustomers(value);
    }

    setQuery(value);
  };

  return [
    query,
    mode,
    change,
    getModeActions(
      mode,
      query,
      t,
      {
        catalog,
        customers: mapEdgesToItems(customers?.data?.search) || [],
        order: orderData?.order,
      },
      {
        createOrder,
        router,
        setMode,
      }
    ),
  ];
}

export default useQuickSearch;
