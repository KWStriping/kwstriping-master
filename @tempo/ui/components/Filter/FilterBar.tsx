import styles from './FilterBar.module.css';
import PlusIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { forwardRef, useRef, useState, useEffect } from 'react';
import type { ForwardedRef, FC, ReactNode } from 'react';

import IconButton from '@tempo/ui/components/buttons/IconButton';
import { Button } from '@tempo/ui/components/buttons/Button';
import { useFilterData } from './context';
import type { FilterMenuLabels } from './FilterMenu';
import { FilterMenu } from './FilterMenu';

import type { FilterData, Filter, FilterLabels } from './types';
import * as utils from './utils';
import { FilterRow } from '.';

export interface FilterBarProps {
  initial?: Filter[];
  labels: Record<'header' | 'addButton', string> & FilterMenuLabels & FilterLabels;
  onChange: (filterData: FilterData[]) => void;
  onClose: () => void;
  children: ReactNode;
}

export const FilterBar: FC<FilterBarProps> = forwardRef(
  ({ children, labels, onChange: changeCb, onClose }, ref: ForwardedRef<HTMLDivElement>) => {
    const filterData = useFilterData();
    // const styles = useStyles();
    const [menuOpen, setMenuOpen] = useState(false);
    const button = useRef(null);
    utils.validate(filterData);
    const availableFilters = utils.getAvailableFilters(filterData);
    useEffect(() => changeCb(utils.getActiveFilters(filterData)), [filterData]);
    return (
      <>
        {children}
        <Card className={styles.bar ?? ''} ref={ref} elevation={8}>
          <CardHeader
            title={labels.header}
            action={
              <IconButton onClick={onClose} size="large">
                <CloseIcon />
              </IconButton>
            }
          />
          <CardContent>
            <div>
              {utils
                .getActiveFilters(filterData)
                .sort((a, b) => (a.sortIndex > b.sortIndex ? 1 : -1))
                .map((filter, filterIndex) => (
                  <FilterRow
                    key={filter.name}
                    first={filterIndex === 0}
                    labels={labels}
                    name={filter.name}
                  />
                ))}
            </div>
            {!!availableFilters.length && (
              <Button
                className={styles.barAddBtn ?? ''}
                color="secondary"
                ref={button}
                onClick={() => setMenuOpen(true)}
              >
                {labels.addButton}
                <PlusIcon />
              </Button>
            )}
            <FilterMenu
              anchorEl={button.current}
              labels={labels}
              open={menuOpen}
              onClose={() => setMenuOpen(false)}
            />
          </CardContent>
        </Card>
      </>
    );
  }
);
FilterBar.displayName = 'FilterBar';
export default FilterBar;
