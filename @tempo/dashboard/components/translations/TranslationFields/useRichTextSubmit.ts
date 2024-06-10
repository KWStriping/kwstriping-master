import type { OutputData } from '@editorjs/editorjs';
import { useEffect, useCallback } from 'react';
import { useExitFormDialog } from '@tempo/dashboard/components/forms/Form/useExitFormDialog';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import useRichText from '@tempo/dashboard/oldSrc/utils/richText/useRichText';

export function useRichTextSubmit(
  initial: string,
  onSubmit: (data: OutputData) => SubmitPromise
) {
  const { setIsDirty, setExitDialogSubmitRef } = useExitFormDialog();

  const { defaultValue, editorRef, isReadyForMount, handleChange, getValue } = useRichText({
    initial,
    triggerChange: () => setIsDirty(true),
  });

  const handleSubmit = useCallback(async () => {
    const result = onSubmit(await getValue());

    const errors = await result;
    if (errors?.length === 0) {
      setIsDirty(false);

      return [];
    }

    return errors;
  }, [getValue, onSubmit, setIsDirty]);

  useEffect(() => setExitDialogSubmitRef(handleSubmit), [handleSubmit, setExitDialogSubmitRef]);

  return {
    defaultValue,
    editorRef,
    isReadyForMount,
    handleChange,
    handleSubmit,
  };
}
