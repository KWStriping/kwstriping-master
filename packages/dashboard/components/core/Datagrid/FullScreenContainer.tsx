import { useTheme } from '@mui/material/styles';
import type { CSSProperties, FC, PropsWithChildren } from 'react';
import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { useDelayedState } from './useDelayedState';

const useEase = (duration: number) => {
  const { transitions } = useTheme();
  const { easeIn, easeOut } = transitions.easing;
  const options = { duration, delay: 0 };
  const transitionIn = transitions.create('all', {
    ...options,
    easing: easeIn,
  });
  const transitionOut = transitions.create('all', {
    ...options,
    easing: easeOut,
  });

  return { transitionIn, transitionOut };
};

const useAnimationStyles = (isOpen: boolean, duration: number) => {
  const { transitionIn, transitionOut } = useEase(duration);

  const initialStyles: CSSProperties = {
    opacity: 0,
    position: 'fixed',
    inset: 0,
    zIndex: -1,
  };

  const openStyles = {
    transition: transitionIn,
    opacity: 1,
    zIndex: 1,
  };

  const closedStyles = {
    transition: transitionOut,
    opacity: 0,
  };

  return {
    ...initialStyles,
    ...(isOpen ? openStyles : closedStyles),
  };
};

type FullScreenContainerProps = FC<
  PropsWithChildren<{
    open?: boolean;
    className?: string;
  }>
>;

const Portal: FullScreenContainerProps = ({ className, children, open = false }) => {
  const { delayedState: delayedOpen, duration } = useDelayedState(open);
  // const styles = useAnimationStyles(open, duration);
  const modalRootRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!modalRootRef.current) {
      modalRootRef.current = (document.getElementById('modal-root') ||
        document.createElement('div')) as HTMLDivElement;
    }
  }, []);
  return modalRootRef.current
    ? ReactDOM.createPortal(
        <div className={className} style={styles}>
          {delayedOpen && children}
        </div>,
        modalRootRef.current
      )
    : null;
};

export const FullScreenContainer: FullScreenContainerProps = ({ children, ...rest }) => (
  <>
    <Portal {...rest}>{children}</Portal>
    {children}
  </>
);
