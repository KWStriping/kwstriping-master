import type { TabProps } from '@mui/material/Tab';
import Tab from '@mui/material/Tab';
import type { FC } from 'react';
import styles from './PageTab.module.css';

export const PageTab: FC<TabProps> = (props) => {
  return (
    <Tab
      classes={{
        root: styles.tabRoot ?? '',
      }}
      disableRipple
      {...props}
    />
  );
};
PageTab.displayName = 'PageTab';
