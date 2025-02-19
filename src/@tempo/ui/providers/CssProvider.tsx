import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import type { ReactNode } from 'react';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

export default function CssProvider({
  children,
  theme,
  withBaseline = true,
}: {
  children: ReactNode;
  theme: any;
  withBaseline?: boolean;
}) {
  return (
    <>
      {withBaseline && <CssBaseline />}
      <AppRouterCacheProvider options={{ key: 'mui', prepend: true, enableCssLayer: true }}>
        <ThemeProvider theme={theme}>
          <InitColorSchemeScript attribute="class" />
          {/* {getInitColorSchemeScript({
            // These properties are normally set when importing from @mui/material,
            // but we have to set manually because we are importing from @mui/system.
            attribute: 'data-mui-color-scheme',
            modeStorageKey: 'mui-mode',
            colorSchemeStorageKey: 'mui-color-scheme',
            // All options that you pass to CssVarsProvider you should also pass here.
            defaultMode: 'dark',
          })} */}
          {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
    </>
  );
}
