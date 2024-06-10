import * as m from '@paraglide/messages';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import Grid from '@tempo/ui/components/Grid';
import AccountGroups from '@tempo/dashboard/components/groups/AccountGroups';
import { getUserName } from '@tempo/utils/user';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import StaffPassword from '../StaffPassword';
import StaffPreferences from '../StaffPreferences';
import StaffProperties from '../StaffProperties';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import SaveBar from '@tempo/dashboard/components/core/SaveBar';
import type { MultiAutocompleteChoiceType } from '@tempo/dashboard/components/fields/MultiAutocompleteSelectField';
import Form from '@tempo/dashboard/components/forms/Form';
import UserStatus from '@tempo/dashboard/components/staff/UserStatus';
import type {
  SearchGroupsQuery,
  StaffErrorFragment,
  StaffMemberDetailsFragment,
  UserFragment,
} from '@tempo/api/generated/graphql';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import useStateFromProps from '@tempo/dashboard/hooks/useStateFromProps';
import { getMemberGroups, isMemberActive } from '@tempo/dashboard/oldSrc/staff/utils';
import type { FetchMoreProps, RelayToFlat, SearchPageProps } from '@tempo/dashboard/oldSrc/types';
import createMultiAutocompleteSelectHandler from '@tempo/dashboard/oldSrc/utils/handlers/multiAutocompleteSelectChangeHandler';

export interface StaffDetailsFormData {
  email: string;
  firstName: string;
  isActive: boolean;
  lastName: string;
  groups: string[];
}

export interface StaffDetailsPageProps extends SearchPageProps {
  availableGroups: RelayToFlat<NonNullable<SearchGroupsQuery['search']>>;
  canEditAvatar: boolean;
  canEditPreferences: boolean;
  canEditStatus: boolean;
  canRemove: boolean;
  disabled: boolean;
  fetchMoreGroups: FetchMoreProps;
  saveButtonBarState: ConfirmButtonTransitionState;
  staffMember: StaffMemberDetailsFragment | UserFragment;
  errors: StaffErrorFragment[];
  onChangePassword: () => void;
  onDelete: () => void;
  onImageDelete: () => void;
  onSubmit: (data: StaffDetailsFormData) => SubmitPromise;
  onImageUpload(file: File);
}

const StaffDetailsPage: FC<StaffDetailsPageProps> = ({
  availableGroups,
  canEditAvatar,
  canEditPreferences,
  canEditStatus,
  canRemove,
  disabled,
  errors,
  fetchMoreGroups,
  initialSearch,
  onChangePassword,
  onDelete,
  onImageDelete,
  onImageUpload,
  onSearchChange,
  onSubmit,
  saveButtonBarState,
  staffMember,
}: StaffDetailsPageProps) => {
  const router = useRouter();

  const { locale, setLocale } = useRouter();

  const isActive = isMemberActive(staffMember);
  const groups = getMemberGroups(staffMember);

  const [groupsDisplayValues, setGroupsDisplayValues] = useStateFromProps<
    MultiAutocompleteChoiceType[]
  >(
    groups.map((group) => ({
      disabled: !group.userCanManage,
      label: group.name,
      value: group.id,
    })) || []
  );

  const initialForm: StaffDetailsFormData = {
    email: staffMember?.email || '',
    firstName: staffMember?.firstName || '',
    isActive,
    lastName: staffMember?.lastName || '',
    groups: groups.map((pg) => pg.id),
  };

  return (
    <Form confirmLeave initial={initialForm} onSubmit={onSubmit} disabled={disabled}>
      {({ data: formData, change, isSaveDisabled, submit, toggleValue }) => {
        const groupsChange = createMultiAutocompleteSelectHandler(
          toggleValue,
          setGroupsDisplayValues,
          groupsDisplayValues,
          availableGroups?.map((group) => ({
            label: group.name,
            value: group.id,
          })) || []
        );

        return (
          <Container>
            <Backlink href={'/staff'}>{m.dashboard_staff() ?? 'Staff Members'}</Backlink>
            <PageHeader title={getUserName(staffMember)} />
            <Grid>
              <div>
                <StaffProperties
                  errors={errors}
                  data={formData}
                  disabled={disabled}
                  canEditAvatar={canEditAvatar}
                  staffMember={staffMember}
                  onChange={change}
                  onImageUpload={onImageUpload}
                  onImageDelete={onImageDelete}
                />
                {canEditPreferences && (
                  <>
                    <CardSpacer />
                    <StaffPassword onChangePassword={onChangePassword} />
                  </>
                )}
              </div>
              <div className={styles.noOverflow ?? ''}>
                {canEditPreferences && (
                  <StaffPreferences locale={locale} onLocaleChange={setLocale} />
                )}
                {canEditStatus && (
                  <>
                    <UserStatus
                      data={formData}
                      disabled={disabled}
                      label={m.dashboard_serStatusActive() ?? 'User is active'}
                      onChange={change}
                    />
                    <CardSpacer />
                    <Card>
                      <CardTitle
                        title={
                          m.dashboard_br_Vp() ?? 'Permissions'
                          // dialog header
                        }
                      />
                      <CardContent>
                        <Typography>
                          {t(
                            'dashboard_+kVxW',
                            'User is assigned to:'
                            // card description
                          )}
                        </Typography>

                        <AccountGroups
                          formData={formData}
                          disabled={disabled}
                          errors={errors}
                          initialSearch={initialSearch}
                          availableGroups={availableGroups}
                          onChange={groupsChange}
                          onSearchChange={onSearchChange}
                          displayValues={groupsDisplayValues}
                          {...fetchMoreGroups}
                        />
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </Grid>
            <SaveBar
              disabled={isSaveDisabled}
              state={saveButtonBarState}
              onCancel={() => router.push('/staff')}
              onSubmit={submit}
              onDelete={canRemove ? onDelete : undefined}
            />
          </Container>
        );
      }}
    </Form>
  );
};
StaffDetailsPage.displayName = 'StaffDetailsPage';
export default StaffDetailsPage;
