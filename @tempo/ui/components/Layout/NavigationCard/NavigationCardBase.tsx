import type { CardProps } from '@mui/material/Card';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import clsx from 'clsx';
import type { FC } from 'react';
import styles from './NavigationCardBase.module.css';

type Classes = Record<'root' | 'content', string>;

export interface NavigationCardBaseProps extends Omit<CardProps, 'classes'> {
  classes?: Classes;
}

export const NavigationCardBase: FC<NavigationCardBaseProps> = ({
  className,
  classes: propClasses = {} as Classes,
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
