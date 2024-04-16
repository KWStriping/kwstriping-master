import { useTranslation } from '@core/i18n';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import type { MultiAutocompleteChoiceType } from '../fields/MultiAutocompleteSelectField';
import MultiAutocompleteSelectField from '../fields/MultiAutocompleteSelectField';
import type { SearchGroupsQuery, StaffErrorFragment } from '@core/api/graphql';
import type { FormChange } from '@dashboard/hooks/useForm';
import type { FetchMoreProps, RelayToFlat, SearchPageProps } from '@dashboard/oldSrc/types';
import { getFormErrors } from '@dashboard/oldSrc/utils/errors';
import getStaffErrorMessage from '@dashboard/oldSrc/utils/errors/staff';

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

  const { t } = useTranslation();

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
        label={t('dashboard.7eDb9', 'Permission groups')}
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
