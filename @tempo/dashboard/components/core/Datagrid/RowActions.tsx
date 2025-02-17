import IconButton from '@tempo/ui/components/buttons/IconButton';
import MoreHorizontalIcon from '@mui/icons-material/MoreHoriz';
import { assert } from 'tsafe/assert';
import styles from './index.module.css';
import CardMenu from '@tempo/dashboard/components/core/CardMenu';
import type { CardMenuItem } from '@tempo/dashboard/components/core/CardMenu';

interface RowActionsProps {
  menuItems: CardMenuItem[];
  disabled?: boolean;
}

export const RowActions = ({ menuItems, disabled }: RowActionsProps) => {
  const hasSingleMenuItem = menuItems.length === 1;
  assert(menuItems[0]);
  const firstMenuItem = menuItems[0];
  const handleIconClick = () => {
    firstMenuItem.onSelect();
  };

  if (!menuItems.length) return null;

  return (
    <div className={styles.rowAction ?? ''}>
      {hasSingleMenuItem && firstMenuItem.Icon ? (
        <IconButton
          data-test-id="row-action-button"
          disabled={disabled}
          onClick={handleIconClick}
          className={styles.ghostIcon ?? ''}
          variant="ghost"
        >
          {firstMenuItem.Icon}
        </IconButton>
      ) : (
        <CardMenu
          disabled={disabled}
          Icon={MoreHorizontalIcon}
          IconButtonProps={{
            className: styles.ghostIcon ?? '',
            hoverOutline: false,
            state: 'default',
          }}
          menuItems={menuItems}
        />
      )}
    </div>
  );
};
