import { Open_Sans } from 'next/font/google';
import './global.css';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ApolloWrapper } from './ApolloWrapper';
import CssProvider from '@tempo/ui/providers/CssProvider';
import theme from '@kwstriping/app/theme';

// If loading a variable font, you don't need to specify the font weight
const openSans = Open_Sans({
  subsets: ['latin'],
});

export async function generateMetadata(): Promise<Metadata> {
  // const { name: shopName } = useShopSettings();
  const shopName = 'KW Striping';
  const seoTitle = shopName;
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  return {
    title: seoTitle,
    openGraph: {
      title: seoTitle,
      // description: seoDescription,
      images: [
        {
          url: 'https://kwstriping.com/hp_bg.jpg',
          alt: 'Beautiful field striped by KW Striping',
          width: 2048,
          height: 1170,
        },
      ],
      siteName: shopName,
      url,
    },
  };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={'en'} suppressHydrationWarning>
      <CssProvider theme={theme}>
        <body id="__next" className={openSans.className}>
          <ApolloWrapper>
            <NuqsAdapter>{children}</NuqsAdapter>
          </ApolloWrapper>
        </body>
      </CssProvider>
    </html>
  );
}
