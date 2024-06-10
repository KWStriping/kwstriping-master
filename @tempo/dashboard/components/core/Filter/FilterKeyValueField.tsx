import * as m from '@paraglide/messages';
import Button from '@tempo/ui/components/buttons/Button';
import IconButton from '@tempo/ui/components/buttons/IconButton/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import type { KeyValue } from '@tempo/dashboard/oldSrc/types';
import TextField from '@mui/material/TextField';
import styles from './index.module.css';
import type { FieldType, FilterFieldBaseProps } from './types';

const getUpdateArrayFn =
  <T,>(key: 'key' | 'value') =>
  (array: T[], index: number, value: string) => {
    const item = array[index];
    return [...array.slice(0, index), { ...item, [key]: value }, ...array.slice(index + 1)];
  };

const updateKeyFn = getUpdateArrayFn<KeyValue>('key');
const updateValueFn = getUpdateArrayFn<KeyValue>('value');
const createEmptyPair = (array: KeyValue[]) => [...array, { key: '' }];

type FilterKeyValueFieldProps<K extends string = string> = FilterFieldBaseProps<
  K,
  FieldType.keyValue
>;

export const FilterKeyValueField = <K extends string = string>({
  filter,
  onFilterPropertyChange,
}: FilterKeyValueFieldProps<K>) => {
  const values = filter.value?.length ? filter.value : ([{ key: '' }] as KeyValue[]);

  return (
    <div className={styles.formWrapper ?? ''}>
      <div className={styles.fieldsWrapper ?? ''}>
        {values.map((innerField, index) => (
          <div key={index} className={styles.metadataField ?? ''}>
            <TextField
              fullWidth
              name={filter.name}
              label={m.dashboard_ey() ?? 'Key'}
              value={innerField.key}
              onChange={(event) =>
                onFilterPropertyChange({
                  payload: {
                    name: filter.name,
                    update: {
                      value: updateKeyFn(values, index, event.target.value),
                    },
                  },
                  type: 'set-property',
                })
              }
            />
            <TextField
              fullWidth
              name={filter.name}
              label={m.dashboard_value() ?? 'Value'}
              value={innerField.value ?? ''}
              onChange={(event) =>
                onFilterPropertyChange({
                  payload: {
                    name: filter.name,
                    update: {
                      value: updateValueFn(values, index, event.target.value),
                    },
                  },
                  type: 'set-property',
                })
              }
            />
            <IconButton
              color="secondary"
              className={styles.deleteButton ?? ''}
              onClick={() => {
                onFilterPropertyChange({
                  payload: {
                    name: filter.name,
                    update: {
                      value: values.filter((_, i) => i !== index),
                    },
                  },
                  type: 'set-property',
                });
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </div>
      <Button
        className={styles.addButton ?? ''}
        color="primary"
        onClick={() => {
          onFilterPropertyChange({
            payload: {
              name: filter.name,
              update: {
                value: createEmptyPair(values),
              },
            },
            type: 'set-property',
          });
        }}
      >
        {m.dashboard_add() ?? 'Add more'}
      </Button>
    </div>
  );
};
