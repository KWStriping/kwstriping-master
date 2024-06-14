import styles from './PageTabs.module.css';
import type { TabsProps } from '@mui/material/Tabs';
import Tabs from '@mui/material/Tabs';
import type { FC } from 'react';

export const PageTabs: FC<
  Omit<TabsProps, 'onChange'> & {
    onChange: (value: string) => void;
  }
> = (props) => {

  return (
    <Tabs
      {...props}
      classes={{
        flexContainer: styles.containerFlex ?? '',
        root: styles.containerRoot ?? '',
      }}
      TabIndicatorProps={{
        style: { display: 'none' },
      }}
      onChange={(_, value) => props.onChange(value)}
    />
  );
};
PageTabs.displayName = 'PageTabs';
