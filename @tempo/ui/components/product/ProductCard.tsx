import type { ProductCardFragment } from '@tempo/api/generated/graphql';
import { useShopSettings } from '@tempo/ui/providers';
import { usePaths } from '@tempo/ui/providers/PathsProvider';
import { translate } from '@tempo/ui/utils/translations';
import PhotoIcon from '@mui/icons-material/Photo';
import Skeleton from '@mui/material/Skeleton';
import Image from 'next/image';
import Link from 'next/link';

export interface ProductCardProps {
  product: Maybe<ProductCardFragment>;
}

const getCardSecondaryDescription = (product: Maybe<ProductCardFragment>) => {
  if (!product) return '';
  const artistAttribute = product.attributes.find(
    (attribute) => attribute.attribute.slug === 'artist'
  );
  const mainValue = artistAttribute?.values[0];
  if (mainValue?.name) return mainValue.name;
  if (product.category) return translate(product.category, 'name');
  return '';
};

const DISPLAY_SECONDARY_DESCRIPTION = false;

export function ProductCard({ product }: ProductCardProps) {
  const { displayProductImages } = useShopSettings();
  const { productBySlug } = usePaths();

  const secondaryDescription = getCardSecondaryDescription(product);
  const thumbnailUrl = product?.media?.find((media) => media.type === 'IMAGE')?.url;
  return (
    <li className="w-full max-w-screen-sm">
      {product ? (
        <Link href={productBySlug(product.slug)} prefetch={false}>
          {displayProductImages && (
            <div className="bg-main active:bg-brand w-full aspect-1">
              <div className="bg-white w-full h-full relative object-contain flex items-end">
                {thumbnailUrl ? (
                  <Image src={thumbnailUrl} width={512} height={512} alt={product.name} />
                ) : (
                  <div className="grid justify-items-center content-center h-full w-full">
                    <PhotoIcon className="h-10 w-10 content-center" />
                  </div>
                )}
              </div>
            </div>
          )}
          <p
            className="block mt-2 text-md font-bold text-main truncate px-3"
            data-testid={`productName${product.name}`}
          >
            {translate(product, 'name')}
          </p>
          {DISPLAY_SECONDARY_DESCRIPTION && secondaryDescription && (
            <p className="block text-md font-normal text-main underline">
              {secondaryDescription}
            </p>
          )}
        </Link>
      ) : (
        <Skeleton />
      )}
    </li>
  );
}
