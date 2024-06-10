import { useShopSettings } from '@core/ui/hooks/useShopSettings';
import Head from 'next/head';
import type { FC } from 'react';

interface WindowTitleProps {
  title: string;
}

export const WindowTitle: FC<WindowTitleProps> = ({ title }) => {
  const shop = useShopSettings();

  return shop === undefined || !title ? null : (
    <Head>
      <title>{`${title} | ${shop.name}`}</title>
    </Head>
  );
};
