import { makeStyles } from '@core/ui/theme/styles';
import { alpha } from '@mui/material/styles';

const useStyles = makeStyles(
  (theme) => ({
    actions: {},
    actionsButton: {
      '&:hover': {
        color: theme.vars.palette.primary.main,
      },
      '&:last-child': {
        marginLeft: theme.spacing(1.5),
      },
      '& svg': {
        color: 'currentColor',
        width: 16,
      },
      border: '2px solid currentColor',
      borderRadius: 2,
      boxSizing: 'border-box',
      color: theme.vars.palette.text.primary,
      height: 36,
      width: 36,
      transition: theme.transitions.create('color', {
        duration: theme.transitions.duration.shorter,
      }),
    },
    actionsButtonDisabled: {
      border: `2px solid ${theme.vars.palette.text.disabled}`,
      color: theme.vars.palette.text.disabled,
    },
    dark: {
      '&:focus, &:hover': {
        '& > span:first-of-type': {
          backgroundColor: alpha(theme.vars.palette.primary.main, 0.2),
        },
      },
      '&:not($actionsButtonDisabled)': {
        color: theme.vars.palette.primary.main,
      },
    },
    root: {},
    toolbar: {
      justifyContent: 'space-between',
    },
    spacer: {},

    rowNumber: {
      fontSize: theme.typography.body2.fontSize,
    },
    rowNumberLabel: {},
    rowNumberSelect: {
      '&&:before, &&:after': {
        content: 'none',
      },
      marginLeft: theme.spacing(1),
    },
    rowNumberSelectLabel: {
      '&&': {
        color: theme.vars.palette.primary.main,
      },
    },
  }),
  { name: 'Pagination' }
);
export default useStyles;
