import * as m from '@paraglide/messages';
import BackButton from '@tempo/ui/components/buttons/BackButton';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import ConfirmButton from '@tempo/ui/components/buttons/ConfirmButton';
import { AttributeInputType } from '@tempo/api/generated/constants';
import type { AttributeErrorFragment } from '@tempo/api/generated/graphql';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import type { FC } from 'react';

import AttributeSwatchField from './AttributeSwatchField';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import type { ValueEditDialogFormData } from '@tempo/dashboard/oldSrc/attributes/utils/data';
import { getValueErrorMessage } from '@tempo/dashboard/oldSrc/attributes/errors';
import useModalDialogErrors from '@tempo/dashboard/hooks/useModalDialogErrors';
import Form from '@tempo/dashboard/components/forms/Form';

export interface ValueEditDialogProps {
  value: ValueEditDialogFormData | null;
  confirmButtonState: ConfirmButtonTransitionState;
  disabled: boolean;
  errors: AttributeErrorFragment[];
  open: boolean;
  onSubmit: (data: ValueEditDialogFormData) => void;
  onClose: () => void;
  inputType?: AttributeInputType;
}

const ValueEditDialog: FC<ValueEditDialogProps> = ({
  value,
  confirmButtonState,
  disabled,
  errors: apiErrors,
  onClose,
  onSubmit,
  open,
  inputType,
}) => {
  const valueFields = value?.fileUrl
    ? {
        fileUrl: value?.fileUrl,
        contentType: value?.contentType,
      }
    : { value: value?.value ?? '' };

  const initialForm: ValueEditDialogFormData = {
    name: value?.name ?? '',
    ...valueFields,
  };
  const errors = useModalDialogErrors(apiErrors, open);
  const formErrors = getFormErrors(['name'], errors);
  const isSwatch = inputType === AttributeInputType.Swatch;

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle>
        {value === null ? (
          <>
            {/* add attribute value */}

            {m.dashboard_qMbma() ?? 'Add Value'}
          </>
        ) : (
          <>
            {/* edit attribute value */}

            {m.dashboard_YhE_p() ?? 'Edit Value'}
          </>
        )}
      </DialogTitle>
      <Form initial={initialForm} onSubmit={onSubmit}>
        {({ errors, set, change, clearErrors, setError, data, submit }) => (
          <>
            <DialogContent>
              <TextField
                data-test-id="value-name"
                autoFocus
                disabled={disabled}
                error={!!formErrors.name}
                fullWidth
                helperText={getValueErrorMessage(formErrors.name, t)}
                name={'name' as keyof ValueEditDialogFormData}
                label={
                  m.dashboard_hcALJ() ?? 'Name'
                  // attribute name
                }
                value={data?.name}
                onChange={change}
              />
              {isSwatch && (
                <AttributeSwatchField
                  data={data}
                  errors={errors}
                  clearErrors={clearErrors}
                  setError={setError}
                  set={set}
                />
              )}
            </DialogContent>
            <DialogActions>
              <BackButton onClick={onClose} />
              <ConfirmButton
                data-test-id="submit"
                transitionState={confirmButtonState}
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
ValueEditDialog.displayName = 'ValueEditDialog';
export default ValueEditDialog;
