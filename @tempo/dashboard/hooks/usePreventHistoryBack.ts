import { useEffect, useRef } from 'react';

/**
 * Hook that prevents hostory-back when use touchpad on Mac.
 * Since overscroll-behavior sometimes may not work (eg. Safari 15 which is in use)
 * We need to handle this in JS
 *
 * https://caniuse.com/css-overscroll-behavior
 */

export const usePreventHistoryBack = (
  scroller: HTMLElement | null,
  options?: { defaultEnabled?: boolean }
) => {
  const enabled = useRef(options?.defaultEnabled ?? true);
  const offsetY = useRef(0);

  const wheelHandler = (event: any) => {
    if (!enabled.current) return;

    const notVertival = Math.abs(event.deltaX) - Math.abs(event.deltaY) >= 0;

    if (event.target.scrollLeft <= 0 && event.deltaX <= 0 && notVertival) {
      event.preventDefault();
    }

    offsetY.current = window.scrollY;
  };

  useEffect(() => {
    if (!scroller) return;

    scroller.addEventListener('wheel', wheelHandler, { passive: false });

    return () => {
      scroller.removeEventListener('wheel', wheelHandler);
    };
  }, [scroller]);

  const enable = () => {
    enabled.current = true;
  };

  const disable = () => {
    enabled.current = false;
  };

  return { enable, disable };
};
