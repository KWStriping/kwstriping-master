import type { ClassNames } from '@tempo/next/types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import clsx from 'clsx';
import type { ChangeEvent, ForwardedRef, ReactNode, SelectHTMLAttributes } from 'react';
import { forwardRef, useState } from 'react';

import styles from './Select.module.css';

const PLACEHOLDER_KEY = 'placeholder';

export interface Option<TData extends string = string> {
  label: string | ReactNode;
  value: TData;
  disabled?: boolean;
  icon?: string | ReactNode;
  [key: string]: unknown;
}

export type SelectOnChangeHandler<TData extends string = string> = (value: TData) => void;

export interface SelectProps<TData extends string = string>
  extends SelectHTMLAttributes<HTMLSelectElement> {
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: Option<TData>[];
  classNames?: ClassNames<'container'>;
  placeholder?: string;
}

const SelectComponent = <TData extends string = string>(
  {
    options,
    classNames,
    placeholder = '',
    onChange,
    value,
    defaultValue,
    ...rest
  }: SelectProps<TData>,
  ref: ForwardedRef<HTMLSelectElement>
) => {
  const [showPlaceholder, setShowPlaceholder] = useState(!!placeholder);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if ((event.target as HTMLSelectElement).value === PLACEHOLDER_KEY) {
      return;
    }

    setShowPlaceholder(false);
    onChange(event);
  };

  const placeholderValue = '';

  return (
    <div className={clsx(styles.container, classNames?.container)}>
      <select
        onChange={handleChange}
        {...rest}
        value={value}
        defaultValue={defaultValue ?? showPlaceholder ? placeholderValue : defaultValue}
        ref={ref}
        className={clsx(styles.select)}
      >
        {showPlaceholder && (
          <option disabled value={placeholderValue}>
            {placeholder}
          </option>
        )}
        {options.map(({ label, value, disabled = false }) => (
          <option value={value} disabled={disabled} key={value}>
            {label}
          </option>
        ))}
      </select>
      <div className={clsx(styles.icon)}>
        <ExpandMoreIcon />
      </div>
    </div>
  );
};

export const Select = forwardRef(SelectComponent);
