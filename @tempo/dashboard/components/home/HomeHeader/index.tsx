import * as m from '@paraglide/messages';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import styles from './index.module.css';

interface HomeOrdersCardProps {
  userName: string;
}

const HomeOrdersCard: FC<HomeOrdersCardProps> = (props) => {
  const { userName } = props;

  return (
    <div className={styles.headerContainer ?? ''} data-test-id="home-header">
      <div>
        <Typography
          className={styles.pageHeader ?? ''}
          variant="h4"
          data-test-id="welcome-header"
        >
          {userName ? (
            m.dashboard_y_ZBp({ userName }) ?? 'Hello there, {{userName}}'
          ) : (
            <Skeleton style={{ width: '10em' }} />
          )}
        </Typography>
        <Typography className={styles.subtitle ?? ''}>
          {userName ? (
            <>
              {/* subheader */}

              {m.dashboard_CX_rl() ?? 'Here is some information we gathered about your store'}
            </>
          ) : (
            <Skeleton style={{ width: '10em' }} />
          )}
        </Typography>
      </div>
    </div>
  );
};
HomeOrdersCard.displayName = 'HomeOrdersCard';
export default HomeOrdersCard;
