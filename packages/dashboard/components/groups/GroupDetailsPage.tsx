import { useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import Grid from '@core/ui/components/Grid';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import GroupInfo from './GroupInfo';
import GroupMemberList from './GroupMemberList';
import PageHeader from '@dashboard/components/core/PageHeader';
import SaveBar from '@dashboard/components/core/SaveBar';
import Form from '@dashboard/components/forms/Form';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
import AccountPermissions from '@dashboard/components/groups/AccountPermissions';
import type {
  PermissionCode,
  GroupDetailsFragment,
  GroupErrorFragment,
  UserPermissionFragment,
} from '@core/api/graphql';
import type { SubmitPromise } from '@dashboard/hooks/useForm';
import type { MembersListUrlOrdering } from '@dashboard/oldSrc/groups/urls';
import { extractPermissionCodes, isGroupFullAccess } from '@dashboard/oldSrc/groups/utils';
import type { ListActions, SortPage } from '@dashboard/oldSrc/types';
import { getFormErrors } from '@dashboard/oldSrc/utils/errors';
import getGroupErrorMessage from '@dashboard/oldSrc/utils/errors/groups';

export interface GroupDetailsPageFormData {
  name: string;
  hasFullAccess: boolean;
  isActive: boolean;
  permissions: PermissionCode[];
  users: GroupDetailsFragment['users'];
}

export interface PermissionData extends Omit<UserPermissionFragment, '__typename'> {
  lastSource?: boolean;
  disabled?: boolean;
}

export interface GroupDetailsPageProps extends ListActions, SortPage<MembersListUrlOrdering> {
  disabled: boolean;
  errors: GroupErrorFragment[];
  members: GroupDetailsFragment['users'];
  group: Maybe<GroupDetailsFragment>;
  permissions: PermissionData[];
  permissionsExceeded: boolean;
  saveButtonBarState: ConfirmButtonTransitionState;
  onAssign: () => void;
  onUnassign: (ids: string[]) => void;
  onSubmit: (data: GroupDetailsPageFormData) => SubmitPromise;
}

const GroupDetailsPage: FC<GroupDetailsPageProps> = ({
  disabled,
  errors,
  members,
  onSubmit,
  group,
  permissions,
  permissionsExceeded,
  saveButtonBarState,
  ...listProps
}) => {
  const { t } = useTranslation();
  const router = useRouter();

  const initialForm: GroupDetailsPageFormData = {
    hasFullAccess: isGroupFullAccess(group, permissions),
    isActive: false,
    name: group?.name || '',
    permissions: extractPermissionCodes(group),
    users: members,
  };

  const formErrors = getFormErrors(['addPermissions'], errors);
  const permissionsError = getGroupErrorMessage(formErrors.addPermissions, t);

  return (
    <Form confirmLeave initial={initialForm} onSubmit={onSubmit}>
      {({ data, change, submit }) => (
        <Container>
          <Backlink href={'/permission-groups'}>
            {t('dashboard.groups', 'Permission Groups')}
          </Backlink>
          <PageHeader title={group?.name} />

          <Grid>
            <div>
              <GroupInfo data={data} disabled={disabled} errors={errors} onChange={change} />
              <FormSpacer />
              <GroupMemberList disabled={disabled} {...listProps} users={data?.users || []} />
            </div>
            <div>
              <AccountPermissions
                permissionsExceeded={permissionsExceeded}
                data={data}
                disabled={disabled}
                permissions={permissions}
                onChange={change}
                errorMessage={permissionsError}
                fullAccessLabel={t(
                  'dashboard.Aabef',
                  'Group has full access to the store'
                  // checkbox label
                )}
                description={t(
                  'dashboard.YZse9',
                  "Expand or restrict group's permissions to access certain part of tempo system."
                  // card description
                )}
              />
            </div>
          </Grid>
          <div>
            <SaveBar
              onCancel={() => router.push('/permission-groups')}
              onSubmit={submit}
              state={saveButtonBarState}
              disabled={disabled}
            />
          </div>
        </Container>
      )}
    </Form>
  );
};
GroupDetailsPage.displayName = 'GroupDetailsPage';
export default GroupDetailsPage;
