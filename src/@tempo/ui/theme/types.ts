import type {
  // Palette,
  PaletteOptions as MuiPaletteOptions,
  SupportedColorScheme,
  SimplePaletteColorOptions as MuiSimplePaletteColorOptions,
  PaletteColorOptions as MuiPaletteColorOptions,
  Theme as MuiBaseTheme,
  PaletteColor as MuiPaletteColor,
  CssVarsTheme,
} from '@mui/material/styles';

import type { ColorPartial } from '@mui/material/styles/createPalette';

// type ExtractPalette<TPaletteOptions> = {
//   [Property in keyof TPaletteOptions]: TPaletteOptions[Property] extends MuiPaletteColorOptions
//     ? NonNullable<MuiPaletteColor>
//     : NonNullable<TPaletteOptions[Property]>;
// };

interface CustomSimplePaletteColorOptions {
  default?: string;
}

type AlertPalette = Record<'success' | 'error' | 'warning' | 'info', string>;
type AlertColors = Record<'paper' | 'icon', AlertPalette>;

interface CustomPaletteOptions {
  brand: Record<'default', string>;
  active: MuiPaletteColorOptions;
  autofill: string;
  disabled: string;
  paper?: string;
  paperBorder: string;
  checkbox: Record<'default', string>;
  gray: Record<'default' | 'disabled', string>;
  alert: AlertColors;
  generic: SimplePaletteColorOptions;
  warning?: MuiPaletteColorOptions;
  success?: MuiPaletteColorOptions;
  info?: MuiPaletteColorOptions;
  error?: MuiPaletteColorOptions;
}

declare module '@mui/material/styles' {
  // eslint-disable-next-line ts/no-empty-interface
  type SimplePaletteColorOptions = CustomSimplePaletteColorOptions;

  type CustomPaletteColorOptions = SimplePaletteColorOptions & ColorPartial;

  // eslint-disable-next-line ts/no-empty-interface
  type PaletteColorOptions = CustomPaletteColorOptions;

  // eslint-disable-next-line ts/no-empty-interface
  type PaletteColor = Required<CustomPaletteColorOptions>;

  /* MUI -----------------------
  export interface PaletteOptions {
    primary?: PaletteColorOptions;
    secondary?: PaletteColorOptions;
    error?: PaletteColorOptions;
    warning?: PaletteColorOptions;
    info?: PaletteColorOptions;
    success?: PaletteColorOptions;
    mode?: PaletteMode;
    tonalOffset?: PaletteTonalOffset;
    contrastThreshold?: number;
    common?: Partial<CommonColors>;
    grey?: ColorPartial;
    text?: Partial<TypeText>;
    divider?: string;
    action?: Partial<TypeAction>;
    background?: Partial<TypeBackground>;
    getContrastText?: (background: string) => string;
  }
  */

  // eslint-disable-next-line ts/no-empty-interface
  type PaletteOptions = CustomPaletteOptions;

  // eslint-disable-next-line ts/no-empty-interface
  type Palette = Required<PaletteOptions>;

  // eslint-disable-next-line ts/no-empty-interface
  type Theme = CssVarsTheme;
}

export type SimplePaletteColorOptions = MuiSimplePaletteColorOptions &
  CustomSimplePaletteColorOptions;

export type PaletteColorOptions = SimplePaletteColorOptions & ColorPartial;

// eslint-disable-next-line ts/no-empty-interface
export interface PaletteOptions extends MuiPaletteOptions, CustomPaletteOptions {}

// eslint-disable-next-line ts/no-empty-interface
export interface PaletteColor extends MuiPaletteColor, Required<PaletteColorOptions> {}

export type { ColorPartial, SupportedColorScheme };

// eslint-disable-next-line ts/no-empty-interface
export type Palette = Required<PaletteOptions>;

type MuiCssVarsTheme = Omit<MuiBaseTheme, 'palette'> & CssVarsTheme;

export interface Theme extends MuiCssVarsTheme {
  vars: Omit<MuiCssVarsTheme['vars'], 'palette'> & {
    // palette: MuiCssVarsTheme['vars']['palette'] & Palette;
    palette: MuiCssVarsTheme['vars']['palette'] & Palette;
  };
}

// prettier-multiline-arrays-set-line-pattern: 11
export const REQUIRED_SPACING_STEPS = [
  '0',
  '0.5',
  '1',
  '1.5',
  '2',
  '2.5',
  '3',
  '3.5',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '12',
  '14',
  '16',
  '20',
  '24',
  '28',
  '32',
  '36',
  '40',
  '44',
  '48',
  '52',
  '56',
  '60',
  '64',
  '72',
  '80',
  '96',
] as const;

export type SpacingStep = (typeof REQUIRED_SPACING_STEPS)[number];

export interface ThemeConfig {
  colorSchemes: Record<SupportedColorScheme, PaletteOptions>;
  colorSchemeAttribute?: string;
  fonts: Record<'sans' | 'serif' | 'mono', string[]>;
  spacing?: Record<SpacingStep, string>;
  getSpacing?: (step: number) => string;
  breakpoints: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number>;
}
