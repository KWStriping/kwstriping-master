import { makeStyles } from '@tempo/ui/theme/styles';

export const useStyles = makeStyles(
  (theme) => ({
    card: {
      padding: '1px',
      borderColor: theme.vars.palette.primary[500],
      borderStyle: 'solid',
      borderWidth: '2px',
    },
    cardSelected: {
      borderColor: theme.vars.palette.primary.main,
      cursor: 'pointer',
    },
    cardContent: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    selectableCard: {
      '&:hover': {
        cursor: 'pointer',
        borderColor: theme.vars.palette.active[300],
      },
    },
    selectedLabel: {
      fontSize: '1.4rem',
      lineHeight: '1.75',
      fontWeight: 600,
      textTransform: 'uppercase',
    },
    editIcon: {
      color: theme.vars.palette.grey[600],
      '&:hover': {
        color: theme.vars.palette.primary.main,
        cursor: 'pointer',
      },
    },
  }),
  { name: 'CustomerAddressChoiceCard' }
);
