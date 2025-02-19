import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import type { GetItemPropsOptions } from 'downshift';
import type { FC } from 'react';
import styles from './index.module.css';

import type { QuickSearchAction } from './types';

interface NavigatorSectionProps {
  getItemProps: (options: GetItemPropsOptions<QuickSearchAction>) => unknown;
  highlightedIndex: number;
  label: string;
  items: QuickSearchAction[];
  offset: number;
}

const NavigatorSection: FC<NavigatorSectionProps> = (props) => {
  const { getItemProps, highlightedIndex, label, items, offset } = props;
  return (
    <div className={styles.root ?? ''}>
      <Typography className={styles.label ?? ''} variant="caption" color="textSecondary">
        {label}
      </Typography>
      {items.map((item, itemIndex) => {
        const index = offset + itemIndex;
        const itemProps = getItemProps({
          index,
          item,
        });

        return (
          <MenuItem
            {...itemProps}
            className={styles.item ?? ''}
            selected={highlightedIndex === index}
            key={[item.label, item.type].join(':')}
          >
            <span className={styles.itemLabel ?? ''}>
              {item.symbol && <span className={styles.symbol ?? ''}>{item.symbol}</span>}
              <span>{item.label}</span>
              {item.caption && <Typography variant="caption">{item.caption}</Typography>}
            </span>
            <span className={styles.spacer ?? ''} />
            {item.extraInfo}
          </MenuItem>
        );
      })}
    </div>
  );
};

NavigatorSection.displayName = 'NavigatorSection';
export default NavigatorSection;
