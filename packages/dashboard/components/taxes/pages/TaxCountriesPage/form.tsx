import { useTranslation } from '@core/i18n';
import { useExitFormDialog } from '@dashboard/components/forms/Form/useExitFormDialog';
import type {
  TaxClassFragment,
  TaxClassRateInput,
  TaxCountryConfigurationFragment,
} from '@core/api/graphql';
import type { SubmitPromise } from '@dashboard/hooks/useForm';
import useForm from '@dashboard/hooks/useForm';
import type { FormsetData } from '@dashboard/hooks/useFormset';
import useFormset from '@dashboard/hooks/useFormset';
import useHandleFormSubmit from '@dashboard/hooks/useHandleFormSubmit';
import type { FC, ReactNode } from 'react';
import { useEffect } from 'react';

export interface TaxCountriesPageFormData {
  rates: Array<{
    rate: string;
    taxClass: Omit<TaxClassFragment, 'countries'>;
  }>;
  country: string;
}
export interface UseTaxCountriesFormResult {
  data: FormsetData<TaxClassRateInput>;
  submit: () => SubmitPromise;
  handlers: { handleRateChange: (id: string, value: string) => void };
}

interface TaxCountriesFormProps {
  children: (props: unknown) => ReactNode;
  country: Maybe<TaxCountryConfigurationFragment>;
  onSubmit: (data: TaxClassRateInput[]) => SubmitPromise;
  disabled: boolean;
}

function useTaxCountriesForm(
  country: TaxCountryConfigurationFragment,
  onSubmit,
  disabled
): UseTaxCountriesFormResult {
  // Initial
  const { t } = useTranslation();
  const initialFormsetData = country?.taxClassCountryRates.map((item) => ({
    id: item.taxClass?.id ?? null,
    label: item.taxClass?.name ?? t('dashboard.countryDefaultRate', 'Country default rate'),
    value: item.rate?.toString() ?? '',
    data: null,
  }));

  const { formId, triggerChange } = useForm({}, undefined, {
    confirmLeave: true,
  });

  const formset = useFormset(initialFormsetData);

  // Handlers
  const handleRateChange = (id: string, value: string) => {
    triggerChange();
    formset.change(id, value);
  };

  // Submit
  const submitData = formset.data?.map((item) => {
    const { id, value } = item;
    const parsedRate = parseFloat(value);
    return {
      rate: isNaN(parsedRate) ? null : parsedRate,
      taxClassId: id,
    };
  });

  const handleSubmit = async (data: TaxClassRateInput[]) => {
    return await onSubmit(data);
  };

  const handleFormSubmit = useHandleFormSubmit({
    formId,
    onSubmit: handleSubmit,
  });

  const submit = () => handleFormSubmit(submitData);

  // Exit form util

  const { setExitDialogSubmitRef, setIsSubmitDisabled } = useExitFormDialog({
    formId,
  });

  useEffect(() => setExitDialogSubmitRef(submit), [setExitDialogSubmitRef, submit]);
  setIsSubmitDisabled(disabled);

  return { data: formset.data, handlers: { handleRateChange }, submit };
}

const TaxCountriesForm: FC<TaxCountriesFormProps> = ({
  children,
  country,
  onSubmit,
  disabled,
}) => {
  const props = useTaxCountriesForm(country, onSubmit, disabled);

  return <form onSubmit={props.submit}>{children(props)}</form>;
};

TaxCountriesForm.displayName = 'TaxCountriesForm';
export default TaxCountriesForm;
