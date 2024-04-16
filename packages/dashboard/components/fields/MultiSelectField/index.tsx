import { useTranslation } from '@core/i18n';
import {
  FilledInput,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import type { SelectProps } from '@mui/material/Select';
import type { FC } from 'react';
import Checkbox from '../../core/Checkbox';
import styles from './index.module.css';

interface MultiSelectFieldProps {
  choices: Array<{
    value: string;
    label: string;
  }>;
  disabled?: boolean;
  error?: boolean;
  hint?: string;
  label?: string;
  name?: string;
  selectProps?: SelectProps;
  value?: string[];
  onChange(event: unknown);
}

export const MultiSelectField: FC<MultiSelectFieldProps> = (props) => {
  const { disabled, error, label, choices, value, onChange, name, hint, selectProps } = props;
  const { t } = useTranslation();
  const choicesByKey = disabled
    ? {}
    : choices.reduce((prev, curr) => {
        prev[curr.value] = curr.label;
        return prev;
      }, {});

  return (
    <FormControl className={styles.formControl ?? ''} error={error} disabled={disabled}>
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        multiple
        fullWidth
        renderValue={(choiceValues) =>
          (choiceValues as string[]).map((choiceValue) => choicesByKey[choiceValue]).join(', ')
        }
        value={value}
        name={name}
        onChange={onChange}
        input={<FilledInput name={name} />}
        {...selectProps}
      >
        {choices?.length ? (
          choices.map((choice) => {
            const isSelected = !!value.find((selectedChoice) => selectedChoice === choice.value);

            return (
              <MenuItem value={choice.value} key={choice.value}>
                <div className={styles.menuItem ?? ''}>
                  <span>{choice.label}</span>
                  <Checkbox
                    className={styles.checkbox ?? ''}
                    checked={isSelected}
                    disableRipple={true}
                    disableTouchRipple={true}
                  />
                </div>
              </MenuItem>
            );
          })
        ) : (
          <MenuItem disabled={true}>{t('dashboard.X5PAb', 'No results found')}</MenuItem>
        )}
      </Select>
      {hint && <FormHelperText>{hint}</FormHelperText>}
    </FormControl>
  );
};
MultiSelectField.defaultProps = {
  value: [],
};

MultiSelectField.displayName = 'MultiSelectField';
export default MultiSelectField;
