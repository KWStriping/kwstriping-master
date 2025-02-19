import { getBySlug } from '@tempo/utils';
import InputAdornment from '@mui/material/InputAdornment';
import type { FC } from 'react';
import type { AttributeRowProps } from './types';
import BasicAttributeRow from '@tempo/dashboard/components/attributes/AttributesCard/BasicAttributeRow';
import {
  getErrorMessage,
  getSingleDisplayValue,
} from '@tempo/dashboard/components/attributes/AttributesCard/utils';
import SingleAutocompleteSelectField from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';

type SwatchRowProps = Pick<
  AttributeRowProps,
  'attribute' | 'values' | 'disabled' | 'error' | 'onChange' | 'fetchValues' | 'fetchMoreValues'
>;

export const SwatchRow: FC<SwatchRowProps> = ({
  values,
  fetchValues,
  fetchMoreValues,
  attribute,
  disabled,
  error,
  onChange,
}) => {
  const value = attribute.data?.values?.find(getBySlug(attribute.value[0]));

  return (
    <BasicAttributeRow label={attribute.label}>
      <SingleAutocompleteSelectField
        fetchOnFocus
        allowCustomValues={false}
        choices={values.map(({ file, value, slug, name }) => ({
          label: (
            <>
              <div
                className={styles.swatchPreview ?? ''}
                style={
                  file ? { backgroundImage: `url(${file.url})` } : { backgroundColor: value }
                }
              />

              {name}
            </>
          ),
          value: slug,
        }))}
        disabled={disabled}
        displayValue={getSingleDisplayValue(attribute, values)}
        emptyOption={!attribute.data?.isRequired}
        error={!!error}
        helperText={getErrorMessage(error, t)}
        name={`attribute:${attribute.label}`}
        value={attribute.value[0]}
        onChange={(event) => onChange(attribute.id, event.target.value)}
        fetchChoices={(value) => fetchValues(value, attribute.id)}
        InputProps={{
          classes: { input: styles.swatchInput },
          startAdornment: (
            <InputAdornment position="start">
              <div
                className={styles.swatchPreview ?? ''}
                style={
                  value?.file
                    ? { backgroundImage: `url(${value.file.url})` }
                    : { backgroundColor: value?.value }
                }
              />
            </InputAdornment>
          ),
        }}
        {...fetchMoreValues}
      />
    </BasicAttributeRow>
  );
};
