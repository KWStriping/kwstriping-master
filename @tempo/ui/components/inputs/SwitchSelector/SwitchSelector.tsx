import { makeStyles } from '@tempo/ui/theme/styles';
import type { FC, ReactNode } from 'react';

const useStyles = makeStyles((theme) => ({
  switchSelector: {
    border: `1px solid ${theme.vars.palette.primary[500]}`,
    padding: '6px',
    borderRadius: 4,
    width: 'fit-content',
  },
}));

export const SwitchSelector: FC<{ children: ReactNode }> = ({ children }) => {
  // const styles = useStyles();
  const styles = {};

  return <div className={styles.switchSelector ?? ''}>{children}</div>;
};

SwitchSelector.displayName = 'SwitchSelector';
