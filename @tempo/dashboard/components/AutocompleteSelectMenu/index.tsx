import * as m from '@paraglide/messages';
import Debounce from '@tempo/ui/components/Debounce';
import type { DebounceProps } from '@tempo/ui/components/Debounce';
import type { IMenu } from '@tempo/dashboard/oldSrc/utils/menu';
import { getMenuItemByPath, validateMenuOptions } from '@tempo/dashboard/oldSrc/utils/menu';
import ArrowBack from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Downshift from 'downshift';
import type { ComponentType, ChangeEvent, FC } from 'react';
import { useState, useEffect } from 'react';

import styles from './index.module.css';

export interface AutocompleteSelectMenuProps {
  disabled: boolean;
  displayValue: string;
  error: boolean;
  helperText: string;
  label: string;
  loading: boolean;
  name: string;
  options: IMenu;
  testIds?: string[];
  placeholder: string;
  onChange: (event: ChangeEvent<unknown>) => void;
  onInputChange?: (value: string) => void;
}

const validationError: Error = new Error(
  'Values supplied to AutocompleteSelectMenu should be unique'
);

const DebounceAutocomplete: ComponentType<DebounceProps<string>> = Debounce;

const AutocompleteSelectMenu: FC<AutocompleteSelectMenuProps> = (props) => {
  const {
    disabled,
    displayValue,
    error,
    helperText,
    label,
    loading,
    name,
    options,
    testIds,
    placeholder,
    onChange,
    onInputChange,
  } = props;
  const [isFocused, setIsFocused] = useState(false);

  const [inputValue, setInputValue] = useState(displayValue || '');

  const [menuPath, setMenuPath] = useState<number[]>([]);

  const handleChange = (value: string) =>
    onChange({
      target: {
        name,
        value,
      },
    } as unknown);

  // Validate if option values are duplicated
  useEffect(() => {
    if (!validateMenuOptions(options)) {
      throw validationError;
    }
  }, []);

  // Navigate back to main menu after input field change
  useEffect(() => setMenuPath([]), [options]);

  // Reset input value after displayValue change
  useEffect(() => setInputValue(displayValue), [displayValue]);

  return (
    <DebounceAutocomplete debounceFn={onInputChange}>
      {(debounceFn) => (
        <Downshift onSelect={handleChange}>
          {({ getItemProps, isOpen, openMenu, closeMenu, selectItem }) => (
            <div className={styles.container ?? ''} data-test-id="container-autocomplete-select">
              <TextField
                InputProps={{
                  endAdornment: isFocused && loading && <CircularProgress size={16} />,
                  id: undefined,
                  onBlur() {
                    setIsFocused(false);
                    closeMenu();
                    setMenuPath([]);
                    setInputValue(displayValue || '');
                    debounceFn('');
                  },
                  onChange: (event) => {
                    debounceFn(event.target.value);
                    setInputValue(event.target.value);
                  },
                  onFocus: () => {
                    openMenu();
                    setIsFocused(true);
                  },
                  placeholder,
                }}
                disabled={disabled}
                error={error}
                helperText={helperText}
                label={label}
                fullWidth={true}
                value={inputValue}
              />
              {isOpen && (
                <Paper className={styles.paper ?? ''} square>
                  {options.length ? (
                    <>
                      {!!menuPath?.length && (
                        <MenuItem
                          component="div"
                          {...getItemProps({
                            item: 'Back',
                          })}
                          onClick={() => setMenuPath(menuPath.slice(0, menuPath.length - 2))}
                        >
                          <ArrowBack className={styles.menuBack ?? ''} />
                          {m.dashboard_back() ?? 'Back'}
                        </MenuItem>
                      )}
                      {(menuPath.length
                        ? getMenuItemByPath(options, menuPath).children
                        : options
                      ).map((suggestion, index) => (
                        <MenuItem
                          data-test-id={testIds ? testIds[index] : ''}
                          key={`${suggestion.value}:${index}`}
                          component="div"
                          {...getItemProps({ item: suggestion.value ?? '' })}
                          onClick={() =>
                            suggestion.value
                              ? selectItem(suggestion.value)
                              : setMenuPath([...menuPath, index])
                          }
                        >
                          {suggestion.label}
                        </MenuItem>
                      ))}
                    </>
                  ) : (
                    <MenuItem disabled component="div">
                      {m.dashboard_HJmjf() ?? 'No results'}
                    </MenuItem>
                  )}
                </Paper>
              )}
            </div>
          )}
        </Downshift>
      )}
    </DebounceAutocomplete>
  );
};
AutocompleteSelectMenu.displayName = 'AutocompleteSelectMenu';
export default AutocompleteSelectMenu;
