import { Trans } from '@tempo/next/i18n';
import type { LanguageCode, LanguageFragment } from '@tempo/api/generated/graphql';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import { Card, ClickAwayListener, Grow, MenuItem, MenuList as Menu } from '@mui/material';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import Link from 'next/link';
import type { FC } from 'react';
import { useState, useRef } from 'react';
import styles from './index.module.css';

export interface LanguageSwitchProps {
  currentLanguage: LanguageCode;
  languages: LanguageFragment[];
  getLanguageUrl: (lang: LanguageCode) => string;
}

const LanguageSwitch: FC<LanguageSwitchProps> = (props) => {
  const { currentLanguage, languages, getLanguageUrl } = props;
  const [isExpanded, setExpandedState] = useState(false);
  const anchor = useRef();

  return (
    <div className={styles.container ?? ''} ref={anchor}>
      <Card className={styles.menuContainer ?? ''} onClick={() => setExpandedState(!isExpanded)}>
        <Typography>{currentLanguage}</Typography>
        <ArrowDropDown className={clsx(styles.arrow, isExpanded && styles.rotate)} />
      </Card>
      <Popper
        className={styles.popover ?? ''}
        open={isExpanded}
        anchorEl={anchor.current}
        transition
        placement="bottom-end"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'right top' : 'right bottom',
            }}
          >
            <Paper className={styles.menuPaper ?? ''} elevation={8}>
              <ClickAwayListener onClickAway={() => setExpandedState(false)} mouseEvent="onClick">
                <Menu>
                  {languages.map((lang) => (
                    <MenuItem
                      key={lang.code}
                      className={styles.menuItem ?? ''}
                      onClick={() => {
                        setExpandedState(false);
                      }}
                    >
                      <Link href={getLanguageUrl(lang.code)}>
                        <Trans
                          t={t}
                          i18nKey={'62T585'}
                          languageCode={lang.code}
                          languageName={lang.language}
                        >
                          {'{languageName} - {languageCode}'}
                        </Trans>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};
LanguageSwitch.displayName = 'LanguageSwitch';
export default LanguageSwitch;
