import throttle from 'lodash-es/throttle';
import type { MutableRefObject, RefObject } from 'react';
import { useEffect, useState } from 'react';

export type Position = Record<'x' | 'y', number>;

function getPosition(anchor?: HTMLElement | null): Position | undefined {
  if (anchor) {
    return {
      x: anchor?.scrollLeft,
      y: anchor?.scrollTop,
    };
  }
  return undefined;
}

export function isScrolledToBottom(
  anchor: MutableRefObject<HTMLElement> | RefObject<HTMLElement>,
  position: Position,
  offset = 0
) {
  return !!anchor.current && position
    ? position.y + anchor.current.clientHeight + offset >= anchor.current.scrollHeight
    : undefined;
}

function useElementScroll(anchor: MutableRefObject<HTMLElement | null>): Position | undefined {
  const [scroll, setScroll] = useState(getPosition(anchor.current));

  useEffect(() => {
    const anchorInstance = anchor.current;
    const handleScroll = throttle(() => setScroll(getPosition(anchorInstance)), 100);
    if (anchorInstance) {
      anchorInstance.addEventListener('scroll', handleScroll);
    }
    return () => {
      anchorInstance?.removeEventListener('scroll', handleScroll);
    };
  }, [anchor.current]);

  useEffect(() => {
    setTimeout(() => setScroll(getPosition(anchor.current)), 100);
  }, []);

  return scroll;
}
export default useElementScroll;
