import { useQuery } from '@tempo/api/hooks';
import { PageCountDocument } from '@tempo/api/generated/graphql';
import type { PageCountQueryVariables } from '@tempo/api/generated/graphql';
import { useMemo } from 'react';

import * as messages from './messages';
import type { UseTypeDeleteData, UseTypeDeleteProps } from './types';
import type {
  PageKlassListUrlQueryParams,
  PageKlassUrlQueryParams,
} from '@tempo/dashboard/oldSrc/pageKlasses/urls';
import { pageListUrl } from '@tempo/dashboard/oldSrc/pages/urls';

type UsePageKlassDeleteProps<T = PageKlassListUrlQueryParams | PageKlassUrlQueryParams> =
  UseTypeDeleteProps<T>;

function usePageKlassDelete({
  singleId,
  params,
  selectedTypes,
}: UsePageKlassDeleteProps): UseTypeDeleteData {
  const pageKlasses = selectedTypes || [singleId];

  const isDeleteDialogOpen = params.action === 'remove';

  const pagesAssignedToSelectedTypesQueryVars = useMemo<PageCountQueryVariables>(
    () => ({
      filter: {
        pageKlasses,
      },
    }),
    [pageKlasses]
  );

  const shouldSkipPageListQuery = !pageKlasses.length || !isDeleteDialogOpen;

  const { data: pagesAssignedToSelectedTypesData, loading: loadingPagesAssignedToSelectedTypes } =
    useQuery(PageCountDocument, {
      variables: pagesAssignedToSelectedTypesQueryVars,
      pause: shouldSkipPageListQuery,
    });

  const selectedPagesAssignedToDeleteUrl = pageListUrl({
    pageKlasses,
  });

  const assignedItemsCount = pagesAssignedToSelectedTypesData?.pages?.totalCount;

  return {
    ...messages,
    isOpen: isDeleteDialogOpen,
    assignedItemsCount,
    viewAssignedItemsUrl: selectedPagesAssignedToDeleteUrl,
    isLoading: loadingPagesAssignedToSelectedTypes,
    typesToDelete: pageKlasses,
  };
}

export default usePageKlassDelete;
