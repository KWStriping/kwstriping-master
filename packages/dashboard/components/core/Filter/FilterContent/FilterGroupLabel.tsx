import { makeStyles } from '@core/ui/theme/styles';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import type { FC } from 'react';

import type { FilterFieldBaseProps } from '../types';

const useStyles = makeStyles(
  (theme) => ({
    container: {
      '&:not(:last-of-type)': {
        borderBottom: `1px solid ${theme.vars.palette.divider}`,
      },
      padding: theme.spacing(1, 2.5),
    },
  }),
  { name: 'FilterGroupLabel' }
);

export type FilterGroupLabelProps<K extends string = string> = FilterFieldBaseProps<K>;

const FilterGroupLabel: FC<FilterGroupLabelProps> = ({ filter, onFilterPropertyChange }) => {
  // const styles = useStyles();
  const styles = {};
  if (!filter) return null;

  return (
    <div className={styles.container ?? ''}>
      <FormControlLabel
        control={
          <Checkbox data-test-id={'filter-group-active-' + filter.name} checked={filter.active} />
        }
        label={filter.label}
        onClick={(event) => event.stopPropagation()}
        onChange={() =>
          onFilterPropertyChange({
            payload: {
              name: filter.name,
              update: {
                active: !filter.active,
              },
            },
            type: 'set-property',
          })
        }
      />
    </div>
  );
};

export default FilterGroupLabel;
