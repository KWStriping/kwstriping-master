import type { FC, ReactNode } from 'react';
import styles from './index.module.css';

export interface TabContainerProps {
  children: ReactNode | ReactNode[];
}

const TabContainer: FC<TabContainerProps> = (props) => {
  const { children } = props;
  return <div className={styles.root ?? ''}>{children}</div>;
};
TabContainer.displayName = 'TabContainer';

export default TabContainer;
