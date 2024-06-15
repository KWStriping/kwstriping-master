import type { CheckoutAddPromoCodeMutation, CheckoutAddPromoCodeMutationVariables } from '@tempo/api/generated/graphql';
import * as m from '@paraglide/messages';
import { CheckoutAddPromoCodeDocument } from '@tempo/api/generated/graphql';
import { Button } from '@tempo/ui/components/buttons/Button';
import { useAlerts } from '@tempo/ui/hooks/useAlerts';
import { useErrors } from '@tempo/ui/hooks/useErrors';
import { useGetInputProps } from '@tempo/ui/hooks/useGetInputProps';
import { useMutation } from '@tempo/api/hooks/useMutation';
import { extractMutationErrors, useValidationResolver } from '@tempo/utils';
import clsx from 'clsx';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { summaryLabels, summaryMessages } from './messages';
import { TextInput } from '@tempo/checkout/components/TextInput';
import { useSetFormErrors } from '@tempo/checkout/hooks/useSetFormErrors';
import { useCheckout } from '@tempo/checkout/providers/CheckoutProvider';

interface FormData {
  promoCode: string;
}

export const PromoCodeAdd: FC = ({ className }: { className?: string }) => {
  const { checkout } = useCheckout();
  const { setApiErrors, errors } = useErrors<FormData>();
  const { showErrors } = useAlerts('addPromoCodeToCheckout');

  const schema = object({
    code: string(),
  });
  const resolver = useValidationResolver(schema);

  const [addPromoCodeToCheckout] = useMutation<CheckoutAddPromoCodeMutation, CheckoutAddPromoCodeMutationVariables>(CheckoutAddPromoCodeDocument);

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
        label={m[summaryMessages.addDiscount.id] ?? summaryMessages.addDiscount.defaultMessage}
        {...getInputProps('promoCode')}
        optional
      />
      {showApplyButton && (
        <Button
          className="absolute right-7 top-7"
          color="secondary"
          size="small"
          aria-label={m[summaryLabels.apply.id] ?? summaryLabels.apply.defaultMessage}
          onClick={handleSubmit(onSubmit)}
        >
          {m[summaryMessages.apply.id] ?? summaryMessages.apply.defaultMessage}
        </Button>
      )}
    </div>
  );
};
