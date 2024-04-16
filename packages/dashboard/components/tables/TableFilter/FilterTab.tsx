import Tab from '@mui/material/Tab';
import clsx from 'clsx';
import type { FC } from 'react';
import styles from './index.module.css';

interface FilterTabProps {
  onClick: () => void;
  label: string;
  selected?: boolean;
  value?: number;
}

export const FilterTab: FC<FilterTabProps> = (props) => {
  const { onClick, label, selected, value } = props;
  return (
    <Tab
      disableRipple
      label={label}
      classes={{
        root: styles.tabRoot ?? '',
        wrapped: clsx(styles.tabLabel, selected && styles.selectedTabLabel),
      }}
      onClick={onClick}
      value={value}
    />
  );
};
FilterTab.displayName = 'FilterTab';
export default FilterTab;
