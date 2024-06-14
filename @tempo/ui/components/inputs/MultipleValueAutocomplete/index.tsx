import styles from './index.module.css';
import IconButton from '@tempo/ui/components/buttons/IconButton';
import { RemovableChip } from '@tempo/ui/components/chip/RemovableChip';
import type { Choice } from '@tempo/ui/components/Filter';
import { isScrolledToBottom, useElementScroll } from '@tempo/ui/components/tools/useElementScroll';
import type { SyntheticChangeEvent } from '@tempo/ui/utils';
import { mergeRefs } from '@tempo/ui/utils/mergeRefs';
import PlusIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import type { PopperPlacementType } from '@mui/material/Popper';
import Popper from '@mui/material/Popper';
import type { StandardTextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import clsx from 'clsx';
import type { UseComboboxGetItemPropsOptions } from 'downshift';
import type { CSSProperties, ReactNode, FC } from 'react';
import { useEffect } from 'react';


import useMultipleValueAutocomplete from './useMultipleValueAutocomplete';

export interface MultipleValueAutocompleteProps
  extends Omit<StandardTextFieldProps, 'onChange' | 'children' | 'name'> {
  children: (data: {
    getItemProps: (opts: UseComboboxGetItemPropsOptions<Choice>) => Record<string, unknown>;
    highlightedIndex: number;
    inputValue: string;
    choices: Choice[];
  }) => ReactNode | ReactNode[];
  name?: string;
  className?: string;
  enableReinitialize?: boolean;
  styles?: CSSProperties;
  choices: Choice[];
  label?: string;
  loading?: boolean;
  popperPlacement?: PopperPlacementType;
  initialValue?: Choice[];
  onChange?: (event: SyntheticChangeEvent<string[]>) => void;
  onInputChange?: (value: string) => void;
  onScrollToBottom?: () => void;
}

export const MultipleValueAutocomplete: FC<MultipleValueAutocompleteProps> = ({
  choices,
  children,
  enableReinitialize = false,
  name,
  InputProps,
  initialValue = [],
  loading,
  popperPlacement = 'bottom-start',
  onChange,
  onInputChange,
  onScrollToBottom,
  ...rest
}: MultipleValueAutocompleteProps) => {
  const {
    anchor,
    comboboxProps,
    filteredChoices,
    getItemProps,
    getSelectedItemProps,
    getToggleButtonProps,
    highlightedIndex,
    inputProps,
    inputRef,
    inputValue,
    inputWidth,
    isOpen,
    labelProps,
    menuProps,
    ref,
    removeSelectedItem,
    selectedItems,
  } = useMultipleValueAutocomplete({
    choices,
    enableReinitialize,
    initialValue,
    name,
    onChange,
    onInputChange,
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

  return (
    <>
      <TextField
        {...rest}
        {...comboboxProps}
        name={name}
        InputLabelProps={{
          shrink: isOpen || selectedItems.length || inputValue.length,
          ...labelProps,
        }}
        ref={ref}
        InputProps={{
          ...InputProps,
          ...inputProps,
          classes: {
            ...(InputProps?.classes ?? {}),
            root: clsx(
              styles.inputContainer ?? '',
              InputProps?.classes?.root,
              !!selectedItems?.length && styles.inputContainerWithChips
            ),
            input: clsx(styles.input, InputProps?.classes?.input),
          },
          startAdornment: selectedItems.map((item, index) => (
            <RemovableChip
              key={`selected-item-${index}`}
              {...getSelectedItemProps({ selectedItem: item, index })}
              onRemove={() => removeSelectedItem(item)}
            >
              {item.label}
            </RemovableChip>
          )),
          endAdornment: (
            <>
              {loading && (
                <div className={styles.loader ?? ''}>
                  <CircularProgress size={24} />
                </div>
              )}
              <IconButton
                {...getToggleButtonProps()}
                aria-label="toggle menu"
                className={styles.icon ?? ''}
                hoverOutline={false}
                type="button"
                color="secondary"
                size="large"
              >
                <PlusIcon />
              </IconButton>
            </>
          ),
        }}
        inputProps={{ ref: inputRef, style: { width: inputWidth } }}
      />
      <Popper
        className={clsx(styles.popper, menuProps.className)}
        open={isOpen}
        anchorEl={anchor.current}
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
                choices: filteredChoices,
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
