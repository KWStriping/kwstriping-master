import 'server-only';

import Image from 'next/image';
import { query } from '@tempo/api/server';
import { gql } from '@tempo/api/gql';
import type { LayoutProps as CoreLayoutProps } from '@tempo/ui/components/Layout';
import CoreLayout from '@tempo/ui/components/Layout';

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

export default async function ServerLayout({ children, ...props }: LayoutProps) {
  // const { query } = useLocalization();
  const response = await query({
    query: mainMenuQuery,
    variables: { channel: 'default' }, // TODO
  });
  const data = response.data;
  const navbarItems = data?.menu?.items;
  console.log('>> navbarItems ');
  console.log(navbarItems);
  return (
    <CoreLayout
      logo={
        <Image src="/logo-black.svg" alt="KW Striping logo" height="48" width="192" priority />
      }
      navbarItems={navbarItems}
      {...props}
    >
      {children}
    </CoreLayout>
  );
}
