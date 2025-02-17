'use client';

import type { ReactNode } from 'react';
import MDXProvider from '@tempo/ui/providers/MDXProvider';
import UrqlProvider from '@tempo/api/client/provider';
import { SessionProvider } from '@tempo/api/auth/react/providers/SessionProvider';
import { BacklinkProvider } from '@tempo/ui/components/Layout/Backlink';
import { ShopSettingsProvider } from '@tempo/ui/providers/ShopSettingsProvider';
import { DndContext } from '@dnd-kit/core';
import { ActionBarProvider } from '@tempo/dashboard/components/bars/ActionBar';
import { DateProvider } from '@tempo/dashboard/components/core/Date/DateProvider';
import ExitFormDialogProvider from '@tempo/dashboard/components/forms/Form/ExitFormDialogProvider';
import { AppChannelProvider } from '@tempo/dashboard/components/layout/Layout/AppChannelContext';
import BackgroundTasksProvider from '@tempo/dashboard/oldSrc/containers/BackgroundTasks';
import type {} from '@mui/material/themeCssVarsAugmentation';

interface ContextProviderProps {
  children: ReactNode;
}

export default function ContextProvider({ children }: ContextProviderProps) {
  return (
    <UrqlProvider>
      <ShopSettingsProvider>
        <SessionProvider>
          <DateProvider>
            <BackgroundTasksProvider>
              <AppChannelProvider>
                <ActionBarProvider>
                  <BacklinkProvider>
                    <ExitFormDialogProvider>
                      <MDXProvider>
                        <DndContext>{children}</DndContext>
                      </MDXProvider>
                    </ExitFormDialogProvider>
                  </BacklinkProvider>
                </ActionBarProvider>
              </AppChannelProvider>
            </BackgroundTasksProvider>
          </DateProvider>
        </SessionProvider>
      </ShopSettingsProvider>
    </UrqlProvider>
  );
}
