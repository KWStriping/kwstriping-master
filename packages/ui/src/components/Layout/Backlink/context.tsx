import { useRef, useContext, createContext } from 'react';
import type { FC, ReactNode, Context, MutableRefObject } from 'react';

export type BacklinkContextType = MutableRefObject<HTMLDivElement | null>;

export const BacklinkContext: Context<BacklinkContextType | undefined> = createContext<
  BacklinkContextType | undefined
>(undefined);
BacklinkContext.displayName = 'BacklinkContext';

export const useBacklink = () => {
  const ctx = useContext(BacklinkContext);
  if (ctx === undefined) {
    throw new Error('useBacklink must be used within a BacklinkContext');
  }
  return ctx;
};

interface BacklinkProviderProps {
  children: ReactNode;
}

export const BacklinkProvider: FC<BacklinkProviderProps> = ({ children }) => {
  const anchor = useRef<HTMLDivElement | null>(null);
  return <BacklinkContext.Provider value={anchor}>{children}</BacklinkContext.Provider>;
};
