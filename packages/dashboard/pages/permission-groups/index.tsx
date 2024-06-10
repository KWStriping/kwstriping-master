import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { getSortQueryVariables } from '@dashboard/oldSrc/groups/GroupList/sort';
import GroupDeleteDialog from '@dashboard/components/groups/GroupDeleteDialog';
import GroupListPage from '@dashboard/components/groups/GroupListPage';
import type { GroupErrorFragment } from '@core/api/graphql';
import { GroupDeleteDocument, GroupListDocument } from '@core/api/graphql';

import useListSettings from '@dashboard/hooks/useListSettings';
import { usePaginationReset } from '@dashboard/hooks/usePaginationReset';
import usePaginator, {
  createPaginationState,
  PaginatorContext,
} from '@dashboard/hooks/usePaginator';
import { getStringOrPlaceholder } from '@dashboard/oldSrc/misc';
import type { GroupListUrlDialog, GroupListUrlQueryParams } from '@dashboard/oldSrc/groups/urls';
import { groupListUrl } from '@dashboard/oldSrc/groups/urls';
import { ListViews } from '@dashboard/oldSrc/types';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import useSortHandler from '@dashboard/oldSrc/utils/handlers/sortHandler';
import { getSortParams } from '@dashboard/oldSrc/utils/sort';

interface GroupListProps {
  params: GroupListUrlQueryParams;
}

export const GroupList = () => {
  const router = useRouter();
  const params = router.query;
  const notify = useNotifier();
  const { t } = useTranslation();
  const { updateListSettings, settings } = useListSettings(ListViews.StaffMembersList);

  usePaginationReset(groupListUrl, params, settings.rowNumber);

  const paginationState = createPaginationState(settings.rowNumber, params);
  const queryVariables = useMemo(
    () => ({
      ...paginationState,
      sort: getSortQueryVariables(params),
    }),
    [params, settings.rowNumber] // eslint-disable-line react-hooks/exhaustive-deps
  );
  const [{ data, fetching: loading }, refetch] = useQuery(GroupListDocument, {
    displayLoader: true,
    variables: queryVariables,
  });

  const paginationValues = usePaginator({
    pageInfo: data?.groups?.pageInfo,
    paginationState,
    queryString: params,
  });

  const handleSort = useSortHandler(groupListUrl);

  const [openModal, closeModal] = useDialogActionHandlers<
    GroupListUrlDialog,
    GroupListUrlQueryParams
  >(groupListUrl);

  const groups = mapEdgesToItems(data?.groups);
  const [deleteError, setDeleteError] = useState<GroupErrorFragment>();

  const [deleteGroup] = useMutation(GroupDeleteDocument, {
    onCompleted: (data) => {
      if (data?.deleteGroup?.errors?.length === 0) {
        notify(t('dashboard.ovGIa', 'Permission Group Deleted'), {
          type: 'success',
        });
        refetch();
        setDeleteError(undefined);
        closeModal();
      } else {
        setDeleteError(data?.deleteGroup?.errors[0]);
      }
    },
  });

  return (
    <PaginatorContext.Provider value={paginationValues}>
      <GroupListPage
        disabled={loading}
        settings={settings}
        sort={getSortParams(params)}
        groups={groups}
        onDelete={(id) => openModal('remove', { id })}
        onUpdateListSettings={updateListSettings}
        onSort={handleSort}
      />
      <GroupDeleteDialog
        onConfirm={() =>
          deleteGroup({
            id: params.id,
          })
        }
        error={deleteError}
        name={getStringOrPlaceholder(groups?.find((group) => group.id === params.id)?.name)}
        confirmButtonState={'default'}
        open={params.action === 'remove'}
        onClose={closeModal}
      />
    </PaginatorContext.Provider>
  );
};

export default GroupList;
