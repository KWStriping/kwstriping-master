import { makeStyles } from '@core/ui/theme/styles';
export const useStyles = makeStyles(
  (theme) => ({
    sectionHeader: {
      alignItems: 'center',
      display: 'flex',
      marginBottom: theme.spacing(3),
    },
    sectionHeaderTitle: {
      flex: 1,
      fontWeight: 600 as const,
      lineHeight: 1,
      textTransform: 'uppercase',
    },
    sectionHeaderToolbar: {
      marginRight: theme.spacing(-2),
    },
    userEmail: {
      fontWeight: 600 as const,
      marginBottom: theme.spacing(1),
    },
  }),
  { name: 'OrderCustomer' }
);

export const useAddressTextErrorStyles = makeStyles(
  (theme) => ({
    textError: {
      color: theme.vars.palette.error.main,
    },
  }),
  { name: 'AddressTextError' }
);
