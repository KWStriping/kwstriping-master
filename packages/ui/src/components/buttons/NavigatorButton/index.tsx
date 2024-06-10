import { useTranslation } from '@core/i18n';
import { LayoutButton } from '@core/ui/components/buttons/LayoutButton';
import NavigationIcon from '@mui/icons-material/Navigation';
import Grow from '@mui/material/Grow';
import type { IconButtonProps } from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import type { FC } from 'react';
import styles from './index.module.css';

export interface NavigatorButtonProps extends IconButtonProps {
  isMac: boolean;
}

const NavigatorButton: FC<NavigatorButtonProps> = ({ className, isMac, ...props }) => {
  const helperTimer = useRef<NodeJS.Timeout | null>(null);
  const [helperVisibility, setHelperVisibility] = useState(false);
  const anchor = useRef<HTMLButtonElement | null>(null);
  const { t } = useTranslation();
  const setHelper = () => {
    helperTimer.current = setTimeout(() => setHelperVisibility(true), 2 * 1000);
  };

  const clearHelper = () => {
    if (helperTimer.current) {
      clearTimeout(helperTimer.current);
      helperTimer.current = null;
    }
    setHelperVisibility(false);
  };

  return (
    <>
      <LayoutButton
        className={clsx(className, styles.root)}
        data-test-id="navigator"
        onMouseEnter={setHelper}
        onMouseLeave={clearHelper}
        {...props}
        ref={anchor}
      >
        <NavigationIcon />
      </LayoutButton>
      <Popper
        open={helperVisibility}
        anchorEl={anchor.current}
        transition
        placement="bottom-start"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'right top' : 'right bottom',
            }}
          >
            <Paper className={styles.paper ?? ''} elevation={8}>
              {t('EEW+ND', 'Navigator')}
              <div className={styles.keyTile ?? ''}>
                <span className={styles.keyTileLabel ?? ''}>{isMac ? '⌘' : 'Ctrl'}</span>
              </div>
              <div className={styles.keyTile ?? ''}>
                <span className={styles.keyTileLabel ?? ''}>K</span>
              </div>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

NavigatorButton.displayName = 'NavigatorButton';
export default NavigatorButton;
