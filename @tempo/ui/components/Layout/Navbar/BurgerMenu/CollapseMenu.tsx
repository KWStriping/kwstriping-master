'use client';

import type { MenuItemWithChildrenFragment } from '@tempo/api/generated/graphql';
import { translate } from '@tempo/ui/utils/translations';
import clsx from 'clsx';
import { useState } from 'react';

import { NavigationAnchor } from '../../NavigationAnchor';
import styles from './BurgerMenu.module.css';
import SubCollapseMenu from './SubCollapseMenu';

export interface CollapseMenuProps {
  menuItem: Omit<MenuItemWithChildrenFragment, '__typename'>;
}

export function CollapseMenu({ menuItem }: CollapseMenuProps) {
  const [open, setOpen] = useState(false);

  const shouldDisplayAnchor = !menuItem.children?.length;

  return (
    <div className={styles.collapse ?? ''}>
      {shouldDisplayAnchor ? (
        <NavigationAnchor menuItem={menuItem} className={styles['collapse-main'] ?? ''} />
      ) : (
        <>
          <button
            type="button"
            className={clsx(styles['collapse-main'], open && styles['collapse-main--active'])}
            onClick={() => setOpen(!open)}
          >
            {translate(menuItem, 'name')}
          </button>
          {open && (
            <div>
              {menuItem.children?.map((item) => (
                <SubCollapseMenu menuItem={item} key={item.id} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CollapseMenu;
