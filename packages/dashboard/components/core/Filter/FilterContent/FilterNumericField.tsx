import { useTranslation } from '@core/i18n';
import type { FilterFieldBaseProps } from '@dashboard/components/core/Filter';
import { FieldType } from '@dashboard/components/core/Filter';
import Arrow from '@dashboard/components/core/Filter/Arrow';
import TextField from '@mui/material/TextField';
import type { FC } from 'react';

import { filterTestingContext } from './utils';

type FilterNumericFieldProps = FilterFieldBaseProps<
  string,
  FieldType.number | FieldType.price
> & {
  currencySymbol: string | undefined;
};

export const FilterNumericField: FC<FilterNumericFieldProps> = ({
  filter,
  onFilterPropertyChange,
  currencySymbol,
}) => {
  // const styles = useCommonStyles({});
  const styles = {};
  const { t } = useTranslation();
  const isMultiple = filter.multiple;

  const handleChange = (value: string[]) =>
    onFilterPropertyChange({
      payload: {
        name: filter.name,
        update: {
          value,
        },
      },
      type: 'set-property',
    });

  return (
    <>
      <div className={styles.inputRange ?? ''}>
        <div>
          <Arrow className={styles.arrow ?? ''} />
        </div>
        <TextField
          {...(isMultiple && { 'data-test-range-type': 'min' })}
          data-test-id={filterTestingContext + filter.name}
          fullWidth
          name={filter.name + (isMultiple ? '_min' : '')}
          InputProps={{
            classes: {
              input: styles.input ?? '',
            },
            type: 'number',
            endAdornment: filter.type === FieldType.price && currencySymbol,
          }}
          value={filter.value[0]}
          onChange={({ target: { value } }) =>
            handleChange(isMultiple ? [value, filter.value[1]] : [value])
          }
        />
      </div>
      {filter.multiple && (
        <>
          <div className={styles.inputRange ?? ''}>
            <div className={styles.spacer ?? ''} />
            <span className={styles.andLabel ?? ''}>
              <>
                {/* filter range separator */}

                {t('dashboard.4F7Jk', 'and')}
              </>
            </span>
          </div>
          <div className={styles.inputRange ?? ''}>
            <div className={styles.spacer ?? ''} />
            <TextField
              data-test-id={filterTestingContext + filter.name}
              data-test-range-type="max"
              fullWidth
              name={filter.name + '_max'}
              InputProps={{
                classes: {
                  input: styles.input ?? '',
                },
                type: 'number',
                endAdornment: filter.type === FieldType.price && currencySymbol,
              }}
              value={filter.value[1]}
              onChange={(event) => handleChange([filter.value[0], event.target.value])}
            />
          </div>
        </>
      )}
    </>
  );
};
