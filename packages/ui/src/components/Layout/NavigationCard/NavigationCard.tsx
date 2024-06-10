import Typography from '@mui/material/Typography';
import type { FC, ReactNode } from 'react';
import type { NavigationCardBaseProps } from './NavigationCardBase';
import { NavigationCardBase } from './NavigationCardBase';
// import useStyles from './styles';

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
  // const styles = useStyles();
  const styles = {};

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
