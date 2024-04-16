import { NextSeo } from 'next-seo';
import { useShopSettings } from '@core/ui/providers/ShopSettingsProvider';

export function NotFoundSeo() {
  const { name: shopName } = useShopSettings();
  const title = `Page Not found - ${shopName}`;
  const description = 'Page not found.';

  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        title,
        description,
        images: [
          {
            url: 'https://og-image.vercel.app/React%20Storefront.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-black.svg&images=https%3A%2F%2Ftempo.io%2Fstatic%2Flogo-ad1b99aa7c6f5acf58a61640af760cfd.svg',
            alt: 'Tempo tutorial hero image',
          },
        ],
        site_name: 'Tempo Tutorial',
      }}
    />
  );
}

export default NotFoundSeo;
