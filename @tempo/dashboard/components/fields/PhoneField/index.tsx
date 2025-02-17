import TextField from '@mui/material/TextField';
import type { ChangeEvent, FC } from 'react';
import styles from './index.module.css';
import SingleSelectField from '@tempo/dashboard/components/fields/SingleSelectField';

interface PhoneFieldProps {
  name: string;
  prefix: string;
  number: string;
  prefixes: string[];
  label?: string;
  onChange(event: ChangeEvent<unknown>);
}

const PhoneField: FC<PhoneFieldProps> = (props) => {
  const { name, number: phoneNumber, prefix, prefixes, label, onChange } = props;
  return (
    <div className={styles.root ?? ''}>
      <SingleSelectField
        name={name + '_prefix'}
        choices={prefixes.map((p) => ({ label: '+' + p, value: p }))}
        onChange={onChange}
        value={prefix}
        label={label}
      />
      <TextField name={name + '_number'} onChange={onChange} value={phoneNumber} label="&nbsp;" />
    </div>
  );
};
PhoneField.displayName = 'PhoneField';
export default PhoneField;
