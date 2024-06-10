import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import type { FC, ReactNode } from 'react';

export interface ControlledCheckboxProps {
  className?: string;
  name: string;
  label?: ReactNode;
  checked: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  checkedIcon?: ReactNode;
  testId?: string;
  onChange(event: unknown);
}

export const ControlledCheckbox: FC<ControlledCheckboxProps> = ({
  checked,
  disabled,
  name,
  label,
  onChange,
  checkedIcon,
  indeterminate,
  testId,
  ...props
}) => (
  <FormControlLabel
    disabled={disabled}
    control={
      <Checkbox
        data-test-id={testId}
        checkedIcon={checkedIcon}
        checked={!!checked}
        indeterminate={indeterminate}
        disabled={disabled}
        name={name}
        onChange={() => onChange({ target: { name, value: !checked } })}
      />
    }
    label={label}
    {...props}
  />
);
ControlledCheckbox.displayName = 'ControlledCheckbox';
export default ControlledCheckbox;
