import type { CssVarsThemeOptions, Palette, SupportedColorScheme } from '@mui/material/styles';

export const buttonOverrides = (
  colors: Palette,
  mode: SupportedColorScheme
): CssVarsThemeOptions['overrides'] => {
  const isDarkMode = mode === 'dark';

  const containedPrimaryHover = {
    backgroundColor: colors.background.paper,
    color: colors.primary[100],
    borderColor: colors.primary[100],

    ...(isDarkMode && {
      backgroundColor: 'transparent',
      color: colors.primary[100],
      borderColor: colors.primary[100],
    }),
  };

  return {
    MuiButton: {
      contained: {
        '&$disabled': {
          '&$containedPrimary': {
            color: colors.background.paper,
            backgroundColor: colors.primary[500],

            ...(isDarkMode && {
              color: colors.primary[200],
              backgroundColor: colors.primary[500],
            }),
          },
          '&$containedSecondary': {
            background: colors.background.paper,
            color: colors.disabled,

            ...(isDarkMode && {
              color: colors.primary[300],
            }),
          },
        },
        '&$focusVisible': {
          ...containedPrimaryHover,
          boxShadow: undefined,
        },
        '&:active': {
          boxShadow: 'none',
        },
        '&:hover': {
          '@media(hover: none)': {
            boxShadow: 'none',
          },
          boxShadow: 'none',
        },
        boxShadow: 'none',
      },
      containedPrimary: {
        '&&:hover': {
          ...containedPrimaryHover,
        },
        '&&:active': {
          backgroundColor: colors.primary[500],
        },

        ...(isDarkMode && {
          color: colors.primary[600],
          backgroundColor: colors.primary[100],
          borderColor: colors.primary[100],
        }),

        borderColor: colors.primary[100],
      },
      containedSecondary: {
        ...(isDarkMode && {
          color: colors.primary[100],
        }),
      },
      outlinedSecondary: {
        ...(isDarkMode && {
          color: colors.primary[100],
          borderColor: colors.primary[400],
        }),
      },
      root: {
        '&$disabled': {
          borderColor: colors.primary[500],
        },
        '&:hover': {
          backgroundColor: undefined,
        },
        borderRadius: 4,
        fontSize: '1.6rem',
        lineHeight: 1.55,
        padding: '7px 16px',
        textTransform: 'none',
        borderWidth: '1px',
        borderStyle: 'solid',
      },
      text: {
        '&&$disabled': {
          color: colors.disabled,
        },
        '&:hover, &$focusVisible': {
          borderColor: colors.primary[100],
        },
        '&:active': {
          background: colors.primary[500],
        },
      },
      textPrimary: {
        '&:hover, &$focusVisible': {
          background: colors.active[500],
        },
        '&:active': {
          background: colors.active[400],
        },
      },
      textSizeSmall: {
        fontSize: '1.3rem',
      },
      outlined: {
        '&$disabled': {
          border: undefined,
          borderColor: colors.primary[500],
          color: colors.primary[500],

          ...(isDarkMode && {
            color: colors.primary[300],
            borderColor: colors.primary[300],
          }),
        },
        '&$error': {
          color: 'red',
        },
        '&:hover': {
          // Unsets border as it will require us to override borderWidth and
          // borderStyle over and over
          border: undefined,
        },
        '&:hover, &$focusVisible': {
          borderColor: colors.primary[100],
        },
        '&:active': {
          backgroundColor: colors.primary[500],

          ...(isDarkMode && {
            backgroundColor: colors.primary[200],
          }),
        },
        '& svg': {
          marginRight: 8,
        },
        background: colors.background.paper,
        borderColor: colors.primary[500],
        borderWidth: 1,
        borderStyle: 'solid',
        // 1px smaller because of border
        padding: '7px 12px',

        ...(isDarkMode && {
          color: colors.primary[100],
          borderColor: colors.primary[400],
        }),
      },
      outlinedPrimary: {
        '&:hover, &$focusVisible': {
          borderColor: colors.primary[100],
          color: colors.primary[100],

          ...(isDarkMode && {
            borderColor: colors.primary[100],
            color: colors.primary[100],
          }),
        },
        '&:hover': {
          // Unsets border as it will require us to override borderWidth and
          // borderStyle over and over
          border: undefined,
          backgroundColor: undefined,
        },
        '&:active': {
          backgroundColor: colors.primary[500],
        },
        border: undefined,
        color: undefined,
      },
      outlinedSizeSmall: {
        fontSize: '1.6rem',
        padding: '2px 12px',
      },
    },
    MuiIconButton: {
      root: {
        '&:hover, &.Mui-focusVisible': {
          borderColor: colors.active[100],
          color: colors.active[100],
        },
        '&:hover': {
          // Unsets border as it will require us to override borderWidth and
          // borderStyle over and over
          border: undefined,
          backgroundColor: colors.background.paper,
          color: colors.primary[100],
        },
        '&:active': {
          backgroundColor: colors.primary[600],
        },
        '&$disabled': {
          border: undefined,
          borderColor: 'transparent',
          color: colors.primary[500],
        },
        background: colors.primary[100],
        border: `1px solid ${colors.primary[100]}`,
        borderRadius: 4,
        color: colors.background.paper,
        padding: 7,
        transition: '200ms',
      },
    },
  };
};
