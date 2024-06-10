import { makeStyles } from '@tempo/ui/theme/styles';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      '&:hover, &:focus-visible, &$hover': {
        borderColor: theme.vars.palette.active[300],
        color: theme.vars.palette.primary.main,
      },
      '&:active, &$active': {
        backgroundColor: theme.vars.palette.active[500],
        borderColor: theme.vars.palette.active[300],
        color: theme.vars.palette.primary.main,
      },
      backgroundColor: 'transparent',
      border: `1px dashed ${theme.vars.palette.primary[300]}`,
      borderRadius: 20,
      cursor: 'pointer',
      color: theme.vars.palette.text.primary,
      outline: 0,
      userSelect: 'none',
      padding: '5px 8px',
      transition: theme.transitions.create(['border-color', 'background-color', 'color'], {
        duration: theme.transitions.duration.shorter,
      }),
      ...theme.typography.body1,
    },
    hover: {},
    active: {},
  }),
  {
    name: 'PillLink',
  }
);
export default useStyles;
