import { useShopSettings } from '@core/ui/providers/ShopSettingsProvider';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import urlJoin from 'url-join';

interface BaseSeoProps {
  title?: string;
  description?: string;
}

export function BaseSeo({ title, description }: BaseSeoProps) {
  const { name: shopName } = useShopSettings();
  const seoTitle = title ? `${title} - ${shopName}` : shopName;
  const seoDescription = description || '';

  const { asPath } = useRouter();

  const url = urlJoin(process.env.NEXT_PUBLIC_VERCEL_URL || '', asPath);

  return (
    <NextSeo
      title={seoTitle}
      description={seoDescription}
      openGraph={{
        title: seoTitle,
        description: seoDescription,
        images: [
          {
            url: 'https://kwstriping.com/hp_bg.jpg',
            alt: 'Beautiful field striped by KW Striping',
            width: 2048,
            height: 1170,
          },
        ],
        site_name: shopName,
        url,
      }}
    />
  );
}
