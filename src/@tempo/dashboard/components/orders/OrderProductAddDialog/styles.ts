import { makeStyles } from '@tempo/ui/theme/styles';
export const useStyles = makeStyles(
  (theme) => ({
    avatar: {
      paddingLeft: 0,
      width: 64,
    },
    colVariantCheckbox: {
      padding: 0,
    },
    noContentText: {
      marginBottom: theme.spacing(3),
    },
    content: {
      overflowY: 'scroll',
      paddingTop: 0,
      marginBottom: theme.spacing(3),
    },
    grayText: {
      color: theme.vars.palette.text.disabled,
    },
    loadMoreLoaderContainer: {
      alignItems: 'center',
      display: 'flex',
      height: theme.spacing(3),
      justifyContent: 'center',
      marginTop: theme.spacing(3),
    },
    overflow: {
      overflowY: 'hidden',
    },
    productCheckboxCell: {
      '&:first-child': {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    textRight: {
      textAlign: 'right',
    },
    variantCheckbox: {
      left: theme.spacing(1),
      position: 'relative',
    },
    wideCell: {
      width: '100%',
    },
  }),
  { name: 'OrderProductAddDialog' }
);
