import { makeStyles } from '@tempo/ui/theme/styles';

const useStyles = makeStyles(
  (theme) => ({
    filter: {
      alignItems: 'flex-start',
      display: 'flex',
      columnGap: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    filterOptions: {
      alignItems: 'center',
      columnGap: theme.spacing(2),
      display: 'flex',
    },
    filterChip: {
      borderRadius: 8,
      background: theme.vars.palette.primary.main,
      color: theme.vars.palette.primary.contrastText,
    },
    filterChipContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: theme.spacing(1),
    },
    filterDeleteContainer: {
      alignItems: 'center',
      columnGap: theme.spacing(2),
      display: 'flex',
      height: 51,
      marginLeft: 'auto',
    },
    filterDelete: {
      position: 'relative',
      left: 6,
    },
    filterName: {
      width: 180,
    },
    filterValue: {
      '& .MuiSelect-root': {
        boxSizing: 'border-box',
      },
      boxSizing: 'border-box',
      minHeight: 51,
      width: '100%',
    },
    filterRange: {
      width: 115,
    },
    filterInputInner: {
      '&&': {
        padding: theme.spacing(2),
      },
    },
    filterMultipleValueInputInner: {
      '&&': {
        minHeight: 51,
        padding: theme.spacing(1),
        paddingRight: theme.spacing(8),
      },
    },
    filterConjunction: {
      minWidth: 80,
    },
    filterValueCheckbox: {
      paddingLeft: 0,
    },
    filterValueSelected: {
      color: theme.vars.palette.primary.main,
      fontWeight: 500,
    },
    filterRangeLabel: {
      margin: theme.spacing(0, 1),
    },
    filterRangeValueContainer: {
      display: 'flex',
      alignItems: 'center',
    },

    bar: {
      minWidth: 100,
    },
    barAddBtn: {
      '& svg': {
        marginLeft: theme.spacing(1),
        marginRight: 0,
      },
    },

    selectPaper: {
      borderRadius: 0,
      marginTop: `calc(48px + ${theme.spacing(1)})`,
    },
  }),
  {
    name: 'Filter',
  }
);
export default useStyles;
