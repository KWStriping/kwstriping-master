import type { PaletteOptions, ThemeConfig, SpacingStep } from './theme/types';
import { REQUIRED_SPACING_STEPS } from './theme/types';

export const getSpacing = (value = 1): string => (value ? `${(value * 4) / 10}rem` : '0');

export const spacing = Object.fromEntries(
  REQUIRED_SPACING_STEPS.map((n) => [String(n), getSpacing(Number(n))])
) as Record<SpacingStep, string>;

export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 1280,
  lg: 1680,
  xl: 1920,
};

export const fonts = {
  sans: ['var(--open-sans-font)', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
  serif: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
  mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
};

export const dark: PaletteOptions = {
  // action: {
  //   active: scheme.checkbox.default,
  //   1: "#5B68E4",
  //   2: "rgba(91, 104, 228, 0.8)",
  //   3: "rgba(91, 104, 228, 0.6)",
  //   4: "rgba(91, 104, 228, 0.4)",
  //   5: "rgba(91, 104, 228, 0.2)",
  // },
  active: {
    main: 'hsl(209, 100%, 62%)',
    100: 'hsl(209, 100%, 62%)',
    200: 'hsl(209, 66%, 53%)',
    300: 'hsl(210, 54%, 44%)',
    400: 'hsl(211, 49%, 35%)',
    500: 'hsl(214, 38%, 25%)',
  },
  alert: {
    paper: {
      error: 'hsl(0, 39%, 53%)',
      info: 'rgba(250, 250, 250, 1)',
      success: 'rgba(67, 156, 123, 1)',
      warning: 'rgba(183, 138, 72, 1)',
    },
    icon: {
      error: '#FE6E76',
      info: '#FAFAFA',
      success: '#A4E8BA',
      warning: '#FFE6AB',
    },
  },
  autofill: '#5D5881',
  background: {
    default: 'hsl(0, 100%, 0%)',
    paper: 'rgba(52, 56, 75, 1)',
  },
  brand: {
    default: '#5B68E4',
  },
  checkbox: {
    default: '#FFFFFF',
  },
  divider: '#252728',
  gray: {
    default: '#202124',
    disabled: 'rgba(32, 33, 36, 0.6)',
  },
  primary: {
    main: 'rgba(255, 255, 255, 1)',
    dark: 'rgba(91, 93, 109, 1)',
    100: 'rgba(255, 255, 255, 1)',
    200: 'rgba(146, 148, 161, 1)',
    300: 'rgba(118, 120, 135, 1)',
    400: 'rgba(91, 93, 109, 1)',
    500: 'rgba(64, 66, 82, 1)',
    600: 'rgba(38, 40, 55, 1)',
    contrastText: 'rgba(38, 40, 55, 1)',
  },
  secondary: {
    main: '#3EA3FF',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#FFE6AB',
    light: '#FFF4D2',
    dark: '#B78A48',
    // verydark: "#97661F",
  },
  success: {
    main: '#A4E8BA',
    light: '#E6F9F0',
    dark: '#439C7B',
    // verydark: "#22805D",
  },
  text: {
    disabled: 'rgba(91, 93, 109, 1)',
    primary: 'rgba(255, 255, 255, 1)',
    secondary: 'rgba(118, 120, 135, 1)',
  },
  info: {
    main: '#99E6FD',
    light: '#D2F6FE',
    dark: '#105CB3',
    // verydark: "#004697",
  },
  error: {
    main: '#FEADAD',
    light: '#FEDEDE',
    dark: '#B65757',
    100: 'rgba(235, 43, 89, 1)',
    200: 'rgba(235, 43, 89, 0.8)',
    300: 'rgba(235, 43, 89, 0.6)',
    400: 'rgba(235, 43, 89, 0.4)',
    500: 'rgba(235, 43, 89, 0.2)',
  },
  generic: {
    main: '#5B5D6D',
    light: '#F1F1F1',
    dark: '#7C7F7F',
    // verydark: "#252929",
  },
  disabled: '#5D6D83',
  paperBorder: '#252728',
};

export const light: PaletteOptions = {
  active: {
    main: 'rgba(5, 109, 255, 1)',
    100: 'rgba(5, 109, 255, 1)',
    200: 'rgba(55, 138, 255, 1)',
    300: 'rgba(104, 167, 255, 1)',
    400: 'rgba(193, 219, 255, 1)',
    500: 'rgba(230, 240, 255, 1)',
  },
  alert: {
    paper: {
      error: '#FFD6D9',
      info: '#FFFFFF',
      success: '#DFF3E9',
      warning: '#FFF4E4',
    },
    icon: {
      error: '#FE6E76',
      info: '#28234A',
      success: '#5DC292',
      warning: '#FFB84E',
    },
  },
  autofill: '#f4f6c5',
  background: {
    default: 'hsl(0, 100%, 100%)',
    paper: '#FFFFFF',
  },
  brand: {
    default: '#5B68E4',
  },
  checkbox: {
    default: '#616161',
  },
  //     divider: {
  //       default: "rgba(var(--border-color-primary-rgb), 0.15)",
  //     },
  divider: '#EAEAEA',
  gray: {
    default: '#C8C8C8',
    disabled: '#C0CFE2',
  },
  primary: {
    main: 'hsla(180, 5%, 15%, 1)',
    dark: 'hsla(180, 1%, 66%, 1)',
    100: 'hsla(180, 5%, 15%, 1)',
    200: 'rgba(81, 84, 84, 1)',
    300: 'rgba(124, 127, 127, 1)',
    400: 'hsla(180, 1%, 66%, 1)',
    500: 'rgba(211, 212, 212, 1)',
    600: 'rgba(233, 234, 234, 1)',
    contrastText: 'rgba(233, 234, 234, 1)',
  },
  //     primary: {
  //       main:"#0066ff",
  //       light: "#1a75ff",
  //       dark: "#005ce6",
  //     },
  secondary: {
    contrastText: '#ffffff',
    main: 'rgba(5, 109, 255, 1)',
  },
  //     text: {
  //       primary: "var(--text-color)",
  //       secondary: "rgba(var(--text-color-rgb), 0.6)",
  //       tertiary: "rgba(var(--text-color-rgb), 0.4)",
  //       button: "var(--button-text-color)",
  //       error: "var(--error-color)",
  //       success: "var(--success-color)",
  //     },
  text: {
    disabled: 'rgba(168, 169, 169, 1)',
    primary: 'rgba(37, 41, 41, 1)',
    secondary: 'rgba(124, 127, 127, 1)',
  },
  warning: {
    dark: '#B78A48',
    main: '#FFE6AB',
    light: '#FFF4D2',
  },
  success: {
    dark: '#439C7B',
    main: '#A4E8BA',
    light: '#E6F9F0',
  },
  info: {
    dark: '#105CB3',
    main: '#99E6FD',
    light: '#D2F6FE',
  },
  error: {
    main: '#B63755',
    light: '#FEDEDE',
    dark: '#B65757',
    100: '#B63755',
    200: '#D36474',
    300: '#E9878B',
    400: '#F7B6B2',
    500: '#FBDDD8',
  },
  generic: {
    light: '#F1F1F1',
    main: '#EAEAEA',
    dark: '#7C7F7F',
  },
  disabled: 'rgba(194, 209, 228, 1)',
  paperBorder: '#EAEAEA',
  paper: 'rgba(255, 255, 255, 0.9)',
};

export const colorSchemes = {
  light,
  dark,
};

const themeConfig: ThemeConfig = {
  fonts,
  spacing,
  getSpacing,
  breakpoints,
  colorSchemes,
  colorSchemeAttribute: 'data-color-scheme',
};

export default themeConfig;
