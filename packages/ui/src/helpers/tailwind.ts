import { lighten, darken, getContrastRatio } from '@mui/system/colorManipulator';
import type { Config } from 'tailwindcss';
import type { RecursiveKeyValuePair, ResolvableTo } from 'tailwindcss/types/config';
import type { ThemeConfig } from '../theme/types';

type TailwindColors = ResolvableTo<RecursiveKeyValuePair<string, string>>;

export const generateTailwindConfig = (theme: ThemeConfig): Config => {
  const { spacing, breakpoints, colorSchemes, colorSchemeAttribute, fonts } = theme;

  const screens = Object.fromEntries(
    Object.entries(breakpoints).map(([key, value]) => [
      key,
      typeof value === 'number' ? `${value}px` : value,
    ])
  );

  /** @type {Record<string, string>} */
  const keysMap = {
    default: 'DEFAULT',
    main: 'DEFAULT',
  };

  const expandColorSpec = (colorSpec: Record<string, string>) => {
    let expandedColorSpec = colorSpec;
    const main = colorSpec['DEFAULT'];
    if (main) {
      // console.log("main", main);
      // console.log(getContrastRatio(main, "#fff") > 4.5 ? "#fff" : "#000");
      expandedColorSpec = {
        DEFAULT: main,
        light: lighten(main, 0.2),
        dark: darken(main, 0.2),
        contrast: colorSpec['contrastText']
          ? colorSpec['contrastText']
          : getContrastRatio(main, '#fff') > 4.5
          ? '#fff'
          : '#000',
        ...colorSpec,
      };
      if (expandedColorSpec['contrastText']) delete expandedColorSpec['contrastText'];
    }
    return expandedColorSpec;
  };

  const transformColors = (colors: TailwindColors): TailwindColors => {
    return transform<TailwindColors>(colors, function (result, value, key) {
      const transformedKey = keysMap[key as keyof typeof keysMap] || key;
      let transformedValue = isObject(value) ? transformColors(value as TailwindColors) : value;
      if (typeof transformedValue !== 'string') {
        transformedValue = expandColorSpec(transformedValue as Record<string, string>);
      }
      (result as Record<string, unknown>)[transformedKey] = transformedValue;
      return result as unknown as TailwindColors;
    });
  };

  const colors = transformColors(colorSchemes.light as unknown as TailwindColors);

  return {
    content: ['./components/**/*.{jsx,tsx,css}'],
    // Disable preflight so that MUI's preflight is used instead.
    // https://mui.com/material-ui/guides/interoperability/#setup
    corePlugins: { preflight: false },
    darkMode: ['class', `[${colorSchemeAttribute}="dark"]`],
    // https://tailwindcss.com/docs/configuration#selector-strategy
    important: '#__next',
    mode: 'jit',
    theme: {
      extend: {
        screens,
        colors,
        spacing: {
          px: '1px',
          ...spacing,
        },
        borderWidth: {
          DEFAULT: '1px',
        },
        fontFamily: fonts,
        fontSize: {
          xs: ['1.1rem', '1.6rem'],
          sm: ['1.2rem', '2.1rem'],
          base: ['1.4rem', '2.1rem'],
          md: ['1.6rem', '1.9rem'],
          lg: ['2.4rem', '3.2rem'],
          xl: ['3.2rem', '4.6rem'],
        },
        borderRadius: {
          DEFAULT: '4px',
          full: '50%',
        },
        boxShadow: {
          'decorative-center': '0 32px 0 -16px #394052',
          decorative: '16px 16px 0 #394052',
          modal: '0px 4px 20px 0px rgba(0, 0, 0, 0.12)',
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
    ],
  };
};

function isObject(value: unknown): boolean {
  return value != null && typeof value === 'object';
}

function transform<T extends object>(
  obj: T,
  fn: (result: T, value: string | T, key: string) => T
): T {
  const entries = Object.entries(obj);
  const result = { ...obj };
  for (const [key, value] of entries) {
    fn(result, value, key);
  }
  return result;
}
