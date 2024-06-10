import { toast } from 'react-toastify';
import type { FormId } from '@dashboard/components/forms/Form/ExitFormDialogProvider';
import { useExitFormDialog } from '@dashboard/components/forms/Form/useExitFormDialog';
import type { SubmitPromise } from '@dashboard/hooks/useForm';

interface UseHandleFormSubmitProps<TData, TError> {
  formId?: FormId;
  onSubmit: (data: TData) => SubmitPromise<TError[]> | void;
}

function useHandleFormSubmit<TData, TErrors>({
  formId,
  onSubmit,
}: UseHandleFormSubmitProps<TData, TErrors>) {
  const { setIsSubmitting, setIsDirty } = useExitFormDialog({
    formId,
  });

  async function handleFormSubmit(data: TData): Promise<TErrors[]> {
    setIsSubmitting(true);

    // https://fkhadra.github.io/react-toastify/remove-toast/
    try {
      toast.dismiss();
    } catch (error) {
      console.error('>>>', error);
    }

    const result = onSubmit(data);

    if (!result) {
      return [];
    }

    const errors = await result;

    setIsSubmitting(false);

    if (errors?.length === 0) {
      setIsDirty(false);

      return [];
    }

    return errors;
  }

  return handleFormSubmit;
}

export default useHandleFormSubmit;
