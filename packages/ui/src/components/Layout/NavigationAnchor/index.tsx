import type { MenuItemWithChildrenFragment } from '@core/api';
import clsx from 'clsx';
import { resolveHref } from 'next/dist/shared/lib/router/utils/resolve-href';
import Link from 'next/link';

import Router, { useRouter } from 'next/router';
import styles from './index.module.css';
import { usePaths } from '@core/ui/providers/PathsProvider';
import { getLinkPath } from '@core/ui/utils/menus';
import { translate } from '@core/ui/utils/translations';

interface NavigationAnchorProps {
  menuItem: Omit<MenuItemWithChildrenFragment, '__typename'>;
  className?: string;
}

export function NavigationAnchor({ menuItem, className }: NavigationAnchorProps) {
  const router = useRouter();
  const paths = usePaths();
  const href = getLinkPath(menuItem, paths);
  const [, resolvedAs] = resolveHref(Router, href, true);
  const isActive = !!resolvedAs && router.asPath.startsWith(resolvedAs);
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
