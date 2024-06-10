import SingleSelectField from '@tempo/dashboard/components/fields/SingleSelectField';
import type { Choices } from '@tempo/dashboard/components/fields/SingleSelectField';
import type { ChangeEvent, FormChange } from '@tempo/dashboard/hooks/useForm';
import TextField from '@mui/material/TextField';
import clsx from 'clsx';
import type { FC } from 'react';

interface CommonFieldProps {
  name: string;
  type?: string;
  className?: string;
  label?: string;
}

export interface TextWithSelectFieldProps {
  change: FormChange;
  choices: Choices;
  helperText?: string;
  isError?: boolean;
  textFieldProps: CommonFieldProps & {
    value?: string | number;
    minValue?: number;
  };
  selectFieldProps: CommonFieldProps & { value: string };
  containerClassName?: string;
}

const TextWithSelectField: FC<TextWithSelectFieldProps> = ({
  change,
  choices,
  containerClassName,
  textFieldProps,
  selectFieldProps,
  helperText,
  isError,
}) => {
  const {
    name: textFieldName,
    value: textFieldValue,
    label: textFieldLabel,
    type: textFieldType,
    minValue: textFieldMinValue,
  } = textFieldProps;

  const {
    name: selectFieldName,
    value: selectFieldValue,
    className: selectFieldClassName,
  } = selectFieldProps;

  const handleSelectChange = (event: ChangeEvent) => {
    // in case one of the fields in the form is empty
    // we need to save the other part of the field as well
    const inputTarget = {
      value: textFieldValue,
      name: textFieldName,
    };

    change(event);
    change({ target: inputTarget });
  };

  const handleTextChange = (event: ChangeEvent) => {
    const { value } = event.target;

    const otherTarget = {
      value: selectFieldValue,
      name: selectFieldName,
    };

    // handle parsing in case of text field of type number
    const parsedValue =
      textFieldType === 'number' && typeof value === 'string' ? parseInt(value, 10) : value;

    change({
      ...event,
      target: { ...event.target, value: parsedValue, name: event.target.name },
    });
    change({ target: otherTarget });
  };

  return (
    <div className={containerClassName || styles.container}>
      <TextField
        error={isError}
        helperText={helperText}
        type="number"
        className={styles.innerContainer ?? ''}
        name={textFieldName}
        label={textFieldLabel}
        inputProps={{
          min: textFieldMinValue,
        }}
        InputProps={{
          className: clsx(styles.textField, !textFieldLabel && styles.textFieldCentered),
          endAdornment: (
            <SingleSelectField
              name={selectFieldName}
              onChange={handleSelectChange}
              value={selectFieldValue}
              className={selectFieldClassName}
              InputProps={{
                classes: {
                  input: styles.noBackground ?? '',
                  root: styles.input ?? '',
                  notchedOutline: styles.noBorder ?? '',
                },
              }}
              choices={choices}
            />
          ),
        }}
        onChange={handleTextChange}
        value={textFieldValue}
      />
    </div>
  );
};

export default TextWithSelectField;
