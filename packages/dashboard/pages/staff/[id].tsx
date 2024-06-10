import { useUser } from '@core/auth/react/hooks';
import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useQuery } from '@core/urql/hooks';
import { useMutation } from '@core/urql/hooks/useMutation';
import DialogContentText from '@mui/material/DialogContentText';
import { useRouter } from 'next/router';
import { extractMutationErrors } from '@core/urql/utils';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import useGroupSearch from '@dashboard/oldSrc/searches/useGroupSearch';
import NotFoundPage from '@dashboard/components/core/NotFoundPage';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import StaffDetailsPage from '@dashboard/components/staff/StaffDetailsPage';
import type { StaffDetailsFormData } from '@dashboard/components/staff/StaffDetailsPage';
import StaffPasswordResetDialog from '@dashboard/components/staff/StaffPasswordResetDialog';
import {
  StaffAvatarDeleteDocument,
  StaffMemberDetailsDocument,
} from '@core/api/graphql';
import { DEFAULT_INITIAL_SEARCH_DATA } from '@dashboard/oldSrc/config';
import { getStringOrPlaceholder } from '@dashboard/oldSrc/misc';

import type { StaffMemberDetailsUrlQueryParams } from '@dashboard/oldSrc/staff/urls';
import { staffMemberDetailsUrl } from '@dashboard/oldSrc/staff/urls';
import { groupsDiff } from '@dashboard/oldSrc/staff/utils';

interface StaffDetailsProps {
  id: string;
  params: StaffMemberDetailsUrlQueryParams;
}

export const StaffDetails = () => {
  const router = useRouter();
  const { id, ...params } = router.query;
  const notify = useNotifier();
  const user = useUser();
  const { t } = useTranslation();

  const closeModal = () =>
    void router.push(
      staffMemberDetailsUrl(id, {
        ...params,
        action: undefined,
      })
    );

  const isUserSameAsViewer = user.user?.id === id;

  const [{ data, fetching: loading }, refetch] = useQuery(StaffMemberDetailsDocument, {
    variables: { id: id as string },
    pause: !id || isUserSameAsViewer,
    // displayLoader: true,
  });

  const staffMember = isUserSameAsViewer ? user.user : data?.user;

  const [changePassword, changePasswordOpts] = useMutation(ChangeStaffPasswordDocument, {
    onCompleted: (data) => {
      if (data?.changePassword?.errors?.length === 0) {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
        closeModal();
      }
    },
  });

  const {
    loadMore: loadMoreGroups,
    search: searchGroups,
    result: searchGroupsOpts,
  } = useGroupSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA,
  });

  const [updateStaffMember, updateStaffMemberOpts] = useMutation(StaffMemberUpdateDocument, {
    onCompleted: (data) => {
      if (!data?.updateStaffMember?.errors?.length !== 0) {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
      }
    },
  });

  const [deleteStaffMember, deleteResult] = useMutation(StaffMemberDeleteDocument, {
    onCompleted: (data) => {
      if (!data?.staffDelete?.errors?.length !== 0) {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
        void router.push('/staff');
      }
    },
  });

  const [updateStaffAvatar] = useMutation(StaffAvatarUpdateDocument, {
    onCompleted: (data) => {
      if (!data?.updateUserAvatar?.errors?.length !== 0) {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
        refetch();
      } else {
        notify(
          t(
            'dashboard.imageUploadErrorText',
            "There was a problem with the file you uploaded as an image and it couldn't be used. Please try a different file."
          ),
          {
            type: 'error',
            title: t('dashboard.imageUploadErrorTitle', "Couldn't process image"),
          }
        );
      }
    },
  });

  const [deleteStaffAvatar, deleteAvatarResult] = useMutation(StaffAvatarDeleteDocument, {
    onCompleted: (data) => {
      if (!data?.deleteUserAvatar?.errors?.length !== 0) {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
        void router.push({ pathname: '/staff/[id]', query: { id } });
      }
    },
  });

  if (staffMember === null) {
    return <NotFoundPage backHref={'/staff'} />;
  }

  const handleUpdate = (formData: StaffDetailsFormData) =>
    extractMutationErrors(
      updateStaffMember({
        id,
        input: {
          email: formData.email,
          firstName: formData.firstName,
          isActive: formData.isActive,
          lastName: formData.lastName,
          ...groupsDiff(data?.user, formData),
        },
      })
    );

  return (
    <>
      <WindowTitle title={getStringOrPlaceholder(staffMember?.email)} />
      <StaffDetailsPage
        errors={updateStaffMemberOpts?.data?.updateStaff?.errors || []}
        canEditAvatar={isUserSameAsViewer}
        canEditPreferences={isUserSameAsViewer}
        canEditStatus={!isUserSameAsViewer}
        canRemove={!isUserSameAsViewer}
        disabled={loading}
        initialSearch=""
        onChangePassword={() =>
          void router.push({
            pathname: '/staffMemberDetailss/[id]',
            query: { action: 'change-password' },
          })
        }
        onDelete={() =>
          void router.push({
            pathname: '/staffMemberDetailss/[id]',
            query: { action: 'remove' },
          })
        }
        onSubmit={handleUpdate}
        onImageUpload={(file) =>
          updateStaffAvatar({
            image: file,
          })
        }
        onImageDelete={() =>
          void router.push({
            pathname: '/staffMemberDetailss/[id]',
            query: { action: 'remove-avatar' },
          })
        }
        availableGroups={mapEdgesToItems(searchGroupsOpts?.data?.search)}
        staffMember={staffMember}
        saveButtonBarState={updateStaffMemberOpts.status}
        fetchMoreGroups={{
          hasMore: searchGroupsOpts.data?.search?.pageInfo.hasNextPage,
          loading: searchGroupsOpts.fetching,
          onFetchMore: loadMoreGroups,
        }}
        onSearchChange={searchGroups}
      />
      <ActionDialog
        open={params.action === 'remove'}
        title={t(
          'dashboard.hXwO/',
          'delete Staff User'
          // dialog header
        )}
        confirmButtonState={deleteResult.status}
        variant="delete"
        onClose={closeModal}
        onConfirm={() =>
          deleteStaffMember({
            ...{ id },
          })
        }
      >
        <DialogContentText>
          {t('dashboard.xPjIQ', 'Are you sure you want to delete {{email}} from staff members?', {
            email: getStringOrPlaceholder(data?.user?.email),
          })}
        </DialogContentText>
      </ActionDialog>
      <ActionDialog
        open={params.action === 'remove-avatar'}
        title={t(
          'dashboard.KWPBf',
          'Delete Staff User Avatar'
          // dialog header
        )}
        confirmButtonState={deleteAvatarResult.status}
        variant="delete"
        onClose={closeModal}
        onConfirm={deleteStaffAvatar}
      >
        <DialogContentText>
          {t('dashboard.zpXvv', 'Are you sure you want to remove {{email}} avatar?', {
            email: <strong>{getStringOrPlaceholder(data?.user?.email)}</strong>,
          })}
        </DialogContentText>
      </ActionDialog>
      <StaffPasswordResetDialog
        confirmButtonState={changePasswordOpts.status}
        errors={changePasswordOpts?.data?.changePassword?.errors || []}
        open={params.action === 'change-password'}
        onClose={closeModal}
        onSubmit={(data) =>
          changePassword({
            variables: data,
          })
        }
      />
    </>
  );
};

export default StaffDetails;
