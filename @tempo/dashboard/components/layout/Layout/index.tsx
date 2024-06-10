import { useUser, useLogout } from '@tempo/api/auth/react/hooks';
import { useShopSettings } from '@tempo/ui';
import NavigatorButton from '@tempo/ui/components/buttons/NavigatorButton';
import { useBacklink } from '@tempo/ui/components/Layout/Backlink';
import Logo from '@tempo/ui/components/Layout/Logo';
import Link from '@tempo/ui/components/Link';
import { useColorScheme } from '@tempo/ui/theme/styles';
import type { Theme } from '@tempo/ui/theme/types';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { FC, ReactNode } from 'react';
import SidebarDrawer from '@tempo/dashboard/components/layout/SidebarDrawer';
import Sidebar from '@tempo/dashboard/components/layout/Sidebar';
import { useActionBar } from '@tempo/dashboard/components/bars/ActionBar';
import UserChip from '../../alerts/UserChip';
import Navigator from '../../navigation/Navigator';

import useAppChannel from './AppChannelContext';
import AppChannelSelect from './AppChannelSelect';
import styles from './index.module.css';
import useMenuStructure from './menuStructure';
import { isMenuActive } from './utils';

interface LayoutProps {
  children: ReactNode;
  fullSize?: boolean;
}

const Layout: FC<LayoutProps> = ({ children, fullSize = false }) => {
  const router = useRouter();
  const { user } = useUser();
  const { logout } = useLogout();
  const { logo } = useShopSettings();
  const { mode, setMode } = useColorScheme();
  const [menuStructure, handleMenuItemClick] = useMenuStructure();
  const backlinkContainer = useBacklink();
  const { anchor: appActionAnchor } = useActionBar();
  const [isNavigatorVisible, setNavigatorVisibility] = useState(false);
  const { availableChannels, channel, isPickerActive, setChannel } = useAppChannel(false);
  const isMdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const activeMenuItemId = menuStructure.find((menuItem) =>
    isMenuActive(router.asPath, menuItem)
  )?.id;

  const toggleTheme = () => setMode(mode === 'dark' ? 'light' : 'dark');
  // console.log('>>>>>', logo);
  return (
    <>
      <Navigator visible={isNavigatorVisible} setVisibility={setNavigatorVisibility} />
      <Box
        className={clsx('grid', styles.header)}
        sx={{ height: `calc(${logo.height ?? 52}px + 8px)` }}
      >
        <div
          className={clsx(
            'flex w-full px-3 gap-4 border-0 border-b border-solid border-divider',
            styles.headerToolbar
          )}
        >
          {!isMdUp && (
            <SidebarDrawer menuItems={menuStructure} onMenuItemClick={handleMenuItemClick} />
          )}
          <Link
            href={'/'}
            className={'h-full flex relative items-center mr-0 ml-2.5 text-inherit'}
          >
            <Logo />
          </Link>
          <div className={'items-center flex justify-between grow'}>
            <div />
            <div className={'items-center flex gap-4'}>
              {/* TODO */}
              {false && (
                <NavigatorButton
                  isMac={navigator.platform.toLowerCase().includes('mac')}
                  onClick={() => setNavigatorVisibility(true)}
                />
              )}
              <Link className={'grow'} href={process.env.NEXT_PUBLIC_BASE_URL}>
                {'Go to site'}
              </Link>
              {isPickerActive && channel?.id && (
                <div className={'grow'}>
                  <AppChannelSelect
                    channels={availableChannels}
                    selectedChannelId={channel?.id}
                    onChannelSelect={setChannel}
                  />
                </div>
              )}
              <UserChip
                isDarkThemeEnabled={mode === 'dark'}
                user={user}
                onLogout={logout}
                onThemeToggle={toggleTheme}
              />
            </div>
          </div>
        </div>
      </Box>
      <div className={styles.root ?? ''}>
        {isMdUp && (
          <Sidebar
            activeId={activeMenuItemId}
            menuItems={menuStructure}
            onMenuItemClick={handleMenuItemClick}
            logoHref="/"
          />
        )}
        <div className={styles.content ?? ''}>
          <div ref={backlinkContainer} className={'flex items-center'} />
          <main className={clsx('ml-0', !fullSize && 'p-1 sm:p-3')}>{children}</main>
          <div className={styles.appAction ?? ''} ref={appActionAnchor} />
        </div>
      </div>
    </>
  );
};

export default Layout;
