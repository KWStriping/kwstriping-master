import { useQuery } from '@core/urql/hooks';
import { PageCountDocument } from '@core/api/graphql';
import type { PageCountQueryVariables } from '@core/api/graphql';
import { pageListUrl } from '@dashboard/oldSrc/pages/urls';
import type {
  PageKlassListUrlQueryParams,
  PageKlassUrlQueryParams,
} from '@dashboard/oldSrc/pageKlasses/urls';
import { useMemo } from 'react';

import * as messages from './messages';
import type { UseTypeDeleteData, UseTypeDeleteProps } from './types';

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
