import { CheckoutAddPromoCodeDocument } from '@core/api';
import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import { useAlerts } from '@core/ui/hooks/useAlerts';
import { useErrors } from '@core/ui/hooks/useErrors';
import { useGetInputProps } from '@core/ui/hooks/useGetInputProps';
import { useMutation } from '@core/urql/hooks/useMutation';
import { extractMutationErrors, useValidationResolver } from '@core/utils';
import clsx from 'clsx';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { TextInput } from '@core/checkout/components/TextInput';
import { useSetFormErrors } from '@core/checkout/hooks/useSetFormErrors';
import { useCheckout } from '@core/checkout/providers/CheckoutProvider';
import { summaryLabels, summaryMessages } from './messages';

interface FormData {
  promoCode: string;
}

export const PromoCodeAdd: FC = ({ className }: { className?: string }) => {
  const { checkout } = useCheckout();
  const { t } = useTranslation();
  const { setApiErrors, errors } = useErrors<FormData>();
  const { showErrors } = useAlerts('addPromoCodeToCheckout');

  const schema = object({
    code: string(),
  });
  const resolver = useValidationResolver(schema);

  const [addPromoCodeToCheckout] = useMutation(CheckoutAddPromoCodeDocument);

  const formProps = useForm<FormData>({
    resolver,
    defaultValues: { promoCode: '' },
  });
  const { handleSubmit, watch, setError, reset } = formProps;
  const getInputProps = useGetInputProps(formProps as any); // TODO: fix types

  const showApplyButton = !!watch('promoCode');

  const onSubmit = async ({ promoCode }: FormData) => {
    if (!checkout) return;
    const result = await addPromoCodeToCheckout({
      promoCode,
      id: checkout.id,
      languageCode: 'EN_US', // TODO
    });
    const [hasErrors, apiErrors] = extractMutationErrors(result);

    if (hasErrors) {
      setApiErrors(apiErrors);
      showErrors(apiErrors);
      return;
    }

    reset();
  };

  useSetFormErrors<FormData>({
    setError,
    errors,
  });

  return (
    <div className={clsx('relative px-4 pt-4', className)}>
      <TextInput
        label={t(summaryMessages.addDiscount.id, summaryMessages.addDiscount.defaultMessage)}
        {...getInputProps('promoCode')}
        optional
      />
      {showApplyButton && (
        <Button
          className="absolute right-7 top-7"
          color="secondary"
          size="small"
          aria-label={t(summaryLabels.apply.id, summaryLabels.apply.defaultMessage)}
          onClick={handleSubmit(onSubmit)}
        >
          {t(summaryMessages.apply.id, summaryMessages.apply.defaultMessage)}
        </Button>
      )}
    </div>
  );
};
