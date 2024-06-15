import type { CheckoutAddPromoCodeMutation, CheckoutAddPromoCodeMutationVariables } from '@tempo/api/generated/graphql';
import * as m from '@paraglide/messages';
import type { CheckoutFragment } from '@tempo/api/generated/graphql';
import { CheckoutAddPromoCodeDocument } from '@tempo/api/generated/graphql';
import { useLocalization } from '@tempo/ui/providers/LocalizationProvider';
import { useMutation } from '@tempo/api/hooks/useMutation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export interface PromoCodeFormData {
  promoCode: string;
}

export interface CartSummaryProps {
  checkout: Maybe<CheckoutFragment>;
}

const ENABLE_PROMO_CODE = false;

export function CartSummary({ checkout }: CartSummaryProps) {
  const [editPromoCode] = useState(false);
  const [addPromoCodeToCheckoutMutation] = useMutation<CheckoutAddPromoCodeMutation, CheckoutAddPromoCodeMutationVariables>(CheckoutAddPromoCodeDocument);
  const {
    register: registerForm,
    handleSubmit: handleSubmitForm,
    formState: { errors: errorsForm },
    setError: setErrorForm,
  } = useForm<PromoCodeFormData>({});
  const { query, formatPrice } = useLocalization();

  const onAddPromoCode = handleSubmitForm(async (formData: PromoCodeFormData) => {
    if (!checkout?.id) return;
    const { data: promoMutationData } = await addPromoCodeToCheckoutMutation({
      promoCode: formData.promoCode,
      id: checkout.id,
      // languageCode: query.languageCode,
    });
    const errors = promoMutationData?.addPromoCodeToCheckout?.errors;
    if (!!errors && errors?.length) {
      setErrorForm('promoCode', { message: errors[0]?.message || 'Error' });
    }
  });
  return (
    <div className="bg-gray-50 rounded p-4 border">
      {ENABLE_PROMO_CODE && (editPromoCode || !checkout?.discount?.amount) && (
        <form className="pb-4" onSubmit={onAddPromoCode}>
          <label htmlFor="discount-code" className="block text-sm font-medium text-gray-700">
            {m.discountCodeFieldLabel() ?? 'Discount code'}
          </label>
          <div className="flex space-x-4 mt-1">
            <input
              type="text"
              id="discount-code"
              className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
              spellCheck={false}
              {...registerForm('promoCode', {
                required: true,
              })}
            />
            <button
              type="submit"
              className="bg-gray-200 text-sm font-medium text-gray-600 rounded-md px-4 hover:bg-blue-300"
            >
              {m.activateButton() ?? 'Activate'}
            </button>
          </div>
          {!!errorsForm.promoCode && (
            <p className="text-sm text-red-500 pt-2">{errorsForm.promoCode?.message}</p>
          )}
        </form>
      )}
      <div className="flow-root">
        <dl className="text-sm my-0">
          {!!checkout?.discount?.amount && (
            <div className="py-2 flex items-center justify-between">
              <dt className="text-gray-600">{m.cart_discount() ?? 'Discount'}</dt>
              <dd className="font-medium text-gray-900">{formatPrice(checkout.discount)}</dd>
            </div>
          )}
          <div className="py-2 flex items-center justify-between">
            <dt className="text-gray-600">{m.cart_subtotal() ?? 'Subtotal'}</dt>
            <dd className="font-medium text-gray-900">
              {formatPrice(checkout?.subtotalPrice.net)}
            </dd>
          </div>
          <div className="py-2 flex items-center justify-between">
            <dt className="text-gray-600">{m.cart_shipping() ?? 'Shipping'}</dt>
            <dd className="font-medium text-gray-900">
              {formatPrice(checkout?.shippingPrice.gross)}
            </dd>
          </div>
          <div className="py-2 flex items-center justify-between">
            <dt className="text-gray-600">{m.cart_tax() ?? 'Tax'}</dt>
            <dd className="font-medium text-gray-900">
              {formatPrice(checkout?.subtotalPrice.tax)}
            </dd>
          </div>
          <div className="pt-4 flex items-center justify-between border-t border-gray-300">
            <dt className="text-lg font-bold text-gray-900">{m.cart_total() ?? 'Total'}</dt>
            <dd className="text-lg font-bold text-gray-900">
              {formatPrice(checkout?.totalPrice.gross)}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
