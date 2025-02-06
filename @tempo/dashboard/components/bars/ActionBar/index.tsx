import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import { useWindowScroll } from '@tempo/ui/components/tools';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Portal from '@mui/material/Portal';
import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
export * from './context';

import { useActionBar } from './context';

export interface ActionBarProps {
  disabled: boolean;
  state: ConfirmButtonTransitionState;
  className?: string;
  children: ReactNode[] | ReactNode;
}

export const ActionBar: FC<ActionBarProps> = ({
  disabled,
  children,
  state,
  className,
  ...rest
}) => {
  const styles = {};
  const ssr = true;

  const { anchor } = useActionBar();
  const scrollPosition = useWindowScroll();

  const scrolledToBottom = scrollPosition.y + window.innerHeight >= document.body.scrollHeight;

  if (!anchor.current && !ssr) return null;

  return (
    <Portal container={anchor.current}>
      <div className={clsx(className)} {...rest}>
        <Container maxWidth="lg">
          <Card className={clsx(styles.paper, !scrolledToBottom && styles.shadow)}>
            <CardContent className={styles.content ?? ''}>{children}</CardContent>
          </Card>
        </Container>
      </div>
    </Portal>
  );
};
ActionBar.displayName = 'ActionBar';
