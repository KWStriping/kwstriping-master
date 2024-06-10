import { makeStyles } from '@core/ui/theme/styles';
export const useStyles = makeStyles(
  (theme) => ({
    supportHeader: {
      fontWeight: 500,
      fontSize: '12px',
      lineHeight: '160%',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
    showCheckboxShadows: {
      '&&': {
        overflow: 'visible',
      },
    },
    taxStrategySection: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(2),
    },
    singleSelectField: {
      width: '275px',
    },
    singleSelectWrapper: {
      display: 'flex',
      flexDirection: 'column',
    },
    hint: {
      marginLeft: 0,
      color: theme.vars.palette.primary[300],
    },
  }),
  { name: 'TaxSettingsCard' }
);
