import type { CheckIfOrderExistsQuery, CheckIfOrderExistsQueryVariables } from '@tempo/api/generated/graphql';
import type { UseQueryResponse } from '@tempo/api/hooks';
import { useQuery } from '@tempo/api/hooks';
import { useState } from 'react';
import { CheckIfOrderExistsDocument } from '@tempo/api/generated/graphql';
import type { CheckIfOrderExistsQuery } from '@tempo/api/generated/graphql';
import useDebounce from '@tempo/dashboard/hooks/useDebounce';

type CheckIfOrderExistsQueryHookResult = UseQueryResponse<
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
