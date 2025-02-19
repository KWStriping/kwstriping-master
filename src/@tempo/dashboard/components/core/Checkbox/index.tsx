import type { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox';
import MuiCheckbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import type { FC } from 'react';
import styles from './index.module.css';

export type CheckboxProps = Omit<
  MuiCheckboxProps,
  'checkedIcon' | 'color' | 'icon' | 'indeterminateIcon' | 'classes' | 'onClick'
> & {
  disableClickPropagation?: boolean;
  helperText?: string;
  error?: boolean;
};

const firefoxHandler = (event, onChange, checked) => {
  event.preventDefault();
  onChange(event, checked);
};

const Checkbox: FC<CheckboxProps> = ({ helperText, error, ...props }) => {
  const { disableClickPropagation, ...rest } = props;
  return (
    <>
      <MuiCheckbox
        {...rest}
        onClick={
          disableClickPropagation
            ? (event) => {
                event.stopPropagation();

                /*
              Workaround for firefox
              ref: https://bugzilla.mozilla.org/show_bug.cgi?id=62151
            */
                firefoxHandler(event, rest.onChange, rest.checked);
              }
            : undefined
        }
      />
      {helperText && (
        <FormHelperText classes={{ root: error && styles.error }}>{helperText}</FormHelperText>
      )}
    </>
  );
};
Checkbox.displayName = 'Checkbox';
export default Checkbox;
