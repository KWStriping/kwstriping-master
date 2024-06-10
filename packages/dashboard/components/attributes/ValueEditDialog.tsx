import { useTranslation } from '@core/i18n';
import BackButton from '@core/ui/components/buttons/BackButton';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import ConfirmButton from '@core/ui/components/buttons/ConfirmButton';
import Form from '@dashboard/components/forms/Form';
import { AttributeInputType } from '@core/api/constants';
import type { AttributeErrorFragment } from '@core/api/graphql';
import useModalDialogErrors from '@dashboard/hooks/useModalDialogErrors';
import { getValueErrorMessage } from '@dashboard/oldSrc/attributes/errors';
import type { ValueEditDialogFormData } from '@dashboard/oldSrc/attributes/utils/data';
import { getFormErrors } from '@dashboard/oldSrc/utils/errors';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import type { FC } from 'react';

import AttributeSwatchField from './AttributeSwatchField';

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
  const { t } = useTranslation();
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

            {t('dashboard.qMbma', 'Add Value')}
          </>
        ) : (
          <>
            {/* edit attribute value */}

            {t('dashboard.YhE8p', 'Edit Value')}
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
                label={t(
                  'dashboard.hcALJ',
                  'Name'
                  // attribute name
                )}
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
                {t('dashboard.save', 'Save')}
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
