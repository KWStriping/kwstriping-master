'use client';

import type { ProductDetailsFragment } from '@tempo/api/generated/graphql';
import { CheckoutAddProductLineDocument } from '@tempo/api/generated/graphql';
import { useUser } from '@tempo/api/auth/react/hooks';
import { useCheckout } from '@tempo/checkout/providers/CheckoutProvider';
import { RichText } from '@tempo/ui/components/inputs/RichText';
import Link from '@tempo/ui/components/Link';
import { AttributeDetails } from '@tempo/ui/components/product/AttributeDetails';
import { ProductGallery } from '@tempo/ui/components/product/ProductGallery';
import { useShopSettings } from '@tempo/ui/providers';
import { useLocalization } from '@tempo/ui/providers/LocalizationProvider';
import { translate } from '@tempo/ui/utils/translations';
import type { ReactNode } from 'react';
import { useMutation } from '@tempo/api/hooks/useMutation';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Spinner from '@tempo/ui/components/Spinner';
import { usePaths } from '@kwstriping/hooks/usePaths';

const DISPLAY_CATEGORY = false; // TODO
const DISPLAY_PRICES = false;
const ENABLE_CART = false; // TODO

export type OptionalQuery = {
  variant?: string;
};

interface ProductPageProps {
  product: ProductDetailsFragment;
  price: string;
  displayPrice: boolean;
  details: ReactNode;
}

function ProductPage({ product, price, displayPrice, details }: ProductPageProps) {
  const router = useRouter();
  const paths = usePaths();
  const { currentChannel, formatPrice } = useLocalization();
  const { displayProductImages } = useShopSettings();
  const { checkoutId, setCheckoutId, checkout, loading: loadingCheckout } = useCheckout();

  const { user } = useUser();

  const [addProductToCheckout] = useMutation(CheckoutAddProductLineDocument);

  const [redirecting, setRedirecting] = useState(false);

  const [selectedProductSlug, setSelectedProductSlug] = useState(product.slug);

  if (!product) return null;

  const description = translate(product, 'description');
  // console.log('oneClickCheckoutEnabled', oneClickCheckoutEnabled);

  return (
    <main className={clsx('overflow-auto md:overflow-hidden sm:w-[50%] p-8 bg-white/90 shadow')}>
      {redirecting ? (
        <Spinner />
      ) : (
        <>
          {displayProductImages && (
            <div className="col-span-2">
              <ProductGallery product={product} />
            </div>
          )}
          <div className="space-y-5 md:mt-0">
            <div>
              <h1
                className="text-4xl font-bold tracking-tight text-gray-800"
                data-testid="productName"
              >
                {translate(product, 'name')}
              </h1>
              {displayPrice && (
                <h2 className="text-xl font-bold tracking-tight text-gray-800">{price}</h2>
              )}
              {DISPLAY_CATEGORY && !!product.category?.slug && (
                <p className="text-md mt-2 font-medium text-gray-600">
                  <Link href={paths.catalog._slug(product?.category?.slug).$url()}>
                    {translate(product.category, 'name')}
                  </Link>
                </p>
              )}
            </div>

            {details}

            {description && (
              <div className="space-y-6">
                <RichText jsonStringData={description} />
              </div>
            )}

            <AttributeDetails product={product} />
          </div>
        </>
      )}
    </main>
  );
}

export default ProductPage;
