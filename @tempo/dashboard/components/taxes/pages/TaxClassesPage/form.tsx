import type { TaxClassFragment } from '@tempo/api/generated/graphql';
import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useExitFormDialog } from '@tempo/dashboard/components/forms/Form/useExitFormDialog';
import type { FormChange, SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import useForm from '@tempo/dashboard/hooks/useForm';
import useFormset from '@tempo/dashboard/hooks/useFormset';
import useHandleFormSubmit from '@tempo/dashboard/hooks/useHandleFormSubmit';
import type { TaxClassesPageFormData } from '@tempo/dashboard/oldSrc/taxes/types';
import { getTaxClassInitialFormData } from '@tempo/dashboard/oldSrc/taxes/utils/data';
import { validateTaxClassFormData } from '@tempo/dashboard/oldSrc/taxes/utils/validation';
import type { TaxClassError } from '@tempo/dashboard/oldSrc/utils/errors/taxes';
import useMetadataChangeTrigger from '@tempo/dashboard/oldSrc/utils/metadata/useMetadataChangeTrigger';

interface TaxClassesFormHandlers {
  handleRateChange: (id: string, value: string) => void;
  changeMetadata: FormChange;
}

export interface UseTaxClassesFormResult {
  validationErrors: TaxClassError[];
  data: TaxClassesPageFormData;
  submit: () => SubmitPromise<TaxClassError[]>;
  change: FormChange;
  handlers: TaxClassesFormHandlers;
}

interface TaxClassesFormProps {
  children: (props: UseTaxClassesFormResult) => ReactNode;
  taxClass: TaxClassFragment | undefined;
  onTaxClassCreate: (data: TaxClassesPageFormData) => SubmitPromise<TaxClassError[]>;
  onTaxClassUpdate: (data: TaxClassesPageFormData) => SubmitPromise<TaxClassError[]>;
  disabled: boolean;
}

function useTaxClassesForm(
  taxClass: TaxClassFragment,
  onTaxClassCreate: (data: TaxClassesPageFormData) => SubmitPromise<TaxClassError[]>,
  onTaxClassUpdate: (data: TaxClassesPageFormData) => SubmitPromise<TaxClassError[]>,
  disabled: boolean
): UseTaxClassesFormResult {
  // Initial

  const isNewTaxClass = taxClass?.id === 'new';

  const initialFormData = getTaxClassInitialFormData(taxClass);
  const initialFormsetData = initialFormData.updateTaxClassRates;

  const formset = useFormset(initialFormsetData);

  const { formId, triggerChange, data, handleChange } = useForm(initialFormData, undefined, {
    confirmLeave: true,
  });

  const [validationErrors, setValidationErrors] = useState<TaxClassError[]>([]);

  if (isNewTaxClass) {
    triggerChange();
  }

  // Handlers

  const handleRateChange = (id: string, value: string) => {
    triggerChange();
    formset.change(id, value);
  };

  const { makeChangeHandler: makeMetadataChangeHandler } = useMetadataChangeTrigger();

  const changeMetadata = makeMetadataChangeHandler(handleChange);

  // Submit

  const handleSubmit = async (data: TaxClassesPageFormData) => {
    const errors = validateTaxClassFormData(data);

    setValidationErrors(errors);

    if (errors?.length) {
      return errors;
    }

    if (isNewTaxClass) {
      return onTaxClassCreate(data);
    }

    return onTaxClassUpdate(data);
  };

  const handleFormSubmit = useHandleFormSubmit({
    formId,
    onSubmit: handleSubmit,
  });

  const submit = () =>
    handleFormSubmit({
      ...data,
      updateTaxClassRates: formset.data,
    });

  // Exit form util

  const { setExitDialogSubmitRef, setIsSubmitDisabled } = useExitFormDialog({
    formId,
  });

  useEffect(() => setExitDialogSubmitRef(submit), [setExitDialogSubmitRef, submit]);
  setIsSubmitDisabled(disabled);

  return {
    validationErrors,
    data: { ...data, updateTaxClassRates: formset.data },
    handlers: { handleRateChange, changeMetadata },
    change: handleChange,
    submit,
  };
}

const TaxClassesForm: FC<TaxClassesFormProps> = ({
  children,
  taxClass,
  onTaxClassCreate,
  onTaxClassUpdate,
  disabled,
}) => {
  const props = useTaxClassesForm(taxClass, onTaxClassCreate, onTaxClassUpdate, disabled);

  return <form onSubmit={props.submit}>{children(props)}</form>;
};

TaxClassesForm.displayName = 'TaxClassesForm';
export default TaxClassesForm;
