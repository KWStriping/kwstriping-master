import * as m from '@paraglide/messages';
import Button from '@tempo/ui/components/buttons/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';

import { useState, useRef } from 'react';
import styles from './index.module.css';
import type { FilterElement, FilterErrorMessages, IFilter, InvalidFilters } from './types';
import useFilter from './useFilter';
import { extractInvalidFilters } from './utils';
import { FilterContent } from '.';

export * from './FilterContent';
export * from './types';

export interface FilterProps<TFilterKeys extends string = string> {
  currencySymbol?: string;
  errorMessages?: FilterErrorMessages<TFilterKeys>;
  structure: IFilter<TFilterKeys>;
  onFilterChange: (filter: Array<FilterElement<TFilterKeys>>) => void;
  onFilterAttributeFocus?: (id?: string) => void;
}

function Filter<TKeys extends string = string>({
  currencySymbol,
  structure,
  onFilterChange,
  onFilterAttributeFocus,
  errorMessages,
}: FilterProps<TKeys>) {
  const anchor = useRef<HTMLDivElement | null>(null);
  const [isFilterMenuOpened, setFilterMenuOpened] = useState(false);
  const [filterErrors, setFilterErrors] = useState<InvalidFilters<string>>({});
  const [data, dispatch, reset] = useFilter(structure);

  const isFilterActive = structure.some((filterElement) => filterElement.active);

  const handleSubmit = () => {
    const invalidFilters = extractInvalidFilters(data, structure);

    if (Object.keys(invalidFilters).length > 0) {
      setFilterErrors(invalidFilters);
      return;
    }

    setFilterErrors({});
    onFilterChange(data);
    setFilterMenuOpened(false);
  };

  const handleClear = () => {
    reset();
    setFilterErrors({});
  };

  return (
    <ClickAwayListener
      onClickAway={(event) => {
        if (!event.target) return;
        if ((event.target as HTMLElement).getAttribute('role') !== 'option') {
          setFilterMenuOpened(false);
        }
      }}
      mouseEvent="onMouseUp"
    >
      <div ref={anchor}>
        <Button
          className={clsx(
            styles.filterButton ?? '',
            isFilterMenuOpened || (isFilterActive && styles.addFilterButtonActive)
          )}
          onClick={() => setFilterMenuOpened(!isFilterMenuOpened)}
          data-test-id="show-filters-button"
          color="secondary"
        >
          <Typography className={styles.addFilterText ?? ''}>
            {m.dashboard_Npv_K() ?? 'Filters'}
          </Typography>
          {isFilterActive && (
            <>
              <span className={styles.separator ?? ''} />
              <Typography className={styles.addFilterText ?? ''}>
                {structure.reduce((acc, filterElement) => {
                  const dataFilterElement = data?.find(({ name }) => name === filterElement.name);

                  if (!dataFilterElement) {
                    return acc;
                  }

                  return acc + (dataFilterElement.active ? 1 : 0);
                }, 0)}
              </Typography>
            </>
          )}
        </Button>
        <Popper
          className={styles.popover ?? ''}
          open={isFilterMenuOpened}
          anchorEl={anchor.current}
          transition
          disablePortal
          placement="bottom-start"
          modifiers={[
            {
              name: 'flip',
              enabled: false,
            },
            {
              name: 'hide',
              enabled: false,
            },
            {
              name: 'preventOverflow',
              // boundariesElement: "scrollParent",
              enabled: false,
            },
          ]}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'right top' : 'right bottom',
              }}
            >
              <FilterContent
                errorMessages={errorMessages}
                errors={filterErrors}
                dataStructure={structure}
                currencySymbol={currencySymbol}
                filters={data}
                onClear={handleClear}
                onFilterPropertyChange={dispatch}
                onFilterAttributeFocus={onFilterAttributeFocus}
                onSubmit={handleSubmit}
              />
            </Grow>
          )}
        </Popper>
      </div>
    </ClickAwayListener>
  );
}
Filter.displayName = 'Filter';
export default Filter;
