import * as m from '@paraglide/messages';
import { splitDateTime } from '@tempo/utils/datetime';
import TextField from '@mui/material/TextField';
import type { FC } from 'react';
import { filterTestingContext, getDateFilterValue, getDateTimeFilterValue } from './utils';
import type { FilterFieldBaseProps } from '@tempo/dashboard/components/core/Filter';
import { FieldType } from '@tempo/dashboard/components/core/Filter';
import Arrow from '@tempo/dashboard/components/core/Filter/Arrow';

type FilterDateTimeFieldProps = FilterFieldBaseProps<string, FieldType.dateTime | FieldType.date>;

export const FilterDateTimeField: FC<FilterDateTimeFieldProps> = ({
  filter,
  onFilterPropertyChange,
}) => {
  // const styles = useCommonStyles({});
  const styles = {};
  const isDateTime = filter.type === FieldType.dateTime;
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
            type: 'date',
          }}
          value={splitDateTime(filter.value[0]).date}
          onChange={(event) => {
            const value = getDateFilterValue(event.target.value, filter.value[0], isDateTime);
            handleChange(isMultiple ? [value, filter.value[1]] : [value]);
          }}
        />
        {isDateTime && (
          <TextField
            data-test-id={filterTestingContext + filter.name}
            data-test-range-type="time_min"
            className={styles.inputTime ?? ''}
            name={filter.name + (isMultiple ? '_time_min' : '')}
            InputProps={{
              classes: { input: styles.input },
              type: 'time',
            }}
            value={splitDateTime(filter.value[0]).time}
            onChange={(event) => {
              const value = getDateTimeFilterValue(filter.value[0], event.target.value);
              handleChange(isMultiple ? [value, filter.value[1]] : [value]);
            }}
          />
        )}
      </div>
      {filter.multiple && (
        <>
          <div className={styles.inputRange ?? ''}>
            <div className={styles.spacer ?? ''} />
            <span className={styles.andLabel ?? ''}>
              <>
                {/* filter range separator */}

                {m.dashboard__F_Jk() ?? 'and'}
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
                type: 'date',
              }}
              value={splitDateTime(filter.value[1]).date}
              onChange={(event) =>
                handleChange([
                  filter.value[0],
                  getDateFilterValue(event.target.value, filter.value[1], isDateTime),
                ])
              }
            />
            {isDateTime && (
              <TextField
                data-test-id={filterTestingContext + filter.name}
                className={styles.inputTime ?? ''}
                data-test-range-type="time_max"
                name={filter.name + '_time_max'}
                InputProps={{
                  classes: { input: styles.input },
                  type: 'time',
                }}
                value={splitDateTime(filter.value[1]).time}
                onChange={(event) =>
                  handleChange([
                    filter.value[0],
                    getDateTimeFilterValue(filter.value[1], event.target.value),
                  ])
                }
              />
            )}
          </div>
        </>
      )}
    </>
  );
};
