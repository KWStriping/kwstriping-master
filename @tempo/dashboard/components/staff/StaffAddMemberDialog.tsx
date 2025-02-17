import * as m from '@paraglide/messages';
import BackButton from '@tempo/ui/components/buttons/BackButton';
import ConfirmButton from '@tempo/ui/components/buttons/ConfirmButton';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import { makeStyles } from '@tempo/ui/theme/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import type { FC } from 'react';
import type { SearchGroupsQuery, StaffErrorFragment } from '@tempo/api/generated/graphql';
import Form from '@tempo/dashboard/components/forms/Form';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import useModalDialogErrors from '@tempo/dashboard/hooks/useModalDialogErrors';
import type { FetchMoreProps, RelayToFlat, SearchPageProps } from '@tempo/dashboard/oldSrc/types';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';

export interface AddMemberFormData {
  email: string;
  firstName: string;
  lastName: string;
  groups: string[];
}

const initialForm: AddMemberFormData = {
  email: '',
  firstName: '',
  lastName: '',
  groups: [],
};

const useStyles = makeStyles(
  (theme) => ({
    hr: {
      backgroundColor: '#eaeaea',
      border: 'none',
      height: 1,
      marginBottom: 0,
    },
    sectionTitle: {
      fontWeight: 600 as const,
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(2),
    },
    textFieldGrid: {
      display: 'grid',
      gridColumnGap: theme.spacing(2),
      gridTemplateColumns: '1fr 1fr',
    },
  }),
  { name: 'StaffAddMemberDialog' }
);

interface StaffAddMemberDialogProps extends SearchPageProps {
  availableGroups: RelayToFlat<NonNullable<SearchGroupsQuery['search']>>;
  confirmButtonState: ConfirmButtonTransitionState;
  disabled: boolean;
  errors: StaffErrorFragment[];
  fetchMoreGroups: FetchMoreProps;
  open: boolean;
  onClose: () => void;
  onConfirm: (data: AddMemberFormData) => SubmitPromise;
}

const StaffAddMemberDialog: FC<StaffAddMemberDialogProps> = (props) => {
  const { confirmButtonState, errors, onClose, onConfirm, open } = props;
  // const styles = useStyles();
  const styles = {};
  const dialogErrors = useModalDialogErrors(errors, open);
  const formErrors = getFormErrors(['firstName', 'lastName', 'email'], dialogErrors);

  const getFieldProps = (name: string) => ({
    disabled: props.disabled,
    error: !!formErrors[name],
    helperText: formErrors[name]?.message,
    label: m[commonMessages[name]],
    name,
  });

  return (
    <Dialog onClose={onClose} open={open}>
      <Form initial={initialForm} onSubmit={onConfirm}>
        {({ change, data: formData }) => (
          <>
            <DialogTitle>
              <>
                {/* dialog header */}

                {m.dashboard__g_PY() ?? 'Invite Staff Member'}
              </>
            </DialogTitle>
            <DialogContent>
              <div className={styles.textFieldGrid ?? ''}>
                <TextField
                  {...getFieldProps('firstName')}
                  type="text"
                  value={formData.firstName}
                  onChange={change}
                />
                <TextField
                  {...getFieldProps('lastName')}
                  type="text"
                  value={formData.lastName}
                  onChange={change}
                />
              </div>
              <FormSpacer />
              <TextField
                fullWidth
                {...getFieldProps('email')}
                type="email"
                value={formData.email}
                onChange={change}
              />
            </DialogContent>
            <hr className={styles.hr ?? ''} />
            <DialogActions>
              <BackButton onClick={onClose} />
              <ConfirmButton
                data-test-id="submit"
                type="submit"
                transitionState={confirmButtonState}
              >
                <>
                  {/* button */}

                  {m.dashboard_w_Fah() ?? 'Send invite'}
                </>
              </ConfirmButton>
            </DialogActions>
          </>
        )}
      </Form>
    </Dialog>
  );
};
StaffAddMemberDialog.displayName = 'StaffAddMemberDialog';
export default StaffAddMemberDialog;
