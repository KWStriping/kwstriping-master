import { makeStyles } from '@tempo/ui/theme/styles';
export const useStyles = makeStyles(
  (theme) => ({
    image: {
      height: '100%',
      objectFit: 'contain',
      userSelect: 'none',
      width: '100%',
    },
    imageContainer: {
      background: 'transparent',
      border: '1px solid #eaeaea',
      borderRadius: theme.spacing(1),
      cursor: 'pointer',
      height: theme.spacing(21.5),
      overflow: 'hidden',
      padding: theme.spacing(2),
      position: 'relative',
      transitionDuration: theme.transitions.duration.standard + 'ms',
    },
    content: {
      overflowY: 'scroll',
    },
    root: {
      display: 'grid',
      gridColumnGap: theme.spacing(2),
      gridRowGap: theme.spacing(2),
      gridTemplateColumns: 'repeat(3, 1fr)',
      maxWidth: '100%',
      width: theme.breakpoints.values.lg,
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
    },
    selectedImageContainer: {
      borderColor: theme.vars.palette.primary.main,
      borderWidth: '2px',
    },
  }),
  { name: 'ProductImageSelectDialog' }
);
