import * as m from '@paraglide/messages';
import { AddressForm } from '@tempo/checkout/components/forms/~AddressForm';
import type { AddressFormProps } from '@tempo/checkout/components/forms/~AddressForm';
import { useAddressForm } from '@tempo/checkout/components/forms/~AddressForm/useAddressForm';
import type { UseAddressFormProps } from '@tempo/checkout/components/forms/~AddressForm/useAddressForm';
import type { AddressFormData } from '@tempo/next/types/addresses';
import { Button } from '@tempo/ui/components/buttons/Button';
import { IconButton } from '@tempo/ui/components/buttons/IconButton';
import type { UseErrors } from '@tempo/ui/hooks';
import DeleteIcon from '@mui/icons-material/Delete';
import type { FC } from 'react';
import { useCallback } from 'react';
import { manualSaveAddressFormMessages, manualSaveAddressFormLabels } from './messages';

interface ManualSaveAddressFormProps
  extends UseAddressFormProps,
    Omit<AddressFormProps, 'formProps' | 'defaultInputOptions' | 'children'>,
    Pick<UseErrors<AddressFormData>, 'clearErrors'> {
  onDelete?: () => void;
  onCancel: () => void;
  onSubmit: (formData: AddressFormData) => void;
  loading: boolean;
}

export const ManualSaveAddressForm: FC<ManualSaveAddressFormProps> = ({
  defaultValues,
  onSubmit,
  clearErrors: onClearErrors,
  onDelete,
  loading,
  onCancel,
  ...addressFormRest
}) => {
  const { formProps, onSubmit: handleOnSubmit } = useAddressForm({
    defaultValues,
    onSubmit,
  });
  const { handleSubmit, clearErrors } = formProps;

  const handleCancel = useCallback(() => {
    clearErrors();
    onClearErrors();

    onCancel();
  }, [clearErrors, onClearErrors, onCancel]);

  return (
    <AddressForm {...addressFormRest} formProps={formProps}>
      <div className="flex flex-row justify-end">
        {onDelete && (
          <IconButton
            className="mr-2"
            aria-label={
              m[manualSaveAddressFormLabels.delete.id] ??
              manualSaveAddressFormLabels.delete.defaultMessage
            }
            onClick={onDelete}
          >
            <DeleteIcon />
          </IconButton>
        )}

        <Button
          className="mr-2"
          //   color="secondary"
          onClick={handleCancel}
        >
          {m[manualSaveAddressFormMessages.cancel.id] ??
            manualSaveAddressFormMessages.cancel.defaultMessage}
        </Button>
        {loading ? (
          <Button disabled onClick={handleSubmit(handleOnSubmit)}>
            {m.checkout_processing() ?? 'Processing...'}
          </Button>
        ) : (
          <Button onClick={handleSubmit(handleOnSubmit)}>
            {m[manualSaveAddressFormMessages.save.id] ??
              manualSaveAddressFormMessages.save.defaultMessage}
          </Button>
        )}
      </div>
    </AddressForm>
  );
};
