import * as m from '@paraglide/messages';
import { makeStyles } from '@tempo/ui/theme/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { IconProps } from '@mui/material/Icon';
import Typography from '@mui/material/Typography';

import type { FC, ReactNode } from 'react';

const useStyles = makeStyles(
  (theme) => ({
    cardContent: {
      '&:last-child': {
        padding: theme.spacing(2, 3),
      },
      display: 'grid',
      gridColumnGap: theme.spacing(3),
      gridTemplateColumns: '1fr 64px',
    },
    cardSpacing: {
      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(1),
      },
      marginBottom: theme.spacing(3),
    },
    cardSubtitle: {
      fontSize: 12,
      height: '20px',
      lineHeight: 0.9,
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: 500,
    },
    icon: {
      color: theme.vars.palette.primary.contrastText,
      fontSize: 54,
      margin: '.5rem .3rem',
    },
    iconBackground: {
      backgroundColor: theme.vars.palette.background.default,
      borderRadius: '8px',
      color: 'white',
      fontSize: '54px',
      height: '100%',
      padding: '10px 5px 0px 5px',
      width: '100%',
    },
    value: {
      textAlign: 'right',
    },
  }),
  { name: 'HomeAnalyticsCard' }
);

interface HomeAnalyticsCardProps {
  testId?: string;
  icon: ReactElement<IconProps>;
  title: string;
  children?: ReactNode;
}

const HomeAnalyticsCard: FC<HomeAnalyticsCardProps> = (props) => {
  const { children, title, icon, testId } = props;
  // const styles = useStyles();
  const styles = {};
  return (
    <Card className={styles.cardSpacing ?? ''}>
      <CardContent className={styles.cardContent ?? ''} data-test-id={testId}>
        <div>
          <Typography className={styles.cardTitle ?? ''} variant="subtitle1">
            {title}
          </Typography>
          <Typography
            className={styles.cardSubtitle ?? ''}
            variant="caption"
            color="textSecondary"
          >
            {m.dashboard_WgbGg() ?? 'Today'}
          </Typography>
          <Typography className={styles.value ?? ''} color="textPrimary" variant="h4">
            {children}
          </Typography>
        </div>
        <div className={styles.iconBackground ?? ''}>{icon}</div>
      </CardContent>
    </Card>
  );
};
HomeAnalyticsCard.displayName = 'HomeAnalyticsCard';
export default HomeAnalyticsCard;
