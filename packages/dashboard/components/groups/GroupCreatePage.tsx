import { useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import Grid from '@core/ui/components/Grid';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import type { PermissionData } from './GroupDetailsPage';
import GroupInfo from './GroupInfo';
import SaveBar from '@dashboard/components/core/SaveBar';
import Form from '@dashboard/components/forms/Form';
import AccountPermissions from '@dashboard/components/groups/AccountPermissions';
import type { PermissionCode, GroupErrorFragment } from '@core/api/graphql';
import type { SubmitPromise } from '@dashboard/hooks/useForm';
import { getFormErrors } from '@dashboard/oldSrc/utils/errors';
import getGroupErrorMessage from '@dashboard/oldSrc/utils/errors/groups';

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
  const { t } = useTranslation();
  const router = useRouter();

  const formErrors = getFormErrors(['addPermissions'], errors || []);
  const permissionsError = getGroupErrorMessage(formErrors.addPermissions, t);

  return (
    <Form confirmLeave initial={initialForm} onSubmit={onSubmit} disabled={disabled}>
      {({ data, change, submit, isSaveDisabled }) => (
        <Container>
          <Backlink href={'/permission-groups'}>
            {t('dashboard.groups', 'Permission Groups')}
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
