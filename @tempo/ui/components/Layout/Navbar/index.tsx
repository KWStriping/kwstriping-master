'use client';

import type {
  CheckoutLineFragment,
  MenuItemWithChildrenFragment,
} from '@tempo/api/generated/graphql';
import { useUser } from '@tempo/api/auth/react/hooks';
import { useCheckout } from '@tempo/checkout/providers/CheckoutProvider';
import IconButton from '@tempo/ui/components/buttons/IconButton';
import GraphqlIcon from '@tempo/ui/icons/GraphQLIcon.svg';
import { useShopSettings } from '@tempo/ui/providers';
import { usePaths } from '@tempo/ui/providers/PathsProvider';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import BrightnessLowIcon from '@mui/icons-material/BrightnessLow';
import { useColorScheme } from '@mui/material/styles';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import { BurgerMenu } from './BurgerMenu';
import styles from './index.module.css';
import { Menu } from './Menu';
import NavIconButton from './NavIconButton';
import UserMenu from './UserMenu';

interface NavbarProps {
  height?: string;
  logo: ReactNode;
  items: Maybe<Omit<MenuItemWithChildrenFragment, '__typename'>[]>;
}

const ENABLE_COLOR_MODE_TOGGLE = process.env.NODE_ENV === 'development';
const ENABLE_GRAPHQL_PLAYGROUND = process.env.NODE_ENV === 'development';

export function Navbar({ logo, items, height = '7rem' }: NavbarProps) {
  const paths = usePaths();
  const router = useRouter();
  const { enableCart, enableLogin, enableSearch } = useShopSettings();
  const [isBurgerOpen, setBurgerOpen] = useState(false);
  const { authenticated, loading, user } = useUser();
  const { checkout } = useCheckout();
  const { mode, setMode } = useColorScheme();

  useEffect(() => {
    // Close side menu after changing the page
    router.events.on('routeChangeStart', () => {
      if (isBurgerOpen) {
        setBurgerOpen(false);
      }
    });
  });

  const counter =
    checkout?.lines?.reduce(
      (amount: number, line?: CheckoutLineFragment | null) =>
        line ? amount + line.quantity : amount,
      0
    ) || 0;
  const enableGraphQLPlayground = ENABLE_GRAPHQL_PLAYGROUND;
  const enableColorModeToggle = ENABLE_COLOR_MODE_TOGGLE;
  return (
    <>
      <div className={styles.navbar ?? ''}>
        <div className={styles.inner ?? ''} style={{ height }}>
          <div className="h-full xs:flex items-center relative mx-2">
            <Link
              href={paths.home()}
              className={`${styles.logo} relative w-full h-full flex items-center`}
            >
              {logo}
            </Link>
          </div>
          <div className="flex-1 flex h-full items-center xs:justify-center md:justify-start">
            <Menu items={items} />
          </div>
          <div className="flex-1 flex items-center justify-end gap-3">
            {enableSearch && (
              <Link href={paths.search()} className="hidden lg:flex ml-2">
                <NavIconButton icon="spyglass" data-testid="searchIcon" />
              </Link>
            )}
            {enableGraphQLPlayground && (
              <a
                target="_blank"
                href={`${process.env.NEXT_PUBLIC_STOREFRONT_URL}/graphql/`}
                rel="noreferrer"
              >
                <IconButton>
                  <GraphqlIcon />
                </IconButton>
              </a>
            )}
            {enableColorModeToggle && (
              <IconButton onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
                {mode === 'dark' ? <BrightnessHighIcon /> : <BrightnessLowIcon />}
              </IconButton>
            )}
            {enableCart && (
              <Link href={paths.cart()} className="hidden xs:flex">
                <NavIconButton icon="bag" aria-hidden="true" counter={counter} />
              </Link>
            )}
            {authenticated ? (
              <UserMenu user={user} />
            ) : (
              enableLogin && (
                <Link href={paths.login()} className={clsx(loading && 'invisible')}>
                  <NavIconButton icon="login" aria-hidden="true" />
                </Link>
              )
            )}
            <NavIconButton
              icon="menu"
              className="ml-2 md:hidden"
              onClick={() => setBurgerOpen(true)}
            />
          </div>
        </div>
      </div>
      <BurgerMenu items={items} open={isBurgerOpen} onCloseClick={() => setBurgerOpen(false)} />
    </>
  );
}

export default Navbar;
