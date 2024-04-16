import { mergeRefs } from '@core/ui/utils/mergeRefs';
import type { Placement, Side } from '@floating-ui/react-dom-interactions';
import {
  arrow,
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react-dom-interactions';
import { useColorScheme } from '@mui/material/styles';
import clsx from 'clsx';
import { cloneElement, useMemo, useState, useRef, useCallback } from 'react';
import type { MouseEventHandler, ReactElement, Ref, FC, ReactNode } from 'react';

import { Arrow } from './Arrow';
// import useStyles from './styles';

export interface TooltipProps {
  variant?: 'success' | 'warning' | 'error';
  placement?: Placement;
  arrow?: boolean;
  onClick?: MouseEventHandler<unknown>;
  onOpen?: () => void;
  onClose?: () => void;
  open?: boolean;
  initialOpen?: boolean;
  disabled?: boolean;
  children: ReactElement;
  header?: ReactNode;
  title?: ReactNode;
  /** Ref for element that triggers opening the tooltip on hover */
  referenceRef?: Ref<HTMLElement>;
  /** Ref for tooltip div element */
  floatingRef?: Ref<HTMLDivElement>;
}

export const Tooltip: FC<TooltipProps> = ({
  variant,
  placement: initialPlacement = 'bottom-start',
  arrow: hasArrow = true,
  onOpen,
  onClose,
  onClick,
  open: forceState,
  initialOpen = false,
  disabled = false,
  children,
  header,
  title,
  referenceRef,
  floatingRef,
}) => {
  const { mode } = useColorScheme();

  const [stateOpen, setStateOpen] = useState(initialOpen);
  const arrowRef = useRef<HTMLSpanElement | null>(null);

  const open = forceState ?? stateOpen;

  const {
    x,
    y,
    placement,
    strategy,
    context,
    update,
    reference,
    floating,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
  } = useFloating({
    placement: initialPlacement,
    open,
    onOpenChange: (isOpen) => {
      setStateOpen(isOpen);

      if (isOpen) {
        onOpen?.();
      } else {
        onClose?.();
      }
    },
    middleware: [
      offset(5),
      flip(),
      // padding matches padding of tooltip box
      shift({ padding: 12 }),
      // padding matches border-radius of tooltip box
      arrow({ element: arrowRef, padding: 8 }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, { restMs: 10 }),
    useFocus(context),
    useRole(context, { role: 'tooltip' }),
    useDismiss(context),
  ]);

  const side = useMemo<Side>(() => {
    return placement.split('-')[0] as Side;
  }, [placement]);

  // const styles = useStyles({ variant, side });

  const styles = {};

  const mountReference = useCallback(mergeRefs(reference, referenceRef), []);
  const mountFloating = useCallback(mergeRefs(floating, floatingRef), []);
  const mountArrow = useCallback((el: HTMLDivElement) => {
    arrowRef.current = el;
    update();
  }, []);

  if (disabled) {
    return children;
  }

  return (
    <>
      {cloneElement(
        children,
        getReferenceProps({
          ref: mountReference,
          ...children.props,
        })
      )}
      <FloatingPortal>
        {open && (
          <div
            {...getFloatingProps({
              ref: mountFloating,
              className: clsx(mode === 'dark' && styles.dark),
              style: {
                position: strategy,
                top: y ?? '',
                left: x ?? '',
              },
            })}
            onClick={onClick}
          >
            <div className={styles.tooltip ?? ''}>
              {header && <div className={styles.header ?? ''}>{header}</div>}
              {title}
            </div>
            {hasArrow && (
              <Arrow ref={mountArrow} x={arrowX} y={arrowY} variant={variant} side={side} />
            )}
          </div>
        )}
      </FloatingPortal>
    </>
  );
};

Tooltip.displayName = 'Tooltip';
