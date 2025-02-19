'use client';

import type { MenuItemWithChildrenFragment } from '@tempo/api/generated/graphql';
import clsx from 'clsx';
import Link from 'next/link';

import styles from './index.module.css';
import { getLinkPath } from '@tempo/ui/utils/menus';
import { translate } from '@tempo/ui/utils/translations';
import { usePathname } from '@tempo/ui/navigation';

interface NavigationAnchorProps {
  menuItem: Omit<MenuItemWithChildrenFragment, '__typename'>;
  className?: string;
}

export function NavigationAnchor({ menuItem, className }: NavigationAnchorProps) {
  const pathname = usePathname();
  const href = getLinkPath(menuItem);
  const isActive = pathname.startsWith(href.toString());
  const activeClass = isActive ? 'underline' : '';
  return (
    <Link
      href={href}
      className={clsx(className, styles.anchor ?? '', isActive && activeClass)}
      data-testid={`categoriesList${menuItem.name}`}
    >
      {translate(menuItem, 'name')}
    </Link>
  );
}

export default NavigationAnchor;
