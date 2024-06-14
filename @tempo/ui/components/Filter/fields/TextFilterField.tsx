import TextField from '@mui/material/TextField';
import type { ChangeEvent, FC } from 'react';

// import useStyles from '../styles';
import type { EventTarget, FilterData } from '../types';
import styles from './TextFilterField.module.css';
import { useFilterActions } from '@tempo/ui/components/Filter/context';

export interface FilterContentProps {
  filter: FilterData;
}

export const TextFilterField: FC<FilterContentProps> = ({ filter }) => {
  const { onChange } = useFilterActions();

  const { name } = filter;

  const handleChange = (event: ChangeEvent<EventTarget<string>>) =>
    onChange(name, event.target.value);

  return (
    <TextField
      {...filter.options.InputProps}
      className={styles.filterValue ?? ''}
      InputProps={{
        ...filter.options.InputProps?.InputProps,
        classes: {
          input: styles.filterInputInner ?? '',
        },
      }}
      onChange={handleChange}
      value={filter.value}
    />
  );
};
TextFilterField.displayName = 'TextFilterField';
