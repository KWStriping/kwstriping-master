import type { MenuItemWithChildrenFragment } from '@core/api';
import { useUser, useLogout } from '@core/auth/react/hooks';
import { useTranslation } from '@core/i18n';
import { ChannelDropdown } from '@core/ui/components/regionDropdowns/ChannelDropdown';
import { LocaleDropdown } from '@core/ui/components/regionDropdowns/LocaleDropdown';
import { useShopSettings } from '@core/ui/providers';
import { usePaths } from '@core/ui/providers/PathsProvider';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
  const { t } = useTranslation();
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
                  {t('menuAccountPreferences', 'Account preferences')}
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  tabIndex={-1}
                  className={styles['burger-link'] ?? ''}
                >
                  {t('logOut', 'Log out')}
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
                  {t('logIn', 'Log in')}
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
