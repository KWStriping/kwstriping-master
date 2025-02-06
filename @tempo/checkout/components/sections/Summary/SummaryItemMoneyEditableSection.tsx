import type {
  CheckoutLineUpdateMutation,
  CheckoutLineUpdateMutationVariables,
  CheckoutLineDeleteMutation,
  CheckoutLineDeleteMutationVariables,
  CheckoutLineFragment,
} from '@tempo/api/generated/graphql';
import * as m from '@paraglide/messages';
import {
  CheckoutLineUpdateDocument,
  CheckoutLineDeleteDocument,
} from '@tempo/api/generated/graphql';

import { useErrorMessages } from '@tempo/ui/hooks';
import { useErrors } from '@tempo/ui/hooks/useErrors';
import { useGetInputProps } from '@tempo/ui/hooks/useGetInputProps';
import { useMutation } from '@tempo/api/hooks/useMutation';
import { useValidationResolver } from '@tempo/utils';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
// import { TextInput } from '@tempo/checkout/components/TextInput';
// import { useSubmit } from '@tempo/checkout/hooks/useSubmit';

interface LineItemQuantitySelectorProps {
  line: Maybe<CheckoutLineFragment>;
}

export interface SummaryLineFormData {
  quantity: string;
}

export const SummaryItemMoneyEditableSection: FC<LineItemQuantitySelectorProps> = ({ line }) => {
  const [updateLine, { loading: updating }] = useMutation(CheckoutLineUpdateDocument);
  const [deleteLine] = useMutation(CheckoutLineDeleteDocument);
  const { setApiErrors } = useErrors<SummaryLineFormData>();
  const { errorMessages } = useErrorMessages();

  const schema = object({
    quantity: string().required(errorMessages.required),
  });

  const resolver = useValidationResolver(schema);
  const methods = useForm<SummaryLineFormData>({
    resolver,
    defaultValues: { quantity: line?.quantity.toString() },
  });

  const { watch, setValue } = methods;

  const getInputProps = useGetInputProps(methods as any); // TODO: fix types

  const quantityString = watch('quantity');
  const quantity = Number(quantityString);

  // const handleLineQuantityUpdate = useSubmit<SummaryLineFormData, typeof updateLine>({
  //   onSubmit: updateLine,
  //   formDataParse: ({ quantity, languageCode, checkoutId }) => ({
  //     languageCode,
  //     id: checkoutId,
  //     lines: [
  //       {
  //         quantity: Number(quantity),
  //         productId: line?.product.id,
  //       },
  //     ],
  //   }),
  //   onError: (errors, { quantity }) => {
  //     setValue('quantity', quantity);
  //     setApiErrors(errors);
  //   },
  // });

  // const handleLineDelete = useSubmit<{}, typeof deleteLine>({
  //   // scope: 'deleteCheckoutLines',
  //   onSubmit: deleteLine,
  //   formDataParse: ({ languageCode, checkoutId }) => ({
  //     languageCode,
  //     checkoutId,
  //     lineId: line?.id,
  //   }),
  //   onError: (errors) => setApiErrors(errors),
  // });

  // const handleQuantityInputBlur = () => {
  //   if (quantity === line.quantity) return;

  //   const isQuantityValid = !Number.isNaN(quantity) && quantity >= 0;

  //   if (quantityString === '' || !isQuantityValid) {
  //     setValue('quantity', String(line.quantity));
  //     return;
  //   }

  //   if (quantity === 0) {
  //     void handleLineDelete({});
  //     return;
  //   }

  //   void handleLineQuantityUpdate({ quantity: quantityString });
  // };

  return (
    <div className="flex flex-col items-end h-20 relative -top-2">
      <div className="flex flex-row items-baseline">
        <Typography fontSize="xs" className="mr-2">
          <>{m.checkout_quantity() ?? 'quantity'}:</>
        </Typography>
        {/* <TextInput
          variant="outlined"
          // className={{ container: '!w-13 !mb-0', input: 'text-center !h-8' }}
          label=""
          {...getInputProps('quantity', { onBlur: handleQuantityInputBlur })}
        /> */}
      </div>
      {
        updating ? (
          <div className="flex flex-col items-end mt-3 w-full">
            <Skeleton className="w-full" />
            <Skeleton className="w-2/3" />
          </div>
        ) : null // <SummaryItemMoneyInfo {...line} classNames={{ container: 'mt-1' }} />
      }
    </div>
  );
};
