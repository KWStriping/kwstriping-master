'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import ProductPage from './product';
import type { ConcreteProductDetailsFragment, CheckoutError } from '@tempo/api/generated/graphql';
import { CheckoutAddProductLineDocument } from '@tempo/api/generated/graphql';
import { useUser } from '@tempo/api/auth/react/hooks';
import { useCheckout } from '@tempo/checkout/providers/CheckoutProvider';
import { Button } from '@tempo/ui/components/buttons/Button';
import Link from '@tempo/ui/components/Link';
import { VariantSelector } from '@tempo/ui/components/product/VariantSelector';
import { useShopSettings } from '@tempo/ui/providers';
import { useLocalization } from '@tempo/ui/providers/LocalizationProvider';
import { useMutation } from '@tempo/api/hooks';
import Spinner from '@tempo/ui/components/Spinner';
import { gql } from '@tempo/api/gql';
import * as m from '@paraglide/messages';

const DISPLAY_CATEGORY = false; // TODO
const DISPLAY_PRICES = false;
const ENABLE_CART = false; // TODO

const createCheckoutMutation = gql(`
  mutation CreateCheckout($email: String, $lines: [CheckoutLineInput!]!, $channel: String!) {
    createCheckout(data: { channel: $channel, email: $email, lines: $lines }) {
      result {
        id
      }
      errors {
        field
        message
        code
      }
    }
  }
`);

export type OptionalQuery = {
  variant?: string;
};

interface ProductPageProps {
  product: ConcreteProductDetailsFragment;
}

function ConcreteProductDetails({ product }: ProductPageProps) {
  const router = useRouter();
  const { currentChannel, formatPrice } = useLocalization();
  const { displayProductImages } = useShopSettings();
  const { checkoutId, setCheckoutId, checkout, loading: loadingCheckout } = useCheckout();

  const [createCheckout] = useMutation(createCheckoutMutation);
  const { user } = useUser();

  const [addProductToCheckout] = useMutation(CheckoutAddProductLineDocument);

  const [oneClickCheckoutEnabled, setOneClickCheckoutEnabled] = useState(false);

  const [loadingAddToCart, setLoadingAddToCart] = useState(false);
  const [loadingRequestItNow, setLoadingRequestItNow] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [addToCartError, setAddToCartError] = useState('');
  const [addToCartSuccess, setAddToCartSuccess] = useState('');

  useEffect(() => {
    if (product?.isAvailableForPurchase && !loadingCheckout) {
      setOneClickCheckoutEnabled(true);
    } else if (oneClickCheckoutEnabled) {
      setOneClickCheckoutEnabled(false);
    }
  }, [product, checkout, loadingCheckout, oneClickCheckoutEnabled]);

  const [selectedProductSlug, setSelectedProductSlug] = useState(product.slug);

  if (!product) return null;

  const createNewCartWithSelectedProduct = async () => {
    console.log('Creating new checkout ...');
    const { data: createCheckoutData } = await createCheckout({
      email: user?.email,
      channel: currentChannel.slug,
      lines: [
        {
          quantity: 1,
          productId: product.id,
        },
      ],
    });
    // createCheckoutData?.createCheckout?.errors?.forEach((e) => {
    //   if (e.__typename === 'CheckoutError') {
    //     errors.push(e);
    //   }
    // });
    if (createCheckoutData?.createCheckout?.result?.id) {
      setCheckoutId(createCheckoutData.createCheckout.result.id);
    }
  };

  const addToCart = async () => {
    const errors: CheckoutError[] = [];
    if (checkoutId) {
      console.log('checkoutId', checkoutId);
      console.log('Adding products to existing checkout ^');
      // If checkout is already existing, add products
      const { data: _addToCartData } = await addProductToCheckout({
        checkoutId,
        productId: product.id,
        // languageCode: query.languageCode,
      });
      // TODO
      // addToCartData?.addCheckoutLines?.errors?.forEach((e) => {
      //   if (e.__typename === 'CheckoutError') {
      //     errors.push(e);
      //   }
      // });
    } else {
      // There's no checkout; we have to create one.
      await createNewCartWithSelectedProduct();
    }
    return errors;
  };

  const onRequestItNow = () => {
    // Clear previous error messages
    setAddToCartError('');

    // Block add to checkout button
    setLoadingRequestItNow(true);

    createNewCartWithSelectedProduct()
      .then(() => {
        setRedirecting(true);
        router.push(`/checkout`);
      })
      .catch((e) => {
        throw e;
      });
  };

  const onAddToCart = async () => {
    // Clear previous error messages
    setAddToCartError('');

    // Block add to checkout button
    setLoadingAddToCart(true);

    const errors = await addToCart();

    // Enable button
    setLoadingAddToCart(false);

    if (errors?.length === 0) {
      // Product successfully added
      setAddToCartSuccess(m.addedToCart() ?? 'Added to cart');
      return;
    }

    // Display error message
    const errorMessages = errors.map((e) => e.message || '') || [];
    setAddToCartError(errorMessages.join('\n'));
  };

  const isAddToCartButtonDisabled = !product?.quantityAvailable || loadingAddToCart;

  console.log('>>>> product', product);
  return (
    <>
      {product.ancestors?.map((ancestor) => (
        <VariantSelector
          key={ancestor.id}
          variants={ancestor.variants}
          selectedVariant={null}
          onChange={(value: string) => {
            setSelectedProductSlug(value);
            void router.replace(`/products/${value}`, {
              // shallow: true,
              scroll: false,
            });
          }}
        />
      ))}
      {ENABLE_CART && (
        <Button
          onClick={onAddToCart}
          type="submit"
          disabled={isAddToCartButtonDisabled}
          className={clsx(
            'w-full py-3 px-8 flex items-center justify-center disabled:bg-disabled',
            !isAddToCartButtonDisabled && 'hover:border-action'
          )}
          data-testid="addToCartButton"
        >
          {loadingAddToCart ? 'Adding...' : 'Add to cart'}
        </Button>
      )}

      {oneClickCheckoutEnabled && (
        <Button
          onClick={onRequestItNow}
          disabled={isAddToCartButtonDisabled}
          className={clsx(
            'w-full py-3 px-8 flex items-center justify-center disabled:bg-disabled',
            !isAddToCartButtonDisabled && 'hover:border-action'
          )}
          data-testid="instantCheckoutButton"
        >
          {loadingRequestItNow ? (
            <Spinner />
          ) : (
            (m.checkout_oneClickCheckout() ?? 'Submit request')
          )}
        </Button>
      )}

      {product?.quantityAvailable === 0 && (
        <p className="text-base text-yellow-600" data-testid="soldOut">
          {'Sold out!'}
        </p>
      )}

      {!!addToCartError && <p className="text-base text-red-600">{addToCartError}</p>}
      {!!addToCartSuccess && (
        <div className={'flex flex-col justify-between gap-8'}>
          <p className="text-green-600">{addToCartSuccess}</p>
          <p>
            <Link href={'/checkout'}>{'Proceed to checkout?'}</Link>
          </p>
        </div>
      )}
    </>
  );
}

export default function ConcreteProductPage({ product }: ProductPageProps) {
  const { formatPrice } = useLocalization();
  const shouldDisplayPrice = DISPLAY_PRICES;
  return (
    <ProductPage
      product={product}
      price={formatPrice(product.pricing?.price.gross)}
      displayPrice={shouldDisplayPrice}
      details={<ConcreteProductDetails product={product} />}
    />
  );
}
