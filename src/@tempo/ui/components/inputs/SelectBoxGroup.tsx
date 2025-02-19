import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import clsx from 'clsx';
import type { PropsWithChildren, ReactNode, ChangeEvent } from 'react';

interface SelectBoxGroupProps<TValue extends string> {
  label?: string;
  name?: string;
  children: ReactNode;
  className?: string;
  value?: Maybe<TValue>;
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: TValue) => void;
  hideRadioButtons?: boolean;
  readOnly?: boolean;
}

export function SelectBoxGroup<TValue extends string>({
  label,
  name,
  children,
  className,
  value,
  onChange: handleChange,
  hideRadioButtons = false,
  readOnly = false,
}: PropsWithChildren<SelectBoxGroupProps<TValue>>) {
  return (
    <FormControl fullWidth>
      {label && <FormLabel>{label}</FormLabel>}
      <RadioGroup
        className={clsx('w-full gap-3', className)}
        name={name}
        value={value}
        onChange={
          readOnly ? () => null : (event, value) => handleChange?.(event, value as TValue)
        }
        {...(hideRadioButtons && {
          sx: {
            '& input[type="radio"]': { display: 'none' },
            '& .MuiRadio-root': { display: 'none' },
          },
        })}
      >
        {children}
      </RadioGroup>
    </FormControl>
  );
}

export default SelectBoxGroup;
