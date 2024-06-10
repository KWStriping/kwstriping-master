import Radio from '@mui/material/Radio';
import clsx from 'clsx';
import type { FC, ReactNode } from 'react';

export interface SelectBoxProps {
  id?: string;
  value: string;
  disabled?: boolean;
  readOnly?: boolean;
  selected?: boolean;
  className?: string;
  children: ReactNode;
}

export const SelectBox: FC<SelectBoxProps> = ({
  id,
  value,
  className,
  disabled = false,
  readOnly = false,
  selected = false,
  children,
}) => {
  const applyDisabledStyles = disabled || readOnly;
  return (
    <div
      className={clsx(
        'flex flex-row items-center justify-between py-1 px-2 border rounded',
        !applyDisabledStyles && 'cursor-pointer hover:border-active hover:bg-active/10',
        selected ? 'bg-active/10 border-solid border-active' : 'bg-secondary/5',
        { selected, disabled },
        className
      )}
    >
      <Radio id={id || value} value={value} disabled={disabled} readOnly={readOnly} />
      <label
        className={clsx('w-full flex grow', !applyDisabledStyles && 'cursor-pointer')}
        htmlFor={id || value}
      >
        {children}
      </label>
    </div>
  );
};
