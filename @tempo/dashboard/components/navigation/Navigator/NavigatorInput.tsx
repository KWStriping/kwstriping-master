import { makeStyles } from '@tempo/ui/theme/styles';
import SearchLargeIcon from '@mui/icons-material/Search';
import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

import type { QuickSearchMode } from './types';

const useStyles = makeStyles(
  (theme) => {
    const typography = {
      ...theme.typography.body1,
      color: theme.vars.palette.primary[100],
      fontWeight: 500,
      letterSpacing: '0.02rem',
    };

    return {
      adornment: {
        ...typography,
        alignSelf: 'center',
        color: theme.vars.palette.text.secondary,
        marginRight: theme.spacing(1),
        textAlign: 'center',
        width: 32,
      },
      input: {
        '&::placeholder': {
          color: theme.vars.palette.primary[300],
        },
        ...typography,
        background: 'transparent',
        border: 'none',
        outline: 0,
        padding: 0,
        width: '100%',
      },
      root: {
        background: theme.vars.palette.background.paper,
        display: 'flex',
        padding: theme.spacing(2, 3),
        height: 72,
      },
      searchIcon: {
        alignSelf: 'center',
        width: 32,
        height: 32,
        marginRight: theme.spacing(1),
      },
    };
  },
  {
    name: 'NavigatorInput',
  }
);

interface NavigatorInputProps extends InputHTMLAttributes<HTMLInputElement> {
  mode: QuickSearchMode;
}

const NavigatorInput = forwardRef<HTMLInputElement, NavigatorInputProps>((props, ref) => {
  const { mode, ...rest } = props;
  const styles = useStyles(props);

  return (
    <div className={styles.root ?? ''}>
      {mode !== 'default' ? (
        <span className={styles.adornment ?? ''}>
          {mode === 'orders'
            ? '#'
            : mode === 'customers'
              ? '@'
              : mode === 'catalog'
                ? '$'
                : mode === 'help'
                  ? '?'
                  : '>'}
        </span>
      ) : (
        <SearchLargeIcon className={styles.searchIcon ?? ''} />
      )}
      <input
        autoFocus
        autoComplete="off"
        className={styles.input ?? ''}
        placeholder={
          mode === 'orders'
            ? 'Order Number'
            : mode === 'commands'
              ? 'Type Command'
              : mode === 'catalog'
                ? 'Search in Catalog'
                : mode === 'customers'
                  ? 'Search Customer'
                  : mode === 'default'
                    ? `Type ${"'?'"} to see available actions`
                    : ''
        }
        ref={ref}
        {...rest}
      />
    </div>
  );
});

NavigatorInput.displayName = 'NavigatorInput';
export default NavigatorInput;
