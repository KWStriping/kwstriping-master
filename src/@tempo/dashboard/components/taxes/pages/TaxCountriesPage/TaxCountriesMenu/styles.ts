import { makeStyles } from '@tempo/ui/theme/styles';
export const useStyles = makeStyles(
  (theme) => ({
    menu: {
      height: 'fit-content',
    },
    clickable: {
      cursor: 'pointer',
    },
    selected: {
      '&&&&::before': {
        position: 'absolute',
        left: 0,
        width: '4px',
        height: '100%',
        backgroundColor: theme.vars.palette.active[100],
      },
    },
    spaceBetween: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    tableRow: {
      minHeight: '48px',
      '&::after': {
        display: 'none',
      },
    },
    greyText: {
      color: theme.vars.palette.text.secondary,
    },
  }),
  { name: 'TaxCountriesMenu' }
);
