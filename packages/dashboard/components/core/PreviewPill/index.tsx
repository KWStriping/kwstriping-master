import { useTranslation } from '@core/i18n';
import Pill from '@core/ui/components/pill/Pill';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import { useRef, useState } from 'react';
import type { FC } from 'react';
import styles from './index.module.css';

export interface PreviewPillProps {
  className?: string;
}

export const PreviewPill: FC<PreviewPillProps> = ({ className }) => {
  const { t } = useTranslation();
  const [active, setActive] = useState(false);
  const anchor = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <Pill
        className={className}
        active={active}
        color="warning"
        size="small"
        label={t('dashboard.abel', 'Preview')}
        ref={anchor}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      />
      <Popper
        className={styles.popper ?? ''}
        open={active}
        anchorEl={anchor.current}
        transition
        placement="bottom-start"
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper elevation={16} className={styles.tooltip ?? ''}>
              <Typography className={styles.tooltipText ?? ''}>
                {t(
                  'dashboard.ooltip',
                  'This feature is in a preview state and can be subject to changes at later point'
                )}
              </Typography>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

PreviewPill.displayName = 'PreviewPill';
export default PreviewPill;
