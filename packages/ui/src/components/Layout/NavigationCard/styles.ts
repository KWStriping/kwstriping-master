import { makeStyles } from '@core/ui/theme/styles';

const useStyles = makeStyles(
  (theme) => ({
    boxLinkTitle: {
      fontWeight: 500,
      transition: 'color .2s ease',
    },
    boxLinkText: {
      marginTop: theme.spacing(1),
    },
    icon: {
      display: 'flex',
      alignItems: 'center',
      '& svg': {
        height: 32,
        width: 32,
      },
      transition: theme.transitions.create('color', {
        duration: theme.transitions.duration.shorter,
      }),
    },
    card: {
      '&:hover': {
        boxShadow: theme.shadows[16],
        color: theme.vars.palette.primary.main,
      },
      boxShadow: theme.shadows[0],
      textDecoration: 'none',
      transition: theme.transitions.create(['color', 'box-shadow'], {
        duration: theme.transitions.duration.shorter,
      }),
    },
    cardContent: {
      '&&': {
        padding: theme.spacing(4),
      },
    },
    content: {
      display: 'flex',
      alignItems: 'center',
      columnGap: theme.spacing(4),
    },
  }),
  { name: 'NavigationCard' }
);

export default useStyles;
