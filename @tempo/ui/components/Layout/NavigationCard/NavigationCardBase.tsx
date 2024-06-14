import styles from './NavigationCardBase.module.css';
import type { CardProps } from '@mui/material/Card';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import clsx from 'clsx';
import type { FC } from 'react';

export interface NavigationCardBaseProps extends Omit<CardProps, 'classes'> {
  classes?: Record<'root' | 'content', string>;
}

export const NavigationCardBase: FC<NavigationCardBaseProps> = ({
  className,
  classes: propClasses = {},
  children,
  ...rest
}) => {

  return (
    <Card className={clsx(styles.card, className, propClasses.root)} {...rest}>
      <CardContent className={clsx(styles.cardContent, propClasses.content)}>
        {children}
      </CardContent>
    </Card>
  );
};
