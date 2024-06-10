'use client';

import type { AbstractProductDetailsFragment } from '@tempo/api/generated/graphql';
import { useUser } from '@tempo/api/auth/react/hooks';
import { useCheckout } from '@tempo/checkout/providers/CheckoutProvider';
import Link from '@tempo/ui/components/Link';
import { ProductGallery } from '@tempo/ui/components/product/ProductGallery';
import { VariantSelector } from '@tempo/ui/components/product/VariantSelector';
import { ProductPageSeo } from '@tempo/ui/components/seo/ProductPageSeo';
import { useShopSettings } from '@tempo/ui/providers';
import { useLocalization } from '@tempo/ui/providers/LocalizationProvider';
import { translate } from '@tempo/ui/utils/translations';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Spinner from '@tempo/ui/components/Spinner';
import { usePaths } from '@kwstriping/hooks/usePaths';
import ProductPage from './product';

const DISPLAY_CATEGORY = false; // TODO
const DISPLAY_PRICES = false;
const ENABLE_CART = false; // TODO

export type OptionalQuery = {
  variant?: string;
};

interface ProductPageProps {
  product: AbstractProductDetailsFragment;
}

function AbstractProductDetails({ product }: ProductPageProps) {
  const router = useRouter();
  const paths = usePaths();
  const { currentChannel, formatPrice } = useLocalization();
  const { displayProductImages } = useShopSettings();
  const { checkoutId, setCheckoutId, checkout, loading: loadingCheckout } = useCheckout();

  const { user } = useUser();

  const [redirecting, setRedirecting] = useState(false);

  const [selectedProductSlug, setSelectedProductSlug] = useState(product.slug);

  if (!product) return null;

  const description = translate(product, 'description');

  const price = product.pricing?.priceRange?.start?.gross;

  // TODO
  const shouldDisplayPrice = product.variants?.length === 1 && price && DISPLAY_PRICES;
  // console.log('oneClickCheckoutEnabled', oneClickCheckoutEnabled);

  console.log('>>>> product', product);
  return (
    <>
      <ProductPageSeo product={product} />
      <main
        className={clsx('overflow-auto md:overflow-hidden sm:w-[50%] p-8 bg-white/90 shadow')}
      >
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
                {shouldDisplayPrice && (
                  <h2 className="text-xl font-bold tracking-tight text-gray-800">
                    {formatPrice(price)}
                  </h2>
                )}
                {DISPLAY_CATEGORY && !!product.category?.slug && (
                  <p className="text-md mt-2 font-medium text-gray-600">
                    <Link href={paths.catalog._slug(product?.category?.slug).$url()}>
                      {translate(product.category, 'name')}
                    </Link>
                  </p>
                )}
              </div>

              <div
                className={`text-base text-yellow-600 h-[1.5rem] ${
                  !product?.variants?.length && 'block'
                }`}
              >
                {product?.variants?.length ? 'Please choose one of these options' : <hr />}
              </div>
              {product.ancestors?.map((ancestor) => (
                <VariantSelector
                  key={ancestor.id}
                  variants={ancestor.variants}
                  selectedVariant={null}
                  onChange={(value: string) => {
                    setSelectedProductSlug(value);
                    void router.replace(`/products/${value}`, {
                      scroll: false,
                    });
                  }}
                />
              ))}
              <VariantSelector
                variants={product.variants}
                selectedVariant={null}
                onChange={(value: string) => {
                  setSelectedProductSlug(value);
                  void router.replace(`/products/${value}`, {
                    // shallow: true,
                    scroll: false,
                  });
                }}
              />
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default function AbstractProductPage({ product }: ProductPageProps) {
  const price = product.pricing?.priceRange?.start?.gross;
  const { formatPrice } = useLocalization();

  // TODO
  const shouldDisplayPrice = !!(product.variants?.length === 1 && price && DISPLAY_PRICES);

  return (
    <ProductPage
      product={product}
      price={formatPrice(price)}
      displayPrice={shouldDisplayPrice}
      details={<AbstractProductDetails product={product} />}
    />
  );
}
