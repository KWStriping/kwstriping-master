import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import styles from './index.module.css';

export * from './TabContainer';
export { default as TabContainer } from './TabContainer';
export { default as Tabs } from './Tabs';

interface TabProps<T> {
  children?: ReactNode;
  isActive: boolean;
  changeTab: (index: T) => void;
  testId?: string;
}

export function Tab<T>(value: T) {
  const Component: FC<TabProps<T>> = (props) => {
    const { children, isActive, changeTab, testId } = props;
    return (
      <Typography
        component="span"
        data-test-id={testId}
        className={clsx(styles.root, isActive && styles.active)}
        onClick={() => changeTab(value)}
      >
        {children}
      </Typography>
    );
  };

  return Component;
}

export default Tab;
