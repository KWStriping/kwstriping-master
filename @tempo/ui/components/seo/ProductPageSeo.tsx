import type { ProductDetailsFragment } from '@tempo/api/generated/graphql';
import { useShopSettings } from '@tempo/ui/providers/ShopSettingsProvider';

interface ProductPageSeoProps {
  product: ProductDetailsFragment;
}

export function ProductPageSeo({ product }: ProductPageSeoProps) {
  const { name: shopName } = useShopSettings();
  const productName = product.seoTitle || product.name;
  const title = productName ? `${productName} - ${shopName}` : shopName;

  const description = product?.seoDescription || '';
  const thumbnailUrl = product.thumbnail?.url || '';
  const thumbnailAlt = product.thumbnail?.alt || title;

  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        title,
        description,
        images: [
          {
            url: thumbnailUrl,
            alt: thumbnailAlt,
          },
        ],
        site_name: 'Tempo Tutorial',
      }}
    />
  );
}

export default ProductPageSeo;
