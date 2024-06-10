import clsx from 'clsx';
import type { FC } from 'react';

import { localStorageKeys } from '../../localStorageKeys';
import useLocalStorage from '../../tools/useLocalStorage';
import { ExpandButton } from './ExpandButton';
import styles from './index.module.css';
import { MenuItem } from './MenuItem';
import type { BaseSidebarProps } from './types';

export * from './ExpandButton';
export * from './MenuItem';
export * from './types';

export interface SidebarProps extends BaseSidebarProps {
  activeId: string | undefined;
}

export const Sidebar: FC<SidebarProps> = ({ activeId, menuItems, toolbar, onMenuItemClick }) => {
  const { value: isShrunkStr, setValue: setShrink } = useLocalStorage(
    localStorageKeys.menuShrink,
    false.toString()
  );
  const isShrunk = isShrunkStr === 'true';

  return (
    <div className={clsx(styles.root, isShrunk && (styles.rootShrink ?? ''), 'pt-4')}>
      <div
        className={clsx(
          styles.root ?? '',
          'fixed flex flex-col px-2 h-screen overflow-y-auto overflow-x-hidden',
          isShrunk && styles.rootShrink
        )}
      >
        {menuItems.map((menuItem) => (
          <MenuItem
            activeId={activeId}
            shrunk={isShrunk}
            menuItem={menuItem}
            key={menuItem.ariaLabel}
            onClick={onMenuItemClick}
          />
        ))}
        {toolbar && <div className={styles.toolbarContainer ?? ''}>{toolbar}</div>}
        <ExpandButton
          className={styles.expandButton ?? ''}
          isShrunk={isShrunk}
          onClick={() => setShrink((!isShrunk).toString())}
        />
      </div>
    </div>
  );
};

Sidebar.displayName = 'SideBar';
export default Sidebar;
