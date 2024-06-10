import type { CssVarsThemeOptions, Palette, SupportedColorScheme } from '@mui/material/styles';

function getInputBoxShadow(color: string) {
  return `0 0 0 3px ${color}`;
}

export const inputOverrides = (
  colors: Palette,
  mode: SupportedColorScheme
): CssVarsThemeOptions['overrides'] => ({
  MuiFormHelperText: {
    root: {
      '&$error': {
        color: colors.error.dark,
      },
    },
  },
  MuiInput: {
    input: {
      '&:-webkit-autofill': {
        WebkitTextFillColor: colors.primary[100],
        boxShadow: `inset 0 0 0px 9999px ${colors.primary[500]}`,
      },
      '&::placeholder': {
        opacity: '1 !important' as unknown,
      },
      color: colors.primary[100],
    },
    underline: {
      '&:after': {
        borderBottomColor: colors.primary[100],
      },
    },
  },
  MuiInputBase: {
    root: {
      borderRadius: '4px',
      backgroundColor: 'white',
      '[data-color-scheme="dark"] &': {
        backgroundColor: 'black',
      },
    },
    input: {
      '&$disabled': {
        color: colors.primary[200],
      },
      '&::placeholder': {
        color: colors.primary[300],
        opacity: '1 !important' as unknown,
      },
      borderRadius: '4px',
    },
  },
  MuiInputLabel: {
    formControl: {
      transform: 'translate(0, 1.5px) scale(0.75)',
      transformOrigin: 'top left',
      width: '100%',
    },
    outlined: {
      '&$shrink': {
        transform: 'translate(12px, 9px) scale(0.75)',
      },
      transform: 'translate(14px, 18px) scale(1)',
    },
    root: {
      '&&$disabled': {
        color: colors.primary[200],
      },
      '&&&': {
        color: colors.primary[300],

        '&$focused': {
          color: colors.primary[100],
        },

        '&$disabled': {
          color: mode === 'dark' ? colors.primary[200] : colors.primary[400],
        },
        '&$error': {
          '&$focused': {
            color: colors.error.dark,
          },
          color: colors.error.dark,
        },
      },
    },
    shrink: {
      // Negates x0.75 scale
      width: '133%',
    },
  },
  MuiOutlinedInput: {
    input: {
      '&:-webkit-autofill': {
        borderRadius: 4,
        boxShadow: '0 0 0px 1000px rgba(19, 190, 187, 0.1) inset',
      },
      '&&$disabled': {
        backgroundColor: mode === 'dark' ? colors.primary[500] : colors.background.default,
        borderColor: mode === 'dark' ? colors.primary[400] : colors.primary[600],
      },
      color: colors.primary[100],
      padding: '23px 12px 10px 12px',
    },
    inputMultiline: {
      left: -2,
      padding: '10px 0',
      position: 'relative',
    },
    multiline: {
      '&$disabled': {
        background: mode === 'dark' ? colors.primary[500] : colors.background.default,
        borderColor: mode === 'dark' ? colors.primary[400] : colors.primary[600],
      },
    },
    root: {
      '& fieldset': {
        top: 0,
      },
      '& legend': {
        display: 'none',
      },
      '&$disabled': {
        '& fieldset': {
          borderColor: `${colors.disabled} !important`,
        },
        '& input, & textarea': {
          backgroundColor: colors.background.default,
          color: colors.primary[300],
        },
        boxShadow: '0 0 0 0 transparent ', // !important'
        backgroundColor: colors.background.default,
      },
      '&$error': {
        boxShadow: getInputBoxShadow(mode === 'dark' ? colors.error.dark : colors.error.light),
      },
      '&:not($error):hover': {
        boxShadow: getInputBoxShadow(mode === 'dark' ? colors.primary[400] : colors.primary[600]),
        '& input': {
          color: colors.primary[100],
        },
        '&&&': {
          '& fieldset': {
            borderColor: mode === 'dark' ? colors.primary[200] : colors.primary[400],
          },
        },
      },
      backgroundColor: colors.background.paper,
      transition: 'box-shadow 200ms',
      top: 0,
      fontWeight: 400,
    },
    notchedOutline: {
      // It's so much easier to put it here with important tag rather than
      // override in multiple places using cascade composition
      borderWidth: '1px ', // !important'
    },
  },
});
