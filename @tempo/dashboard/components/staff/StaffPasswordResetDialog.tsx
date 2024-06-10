import * as m from '@paraglide/messages';
import BackButton from '@tempo/ui/components/buttons/BackButton';
import ConfirmButton from '@tempo/ui/components/buttons/ConfirmButton';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import Form from '@tempo/dashboard/components/forms/Form';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';
import type { AccountErrorFragment } from '@tempo/api/generated/graphql';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import useModalDialogErrors from '@tempo/dashboard/hooks/useModalDialogErrors';
import type { DialogProps } from '@tempo/dashboard/oldSrc/types';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import getAccountErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/account';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import type { FC } from 'react';

interface StaffPasswordResetDialogFormData {
  newPassword: string;
  oldPassword: string;
}
export interface StaffPasswordResetDialogProps extends DialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  errors: AccountErrorFragment[];
  onSubmit: (data: StaffPasswordResetDialogFormData) => SubmitPromise;
}

const initialForm: StaffPasswordResetDialogFormData = {
  newPassword: '',
  oldPassword: '',
};

const StaffPasswordResetDialog: FC<StaffPasswordResetDialogProps> = ({
  confirmButtonState,
  errors,
  open,
  onClose,
  onSubmit,
}) => {
  const dialogErrors = useModalDialogErrors(errors, open);

  const formErrors = getFormErrors(['oldPassword', 'newPassword'], dialogErrors);

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle>
        <>
          {t(
            '+kb2lM',
            'Change Password'
            // dialog header
          )}
        </>
      </DialogTitle>
      <Form initial={initialForm} onSubmit={onSubmit}>
        {({ change, data, submit }) => (
          <>
            <DialogContent>
              <TextField
                error={!!formErrors.oldPassword}
                fullWidth
                helperText={getAccountErrorMessage(formErrors.oldPassword, t)}
                label={
                  m.dashboard_XdwyR() ?? 'Previous Password'
                  // input label
                }
                name="oldPassword"
                type="password"
                onChange={change}
                inputProps={{
                  spellCheck: false,
                }}
              />
              <FormSpacer />
              <TextField
                error={!!formErrors.newPassword}
                fullWidth
                helperText={
                  getAccountErrorMessage(formErrors.newPassword, t) ||
                  (m.dashboard_EJT_e() ?? 'New password must be at least 8 characters long')
                }
                label={
                  m.dashboard_MFlOp() ?? 'New Password'
                  // input label
                }
                name="newPassword"
                type="password"
                onChange={change}
                inputProps={{
                  spellCheck: false,
                }}
              />
            </DialogContent>
            <DialogActions>
              <BackButton onClick={onClose} />
              <ConfirmButton
                data-test-id="submit"
                disabled={data?.newPassword?.length < 8}
                transitionState={confirmButtonState}
                type="submit"
                onClick={submit}
              >
                {m.dashboard_save() ?? 'Save'}
              </ConfirmButton>
            </DialogActions>
          </>
        )}
      </Form>
    </Dialog>
  );
};

StaffPasswordResetDialog.displayName = 'StaffPasswordResetDialog';
export default StaffPasswordResetDialog;
