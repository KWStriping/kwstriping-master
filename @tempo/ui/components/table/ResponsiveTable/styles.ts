import { makeStyles } from '@tempo/ui/theme/styles';
import type { ResponsiveTableProps } from './ResponsiveTable';

const useStyles = makeStyles<Pick<ResponsiveTableProps, 'flexBreakpoint'>>(
  (theme) => ({
    root: (props) => ({
      [theme.breakpoints.up(props.flexBreakpoint ?? 'md')]: {
        '&& table': {
          tableLayout: 'fixed',
        },
      },
      '& table': {
        tableLayout: 'auto',
      },
      overflowX: 'auto',
      width: '100%',
    }),
  }),
  {
    name: 'ResponsiveTable',
  }
);

export default useStyles;
