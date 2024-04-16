import { useUser } from '@core/auth/react/hooks';
import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useShopSettings } from '@core/ui/hooks/useShopSettings';
import { useMutation } from '@core/urql/hooks/useMutation';
import { extractMutationErrors } from '@core/urql/utils';
import type { GroupCreateFormData } from '@dashboard/components/GroupCreatePage';
import { useRouter } from 'next/router';
import GroupCreatePage from '@dashboard/components/groups/GroupCreatePage';
import type { PermissionData } from '@dashboard/components/groups/GroupDetailsPage';
import { GroupCreateDocument } from '@core/api/graphql';

import { groupDetailsUrl } from '@dashboard/oldSrc/groups/urls';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';

const GroupCreateView = () => {
  const router = useRouter();
  const notify = useNotifier();
  const { t } = useTranslation();
  const shop = useShopSettings();
  const user = useUser();

  const [createGroup, createGroupResult] = useMutation(GroupCreateDocument, {
    onCompleted: (data) => {
      if (data?.createGroup?.errors?.length === 0) {
        notify(t('dashboard.UjFjW', 'Permission group created'), {
          type: 'success',
        });
        void router.push(groupDetailsUrl(data?.createGroup?.group?.id));
      }
    },
  });

  const errors = createGroupResult?.data?.createGroup?.errors || [];

  const onSubmit = (formData: GroupCreateFormData) =>
    extractMutationErrors(
      createGroup({
        variables: {
          input: {
            addPermissions: formData.hasFullAccess
              ? shop.permissions.map((perm) => perm.code)
              : formData.permissions,
            addUsers: [],
            name: formData.name,
          },
        },
      })
    );

  const userPermissions = user?.user.userPermissions.map((p) => p.code) || [];

  const permissions: PermissionData[] =
    shop?.permissions.map(
      (p) =>
        ({
          ...p,
          disabled: !userPermissions.includes(p.code),
          lastSource: false,
        }) as PermissionData
    ) || [];

  return (
    <>
      <WindowTitle
        title={t(
          'dashboard.rflxf',
          'Create category'
          // window title
        )}
      />
      <GroupCreatePage
        errors={errors}
        disabled={createGroupResult.fetching}
        permissions={permissions}
        saveButtonBarState={createGroupResult.status}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default GroupCreateView;
