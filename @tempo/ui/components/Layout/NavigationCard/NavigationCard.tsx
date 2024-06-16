import Typography from '@mui/material/Typography';
import type { FC, ReactNode } from 'react';
import styles from './NavigationCard.module.css';
import type { NavigationCardBaseProps } from './NavigationCardBase';
import { NavigationCardBase } from './NavigationCardBase';

export interface NavigationCardProps extends NavigationCardBaseProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export const NavigationCard: FC<NavigationCardProps> = ({
  icon,
  title,
  description,
  ...rest
}) => {
  return (
    <NavigationCardBase {...rest}>
      <div className={styles.content ?? ''}>
        <div className={styles.icon ?? ''}>{icon}</div>
        <div>
          <Typography variant="subtitle1" className={styles.boxLinkTitle ?? ''}>
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" className={styles.boxLinkText ?? ''}>
            {description}
          </Typography>
        </div>
      </div>
    </NavigationCardBase>
  );
};
