import type { CheckoutLineFragment, ErrorDetailsFragment } from '@tempo/api/generated/graphql';
import * as m from '@paraglide/messages';
import {
  CheckoutLineUpdateDocument,
  CheckoutLineDeleteDocument,
} from '@tempo/api/generated/graphql';
import Button from '@tempo/ui/components/buttons/Button';
import { useLocalization } from '@tempo/ui/providers/LocalizationProvider';
import { usePaths } from '@tempo/ui/providers/PathsProvider';
import { translate } from '@tempo/ui/utils/translations';
import { useMutation } from '@tempo/api/hooks/useMutation';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import type { SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';
import { useCheckout } from '@tempo/checkout/providers/CheckoutProvider';

interface CheckoutLineItemProps {
  line: Maybe<CheckoutLineFragment>;
}

export function CheckoutLineItem({ line }: CheckoutLineItemProps) {
  const paths = usePaths();
  const { query, formatPrice } = useLocalization();
  const { checkoutId } = useCheckout();
  const [updateCheckoutLines, { loading: loadingLineUpdate }] = useMutation(
    CheckoutLineUpdateDocument
  );
  const [removeProductFromCheckout] = useMutation(CheckoutLineDeleteDocument);

  const [quantity, setQuantity] = useState<number>();
  const [errors, setErrors] = useState<ErrorDetailsFragment[] | null>(null);

  useEffect(() => {
    if (!line) return;
    setQuantity(line.quantity);
  }, [line]);

  const changeLineState = (event: SyntheticEvent<HTMLInputElement>) => {
    if (!event?.currentTarget?.validity?.valid) return;
    setQuantity(parseFloat(event.currentTarget.value));
  };

  const onQuantityUpdate = async (event: SyntheticEvent<HTMLInputElement>) => {
    if (!checkoutId) return;
    changeLineState(event);
    if (!event?.currentTarget?.validity?.valid || event?.currentTarget?.value === '') return;
    const { errors } = await updateCheckoutLines({
      id: checkoutId,
      lines: [
        {
          lineId: line?.id,
          quantity: parseFloat(event.currentTarget.value),
          // productId: line?.product.id || '',
        },
      ],
      // languageCode: query.languageCode,
    });
    // const mutationErrors = result.data?.updateCheckoutLines?.errors;
    // if (mutationErrors && mutationErrors?.length) {
    //   setErrors(mutationErrors);
    // }
  };

  if (!line || !checkoutId) return null;

  return (
    <>
      <div className="flex-shrink-0 bg-white w-32 h-32 sm:w-48 sm:h-48 border object-center object-cover relative">
        {line.product?.thumbnail && (
          <Image
            src={line.product?.thumbnail?.url}
            alt={line.product?.thumbnail?.alt || ''}
            fill
          />
        )}
      </div>

      <div className="ml-8 flex-1 flex flex-col justify-center">
        <div>
          <div className="flex justify-between">
            <div className="pr-6">
              <h3 className="text-md md:text-xl font-semibold">
                <Link
                  href={paths.productBySlug(line?.product?.slug)}
                  className="font-medium text-gray-700 hover:text-gray-800"
                  data-testid={`cartProductItem${line?.product.name}`}
                >
                  {translate(line?.product, 'name')}
                </Link>
              </h3>
              <h4 className="text-md font-regular">
                <p
                  className="text-gray-700 hover:text-gray-800"
                  data-testid={`cartVariantItem${line?.product.name}`}
                >
                  {translate(line?.product, 'name')}
                </p>
              </h4>

              <Button
                type="button"
                onClick={() =>
                  removeProductFromCheckout({
                    checkoutId,
                    lineId: line?.id,
                    // languageCode: query.languageCode,
                  })
                }
                className="text-md font-medium text-indigo-600 hover:text-indigo-500 sm:ml-0 sm:mt-3"
              >
                {m.checkout_ui_removeButton() ?? 'Remove'}
              </Button>
              {errors && (
                <div>
                  {errors.map((err) => (
                    <span className="text-red-500 text-sm font-medium" key={err.field}>
                      {err.message}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex justify-items-end space-x-4 ">
              <input
                type="number"
                className={clsx(
                  'h-8 md:mt-2 w-10 md:w-16 block border-gray-300 rounded-md shadow-sm text-base',
                  errors && 'border-red-500'
                )}
                defaultValue={quantity}
                onFocus={() => {
                  setErrors(null);
                }}
                onChange={changeLineState}
                onBlur={onQuantityUpdate}
                onKeyUp={(ev) => {
                  if (ev.key === 'Enter') {
                    return onQuantityUpdate(ev);
                  }
                  return null;
                }}
                min={1}
                required
                disabled={loadingLineUpdate}
                pattern="[0-9]*"
              />
              <p className="text-md md:text-xl text-gray-900 text-right">
                {formatPrice(line?.totalPrice?.gross)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutLineItem;
