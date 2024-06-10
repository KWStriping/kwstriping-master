'use client';

import { SessionProvider } from '@tempo/api/auth/react';
import type { ReactNode } from 'react';
import MDXProvider from '@tempo/ui/providers/MDXProvider';
import UrqlProvider from '@tempo/api/client/provider';

interface ContextProviderProps {
  children: ReactNode;
}

export default function ContextProvider({ children }: ContextProviderProps) {
  return (
    <UrqlProvider>
      <SessionProvider>
        <MDXProvider>{children}</MDXProvider>
      </SessionProvider>
    </UrqlProvider>
  );
}
