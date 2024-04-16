import { useContext, createContext, useMemo, useState } from 'react';
import type { FC, ReactNode, Context } from 'react';

// Imitate object returned from useRef
type AnchorFunction = {
  (el: HTMLDivElement): void;
  current: HTMLDivElement | null;
};

export interface ActionBarContextType {
  anchor: AnchorFunction;
}

export const ActionBarContext: Context<ActionBarContextType | undefined> = createContext<
  ActionBarContextType | undefined
>(undefined);
ActionBarContext.displayName = 'ActionBarContext';

export const useActionBar = () => {
  const ctx = useContext(ActionBarContext);
  if (ctx === undefined) {
    throw new Error('useActionBar must be used within a ActionBarContext');
  }

  return ctx;
};

interface ActionBarProviderProps {
  children: ReactNode;
}

export const ActionBarProvider: FC<ActionBarProviderProps> = ({ children }) => {
  const [anchorState, setAnchor] = useState<HTMLDivElement | null>(null);

  const anchor = useMemo(() => {
    const fn = setAnchor as AnchorFunction;
    fn.current = anchorState;
    return fn;
  }, [anchorState]);

  return <ActionBarContext.Provider value={{ anchor }}>{children}</ActionBarContext.Provider>;
};
