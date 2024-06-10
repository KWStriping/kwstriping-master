import type { LayoutButtonProps } from '@tempo/ui/components/buttons/LayoutButton';
import { LayoutButton } from '@tempo/ui/components/buttons/LayoutButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Portal from '@mui/material/Portal';
import Skeleton from '@mui/material/Skeleton';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import type { ElementType, MouseEvent, ReactNode } from 'react';
import { useBacklink } from './context';
import styles from './index.module.css';

export * from './context';

export type BacklinkProps<T extends ElementType> = LayoutButtonProps<T> & {
  children: ReactNode;
  disabled?: boolean;
};

export function Backlink<T extends ElementType>({
  children,
  disabled,
  onClick,
  ...props
}: BacklinkProps<T>) {
  const router = useRouter();
  const ssr = true;
  const anchor = useBacklink();
  if (!anchor.current && !ssr) return null;
  return (
    <Portal container={anchor.current}>
      <LayoutButton
        className={clsx(styles.root, 'inline-flex items-center justify-start')}
        disabled={disabled}
        onClick={(e: MouseEvent) => {
          e.preventDefault();
          if (onClick) onClick(e);
          if (props.href) {
            router.replace(props.href);
          } else {
            router.back();
          }
        }}
        data-test-id="app-header-back-button"
        {...props}
      >
        <ArrowBackIcon />
        {children ? (
          <div className={styles.title ?? ''}>{children}</div>
        ) : (
          <Skeleton className={styles.skeleton ?? ''} />
        )}
      </LayoutButton>
    </Portal>
  );
}
Backlink.displayName = 'Backlink';
