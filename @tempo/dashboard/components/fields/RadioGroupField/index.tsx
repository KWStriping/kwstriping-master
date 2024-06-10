import * as m from '@paraglide/messages';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  Radio,
  RadioGroup,
} from '@mui/material';
import clsx from 'clsx';
import type { ChangeEvent, FC, ReactNode } from 'react';
import styles from './index.module.css';

export interface RadioGroupFieldChoice<T extends string | number = string | number> {
  disabled?: boolean;
  value: T;
  label: ReactNode;
}

interface RadioGroupFieldProps {
  alignTop?: boolean;
  choices: RadioGroupFieldChoice[];
  className?: string;
  innerContainerClassName?: string;
  disabled?: boolean;
  error?: boolean;
  hint?: string;
  label?: ReactNode;
  name?: string;
  value: string | number;
  variant?: 'block' | 'inline' | 'inlineJustify';
  onChange: (event: ChangeEvent<unknown>) => void;
}

export const RadioGroupField: FC<RadioGroupFieldProps> = ({
  alignTop,
  className,
  disabled,
  error,
  label,
  choices,
  value,
  onChange,
  name,
  hint,
  variant = 'block',
  innerContainerClassName,
}) => {
  return (
    <FormControl
      className={clsx(styles.root, className, !label && styles.rootNoLabel)}
      error={error}
      disabled={disabled}
    >
      {!!label && <label className={styles.formLabel ?? ''}>{label}</label>}
      <RadioGroup
        aria-label={name}
        name={name}
        value={value}
        onChange={onChange}
        className={clsx(
          variant === 'inline' && (styles.radioGroupInline ?? ''),
          !!innerContainerClassName && styles.innerContainerClassName
        )}
      >
        {choices?.length ? (
          choices.map((choice, index) => (
            <FormControlLabel
              key={index}
              disabled={choice.disabled}
              value={choice.value}
              className={clsx(
                variant !== 'inline' && (styles.radioLabel ?? ''),
                variant === 'inline' && styles.radioLabelInline
              )}
              classes={{
                label: styles.label ?? '',
              }}
              control={<Radio className={clsx(alignTop && styles.alignTop)} color="secondary" />}
              label={choice.label}
            />
          ))
        ) : (
          <MenuItem disabled={true}>{m.dashboard_X_PAb() ?? 'No results found'}</MenuItem>
        )}
      </RadioGroup>
      {hint && <FormHelperText>{hint}</FormHelperText>}
    </FormControl>
  );
};
RadioGroupField.displayName = 'RadioGroupField';
export default RadioGroupField;
