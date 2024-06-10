import { makeStyles } from '@tempo/ui/theme/styles';

const useStyles = makeStyles(
  (theme) => {
    const colors = theme.vars.palette;
    return {
      expandIcon: {
        // `&:hover, &.Mui-focusVisible, &$hover, &$active`: {
        '&:hover, &.Mui-focusVisible': {
          color: colors.primary[100],
          border: `1px solid ${colors.primary[600]}`,
          '[data-color-scheme="dark"] &': {
            border: `1px solid ${colors.primary[400]}`,
          },
        },
        background: 'transparent',
        borderRadius: 4,
        color: colors.primary[300],
        border: `1px solid ${colors.primary[600]}`,
        '[data-color-scheme="dark"] &': {
          border: `1px solid ${colors.primary[400]}`,
        },
        padding: 3,
        transition: '200ms',
      },
    };
  },
  {
    name: 'Accordion',
  }
);

export default useStyles;
