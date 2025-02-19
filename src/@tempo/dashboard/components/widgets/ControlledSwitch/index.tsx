import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import type { ChangeEvent, FC, ReactNode } from 'react';
import styles from './index.module.css';

interface ControlledSwitchProps {
  checked: boolean;
  disabled?: boolean;
  label: string | ReactNode;
  name: string;
  secondLabel?: string | ReactNode;
  uncheckedLabel?: string | ReactNode;
  onChange?(event: ChangeEvent<unknown>);
}

export const ControlledSwitch: FC<ControlledSwitchProps> = (props) => {
  const { checked, disabled, onChange, label, name, secondLabel, uncheckedLabel } = props;
  return (
    <FormControlLabel
      control={
        <Switch
          onChange={() => onChange({ target: { name, value: !checked } } as unknown)}
          checked={checked}
          name={name}
        />
      }
      label={
        <div>
          {uncheckedLabel ? (
            checked ? (
              label
            ) : (
              uncheckedLabel
            )
          ) : typeof label === 'string' ? (
            <span className={styles.labelText ?? ''}>{label}</span>
          ) : (
            label
          )}
          <div>{secondLabel ? secondLabel : null}</div>
        </div>
      }
      disabled={disabled}
    />
  );
};
ControlledSwitch.displayName = 'ControlledSwitch';
export default ControlledSwitch;
