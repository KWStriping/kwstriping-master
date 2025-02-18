'use client';

import { useMemo } from 'react';

import Image from 'next/image';
// import ContextProvider from './context';
import type { LayoutProps as CoreLayoutProps } from '@tempo/ui/components/Layout';
import CoreLayout from '@tempo/ui/components/Layout';

import { useQuery } from '@tempo/api/hooks/useQuery';
import { gql } from '@tempo/api';

type LayoutProps = Pick<CoreLayoutProps, 'children' | 'transparentBg'>;

const mainMenuQuery = gql(`
  query MainMenu($channel: String!) {
    menu(slug: "navbar", channel: $channel) {
      id
      items {
        ...MenuItemWithChildren
      }
    }
  }
`);

export default function ClientLayout({ children, ...props }: LayoutProps) {
  // const { query } = useLocalization();
  const query = { channel: 'default' };
  const { data } = useQuery(mainMenuQuery, {
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
    <>
      <CoreLayout
        logo={
          <Image src="/logo-black.svg" alt="KW Striping logo" height="48" width="192" priority />
        }
        navbarItems={navbarItems}
        {...props}
      >
        {children}
      </CoreLayout>
    </>
  );
}
