import { makeStyles } from '@core/ui/theme/styles';

const useStyles = makeStyles(
  (theme) => ({
    content: {
      '&:last-child': {
        paddingBottom: theme.spacing(2),
      },
      display: 'flex',
      gap: theme.spacing(3),
      paddingBottom: theme.spacing(2),
      paddingTop: theme.spacing(2),
      [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing(1),
      },
    },
    paper: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    shadow: {
      boxShadow: '0 -24px 20px -20px rgba(0, 0, 0, 0.15)',
    },
  }),
  { name: 'ActionBar' }
);

export default useStyles;
