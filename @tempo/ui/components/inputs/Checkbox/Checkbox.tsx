import type { ClassNames } from '@tempo/next/types';
import CheckIcon from '@mui/icons-material/Check';
import clsx from 'clsx';
import type { Ref, ReactNode, InputHTMLAttributes } from 'react';
import { useId, forwardRef } from 'react';

import { Label } from '../Label';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label?: string | ReactNode;
  classNames?: ClassNames<'container' | 'inputContainer' | 'input' | 'checkbox' | 'label'>;
}

export const Checkbox = forwardRef(
  ({ label, checked, value, classNames, ...rest }: CheckboxProps, ref: Ref<HTMLInputElement>) => {
    const generaredId = useId();
    const id = rest?.id || generaredId;

    return (
      <Label className={clsx(styles.label, classNames?.label)} htmlFor={id}>
        <>
          <div className={clsx(styles.checkbox, classNames?.container)}>
            <div className={clsx(styles['box'], 'select-none')}>
              <input
                ref={ref}
                {...rest}
                type="checkbox"
                value={value}
                checked={!!checked}
                id={id}
                className={classNames?.input}
              />
              <div className={clsx(styles['checkbox-input'], classNames?.checkbox)}>
                <CheckIcon />
              </div>
            </div>
            <span className="pointer-events-none">{label && label}</span>
          </div>
        </>
      </Label>
    );
  }
);
