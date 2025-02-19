import * as m from '@paraglide/messages';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import type { SearchGroupsQuery, StaffErrorFragment } from '@tempo/api/generated/graphql';
import type { MultiAutocompleteChoiceType } from '../fields/MultiAutocompleteSelectField';
import MultiAutocompleteSelectField from '../fields/MultiAutocompleteSelectField';
import type { FormChange } from '@tempo/dashboard/hooks/useForm';
import type { FetchMoreProps, RelayToFlat, SearchPageProps } from '@tempo/dashboard/oldSrc/types';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import getStaffErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/staff';

export interface AccountGroupsProps extends FetchMoreProps, SearchPageProps {
  formData: {
    groups: string[];
  };
  disabled: boolean;
  errors: StaffErrorFragment[];
  availableGroups: RelayToFlat<NonNullable<SearchGroupsQuery['search']>>;
  onChange: FormChange;
  displayValues: MultiAutocompleteChoiceType[];
}

const AccountGroups: FC<AccountGroupsProps> = (props) => {
  const {
    availableGroups,
    disabled,
    displayValues,
    errors,
    formData,
    hasMore,
    loading,
    onChange,
    onFetchMore,
    onSearchChange,
  } = props;

  const choices = availableGroups?.map((pg) => ({
    disabled: !pg.userCanManage,
    label: pg.name,
    value: pg.id,
  }));
  const formErrors = getFormErrors(['addGroups', 'removeGroups'], errors);
  return (
    <>
      <MultiAutocompleteSelectField
        displayValues={displayValues}
        label={m.dashboard__eDb_() ?? 'Permission groups'}
        choices={disabled ? [] : choices}
        name="groups"
        value={formData?.groups}
        onChange={onChange}
        fetchChoices={onSearchChange}
        data-test-id="permission-groups"
        onFetchMore={onFetchMore}
        hasMore={hasMore}
        loading={loading}
      />
      {!!formErrors.addGroups && (
        <Typography color="error">{getStaffErrorMessage(formErrors.addGroups, t)}</Typography>
      )}
      {!!formErrors.removeGroups && (
        <Typography color="error">{getStaffErrorMessage(formErrors.removeGroups, t)}</Typography>
      )}
    </>
  );
};

AccountGroups.displayName = 'AccountGroups';
export default AccountGroups;
