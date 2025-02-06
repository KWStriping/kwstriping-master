import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import { useFilterActions, useFilterData } from './context';

import { getAvailableFilters } from './utils';

export type FilterMenuLabels = Record<'header', string>;
export interface FilterMenuProps {
  anchorEl: HTMLElement | null;
  labels: FilterMenuLabels;
  open: boolean;
  onClose: () => void;
}

export const FilterMenu: FC<FilterMenuProps> = ({ anchorEl, labels, open, onClose }) => {
  const filters = useFilterData();
  const { toggle } = useFilterActions();

  const availableFilters = getAvailableFilters(filters);
  const handleFilterClick = (filterName: string) => {
    toggle(filterName);
    onClose();
  };

  return (
    anchorEl && (
      <Popper anchorEl={anchorEl} open={open} disablePortal placement="bottom-start">
        <ClickAwayListener onClickAway={onClose}>
          <Paper elevation={20} className={'p-2'}>
            <div className={'p-2 min-w-[220px]'}>
              <Typography className={''} color="textSecondary" variant="caption">
                {labels.header}
              </Typography>
            </div>
            {availableFilters.map((filter) => (
              <MenuItem key={filter.name} onClick={() => handleFilterClick(filter.name)}>
                {filter.label}
              </MenuItem>
            ))}
          </Paper>
        </ClickAwayListener>
      </Popper>
    )
  );
};
FilterMenu.displayName = 'FilterMenu';
