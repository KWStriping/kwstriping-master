import * as m from '@paraglide/messages';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import Grid from '@tempo/ui/components/Grid';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import type { PermissionCode, GroupErrorFragment } from '@tempo/api/generated/graphql';
import type { PermissionData } from './GroupDetailsPage';
import GroupInfo from './GroupInfo';
import SaveBar from '@tempo/dashboard/components/core/SaveBar';
import Form from '@tempo/dashboard/components/forms/Form';
import AccountPermissions from '@tempo/dashboard/components/groups/AccountPermissions';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import getGroupErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/groups';

export interface GroupCreateFormData {
  name: string;
  hasFullAccess: boolean;
  isActive: boolean;
  permissions: PermissionCode[];
}

const initialForm: GroupCreateFormData = {
  hasFullAccess: false,
  isActive: false,
  name: '',
  permissions: [],
};

export interface GroupCreatePageProps {
  disabled: boolean;
  errors: GroupErrorFragment[];
  permissions: PermissionData[];
  saveButtonBarState: ConfirmButtonTransitionState;
  onSubmit: (data: GroupCreateFormData) => SubmitPromise;
}

const GroupCreatePage: FC<GroupCreatePageProps> = ({
  disabled = false,
  permissions,
  onSubmit,
  saveButtonBarState,
  errors,
}) => {
  const router = useRouter();

  const formErrors = getFormErrors(['addPermissions'], errors || []);
  const permissionsError = getGroupErrorMessage(formErrors.addPermissions, t);

  return (
    <Form confirmLeave initial={initialForm} onSubmit={onSubmit} disabled={disabled}>
      {({ data, change, submit, isSaveDisabled }) => (
        <Container>
          <Backlink href={'/permission-groups'}>
            {m.dashboard_groups() ?? 'Permission Groups'}
          </Backlink>
          <Grid>
            <div>
              <GroupInfo data={data} errors={errors} onChange={change} disabled={disabled} />
            </div>
            <div>
              <AccountPermissions
                permissionsExceeded={false}
                data={data}
                errorMessage={permissionsError}
                disabled={disabled}
                permissions={permissions}
                onChange={change}
                fullAccessLabel={
                  m.dashboard_Aabef() ?? 'Group has full access to the store'
                  // checkbox label
                }
                description={
                  m.dashboard_YZse_() ??
                  "Expand or restrict group's permissions to access certain part of tempo system."
                  // card description
                }
              />
            </div>
          </Grid>
          <div>
            <SaveBar
              onCancel={() => router.push('/permission-groups')}
              onSubmit={submit}
              state={saveButtonBarState}
              disabled={!!isSaveDisabled}
            />
          </div>
        </Container>
      )}
    </Form>
  );
};
GroupCreatePage.displayName = 'GroupCreatePage';
export default GroupCreatePage;
