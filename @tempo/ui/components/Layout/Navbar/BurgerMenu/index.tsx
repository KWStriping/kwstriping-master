import * as m from '@paraglide/messages';
import type { MenuItemWithChildrenFragment } from '@tempo/api/generated/graphql';
import { useUser, useLogout } from '@tempo/api/auth/react/hooks';
// import { useTranslation } from '@tempo/next/i18n';
import { ChannelDropdown } from '@tempo/ui/components/regionDropdowns/ChannelDropdown';
import { LocaleDropdown } from '@tempo/ui/components/regionDropdowns/LocaleDropdown';
import { useShopSettings } from '@tempo/ui/providers';
import { usePaths } from '@tempo/ui/providers/PathsProvider';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import NavIconButton from '../NavIconButton';
import styles from './BurgerMenu.module.css';
import { CollapseMenu } from './CollapseMenu';

export interface BurgerMenuProps {
  items: Maybe<Omit<MenuItemWithChildrenFragment, '__typename'>[]>;
  open?: boolean;
  onCloseClick?: () => void;
}

export function BurgerMenu({ open, onCloseClick, items }: BurgerMenuProps) {
  const paths = usePaths();
  const { authenticated } = useUser();
  const { enableLogin, enableTranslations } = useShopSettings();
  const router = useRouter();

  const { logout } = useLogout();

  const menuItems = items || [];

  return (
    <div className={clsx(styles.container, open && styles['container--open'])}>
      <div className={styles.backdrop ?? ''} aria-hidden="true" onClick={onCloseClick} />
      <div className={styles.body ?? ''}>
        <div className="flex justify-end w-full mb-5">
          <NavIconButton icon="close" onClick={onCloseClick} />
        </div>
        {menuItems.map((item) => (
          <CollapseMenu menuItem={item} key={item.id} />
        ))}
        <div className="mt-auto pt-4">
          <div className="flex flex-col">
            {authenticated ? (
              <>
                <Link
                  href={paths.accountPreferences()}
                  tabIndex={0}
                  className={styles['burger-link'] ?? ''}
                >
                  {m.menuAccountPreferences() ?? 'Account preferences'}
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  tabIndex={-1}
                  className={styles['burger-link'] ?? ''}
                >
                  {m.logOut() ?? 'Log out'}
                </button>
              </>
            ) : (
              enableLogin && (
                <button
                  type="button"
                  onClick={() => router.push(paths.login())}
                  tabIndex={-1}
                  className={styles['burger-link'] ?? ''}
                >
                  {m.logIn() ?? 'Log in'}
                </button>
              )
            )}
          </div>
        </div>
        {enableTranslations && (
          <div className="flex mt-4 gap-4">
            <ChannelDropdown />
            <LocaleDropdown />
          </div>
        )}
      </div>
    </div>
  );
}

export default BurgerMenu;
