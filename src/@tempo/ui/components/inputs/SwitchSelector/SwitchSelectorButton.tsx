import clsx from 'clsx';
import type { FC, ReactNode } from 'react';

import { Button } from '@tempo/ui/components/buttons/Button';
import { makeStyles } from '@tempo/ui/theme/styles';

interface SwitchSelectorButtonProps {
  value: string;
  activeTab?: string;
  onClick: () => void;
  children?: ReactNode;
}

const useSwitchSelectorButtonStyles = makeStyles((theme) => ({
  root: {
    color: '#77738C',
    background: 'none',
    borderColor: 'transparent',
    cursor: 'pointer',

    '&:not(:first-child)': {
      marginLeft: theme.spacing(1),
    },

    '&:hover': {
      backgroundColor: theme.vars.palette.common.white,
      color: theme.vars.palette.active[100],
      border: `1px solid ${theme.vars.palette.active[100]}`,
    },

    '&:active': {
      backgroundColor: theme.vars.palette.active[500],
    },
  },
  buttonSelected: {
    color: theme.vars.palette.common.white,
    backgroundColor: theme.vars.palette.active[100],
  },
}));

export const SwitchSelectorButton: FC<SwitchSelectorButtonProps> = ({
  onClick,
  value,
  children,
  activeTab,
}) => {
  // const styles = useSwitchSelectorButtonStyles();

  return (
    <Button
      key={value}
      onClick={onClick}
      className={clsx(styles.root, value === activeTab && styles.buttonSelected)}
    >
      {children}
    </Button>
  );
};

SwitchSelectorButton.displayName = 'SwitchSelectorButton';
