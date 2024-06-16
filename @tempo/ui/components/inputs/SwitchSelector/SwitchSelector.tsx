import type { FC, ReactNode } from 'react';
import styles from './SwitchSelector.module.css';
import { makeStyles } from '@tempo/ui/theme/styles';

const useStyles = makeStyles((theme) => ({
  switchSelector: {
    border: `1px solid ${theme.vars.palette.primary[500]}`,
    padding: '6px',
    borderRadius: 4,
    width: 'fit-content',
  },
}));

export const SwitchSelector: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={styles.switchSelector ?? ''}>{children}</div>;
};

SwitchSelector.displayName = 'SwitchSelector';
