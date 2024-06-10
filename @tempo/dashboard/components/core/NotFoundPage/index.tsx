import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import NotFoundImage from '@dashboard/assets/images/not-found-404.svg';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import styles from './index.module.css';

interface NotFoundPageProps {
  onBack?: () => void;
  backHref?: string;
}

const NotFoundPage: FC<NotFoundPageProps> = (props) => {
  const { onBack: _onBack, backHref } = props;
  const router = useRouter();
  const onBack = _onBack || (() => router.push(backHref ?? '/'));
  return (
    <div className={styles.root ?? ''}>
      <div className={styles.container ?? ''}>
        <div className={styles.innerContainer ?? ''}>
          <div>
            <Typography className={styles.header ?? ''} variant="h3">
              {m.dashboard_H56V+ ?? 'Oops!...'}
            </Typography>
            <Typography className={styles.header ?? ''} variant="h4">
              {m.dashboard_j_pTd() ?? "Something's missing"}
            </Typography>
            <Typography>{m.dashboard_RiOg+ ?? 'Sorry, the page was not found'}</Typography>
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

                {m.dashboard__oJ_d() ?? 'Go back to dashboard'}
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
