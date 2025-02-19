import Tabs from '@mui/material/Tabs';
import type { FC, ReactNode } from 'react';
import styles from './index.module.css';

interface FilterTabsProps {
  children?: ReactNode;
  currentTab: number;
}

export const FilterTabs: FC<FilterTabsProps> = (props) => {
  const { children, currentTab } = props;
  return (
    <Tabs className={styles.tabsRoot ?? ''} value={currentTab} indicatorColor={'primary'}>
      {children}
    </Tabs>
  );
};

export default FilterTabs;
