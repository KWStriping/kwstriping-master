import merge from 'lodash-es/merge';
import { makeStyles } from '@tempo/ui/theme/styles';

export type ListGridTemplate = string[] | Record<string, string[]>;

export const useGridTemplateStyles = makeStyles<{ width: ListGridTemplate }, any>(
  () => ({
    root: ({ width }) => {
      if (width instanceof Array) {
        return {
          gridTemplateColumns: width.join(' '),
        };
      }

      const x = Object.entries(width).map(([breakpoint, value]) => ({
        [breakpoint]: {
          gridTemplateColumns: (value as string[]).join(' '),
        },
      }));
      return {
        ...merge({}, ...x),
      };
    },
  }),
  { name: 'ListGrid' }
);

export const useStyles = makeStyles(
  () => ({
    row: {
      alignItems: 'center',
      display: 'grid',
    },
    cell: {
      boxSizing: 'content-box',
      flex: 1,
    },
    body: {
      margin: 0,
      padding: 0,
    },
  }),
  { name: 'BaseList' }
);
