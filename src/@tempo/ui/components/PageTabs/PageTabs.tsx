import type { TabsProps } from '@mui/material/Tabs';
import Tabs from '@mui/material/Tabs';
import type { FC } from 'react';
// import useStyles from './styles';

export const PageTabs: FC<
  Omit<TabsProps, 'onChange'> & {
    onChange: (value: string) => void;
  }
> = (props) => {
  // const styles = useStyles();
  const styles = {};

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
