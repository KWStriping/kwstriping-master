import type { CssVarsThemeOptions, Palette } from '@mui/material/styles';

export const controlOverrides = (colors: Palette): CssVarsThemeOptions['overrides'] => ({
  MuiCheckbox: {
    colorPrimary: {
      '&&.Mui-checked:hover': {
        backgroundColor: 'transparent',
      },
    },
    colorSecondary: {
      '&&.Mui-checked:hover': {
        backgroundColor: 'transparent',
      },
    },
    root: {
      '&:hover, &.Mui-focusVisible': {
        '& > span::before': {
          animation: `200ms alternate hoverControlStart,
          600ms infinite alternate 200ms hoverControl`,
        },
        background: 'transparent',
        color: colors.active[100],
      },
      '& > span': {
        '&::before': {
          content: "''",
          width: 20,
          height: 20,
          background: colors.active[500],
          position: 'absolute',
          top: 0,
          left: 0,
          borderRadius: 2,
          transform: 'scale(0)',
        },
        position: 'relative',
      },
      '& svg': {
        width: 20,
        height: 20,
        zIndex: 0,
      },
      '& input': {
        width: 48,
        height: 48,
        top: -14,
        left: -14,
      },
      background: 'transparent',
      border: 'transparent',
      borderRadius: 3,
      padding: 14,
    },
    indeterminate: {
      color: colors.active[100],
    },
  },
  MuiRadio: {
    colorSecondary: {
      '&&.Mui-checked:hover': {
        backgroundColor: 'transparent',
      },
    },
    colorPrimary: {
      '&&.Mui-checked:hover': {
        backgroundColor: 'transparent',
      },
    },
    root: {
      '&:hover, &.Mui-focusVisible': {
        '& > span::before': {
          animation: `200ms alternate hoverControlStart,
          600ms infinite alternate 200ms hoverControl`,
        },
        background: 'transparent',
        color: colors.active[100],
      },
      '& > span': {
        '&::before': {
          content: "''",
          width: 20,
          height: 20,
          background: colors.active[500],
          position: 'absolute',
          top: 0,
          left: 0,
          borderRadius: '100%',
          transform: 'scale(0)',
        },
        position: 'relative',
      },
      '& svg': {
        width: 20,
        height: 20,
        zIndex: 0,
      },
      '& input': {
        width: 48,
        height: 48,
        top: -14,
        left: -14,
      },
      background: 'transparent',
      border: 'transparent',
      borderRadius: '100%',
      padding: 14,
    },
  },
  MuiSwitch: {
    colorSecondary: {
      '&$disabled': {
        '& + $track': {
          backgroundColor: 'transparent',
          border: `2px solid ${colors.disabled}`,
        },
        '&$checked + $track': {
          backgroundColor: colors.disabled,
          borderColor: colors.disabled,
        },
        '&$checked': {
          color: colors.background.paper,
        },
        color: colors.disabled,
      },
      '&$checked': {
        '&:hover': {
          backgroundColor: 'transparent',
        },
        '& + $track': {
          borderColor: colors.active[100],
        },
        color: colors.background.paper,
      },
      '&:hover': {
        color: colors.active[100],

        '& + $track': {
          borderColor: colors.active[100],
          backgroundColor: 'transparent',
        },
      },
      color: colors.primary[300],
    },
    root: {
      '&:hover, &:focus-visible, &.Mui-focusVisible': {
        '& $switchBase:not($disabled)': {
          '& + $track': {
            animation: `200ms alternate hoverSwitchStart,
              600ms infinite alternate 200ms hoverSwitch`,
          },
        },
      },
      height: 48,
      padding: '12px 16px',
      width: 80,
    },
    switchBase: {
      '&$checked': {
        transform: 'translateX(23px)',
      },
      '&:hover, &.Mui-focusVisible': {
        backgroundColor: 'transparent',
      },
      boxShadow: 'none',
      left: 4,
      marginLeft: 4,
      top: 8,
      color: colors.background.paper,
      border: 'none',
      background: 'transparent',
    },
    thumb: {
      boxShadow: 'none',
      height: 14,
      left: 4,
      position: 'relative',
      width: 14,
    },
    track: {
      border: `2px solid ${colors.primary[300]}`,
      backgroundColor: 'transparent',
      borderRadius: 12,
      height: 24,
      opacity: '1 ', // !important'
      width: 48,
      transition: '200ms',
    },
  },
});
