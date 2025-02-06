'use client';

import type { MainMenuQuery, MainMenuQueryVariables } from '@tempo/api/generated/graphql';
import { useMemo } from 'react';

import { MainMenuDocument } from '@tempo/api/generated/graphql';
import type { LayoutProps as CoreLayoutProps } from '@tempo/ui/components/Layout';
import CoreLayout from '@tempo/ui/components/Layout';

import { useLocalization } from '@tempo/ui/providers/LocalizationProvider';
import { useQuery } from '@tempo/api/hooks/useQuery';
import Image from 'next/image';
import { ToastContainer } from 'react-toastify';
import ContextProvider from './context';

type LayoutProps = Pick<CoreLayoutProps, 'children' | 'transparentBg'>;

export default function ClientLayout({ children, ...props }: LayoutProps) {
  const { query } = useLocalization();
  const { data } = useQuery(MainMenuDocument, {
    variables: { ...query },
  });
  const navbarItems = useMemo(
    () =>
      data?.menu?.items
        ? [
            ...data.menu.items,
            // { id: 'gallery', name: 'Gallery', url: '/gallery' },
            // { id: 'contact', name: 'Contact', url: '/contact' },
          ]
        : [],
    [data?.menu?.items]
  );
  return (
    <ContextProvider>
      {/* TODO https://fkhadra.github.io/react-toastify/introduction/ */}
      <ToastContainer />
      <CoreLayout
        logo={
          <Image src="/logo-black.svg" alt="KW Striping logo" height="48" width="192" priority />
        }
        navbarItems={navbarItems}
        {...props}
      >
        {children}
      </CoreLayout>
    </ContextProvider>
  );
}
