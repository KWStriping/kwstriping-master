import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import styles from './index.module.css';
import PreviewPill from '@tempo/dashboard/components/core/PreviewPill';
import ExtendedPageHeader from '@tempo/dashboard/components/core/PageHeader/ExtendedPageHeader';

interface PageHeaderProps {
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
  inline?: boolean;
  underline?: boolean;
  cardMenu?: ReactNode;
  preview?: boolean;
}

const PageHeader: FC<PageHeaderProps> = ({
  children,
  className,
  inline,
  underline,
  subtitle,
  title,
  cardMenu,
  preview,
}) => {
  return (
    <>
      {preview && <PreviewPill className={styles.preview ?? ''} />}
      <ExtendedPageHeader
        testId="page-header"
        className={className}
        inline={inline}
        underline={underline}
        title={
          <>
            <Typography variant="h1" className={clsx(styles.title, 'font-semibold')}>
              {title !== undefined ? title : <Skeleton style={{ width: '10em' }} />}
            </Typography>
            {cardMenu}
          </>
        }
      >
        <div className={styles.root ?? ''}>
          {subtitle && (
            <Typography className={styles.limit ?? ''} color="textSecondary">
              {subtitle}
            </Typography>
          )}
          {children}
        </div>
      </ExtendedPageHeader>
    </>
  );
};

PageHeader.displayName = 'PageHeader';
export default PageHeader;
