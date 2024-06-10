import { Button } from '@core/ui/components/buttons/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import type { ButtonGroupProps, ButtonProps } from '@mui/material';
import { ButtonGroup, ClickAwayListener, Grow, MenuItem, MenuList } from '@mui/material';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { useState, useRef } from 'react';
import type { MouseEvent, FC } from 'react';
import styles from './index.module.css';

interface Option {
  label: string;
  disabled?: boolean;
  onSelect(e: MouseEvent<HTMLLIElement, MouseEvent>): void;
}

export interface ButtonWithSelectProps
  extends Omit<ButtonGroupProps, 'onClick'>,
    Pick<ButtonProps, 'onClick'> {
  options: Option[];
  href?: string;
}

export const ButtonWithSelect: FC<ButtonWithSelectProps> = ({
  options,
  children,
  href,
  onClick,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement | null>(null);

  const handleMenuItemClick = (
    event: MouseEvent<HTMLLIElement, MouseEvent>,
    onClick: (event: MouseEvent<HTMLLIElement, MouseEvent>) => void
  ) => {
    onClick(event);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <ButtonGroup ref={anchorRef} aria-label="button with select" {...props}>
        <Button color="primary" onClick={onClick} href={href} style={{ width: '100%' }}>
          {children}
        </Button>
        {!!options?.length && (
          <Button
            color="primary"
            aria-controls={open ? 'button-with-select-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select different option"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon className={styles.buttonIcon ?? ''} />
          </Button>
        )}
      </ButtonGroup>
      {anchorRef.current && (
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          transition
          disablePortal
          placement="bottom-end"
          className={styles.popper ?? ''}
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <Paper className={styles.paper ?? ''}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="button-with-select-menu">
                    {options.map((option, i) => (
                      <MenuItem
                        key={option.label + i}
                        disabled={option.disabled}
                        onClick={(e) => handleMenuItemClick(e, option.onSelect)}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      )}
    </>
  );
};

export default ButtonWithSelect;
