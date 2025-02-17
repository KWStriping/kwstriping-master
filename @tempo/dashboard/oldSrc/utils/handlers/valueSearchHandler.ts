import type { UseSearchResult } from '@tempo/api/hooks/useSearch';
import { useSearch } from '@tempo/api/hooks/useSearch';
import type { SearchValuesQuery, SearchValuesQueryVariables } from '@tempo/api/generated/graphql';
import { SearchValuesDocument } from '@tempo/api/generated/graphql';
import { useEffect, useState } from 'react';

interface ValueSearchHandlerState {
  id: string | null;
  query: string;
}

export interface UseValueSearchHandler
  extends Omit<UseSearchResult<SearchValuesQuery, SearchValuesQueryVariables>, 'search'> {
  reset: () => void;
  search: (query: string, id: string | null) => void;
}

function useValueSearchHandler(variables: SearchValuesQueryVariables): UseValueSearchHandler {
  const [state, setState] = useState<ValueSearchHandlerState>({
    id: null,
    query: variables.query,
  });

  const { loadMore, search, result } = useSearch(SearchValuesDocument, {
    variables: {
      ...variables,
      ...state,
    },
    pause: !state.id,
  });

  const handleSearch = (query: string, id: string | null) => {
    if (query !== state.query) {
      search(query);
    }
    if (id !== state.id || query !== state.query) {
      setState({
        query,
        id,
      });
    }
  };

  const reset = () => setState((prevState) => ({ ...prevState, id: null }));

  useEffect(() => {
    if (state.id) {
      search('');
    }
  }, [state.id]);

  return {
    query: state.query,
    loadMore,
    search: handleSearch,
    reset,
    result: state.id
      ? result
      : {
          ...result,
          data: undefined,
        },
  };
}

export default useValueSearchHandler;
