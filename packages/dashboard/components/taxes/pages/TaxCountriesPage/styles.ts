import { makeStyles } from '@core/ui/theme/styles';
export const useStyles = makeStyles(
  (theme) => ({
    inputPadding: {
      padding: '16px 0 16px 0',
    },
    greyText: {
      color: theme.vars.palette.text.secondary,
    },
    noDivider: {
      '&::after, &::before': { display: 'none' },
    },
    right: {
      margin: 0,
      display: 'flex',
      placeContent: 'flex-end',
      textAlign: 'right',
    },
  }),
  { name: 'TaxCountriesPage' }
);
