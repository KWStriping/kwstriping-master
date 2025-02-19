import { makeStyles } from '@tempo/ui/theme/styles';

export const useStyles = makeStyles(
  (theme) => ({
    button: {
      '&:hover, &:focus': {
        color: theme.vars.palette.active[100],
      },
      appearance: 'none',
      border: 'none',
      background: 'transparent',
      color: theme.vars.palette.primary[300],
      cursor: 'pointer',
      padding: 0,
      outline: 0,
    },
    wrapper: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
    },
  }),
  { name: 'DialogHeader' }
);
