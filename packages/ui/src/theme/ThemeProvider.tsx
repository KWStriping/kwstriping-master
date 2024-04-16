import { BacklinkProvider } from '@core/ui/components/Layout/Backlink';
import type { EmotionCache } from '@emotion/cache';
import { AppCacheProvider } from '@mui/material-nextjs/v13-pagesRouter';
import MuiCssBaseline from '@mui/material/CssBaseline';
import type { PaletteOptions, SupportedColorScheme, Theme } from '@mui/material/styles';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  StyledEngineProvider,
} from '@mui/material/styles';
import merge from 'lodash-es/merge';
import type { ReactNode, FC } from 'react';
import { colorSchemes as defaultColorSchemes } from '../theme.config';
import { createTheme } from './createTheme';

export interface ThemeProviderProps {
  colorSchemes?: Record<SupportedColorScheme, PaletteOptions>;
  overrides?: Partial<Theme>;
  colorSchemeAttribute?: string;
  cache: EmotionCache;
  children: ReactNode;
}

const InnerThemeProvider: FC<Omit<ThemeProviderProps, 'cache'>> = ({
  colorSchemes = defaultColorSchemes,
  colorSchemeAttribute = 'data-color-scheme',
  overrides = {},
  children,
}) => {
  const theme = merge(createTheme({ colorSchemes }), overrides);
  return (
    <StyledEngineProvider injectFirst>
      <CssVarsProvider theme={theme} attribute={colorSchemeAttribute}>
        <MuiCssBaseline />
        <BacklinkProvider>{children}</BacklinkProvider>
      </CssVarsProvider>
    </StyledEngineProvider>
  );
};

export const ThemeProvider: FC<ThemeProviderProps> = ({ children, cache, ...props }) => {
  return (
    <AppCacheProvider emotionCache={cache}>
      <InnerThemeProvider {...props}>{children}</InnerThemeProvider>
    </AppCacheProvider>
  );
};
