import { useUser } from '@core/auth/react/hooks';
import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useShopSettings } from '@core/ui/hooks/useShopSettings';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { extractMutationErrors } from '@core/urql/utils';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import { useRouter } from 'next/router';
import AssignMembersDialog from '@dashboard/components/groups/AssignMembersDialog';
import MembersErrorDialog from '@dashboard/components/groups/MembersErrorDialog';
import type { GroupDetailsPageFormData } from '@dashboard/components/groups/GroupDetailsPage';
import GroupDetailsPage from '@dashboard/components/groups/GroupDetailsPage';
import UnassignMembersDialog from '@dashboard/components/groups/UnassignMembersDialog';

import { GroupDetailsDocument } from '@core/api/graphql';
import useBulkActions from '@dashboard/hooks/useBulkActions';
import useStateFromProps from '@dashboard/hooks/useStateFromProps';
import { DEFAULT_INITIAL_SEARCH_DATA } from '@dashboard/oldSrc/config';
import type {
  GroupDetailsUrlDialog,
  GroupDetailsUrlQueryParams,
} from '@dashboard/oldSrc/groups/urls';
import { groupDetailsUrl } from '@dashboard/oldSrc/groups/urls';
import {
  arePermissionsExceeded,
  permissionsDiff,
  usersDiff,
} from '@dashboard/oldSrc/groups/utils';
import useStaffMemberSearch from '@dashboard/oldSrc/searches/useStaffMemberSearch';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import useSortHandler from '@dashboard/oldSrc/utils/handlers/sortHandler';
import { getSortParams } from '@dashboard/oldSrc/utils/sort';

interface GroupDetailsProps {
  id: string;
  params: GroupDetailsUrlQueryParams;
}

export const GroupDetails = () => {
  const router = useRouter();
  const { id, ...params } = router.query;
  const shop = useShopSettings();
  const notify = useNotifier();
  const { t } = useTranslation();
  const user = useUser();

  const [{ data, fetching: loading }, refetch] = useQuery(GroupDetailsDocument, {
    displayLoader: true,
    variables: { id, userId: user?.user.id },
  });

  const [membersList, setMembersList] = useStateFromProps(data?.group.users);

  const {
    search,
    result: searchResult,
    loadMore,
  } = useStaffMemberSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA,
  });

  const { isSelected, listElements, toggle, toggleAll } = useBulkActions(params.ids);

  const [updateGroup, updateGroupResult] = useMutation(GroupUpdateDocument, {
    onCompleted: (data) => {
      if (data?.updateGroup?.errors?.length === 0) {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
        refetch();
        closeModal();
      } else if (data?.updateGroup?.errors?.some((e) => e.field === 'removeUsers')) {
        openModal('unassignError');
      }
    },
  });

  const [openModal, closeModal] = useDialogActionHandlers<
    GroupDetailsUrlDialog,
    GroupDetailsUrlQueryParams
  >((params) => groupDetailsUrl(id, params), params);

  const handleSort = useSortHandler(router, (params) => groupDetailsUrl(id, params), params);

  const unassignMembers = () => {
    setMembersList(membersList?.filter((m) => !listElements.includes(m.id)));
    closeModal();
  };

  const isGroupEditable = (data?.user.editableGroups || []).filter((g) => g.id === id).length > 0;

  const lastSourcesOfPermission = (data?.user.userPermissions || [])
    .filter((perm) => perm.sourceGroups.length === 1 && perm.sourceGroups[0].id === id)
    .map((perm) => perm.code);

  const userPermissions = user?.user.userPermissions.map((p) => p.code) || [];

  const permissions = (shop?.permissions || []).map((perm) => ({
    ...perm,
    disabled: !userPermissions.includes(perm.code),
    lastSource: lastSourcesOfPermission.includes(perm.code),
  }));

  const permissionsExceeded = arePermissionsExceeded(data?.group, user.user);
  const disabled = loading || !isGroupEditable || permissionsExceeded;

  const handleSubmit = async (formData: GroupDetailsPageFormData) =>
    extractMutationErrors(
      updateGroup({
        id,
        input: {
          name: formData.name,
          ...permissionsDiff(data?.group, formData),
          ...usersDiff(data?.group, formData),
        },
      })
    );

  return (
    <>
      <GroupDetailsPage
        group={data?.group}
        permissionsExceeded={permissionsExceeded}
        members={membersList || []}
        onAssign={() => openModal('assign')}
        onUnassign={(ids) => openModal('unassign', { ids })}
        errors={updateGroupResult?.data?.updateGroup?.errors || []}
        onSubmit={handleSubmit}
        permissions={permissions}
        saveButtonBarState={updateGroupResult.status}
        disabled={disabled}
        toggle={toggle}
        toggleAll={toggleAll}
        isChecked={isSelected}
        selected={listElements.length}
        sort={getSortParams(params)}
        toolbar={
          <Button color="secondary" onClick={() => openModal('unassign', { ids: listElements })}>
            {/* button title */}

            {t('dashboard.5PiOX', 'Unassign')}
          </Button>
        }
        onSort={handleSort}
      />
      <AssignMembersDialog
        loading={searchResult.fetching}
        staffMembers={mapEdgesToItems(searchResult?.data?.search)}
        onSearchChange={search}
        onFetchMore={loadMore}
        disabled={disabled}
        hasMore={!!searchResult?.data?.search?.pageInfo.hasNextPage}
        initialSearch=""
        confirmButtonState={updateGroupResult.status}
        open={params.action === 'assign'}
        onClose={closeModal}
        onSubmit={(formData) => {
          setMembersList([
            ...membersList,
            ...formData.filter((member) => !membersList.includes(member)),
          ]);
          closeModal();
        }}
      />
      <UnassignMembersDialog
        onConfirm={unassignMembers}
        confirmButtonState={updateGroupResult.status}
        quantity={listElements.length}
        open={params.action === 'unassign'}
        onClose={closeModal}
      />
      <MembersErrorDialog
        onConfirm={closeModal}
        confirmButtonState={updateGroupResult.status}
        open={params.action === 'unassignError'}
        onClose={closeModal}
      />
    </>
  );
};

export default GroupDetails;
