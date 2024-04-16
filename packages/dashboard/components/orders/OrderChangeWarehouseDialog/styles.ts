import { makeStyles } from '@core/ui/theme/styles';
export const useStyles = makeStyles(
  (theme) => ({
    container: {
      paddingTop: 0,
    },
    searchBox: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    searchInput: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    supportHeader: {
      textTransform: 'uppercase',
      color: theme.vars.palette.primary[300],
      fontWeight: 500,
      letterSpacing: '0.1em',
      fontSize: '12px',
      lineHeight: '160%',
    },
    helpText: {
      display: 'inline',
      fontSize: '12px',
      lineHeight: '160%',
      color: theme.vars.palette.primary[300],
    },
    supportText: {
      fontSize: '14px',
      lineHeight: '160%',
      color: theme.vars.palette.primary[300],
    },
    radioLabelContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    warehouseName: {
      maxWidth: '350px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    tableBody: {
      display: 'table',
      width: '100%',
    },
    tableCell: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  }),
  { name: 'OrderChangeWarehouseDialog' }
);
