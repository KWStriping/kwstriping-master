import { AddressForm } from '@core/checkout/components/forms/~AddressForm';
import type { AddressFormProps } from '@core/checkout/components/forms/~AddressForm';
import { useAddressForm } from '@core/checkout/components/forms/~AddressForm/useAddressForm';
import type { UseAddressFormProps } from '@core/checkout/components/forms/~AddressForm/useAddressForm';
import { useTranslation } from '@core/i18n';
import type { AddressFormData } from '@core/types/addresses';
import { Button } from '@core/ui/components/buttons/Button';
import { IconButton } from '@core/ui/components/buttons/IconButton';
import type { UseErrors } from '@core/ui/hooks';
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
  const { t } = useTranslation();

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
            aria-label={t(
              manualSaveAddressFormLabels.delete.id,
              manualSaveAddressFormLabels.delete.defaultMessage
            )}
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
          {t(
            manualSaveAddressFormMessages.cancel.id,
            manualSaveAddressFormMessages.cancel.defaultMessage
          )}
        </Button>
        {loading ? (
          <Button disabled onClick={handleSubmit(handleOnSubmit)}>
            {t('checkout.processing', 'Processing...')}
          </Button>
        ) : (
          <Button onClick={handleSubmit(handleOnSubmit)}>
            {t(
              manualSaveAddressFormMessages.save.id,
              manualSaveAddressFormMessages.save.defaultMessage
            )}
          </Button>
        )}
      </div>
    </AddressForm>
  );
};
