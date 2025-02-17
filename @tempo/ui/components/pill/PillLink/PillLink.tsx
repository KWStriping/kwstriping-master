import type { OverridableComponent, OverrideProps } from '@mui/material/OverridableComponent';
import clsx from 'clsx';
import type { ElementType, FC, ReactNode } from 'react';
import type { UserInteraction } from '@tempo/ui/utils';

// import useStyles from './styles';

export interface PillLinkInnerProps {
  className?: string;
  children?: ReactNode;
  state?: UserInteraction;
}
export interface PillLinkTypeMap<P = {}, D extends ElementType = 'a'> {
  props: P & PillLinkInnerProps;
  classKey: never;
  defaultComponent: D;
}

export type PillLinkProps<
  D extends ElementType = PillLinkTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<PillLinkTypeMap<P, D>, D>;

interface PillLinkPropsWithComponent extends PillLinkProps {
  component?: ElementType;
}

const _PillLink: FC<PillLinkPropsWithComponent> = ({
  children,
  component: Component = 'a',
  className,
  state = 'default',
  ...props
}) => {
  // const styles = useStyles();
  const styles = {};

  return (
    <Component
      className={clsx(
        styles.root ?? '',
        className,
        state === 'hover' && (styles.hover ?? ''),
        state === 'active' && styles.active
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
_PillLink.displayName = 'PillLink';
export const PillLink = _PillLink as OverridableComponent<PillLinkTypeMap>;
