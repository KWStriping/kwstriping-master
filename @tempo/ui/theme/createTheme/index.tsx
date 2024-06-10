// import { alpha } from "@mui/system";
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
import { shadows } from './shadows';
import type { PaletteOptions, SupportedColorScheme } from '@tempo/ui/theme/types';
import { breakpoints, getSpacing, fonts } from '@tempo/ui/theme.config';

export const ICON_BUTTON_SIZE = 48;

const fontFamily = fonts.sans.join(', ');

interface CreateThemeArgs {
  colorSchemes: Record<SupportedColorScheme, PaletteOptions>;
}

const OUTLINED_INPUT_VERTICAL_PADDING = 10;
const OUTLINED_INPUT_HORIZONTAL_PADDING = 14;

export const createTheme = ({ colorSchemes: _ }: CreateThemeArgs) => {
  // TODO: expand palette safely for MUI and tailwind!!!
  const colorSchemes = _;
  // TODO: figure out why this errors in dashboard typecheck
  // theme.typography.body1 = {
  //   ...theme.typography.body1,
  //   color: colorSchemes.light.primary[100],
  //   '[data-color-scheme="dark"] &': {
  //     color: colorSchemes.dark.primary[100],
  //   },
  // };
  // theme.typography.h4 = {
  //   ...theme.typography.h4,
  //   color: colorSchemes.light.primary[100],
  //   '[data-color-scheme="dark"] &': {
  //     color: colorSchemes.dark.primary[100],
  //   },
  // };
  return extendTheme({
    breakpoints: { values: breakpoints },
    colorSchemes: {
      light: { palette: colorSchemes.light },
      dark: { palette: colorSchemes.dark },
    },
    components: {
      // ...overrides(colorSchemes, fontFamily),
      MuiAutocomplete: {
        styleOverrides: {
          inputRoot: {
            padding: `${OUTLINED_INPUT_VERTICAL_PADDING}px ${OUTLINED_INPUT_HORIZONTAL_PADDING}px`,
          },
          input: {
            paddingTop: '0 ', // !important'
            paddingBottom: '0 ', // !important'
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableRipple: true,
          variant: 'contained',
        },
      },
      MuiCard: {
        styleOverrides: {
          root: () => ({
            border: `1px solid ${colorSchemes.light.paperBorder}`,
            '[data-color-scheme="dark"] &': {
              border: `1px solid ${colorSchemes.dark.paperBorder}`,
            },
            borderRadius: 6,
            overflow: 'visible',
          }),
        },
        defaultProps: {
          elevation: 0,
        },
      },
      MuiCardActions: {
        styleOverrides: {
          root: {
            '.MuiCardContent-root + &': {
              paddingTop: 0,
            },
            padding: '3.2rem 3.2rem 3.2rem',
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            '.MuiCardHeader-root + &': {
              paddingTop: 0,
            },
            padding: '2.4rem 3.2rem',
          },
        },
      },
      MuiCardHeader: {
        styleOverrides: {
          action: {
            position: 'relative',
            top: 4,
          },
          root: {
            padding: '2.4rem 3.2rem',
          },
        },
      },
      MuiCheckbox: {
        defaultProps: {
          color: 'secondary',
          disableRipple: true,
          // checkedIcon: <CheckboxCheckedIcon />,
          // icon: <CheckboxIcon   />,
          // indeterminateIcon: <CheckboxIndeterminateIcon />,
        },
      },
      MuiChip: {
        styleOverrides: {
          avatar: {
            fontSize: '1.2rem',
            height: 32,
            left: -5,
            position: 'relative',
            width: 32,
          },
          root: {
            '& $avatar': {
              fontSize: '1.2rem',
            },
            fontSize: '1.3rem',
          },
        },
      },
      MuiCircularProgress: {
        defaultProps: {
          color: 'secondary',
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            overflowY: undefined,
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: () => ({
            borderTop: `1px solid ${colorSchemes.light.divider}`,
            '[data-color-scheme="dark"] &': {
              borderTop: `1px solid ${colorSchemes.dark.divider}`,
            },
            padding: '16px 24px',
          }),
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            overflowX: undefined,
            overflowY: undefined,
            padding: '24px 0px',
            margin: '0px 24px',
          },
        },
      },
      MuiDialogContentText: {
        styleOverrides: {
          root: {
            '&:last-child': {
              marginBottom: 0,
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          light: () => ({
            backgroundColor: colorSchemes.light.background?.paper,
            '[data-color-scheme="dark"] &': {
              backgroundColor: colorSchemes.dark.background?.paper,
            },
          }),
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: 'white',
            '[data-color-scheme="dark"] &': {
              backgroundColor: 'black',
            },
          },
        },
      },
      MuiFormControl: {
        defaultProps: {
          variant: 'filled',
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          label: {
            lineHeight: 1.2,
            marginLeft: 4,
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          // filled: {
          //   "&&:not($error)": {
          //     color: colorSchemes.light.active[100],
          //   },
          // },
          // root: {
          //   "&&$focused:not($error)": {
          //     color: colorSchemes.light.primary[300],
          //   },
          // },
        },
      },
      MuiListItem: {
        styleOverrides: {
          // button: {
          //   "&:focus": {
          //     background: colorSchemes.light.active[500],
          //     color: colorSchemes.light.primary[100],
          //   },
          // },
          // root: {
          //   "&$selected": {
          //     "&:hover": {
          //       backgroundColor: colorSchemes.light.primary[100],
          //     },
          //     backgroundColor: colorSchemes.light.primary[100],
          //     outline: 0,
          //   },
          // },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            borderRadius: 0,
          },
        },
      },
      // MuiMenuItem: {
      //   styleOverrides: {
      //     root: {
      //       "&$selected, &$selected:focus, &$selected:hover": {
      //         backgroundColor: [colorSchemes.light.active[500], "!important"] as unknown,
      //         color: colorSchemes.light.active[100],
      //       },
      //       "&:hover": {
      //         backgroundColor: [colorSchemes.light.active[500], "!important"] as unknown,
      //       },
      //       "@media(min-width: 600px)": {
      //         minHeight: 48,
      //       },
      //       cursor: "pointer",
      //     },
      //   },
      // },
      MuiInputLabel: {
        styleOverrides: {
          outlined: {
            '&:not(.MuiInputLabel-shrink)': {
              transform: `translate(${OUTLINED_INPUT_HORIZONTAL_PADDING}px, ${OUTLINED_INPUT_VERTICAL_PADDING}px) scale(1)`,
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          input: {
            padding: `${OUTLINED_INPUT_VERTICAL_PADDING}px ${OUTLINED_INPUT_HORIZONTAL_PADDING}px`,
          },
        },
      },
      // MuiSnackbarContent: {
      //   styleOverrides: {
      //     action: {
      //       // "& $MuiIconButton": {
      //       //   "& svg": {
      //       //     color: colorSchemes.light.primary[100],
      //       //   },
      //       // },
      //       display: 'block',
      //       paddingBottom: 10,
      //       paddingLeft: 0,
      //       paddingRight: 45,
      //     },
      //     message: {
      //       fontSize: 16,
      //     },
      //     root: {
      //       // backgroundColor: colorSchemes.light.background.paper,
      //       // boxShadow:
      //       //   "0 6px 10px 0px rgba(0, 0, 0, 0.15), 0 1px 18px 0px rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.10)",
      //       color: colorSchemes.light.primary[100],
      //       '[data-color-scheme="dark"] &': {
      //         color: colorSchemes.light.primary[100],
      //       },
      //       display: 'block',
      //       maxWidth: 480,
      //     },
      //   },
      // },
      MuiSelect: {
        defaultProps: {
          MenuProps: {
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            fontSize: '2.4rem',
            height: '1em',
            width: '1em',
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          arrow: {
            color: colorSchemes.light.alert.icon.info,
            '[data-color-scheme="dark"] &': {
              backgroundColor: 'rgba(255 255 255 / 0.2)',
            },
          },
          tooltip: {
            backgroundColor: colorSchemes.light.alert.icon.info,
            '[data-color-scheme="dark"] &': {
              backgroundColor: 'rgba(255 255 255 / 0.2)',
            },
            fontSize: '0.8em',
            padding: 16,
          },
        },
      },
      // MuiTouchRipple: {
      //   styleOverrides: {
      //     child: {
      //       backgroundColor: alpha(colorSchemes.light.active[100], 1),
      //     },
      //     childLeaving: {
      //       backgroundColor: alpha(colorSchemes.light.active[100], 1),
      //     },
      //     ripple: {
      //       '&$rippleVisible': {
      //         backgroundColor: alpha(colorSchemes.light.active[100], 1),
      //       },
      //       borderRadius: '100%',
      //     },
      //   },
      // },
      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
        },
      },
      //   MuiLink: {
      //     style: {
      //       color: colorSchemes.light.active[100],
      //       '[data-color-scheme="dark"] &': {
      //         color: colorSchemes.light.active[100],
      //       },
      //     },
      //   },
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            // h1: 'h1',
            // h2: 'h2',
            // h3: 'h3',
            // h4: 'h4',
            // h5: 'h5',
            // h6: 'h6',
            // subtitle1: 'h6',
            // subtitle2: 'h6',
            // body1: 'p',
            // body2: 'p',
            // inherit: 'p',
            caption: 'div',
          },
        },
      },
      //   MuiTableRow: {
      //     hover: true,
      //   },
      //   MuiTooltip: {
      //     placement: "right-end",
      //   },
      //   MuiList: {
      //     disablePadding: true,
      //   },
      //   MuiRadio: {
      //     color: "secondary",
      //     disableRipple: true,
      //     icon: <RadioIcon />,
      //     checkedIcon: <RadioCheckedIcon />,
      //   },
      //   MuiSwitch: {
      //     color: "secondary",
      //     disableRipple: true,
      //   },
    },
    shadows,
    spacing: getSpacing,
    typography: {
      allVariants: {
        fontFamily,
        letterSpacing: '0.02rem',
      },
      body1: {
        fontSize: '1.6rem',
      },
      body2: {
        fontSize: '1.4rem',
        lineHeight: 1.56,
      },
      button: {
        fontSize: '1.4rem',
        fontWeight: 600,
      },
      caption: {
        fontSize: '1.2rem',
        letterSpacing: 0,
      },
      fontFamily,
      h1: {
        fontSize: '4rem',
        fontWeight: 600,
      },
      h2: {
        fontWeight: 600,
        fontSize: '3.2rem',
      },
      h3: {
        fontWeight: 600,
        fontSize: '2.1rem',
      },
      h4: {
        fontSize: '1.7rem',
        fontWeight: 600,
      },
      h5: {
        fontSize: '1.6rem',
        fontWeight: 600,
      },
      h6: {
        fontSize: '1.4rem',
        fontWeight: 600,
      },
      subtitle1: {
        fontSize: '1.6rem',
      },
      subtitle2: {
        fontSize: '1.4rem',
      },
    },
  });
};
