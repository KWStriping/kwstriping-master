import IconButton from '@core/ui/components/buttons/IconButton/IconButton';
import Debounce from '@core/ui/components/Debounce';
import type { DebounceProps } from '@core/ui/components/Debounce';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import type { PopperProps } from '@mui/material/Popper';
import Popper from '@mui/material/Popper';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { ControllerStateAndHelpers } from 'downshift';
import Downshift from 'downshift';
import { filter } from 'fuzzaldrin';
import type { ChangeEvent, ComponentType, FC, ReactNode } from 'react';
import { useRef, useState } from 'react';
import styles from './index.module.css';
import type {
  MultiAutocompleteActionType,
  MultiAutocompleteChoiceType,
} from './MultiAutocompleteSelectFieldContent';
import MultiAutocompleteSelectFieldContent from './MultiAutocompleteSelectFieldContent';
import type { FetchMoreProps } from '@dashboard/oldSrc/types';

export type { MultiAutocompleteActionType, MultiAutocompleteChoiceType };

type PopperPlacementType = PopperProps['placement'];

export interface MultiAutocompleteSelectFieldProps extends Partial<FetchMoreProps> {
  add?: MultiAutocompleteActionType;
  allowCustomValues?: boolean;
  displayValues: MultiAutocompleteChoiceType[];
  error?: boolean;
  name: string;
  choices: MultiAutocompleteChoiceType[];
  value: string[];
  loading?: boolean;
  placeholder?: string;
  helperText?: string;
  label?: string;
  disabled?: boolean;
  testId?: string;
  fetchChoices?: (value: string) => void;
  onChange: (event: ChangeEvent<unknown>) => void;
  onBlur?: () => void;
  fetchOnFocus?: boolean;
  endAdornment?: ReactNode;
  popperPlacement?: PopperPlacementType;
}

const DebounceAutocomplete: ComponentType<DebounceProps<string>> = Debounce;

const MultiAutocompleteSelectFieldComponent: FC<MultiAutocompleteSelectFieldProps> = ({
  add,
  allowCustomValues,
  choices,
  displayValues,
  error,
  hasMore,
  helperText,
  label,
  loading,
  name,
  placeholder,
  value,
  disabled,
  testId,
  fetchChoices,
  onChange,
  onBlur,
  onFetchMore,
  fetchOnFocus,
  endAdornment,
  popperPlacement = 'bottom-end',
  totalCount, // TODO: investigate
  ...rest
}) => {
  const anchor = useRef<HTMLDivElement | null>(null);
  const input = useRef<HTMLInputElement | null>(null);

  const [inputValue, setInputValue] = useState('');

  const handleSelect = (item: string, downshiftOpts?: ControllerStateAndHelpers<string>) => {
    if (downshiftOpts) {
      downshiftOpts.reset({
        inputValue: downshiftOpts.inputValue,
        isOpen: true,
      });
    }
    onChange({
      target: { name, value: item },
    } as unknown);
  };

  return (
    <>
      <DebounceAutocomplete
        debounceFn={(value) => {
          setInputValue(value);
          fetchChoices(value);
        }}
      >
        {(debounceFn) => (
          <Downshift
            onInputValueChange={(value) => debounceFn(value)}
            onSelect={handleSelect}
            itemToString={() => inputValue}
            // this is to prevent unwanted state updates when the dropdown is closed with an empty value,
            // which downshift interprets as the value being updated with an empty string, causing side-effects
            stateReducer={(state, changes) => {
              if (changes.isOpen === false && state.inputValue === '') {
                delete changes.inputValue;
              }
              return changes;
            }}
          >
            {({
              closeMenu,
              getInputProps,
              getItemProps,
              isOpen,
              toggleMenu,
              getMenuProps,
              highlightedIndex,
              inputValue,
            }) => {
              const displayCustomValue =
                inputValue &&
                !!inputValue?.length &&
                allowCustomValues &&
                !choices.find(
                  (choice) => choice.label.toLowerCase() === inputValue.toLowerCase()
                );

              const handleFocus = () => {
                if (fetchOnFocus) {
                  fetchChoices(inputValue);
                }
                if (input.current) input.current.select();
              };

              const handleToggleMenu = () => {
                if (disabled) return;
                toggleMenu();
              };

              return (
                <div className={styles.container ?? ''} {...rest}>
                  <TextField
                    InputProps={{
                      endAdornment: (
                        <div
                          onClick={() => {
                            handleToggleMenu();
                            handleFocus();
                          }}
                          className={clsx(styles.adornment, isOpen && styles.adornmentRotate)}
                        >
                          {endAdornment}
                          <ExpandMoreIcon />
                        </div>
                      ),
                      id: undefined,
                      onFocus: handleFocus,
                      ref: anchor,
                    }}
                    inputProps={{
                      ...getInputProps({
                        placeholder,
                        'data-test-id': testId,
                        onClick: handleToggleMenu,
                      }),
                      ...getMenuProps(),
                    }}
                    error={error}
                    helperText={helperText}
                    label={label}
                    fullWidth={true}
                    disabled={disabled}
                    autoFocus={true}
                    onBlur={onBlur}
                    inputRef={input}
                  />
                  {isOpen && (
                    <Popper
                      anchorEl={anchor.current}
                      open={isOpen}
                      style={{
                        width: anchor.current.clientWidth,
                        zIndex: 1301,
                      }}
                      placement={popperPlacement}
                    >
                      <MultiAutocompleteSelectFieldContent
                        add={
                          !!add && {
                            ...add,
                            onClick: () => {
                              add.onClick();
                              closeMenu();
                            },
                          }
                        }
                        choices={choices?.filter((choice) => !value.includes(choice.value))}
                        displayCustomValue={displayCustomValue}
                        displayValues={displayValues}
                        getItemProps={getItemProps}
                        hasMore={hasMore}
                        highlightedIndex={highlightedIndex}
                        loading={loading}
                        inputValue={inputValue}
                        onFetchMore={onFetchMore}
                      />
                    </Popper>
                  )}
                </div>
              );
            }}
          </Downshift>
        )}
      </DebounceAutocomplete>
      <div className={styles.chipContainer ?? ''}>
        {displayValues.map((value) => (
          <div
            className={styles.chip ?? ''}
            key={value.value}
            id={`selected-option-${value.label}`}
          >
            <div className={!value.disabled ? styles.chipInner : styles.disabledChipInner}>
              <Typography className={styles.chipLabel ?? ''}>{value.label}</Typography>

              <IconButton
                hoverOutline={false}
                color="secondary"
                data-test-id={testId ? `${testId}-remove` : 'remove'}
                className={styles.chipClose ?? ''}
                disabled={value.disabled}
                onClick={() => handleSelect(value.value)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const MultiAutocompleteSelectField: FC<MultiAutocompleteSelectFieldProps> = ({
  choices,
  fetchChoices,
  testId,
  ...props
}) => {
  const [query, setQuery] = useState('');

  if (fetchChoices) {
    return (
      <MultiAutocompleteSelectFieldComponent
        testId={testId}
        choices={choices}
        {...props}
        fetchChoices={fetchChoices}
      />
    );
  }

  return (
    <MultiAutocompleteSelectFieldComponent
      fetchChoices={(q) => setQuery(q || '')}
      choices={filter(choices, query, {
        key: 'label',
      })}
      {...props}
    />
  );
};

MultiAutocompleteSelectField.displayName = 'MultiAutocompleteSelectField';
export default MultiAutocompleteSelectField;
