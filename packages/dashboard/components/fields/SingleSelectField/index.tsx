import { useTranslation } from '@core/i18n';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import type OutlinedInputProps from '@mui/material/OutlinedInputProps';
import type { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import clsx from 'clsx';
import type { ReactNode, FC } from 'react';

// import { singleSelectFieldItemHeight } from "./consts";
import styles from './index.module.css';

export interface Choice<T = string, L = string | ReactNode> {
  value: T;
  label: L;
  disabled?: boolean;
}

export type Choices = Choice[];
interface SingleSelectFieldProps {
  testId?: string;
  choices: Choices;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  hint?: string | ReactNode;
  label?: string | ReactNode;
  name?: string;
  selectProps?: SelectProps;
  placeholder?: string;
  value?: Maybe<string>;
  InputProps?: OutlinedInputProps;
  onChange(event: SelectChangeEvent<string>): void;
}

export const SingleSelectField: FC<SingleSelectFieldProps> = ({
  className,
  disabled = false,
  error,
  label,
  choices,
  value,
  onChange,
  name,
  hint,
  selectProps,
  placeholder,
  InputProps,
  testId,
}) => {
  const choicesByKey: { [key: string]: string } =
    choices === undefined
      ? {}
      : choices.reduce((prev: Record<string, string>, curr) => {
          prev[curr.value] = curr.label;
          return prev;
        }, {});
  const { t } = useTranslation();
  return (
    <FormControl
      className={clsx(styles.formControl, className)}
      error={error}
      disabled={disabled}
    >
      <InputLabel className={styles.label ?? ''} shrink={!!value}>
        {label}
      </InputLabel>
      <Select<string>
        data-test-id={testId}
        variant="outlined"
        fullWidth
        renderValue={(choiceValue) =>
          choiceValue ? choicesByKey[choiceValue.toString()] : placeholder
        }
        value={value || ''}
        onChange={onChange}
        input={
          <OutlinedInput
            name={name}
            {...InputProps}
            classes={{
              ...(InputProps?.classes || {}),
              input: clsx(InputProps?.classes?.input, !label && styles.noLabel),
            }}
          />
        }
        {...selectProps}
        MenuProps={{
          classes: {
            paper: styles.paper ?? '',
          },
        }}
      >
        {choices?.length ? (
          choices.map((choice) => (
            <MenuItem
              disabled={choice.disabled}
              className={clsx(choice.disabled && styles.disabledMenuItem)}
              data-test-id={'select-field-option-' + choice.value}
              value={choice.value}
              key={choice.value}
            >
              {choice.label}
            </MenuItem>
          ))
        ) : (
          <MenuItem data-test-id="select-field-option" data-test-disabled disabled={true}>
            {t('dashboard.X5PAb', 'No results found')}
          </MenuItem>
        )}
      </Select>
      {hint && <FormHelperText>{hint}</FormHelperText>}
    </FormControl>
  );
};
SingleSelectField.displayName = 'SingleSelectField';
export default SingleSelectField;
