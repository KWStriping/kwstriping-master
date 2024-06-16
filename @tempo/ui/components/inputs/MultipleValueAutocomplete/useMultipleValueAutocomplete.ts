import type { UseComboboxGetItemPropsOptions } from 'downshift';
import { useCombobox, useMultipleSelection } from 'downshift';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import type { Choice } from '@tempo/ui/components/Filter';
import { useTextWidth } from '@tempo/ui/components/tools/useTextWidth';
import type { SyntheticChangeEvent } from '@tempo/ui/utils';
import { mergeRefs } from '@tempo/ui/utils/mergeRefs';

export interface UseMultipleValueAutocomplete {
  choices: Choice[];
  enableReinitialize?: boolean;
  name?: string;
  initialValue: Choice[];
  onChange?: (event: SyntheticChangeEvent<string[]>) => void;
  onInputChange?: (value: string) => void;
}

function useMultipleValueAutocomplete({
  choices,
  enableReinitialize,
  initialValue,
  name,
  onChange,
  onInputChange,
}: UseMultipleValueAutocomplete) {
  const anchor = useRef<HTMLDivElement>();
  const input = useRef<HTMLInputElement>();

  const [inputWidth, setInputText] = useTextWidth(
    window.getComputedStyle(input.current ?? document.body, null).getPropertyValue('font')
  );

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
    setSelectedItems,
  } = useMultipleSelection({
    initialSelectedItems: initialValue,
    onSelectedItemsChange: ({ selectedItems }) => {
      if (onChange) {
        onChange({
          target: {
            name: name ?? '',
            value: selectedItems!.map((choice) => choice.value),
          },
        });
      }
    },
  });
  const filteredChoices = useMemo(
    () =>
      choices.filter(
        (choice) => !selectedItems.find((selectedChoice) => selectedChoice.value === choice.value)
      ),
    [choices, selectedItems]
  );

  useEffect(() => {
    if (enableReinitialize) setSelectedItems(initialValue);
  }, [initialValue]);

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    // getComboboxProps,
    highlightedIndex,
    getItemProps: baseGetItemProps,
    openMenu,
    inputValue,
    setInputValue,
    selectItem,
  } = useCombobox<Choice>({
    // circularNavigation: false, // TODO
    defaultHighlightedIndex: 0,
    items: filteredChoices,
    onInputValueChange: ({ inputValue }) => {
      setInputText(inputValue || '');
      if (onInputChange && inputValue) {
        onInputChange(inputValue);
      }
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        addSelectedItem(selectedItem);
        setInputValue('');
      }
    },
    stateReducer: (_, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.FunctionSelectItem: {
          const index = filteredChoices.findIndex(
            (choice) => choice.value === changes.selectedItem?.value
          );
          return {
            ...changes,
            highlightedIndex: index > 0 ? index - 1 : 0,
            isOpen: true,
          };
        }
        default:
          console.error('Unsupported operation');
      }
      return changes;
    },
    selectedItem: null,
    itemToString: () => '',
  });

  // Downshift doesn't like portals like popper
  // https://github.com/downshift-js/downshift/issues/287
  const getItemProps = useCallback(
    (options: UseComboboxGetItemPropsOptions<Choice>) => {
      const baseProps = baseGetItemProps(options);

      return {
        ...baseProps,
        onClick: () => selectItem(options.item),
        selected: highlightedIndex === options.index,
      };
    },
    [baseGetItemProps, highlightedIndex]
  );

  const labelProps = getLabelProps();
  // const { ref: comboboxDownshiftRef, ...comboboxProps } = getComboboxProps();
  const { ref: downshiftRef, ...inputProps } = getInputProps({
    ...getDropdownProps(),
    onFocus: () => {
      if (!isOpen) {
        input.current?.select();
        openMenu();
      }
    },
  });
  const menuProps = getMenuProps({}, { suppressRefError: true });

  return {
    anchor,
    // comboboxProps,
    filteredChoices,
    getItemProps,
    getSelectedItemProps,
    getToggleButtonProps,
    highlightedIndex,
    inputProps,
    inputRef: mergeRefs(downshiftRef, input),
    inputValue,
    inputWidth,
    isOpen,
    labelProps,
    menuProps,
    // ref: mergeRefs(comboboxDownshiftRef, anchor),
    removeSelectedItem,
    selectedItems,
  };
}

export default useMultipleValueAutocomplete;
