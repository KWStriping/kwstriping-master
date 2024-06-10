import { useFilterActions } from '@tempo/ui/components/Filter/context';
import type { TextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { ChangeEvent, FC } from 'react';

// import useStyles from '../styles';
import type { EventTarget, FilterData, FilterLabels } from '../types';

export interface FilterContentProps {
  filter: FilterData;
  labels: FilterLabels;
}

export const RangeFilterField: FC<FilterContentProps> = ({ filter, labels }) => {
  // const styles = useStyles();

  const styles = {};
  const { onChange } = useFilterActions();

  const { name } = filter;

  const handleChange = (event: ChangeEvent<EventTarget<string>>) =>
    onChange(name, event.target.value, {
      rangePart: event.target.name as 'min' | 'max',
    });

  const props: Partial<TextFieldProps> = {
    ...filter.options.InputProps,
    InputProps: {
      classes: {
        input: styles.filterInputInner ?? '',
      },
      type: 'number',
      ...filter.options.InputProps?.InputProps,
    },
    onChange: handleChange,
  };

  return (
    <div className={clsx(styles.filterValue, styles.filterRangeValueContainer)}>
      <TextField {...props} name="min" value={filter.values![0]} />
      <Typography className={styles.filterRangeLabel ?? ''}>{labels.and}</Typography>
      <TextField {...props} name="max" value={filter.values![1]} />
    </div>
  );
};
RangeFilterField.displayName = 'RangeFilterField';
