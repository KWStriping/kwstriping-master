import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { makeStyles } from '@tempo/ui/theme/styles';
import type { FC } from 'react';

import type { FilterElement } from '../types';
import type { FilterDispatchFunction } from '../useFilter';

const useStyles = makeStyles(
  (theme) => ({
    container: {
      '&:not(:last-of-type)': {
        borderBottom: `1px solid ${theme.vars.palette.divider}`,
      },
      padding: theme.spacing(1, 2.5),
    },
  }),
  { name: 'FilterContentBodyNameField' }
);

export interface FilterContentBodyNameFieldProps<K extends string = string> {
  filter: FilterElement<K>;
  onFilterPropertyChange: FilterDispatchFunction<K>;
}

const FilterContentBodyNameField: FC<FilterContentBodyNameFieldProps> = ({
  filter,
  onFilterPropertyChange,
}) => {
  // const styles = useStyles();
  const styles = {};
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

export default FilterContentBodyNameField;
