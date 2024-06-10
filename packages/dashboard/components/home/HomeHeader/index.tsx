import { useTranslation } from '@core/i18n';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import styles from './index.module.css';

interface HomeOrdersCardProps {
  userName: string;
}

const HomeOrdersCard: FC<HomeOrdersCardProps> = (props) => {
  const { userName } = props;
  const { t } = useTranslation();

  return (
    <div className={styles.headerContainer ?? ''} data-test-id="home-header">
      <div>
        <Typography
          className={styles.pageHeader ?? ''}
          variant="h4"
          data-test-id="welcome-header"
        >
          {userName ? (
            t('dashboard.y5ZBp', 'Hello there, {{userName}}', { userName })
          ) : (
            <Skeleton style={{ width: '10em' }} />
          )}
        </Typography>
        <Typography className={styles.subtitle ?? ''}>
          {userName ? (
            <>
              {/* subheader */}

              {t('dashboard.CX8rl', 'Here is some information we gathered about your store')}
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
