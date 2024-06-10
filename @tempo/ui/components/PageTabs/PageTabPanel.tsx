import type { FC, ReactNode } from 'react';

interface PageTabPanelProps {
  children: ReactNode;
  show: boolean;
}

export const PageTabPanel: FC<PageTabPanelProps> = ({ children, show }) => (
  <div
    style={{
      display: show ? 'block' : 'none',
    }}
  >
    {children}
  </div>
);
PageTabPanel.displayName = 'PageTabPanel';
