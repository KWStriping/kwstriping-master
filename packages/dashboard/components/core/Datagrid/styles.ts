import { makeStyles } from '@core/ui/theme/styles';
import type { Theme } from '@glideapps/glide-data-grid';
import { useTheme } from '@mui/material/styles';
import { useMemo } from 'react';

export const useFullScreenStyles = makeStyles<ReturnType<typeof useStyles>>(
  () => ({
    fullScreenContainer: (props) => ({
      [`& .${props.root}`]: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      [`& .${props.datagrid}`]: {
        height: '100%',
      },
    }),
  }),
  { name: 'Datagrid-fullscreen' }
);

const calculateFontToPx = (remValue: string | number, base: number) => {
  if (typeof remValue === 'string') {
    return `${parseFloat(remValue) * base}px`;
  }

  return `${remValue * base}px`;
};

// type HtmlTypography = Typography & { htmlFontSize: number };

export function useDatagridTheme() {
  const theme = useTheme();

  // const base = (theme.typography as HtmlTypography).htmlFontSize * 0.625;

  return useMemo(
    (): Partial<Theme> => ({
      // accentColor: theme.vars.palette.secondary.main,
      // accentLight: theme.vars.palette.background.default,
      // accentFg: 'transparent',
      // bgCell: theme.vars.palette.background.paper,
      // bgHeader: theme.vars.palette.background.paper,
      // bgHeaderHasFocus: theme.vars.palette.background.paper,
      // bgHeaderHovered: theme.vars.palette.background.paper,
      // bgBubbleSelected: theme.vars.palette.background.paper,
      // textHeader: theme.vars.palette.text.secondary,
      // borderColor: theme.vars.palette.divider,
      // fontFamily: theme.typography.fontFamily,
      // baseFontStyle: calculateFontToPx(theme.typography.body1.fontSize, base),
      // headerFontStyle: calculateFontToPx(theme.typography.body2.fontSize, base),
      // editorFontSize: calculateFontToPx(theme.typography.body1.fontSize, base),
      // textMedium: theme.vars.palette.text.primary,
      // textGroupHeader: theme.vars.palette.text.secondary,
      // textBubble: theme.vars.palette.text.primary,
      // textDark: theme.vars.palette.text.primary,
      // textLight: theme.vars.palette.text.primary,
    }),
    [theme]
  );
}
