import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import type { PopperPlacementType } from '@mui/material/Popper';
import Popper from '@mui/material/Popper';
import type { StandardTextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import clsx from 'clsx';
import type { UseComboboxGetItemPropsOptions } from 'downshift';
import { useCombobox } from 'downshift';
import { useRef, useEffect } from 'react';
import type { CSSProperties, FC, ReactNode } from 'react';
import { mergeRefs } from '@tempo/ui/utils/mergeRefs';
import type { SyntheticChangeEvent } from '@tempo/ui/utils';
import { isScrolledToBottom, useElementScroll } from '@tempo/ui/components/tools';
import type { Choice } from '@tempo/ui/components/Filter';

// import useStyles from './styles';

export interface AutocompleteProps extends Omit<StandardTextFieldProps, 'children'> {
  children: (data: {
    getItemProps: (opts: UseComboboxGetItemPropsOptions<Choice>) => Record<string, unknown>;
    highlightedIndex: number;
    inputValue: string;
  }) => ReactNode | ReactNode[];
  className?: string;
  styles?: CSSProperties;
  choices: Choice[];
  label?: string;
  loading?: boolean;
  popperPlacement?: PopperPlacementType;
  onChange?: (event: SyntheticChangeEvent) => void;
  onInputChange?: (value: string) => void;
  onScrollToBottom?: () => void;
}

export const Autocomplete: FC<AutocompleteProps> = ({
  choices,
  children,
  loading,
  name,
  InputProps,
  popperPlacement = 'bottom-start',
  onChange,
  onInputChange,
  onScrollToBottom,
  ...rest
}) => {
  // const styles = useStyles();
  const styles = {};
  const anchor = useRef<HTMLDivElement | null>(null);
  const input = useRef<HTMLInputElement>();

  const {
    closeMenu,
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    openMenu,
    inputValue,
    setInputValue,
  } = useCombobox({
    // TODO: https://github.com/downshift-js/downshift/blob/master/src/hooks/MIGRATION_V7.md#circularnavigation-1
    // circularNavigation: false,
    defaultHighlightedIndex: 0,
    items: choices,
    onInputValueChange: ({ inputValue }) => {
      if (onInputChange) {
        onInputChange(inputValue ?? '');
      }
    },
    onSelectedItemChange: ({ selectedItem }) => {
      closeMenu();
      if (onChange) {
        onChange({
          target: {
            name: name ?? '',
            value: selectedItem?.value ?? '',
          },
        });
      }
    },
    itemToString: (choice) => choice?.label ?? '',
    onIsOpenChange: ({ selectedItem, inputValue, isOpen }) => {
      if (!isOpen && selectedItem && selectedItem?.label !== inputValue) {
        setInputValue(selectedItem.label);
      }
    },
  });

  const { anchor: dropdownRef, position, setAnchor } = useElementScroll();

  useEffect(() => {
    if (
      isOpen &&
      onScrollToBottom &&
      dropdownRef &&
      isScrolledToBottom(dropdownRef, position!, 5)
    ) {
      onScrollToBottom();
    }
  }, [position?.y, dropdownRef]);

  const labelProps = getLabelProps();
  const { ref: downshiftRef, ...inputProps } = getInputProps({
    onFocus: () => {
      if (!isOpen) {
        input.current?.select();
        openMenu();
      }
    },
  });
  const menuProps = getMenuProps({}, { suppressRefError: true });

  useEffect(() => {
    if (
      isOpen &&
      onScrollToBottom &&
      dropdownRef &&
      isScrolledToBottom(dropdownRef, position!, 5)
    ) {
      onScrollToBottom();
    }
  }, [position?.y, dropdownRef]);

  return (
    <>
      <TextField
        {...rest}
        name={name}
        InputLabelProps={labelProps}
        ref={anchor}
        InputProps={{
          ...InputProps,
          ...inputProps,
          endAdornment: (
            <>
              {loading && (
                <div className={'mr-1'}>
                  <CircularProgress size={24} />
                </div>
              )}
              <ExpandMoreIcon
                {...getToggleButtonProps()}
                type="button"
                aria-label="toggle menu"
              />
            </>
          ),
        }}
        inputProps={{ ref: mergeRefs(downshiftRef, input) }}
      />
      <Popper
        className={clsx('mt-1', styles.popper ?? '', menuProps.className)}
        open={isOpen}
        anchorEl={input.current}
        transition
        placement={popperPlacement}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'left top' : 'left bottom',
            }}
          >
            <Paper
              className={styles.dropdown ?? ''}
              elevation={8}
              style={{ width: anchor.current?.clientWidth }}
              {...menuProps}
              ref={mergeRefs(setAnchor, menuProps.ref)}
            >
              {children({
                highlightedIndex,
                getItemProps,
                inputValue,
              })}
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default Autocomplete;
