import type { CssVarsThemeOptions, Palette } from '@mui/material/styles';

export const tableOverrides = (
  colors: Palette,
  fontFamily: string
): CssVarsThemeOptions['components'] => ({
  MuiTable: {
    styleOverrides: {
      root: {
        fontFamily,
        fontFeatureSettings: '"tnum"',
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      body: {
        fontSize: '1.6rem',
      },
      head: {
        fontSize: '1.4rem',
        fontWeight: 500,
        color: colors.primary[300],
      },
      paddingCheckbox: {
        '&:first-child': {
          padding: '0 18px',
          width: 72,
        },
        '&:not(first-child)': {
          padding: 0,
          width: 52,
        },
        '&:last-child': {
          paddingRight: 20,
        },
      },
      root: {
        '&:first-child': {
          '&:not($paddingCheckbox)': {
            paddingLeft: 32,
            paddingRight: 32,
            textAlign: 'left',
          },
        },
        height: 56,
        borderBottomColor: colors.paperBorder,
        padding: '0 32px',
      },
    },
  },
  MuiTablePagination: {
    styleOverrides: {
      input: {
        color: colors.active[100],
        fontSize: '1.4rem',
      },
    },
  },
  MuiTableRow: {
    styleOverrides: {
      footer: {
        '$root$hover&:hover': {
          background: 'none',
        },
      },
      head: {
        '$root$hover&:hover': {
          background: 'none',
        },
        color: colors.primary[300],
      },
      hover: {
        '$root&:hover': {
          background: colors.gray,
        },
        transition: '200ms',
      },
      root: {
        position: 'relative',
      },
    },
  },
});
