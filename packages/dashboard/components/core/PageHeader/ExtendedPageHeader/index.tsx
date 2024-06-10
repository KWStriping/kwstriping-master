import Divider from '@mui/material/Divider';
import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import styles from './index.module.css';

interface ExtendedPageHeaderProps {
  children?: ReactNode;
  className?: string;
  childrenWrapperClassName?: string;
  inline?: boolean;
  underline?: boolean;
  title?: ReactNode;
  testId?: string;
}

const ExtendedPageHeader: FC<ExtendedPageHeaderProps> = ({
  children,
  className,
  childrenWrapperClassName,
  inline,
  underline,
  title,
  testId,
}) => {
  return (
    <>
      <div
        data-test-id={testId}
        className={clsx(
          styles.root ?? '',
          className,
          !inline && 'xs:max-sm:block',
          underline && 'mb-1'
        )}
      >
        <div className={styles.titleRow ?? ''}>{title}</div>
        <div className={clsx(styles.action, childrenWrapperClassName)}>{children}</div>
      </div>
      {underline && <Divider className={'mb-5'} />}
    </>
  );
};
ExtendedPageHeader.displayName = 'ExtendedPageHeader';
export default ExtendedPageHeader;
