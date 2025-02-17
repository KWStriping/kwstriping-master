import type { ClassNames } from '@tempo/types';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { Ref, InputHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

import { Label } from '../Label';

import styles from './TextInput.module.css';

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'checked'> {
  label?: string;
  error?: string;
  classNames?: ClassNames<'container' | 'input'>;
  children?: ReactNode;
}

export const TextInput = forwardRef(
  (
    {
      label,
      error,
      required,
      placeholder,
      value,
      classNames = {},
      type = 'text',
      ...rest
    }: TextInputProps,
    ref: Ref<HTMLInputElement>
  ) => (
    <div className={clsx(styles['text-input-container'], classNames.container)}>
      <input
        ref={ref}
        className={clsx(
          styles['text-input'],
          error && styles['text-input-error'],
          !label && styles['text-input-nolabel'],
          classNames.input
        )}
        placeholder={placeholder}
        value={value}
        required={required}
        spellCheck={false}
        {...rest}
        type={type}
      />
      {label && (
        <Label
          className={clsx(
            styles['text-input-label'],
            (value || placeholder) && styles['text-input-filled-label']
          )}
        >
          {label}
          {required && '*'}
        </Label>
      )}
      {error && (
        <Typography
          fontSize="sm"
          color="error"
          className={styles['text-input-error-caption'] ?? ''}
        >
          {error}
        </Typography>
      )}
    </div>
  )
);
TextInput.displayName = 'TextInput';

export default TextInput;
