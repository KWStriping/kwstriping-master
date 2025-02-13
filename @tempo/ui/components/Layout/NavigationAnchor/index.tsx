'use client';

import type { MenuItemWithChildrenFragment } from '@tempo/api/generated/graphql';
import clsx from 'clsx';
import Link from 'next/link';

import { usePaths } from '@tempo/ui/providers/PathsProvider';
import { getLinkPath } from '@tempo/ui/utils/menus';
import { translate } from '@tempo/ui/utils/translations';
import { usePathname } from '@tempo/ui/navigation';
import styles from './index.module.css';

interface NavigationAnchorProps {
  menuItem: Omit<MenuItemWithChildrenFragment, '__typename'>;
  className?: string;
}

export function NavigationAnchor({ menuItem, className }: NavigationAnchorProps) {
  const paths = usePaths();
  const pathname = usePathname();
  const href = getLinkPath(menuItem, paths);
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
