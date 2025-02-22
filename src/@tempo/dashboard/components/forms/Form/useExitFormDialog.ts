import { useEffect, useContext, useRef } from 'react';

import type { ExitFormDialogData, SubmitFn, WithFormId } from './ExitFormDialogProvider';
import { ExitFormDialogContext } from './ExitFormDialogProvider';

export interface UseExitFormDialogResult
  extends Omit<ExitFormDialogData, 'setIsDirty' | 'setExitDialogSubmitRef'>,
    WithFormId {
  setIsDirty: (isDirty: boolean) => void;
  setExitDialogSubmitRef: (submitFn: SubmitFn) => void;
}

export interface UseExitFormDialogProps {
  formId: symbol;
  isDisabled?: boolean;
}

export const useExitFormDialog = (
  { formId, isDisabled }: UseExitFormDialogProps = { formId: undefined }
): UseExitFormDialogResult => {
  const id = useRef(formId || Symbol()).current;

  const exitDialogProps = useContext(ExitFormDialogContext);
  const { setIsDirty, setIsSubmitDisabled, setExitDialogSubmitRef } = exitDialogProps;

  useEffect(() => {
    if (isDisabled !== undefined) {
      setIsSubmitDisabled(isDisabled);
    }
  }, [isDisabled]);

  return {
    ...exitDialogProps,
    formId: id,
    setIsDirty: (value: boolean) => setIsDirty(id, value),
    setExitDialogSubmitRef: (submitFn: SubmitFn) => setExitDialogSubmitRef(id, submitFn),
  };
};
