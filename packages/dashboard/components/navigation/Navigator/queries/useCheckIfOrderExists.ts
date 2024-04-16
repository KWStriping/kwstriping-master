import type { UseQueryResult } from '@core/urql/hooks';
import { useQuery } from '@core/urql/hooks';
import { useState } from 'react';
import { CheckIfOrderExistsDocument } from '@core/api/graphql';
import type { CheckIfOrderExistsQuery } from '@core/api/graphql';
import useDebounce from '@dashboard/hooks/useDebounce';

type CheckIfOrderExistsQueryHookResult = UseQueryResult<
  CheckIfOrderExistsQuery,
  { id: string }
>[0];

function useCheckIfOrderExists(): [CheckIfOrderExistsQueryHookResult, (query: string) => void] {
  const [id, setId] = useState('');
  const setIdDebounced = useDebounce(setId);
  const [result] = useQuery(CheckIfOrderExistsDocument, {
    pause: id === '',
    variables: {
      id,
    },
  });

  return [result, setIdDebounced];
}
export default useCheckIfOrderExists;
