import type { ShopInfoQuery, ShopInfoQueryVariables } from '@tempo/api/generated/graphql';
import { useUser } from '@tempo/api/auth/react/hooks';
import { useQuery } from '@tempo/api/hooks';
import appleTouchIcon from '@dashboard/assets/favicons/apple-touch-icon.png';
import favicon16 from '@dashboard/assets/favicons/favicon-16x16.png';
import favicon32 from '@dashboard/assets/favicons/favicon-32x32.png';
import safariPinnedTab from '@dashboard/assets/favicons/safari-pinned-tab.svg';
import { ShopInfoDocument } from '@tempo/api/generated/graphql';
import type { ShopInfoQuery } from '@tempo/api/generated/graphql';
import Head from 'next/head';
import type { Context, FC, ReactNode } from 'react';
import { createContext } from 'react';

type ShopContextType = ShopInfoQuery['shop'];

export const ShopContext: Context<ShopContextType | undefined> = createContext<
  ShopContextType | undefined
>(undefined);

export const ShopProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { authenticated, user } = useUser();
  console.log('>>> authenticated', authenticated);
  const { data } = useQuery(ShopInfoDocument, {
    pause: !authenticated || !user,
  });

  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
        <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
        <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
        <link rel="mask-icon" href={safariPinnedTab} />
      </Head>
      <ShopContext.Provider value={data ? data?.shop : undefined}>
        {children}
      </ShopContext.Provider>
    </>
  );
};
