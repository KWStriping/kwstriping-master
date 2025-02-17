'use client';

import type { ReactNode } from 'react';
import { SessionProvider } from '@tempo/api/auth/react';
import MDXProvider from '@tempo/ui/providers/MDXProvider';

interface ContextProviderProps {
  children: ReactNode;
}

export default function ContextProvider({ children }: ContextProviderProps) {
  return (
    <SessionProvider>
      <MDXProvider>{children}</MDXProvider>
    </SessionProvider>
  );
}
