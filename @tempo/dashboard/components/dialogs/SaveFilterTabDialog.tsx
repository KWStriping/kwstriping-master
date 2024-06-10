import * as m from '@paraglide/messages';
import BackButton from '@tempo/ui/components/buttons/BackButton';
import ConfirmButton from '@tempo/ui/components/buttons/ConfirmButton';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import Form from '@tempo/dashboard/components/forms/Form';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import type { FC } from 'react';
import { useState } from 'react';

export interface SaveFilterTabDialogFormData {
  name: string;
}

const initialForm: SaveFilterTabDialogFormData = {
  name: '',
};

export interface SaveFilterTabDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: SaveFilterTabDialogFormData) => void;
}

const SaveFilterTabDialog: FC<SaveFilterTabDialogProps> = ({
  confirmButtonState,
  onClose,
  onSubmit,
  open,
}) => {
  const [errors, setErrors] = useState(false);
  const handleErrors = (data) => {
    if (data?.name?.length) {
      onSubmit(data);
      setErrors(false);
    } else {
      setErrors(true);
    }
  };

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle>
        <>
          {/* save filter tab, header */}

          {m.dashboard_iLrVs() ?? 'Save Custom Search'}
        </>
      </DialogTitle>
      <Form initial={initialForm} onSubmit={handleErrors}>
        {({ change, data, submit }) => (
          <>
            <DialogContent>
              <TextField
                autoFocus
                fullWidth
                label={
                  m.dashboard_cIFCs() ?? 'Search Name' // save search tab
                }
                name={'name' as keyof SaveFilterTabDialogFormData}
                value={data?.name}
                onChange={change}
                error={errors}
                helperText={errors ? 'This field is required' : null}
              />
            </DialogContent>
            <DialogActions>
              <BackButton onClick={onClose} />
              <ConfirmButton transitionState={confirmButtonState} onClick={submit}>
                {m.dashboard_save() ?? 'Save'}
              </ConfirmButton>
            </DialogActions>
          </>
        )}
      </Form>
    </Dialog>
  );
};
SaveFilterTabDialog.displayName = 'SaveFilterTabDialog';
export default SaveFilterTabDialog;
