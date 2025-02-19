'use client';

import type { MenuItemWithChildrenFragment } from '@tempo/api/generated/graphql';
import Link from 'next/link';

import { NavigationAnchor } from '../NavigationAnchor';
import styles from './index.module.css';
import { getLinkPath } from '@tempo/ui/utils/menus';

interface DropdownProps {
  menuItem: Omit<MenuItemWithChildrenFragment, '__typename'>;
}

function Dropdown({ menuItem }: DropdownProps) {
  return (
    <div className={styles.dropdown ?? ''}>
      <NavigationAnchor menuItem={menuItem} className={styles['dropdown-trigger'] ?? ''} />
      {!!menuItem.children?.length && (
        <div className={styles['dropdown-menu'] ?? ''}>
          <div className="container">
            <div className="grid grid-cols-7 gap-[2rem] mx-2">
              {menuItem.children?.map((item) => (
                <div key={item?.id}>
                  {item?.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className={styles['dropdown-main'] ?? ''}
                    >
                      {item?.name}
                    </a>
                  ) : (
                    <Link href={getLinkPath(item)} className={styles['dropdown-main'] ?? ''}>
                      {item?.name}
                    </Link>
                  )}
                  {!!item?.children?.length && (
                    <ul className={styles['dropdown-ul'] ?? ''}>
                      {item?.children?.map((sub) => (
                        <li key={sub?.id}>
                          <Link href={getLinkPath(sub)} className={styles['dropdown-link'] ?? ''}>
                            {sub?.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
