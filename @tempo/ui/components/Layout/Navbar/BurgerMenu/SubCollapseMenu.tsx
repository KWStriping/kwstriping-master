'use client';

import { usePaths } from '@tempo/ui/providers/PathsProvider';
import { getLinkPath } from '@tempo/ui/utils/menus';
import { translate } from '@tempo/ui/utils/translations';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';

import { NavigationAnchor } from '../../NavigationAnchor';
import styles from './BurgerMenu.module.css';
import type { CollapseMenuProps } from './CollapseMenu';

function SubCollapseMenu({ menuItem }: CollapseMenuProps) {
  const paths = usePaths();
  const [open, setOpen] = useState(false);

  const shouldDisplayAnchor = !menuItem.children?.length;

  return (
    <div className="mt-4">
      {shouldDisplayAnchor ? (
        <NavigationAnchor menuItem={menuItem} className={styles['collapse-sub'] ?? ''} />
      ) : (
        <>
          <button
            type="button"
            className={clsx(styles['collapse-sub'], open && styles['collapse-sub--active'])}
            onClick={() => setOpen(!open)}
          >
            {translate(menuItem, 'name')}
            <ExpandMoreIcon />
          </button>
          {open && (
            <div>
              {menuItem.children?.map((sub) => (
                <li key={sub.id} className={styles['menu-link'] ?? ''}>
                  {sub.url ? (
                    <a href={sub.url} target="_blank" rel="noreferrer">
                      {sub.name}
                    </a>
                  ) : (
                    <Link href={getLinkPath(sub, paths)}>{sub.name}</Link>
                  )}
                </li>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SubCollapseMenu;