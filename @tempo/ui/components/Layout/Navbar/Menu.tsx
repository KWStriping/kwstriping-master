'use client';

import type { MenuItemWithChildrenFragment } from '@tempo/api/generated/graphql';

import { Fragment } from 'react';
import { NavigationAnchor } from '../NavigationAnchor';
import DropdownMenu from './DropdownMenu';
import styles from './index.module.css';

interface MenuProps {
  items: Maybe<Omit<MenuItemWithChildrenFragment, '__typename'>[]>;
}

export function Menu({ items }: MenuProps) {
  const menuItems = items || [];
  return (
    <nav className={styles.nav ?? ''}>
      <ol className={'my-0'}>
        {menuItems.map((item) => (
          <Fragment key={item?.id}>
            {item.children?.length ? (
              <li key={item?.id}>
                <DropdownMenu key={item?.id} menuItem={item} />
              </li>
            ) : (
              <li>
                <NavigationAnchor menuItem={item} className={styles['dropdown-trigger'] ?? ''} />
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}

export default Menu;
