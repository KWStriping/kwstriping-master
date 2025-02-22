import { makeStyles } from '@tempo/ui/theme/styles';
export const useStyles = makeStyles(
  (theme) => ({
    right: {
      margin: 0,
      display: 'flex',
      placeContent: 'flex-end',
      textAlign: 'right',
    },
    searchPadding: {
      padding: '16px 0 16px 0',
    },
    namePadding: {
      padding: '16px',
    },
    supportText: {
      color: theme.vars.palette.primary[300],
    },
    noDivider: {
      '&::before, &::after': {
        display: 'none',
      },
    },
  }),
  { name: 'TaxClassesPage' }
);
