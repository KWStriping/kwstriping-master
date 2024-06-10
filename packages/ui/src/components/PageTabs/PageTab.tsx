import type { TabProps } from '@mui/material/Tab';
import Tab from '@mui/material/Tab';
import type { FC } from 'react';
// import useStyles from './styles';

export const PageTab: FC<TabProps> = (props) => {
  // const styles = useStyles();
  const styles = {};

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
