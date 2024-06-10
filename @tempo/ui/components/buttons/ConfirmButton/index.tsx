import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import type { ButtonProps } from '@tempo/ui/components/buttons/Button';
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress';
import clsx from 'clsx';
import { useRef, useState, useEffect } from 'react';
import type { FC, ReactNode } from 'react';

import styles from './index.module.css';

const DEFAULT_NOTIFICATION_SHOW_TIME = 3000;
export type ConfirmButtonTransitionState = 'loading' | 'success' | 'error' | 'default';

export type ConfirmButtonLabels = Record<'confirm' | 'error', string>;
export interface ConfirmButtonProps extends Omit<ButtonProps, 'styles'> {
  labels?: ConfirmButtonLabels;
  noTransition?: boolean;
  transitionState: ConfirmButtonTransitionState;
  onTransitionToDefault?: () => void;
  children?: ReactNode;
}

export const ConfirmButton: FC<ConfirmButtonProps> = ({
  children,
  disabled,
  labels: componentLabels = {},
  noTransition,
  transitionState,
  color = 'primary',
  onClick,
  onTransitionToDefault,
  ...props
}) => {
  const defaultLabels: ConfirmButtonLabels = {
    confirm: m.save() ?? 'Save',
    error: m.error() ?? 'Error',
  };
  const labels: ConfirmButtonLabels = {
    ...defaultLabels,
    ...componentLabels,
  };

  const [displayCompletedActionState, setDisplayCompletedActionState] = useState(false);
  const timeout = useRef<number>();

  useEffect(() => {
    if (!noTransition && transitionState === 'loading') {
      setDisplayCompletedActionState(true);
    }
  }, [transitionState, noTransition]);

  useEffect(() => {
    if (
      !noTransition &&
      (['error', 'success'] as ConfirmButtonTransitionState[]).includes(transitionState)
    ) {
      timeout.current = setTimeout(() => {
        setDisplayCompletedActionState(false);
        if (onTransitionToDefault) {
          onTransitionToDefault();
        }
      }, DEFAULT_NOTIFICATION_SHOW_TIME) as unknown as number;
    } else if (transitionState === 'loading') {
      clearTimeout(timeout.current);
    }

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [noTransition, transitionState, onTransitionToDefault]);

  const isCompleted = noTransition ? transitionState !== 'default' : displayCompletedActionState;
  return (
    <Button
      color={transitionState === 'error' ? (isCompleted ? 'error' : color) : color}
      // error={transitionState === 'error' && isCompleted}
      onClick={transitionState === 'loading' ? undefined : onClick}
      disabled={!isCompleted && !!disabled}
      data-test-state={isCompleted ? transitionState : 'default'}
      {...props}
    >
      <CircularProgress
        size={24}
        color="inherit"
        className={clsx(styles.progress, transitionState !== 'loading' && styles.invisible)}
      />
      <CheckIcon
        className={clsx(
          styles.icon ?? '',
          !(transitionState === 'success' && isCompleted) && styles.invisible
        )}
      />
      <span
        className={clsx(
          styles.label ?? '',
          (transitionState === 'loading' || transitionState === 'success') &&
            isCompleted &&
            styles.invisible
        )}
      >
        {transitionState === 'error' && isCompleted ? labels.error : children || labels.confirm}
      </span>
    </Button>
  );
};

export default ConfirmButton;
