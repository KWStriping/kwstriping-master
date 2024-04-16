import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import NotFoundImage from '@dashboard/assets/images/not-found-404.svg';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import styles from './index.module.css';

interface NotFoundPageProps {
  onBack?: () => void;
  backHref?: string;
}

const NotFoundPage: FC<NotFoundPageProps> = (props) => {
  const { onBack: _onBack, backHref } = props;
  const router = useRouter();
  const { t } = useTranslation();
  const onBack = _onBack || (() => router.push(backHref ?? '/'));
  return (
    <div className={styles.root ?? ''}>
      <div className={styles.container ?? ''}>
        <div className={styles.innerContainer ?? ''}>
          <div>
            <Typography className={styles.header ?? ''} variant="h3">
              {t('dashboard.H56V+', 'Oops!...')}
            </Typography>
            <Typography className={styles.header ?? ''} variant="h4">
              {t('dashboard.j6pTd', "Something's missing")}
            </Typography>
            <Typography>{t('dashboard.RiOg+', 'Sorry, the page was not found')}</Typography>
          </div>
          <div>
            <Button
              className={styles.button ?? ''}
              color="primary"
              onClick={onBack}
              href={backHref}
            >
              <>
                {/* button */}

                {t('dashboard.5oJ5d', 'Go back to dashboard')}
              </>
            </Button>
          </div>
        </div>
        <div>
          <NotFoundImage />
        </div>
      </div>
    </div>
  );
};
NotFoundPage.displayName = 'NotFoundPage';
export default NotFoundPage;
