import type { CheckoutLineFragment } from '@core/api';
import { CheckoutLinesUpdateDocument } from '@core/api';

import { useTranslation } from '@core/i18n';
import { useErrorMessages } from '@core/ui/hooks';
import { useErrors } from '@core/ui/hooks/useErrors';
import { useGetInputProps } from '@core/ui/hooks/useGetInputProps';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useValidationResolver } from '@core/utils';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { SummaryItemMoneyInfo } from '@core/checkout/components/sections/Summary/SummaryItemMoneyInfo';
import { TextInput } from '@core/checkout/components/TextInput';
import { useSubmit } from '@core/checkout/hooks/useSubmit';

interface LineItemQuantitySelectorProps {
  line: Maybe<CheckoutLineFragment>;
}

export interface SummaryLineFormData {
  quantity: string;
}

export const SummaryItemMoneyEditableSection: FC<LineItemQuantitySelectorProps> = ({ line }) => {
  const { t } = useTranslation();
  const [updateLines, { fetching: updating }] = useMutation(CheckoutLinesUpdateDocument);
  const [deleteLines] = useMutation(CheckoutLineDeleteDocument);
  const { setApiErrors } = useErrors<SummaryLineFormData>();
  const { errorMessages } = useErrorMessages();

  const schema = object({
    quantity: string().required(errorMessages.required),
  });

  const resolver = useValidationResolver(schema);
  const methods = useForm<SummaryLineFormData>({
    resolver,
    defaultValues: { quantity: line.quantity.toString() },
  });

  const { watch, setValue } = methods;

  const getInputProps = useGetInputProps(methods as any); // TODO: fix types

  const quantityString = watch('quantity');
  const quantity = Number(quantityString);

  const handleLineQuantityUpdate = useSubmit<SummaryLineFormData, typeof updateLines>({
    scope: 'updateCheckoutLines',
    onSubmit: updateLines,
    formDataParse: ({ quantity, languageCode, checkoutId }) => ({
      languageCode,
      checkoutId,
      lines: [
        {
          quantity: Number(quantity),
          productId: line.product.id,
        },
      ],
    }),
    onError: (errors, { quantity }) => {
      setValue('quantity', quantity);
      setApiErrors(errors);
    },
  });

  const handleLineDelete = useSubmit<{}, typeof deleteLines>({
    scope: 'deleteCheckoutLines',
    onSubmit: deleteLines,
    formDataParse: ({ languageCode, checkoutId }) => ({
      languageCode,
      checkoutId,
      lineId: line.id,
    }),
    onError: (errors) => setApiErrors(errors),
  });

  const handleQuantityInputBlur = () => {
    if (quantity === line.quantity) return;

    const isQuantityValid = !Number.isNaN(quantity) && quantity >= 0;

    if (quantityString === '' || !isQuantityValid) {
      setValue('quantity', String(line.quantity));
      return;
    }

    if (quantity === 0) {
      void handleLineDelete({});
      return;
    }

    void handleLineQuantityUpdate({ quantity: quantityString });
  };

  return (
    <div className="flex flex-col items-end h-20 relative -top-2">
      <div className="flex flex-row items-baseline">
        <Typography fontSize="xs" className="mr-2">
          <>{t('checkout.quantity', 'quantity')}:</>
        </Typography>
        <TextInput
          variant="outlined"
          // className={{ container: '!w-13 !mb-0', input: 'text-center !h-8' }}
          label=""
          {...getInputProps('quantity', { onBlur: handleQuantityInputBlur })}
        />
      </div>
      {updating ? (
        <div className="flex flex-col items-end mt-3 w-full">
          <Skeleton className="w-full" />
          <Skeleton className="w-2/3" />
        </div>
      ) : (
        <SummaryItemMoneyInfo {...line} classNames={{ container: 'mt-1' }} />
      )}
    </div>
  );
};
