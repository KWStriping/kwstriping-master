import { makeStyles } from '@tempo/ui/theme/styles';
import DropdownIcon from '@mui/icons-material/ArrowDropDown';
import {
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList as Menu,
  Paper,
  Popper,
  TextField,
} from '@mui/material';
import type { TextFieldProps } from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { FC, ReactNode } from 'react';
import { useRef } from 'react';

import MenuToggle from '@tempo/dashboard/components/core/MenuToggle';

export type TextFieldWithChoiceProps<TValue = string> = TextFieldProps & {
  ChoiceProps: {
    name: string;
    label: string | ReactNode;
    values: Array<{
      label: string | ReactNode;
      value: TValue;
    }>;
  };
};

const useStyles = makeStyles(
  {
    adornment: {
      alignItems: 'center',
      cursor: 'pointer',
      display: 'flex',
    },
    menu: {
      zIndex: 10,
    },
  },
  { name: 'TextFieldWithChoice' }
);

const TextFieldWithChoice: FC<TextFieldWithChoiceProps> = (props) => {
  const { ChoiceProps, InputProps, onChange, ...rest } = props;
  const styles = useStyles(props);

  const anchor = useRef<HTMLDivElement>();

  return (
    <TextField
      {...rest}
      onChange={onChange}
      InputProps={{
        ...InputProps,
        endAdornment: (
          <MenuToggle ariaOwns="user-menu">
            {({ open: menuOpen, actions: { open: openMenu, close: closeMenu } }) => {
              const handleSelect = (value) => {
                onChange({
                  target: {
                    name: ChoiceProps.name,
                    value,
                  },
                } as unknown);
                closeMenu();
              };

              return (
                <>
                  <div
                    className={styles.adornment ?? ''}
                    ref={anchor}
                    onClick={!menuOpen ? openMenu : undefined}
                  >
                    <Typography component="span" variant="caption">
                      {ChoiceProps.label}
                    </Typography>
                    {ChoiceProps.values ? <DropdownIcon /> : null}
                  </div>
                  <Popper
                    open={menuOpen}
                    anchorEl={anchor.current}
                    transition
                    disablePortal
                    placement="bottom-end"
                    className={styles.menu ?? ''}
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin: placement === 'bottom' ? 'right top' : 'right bottom',
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={closeMenu} mouseEvent="onClick">
                            <Menu>
                              {ChoiceProps.values.map((choice) => (
                                <MenuItem
                                  onClick={() => handleSelect(choice.value)}
                                  key={choice.value}
                                >
                                  {choice.label}
                                </MenuItem>
                              ))}
                            </Menu>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </>
              );
            }}
          </MenuToggle>
        ),
      }}
    />
  );
};

TextFieldWithChoice.displayName = 'TextFieldWithChoice';
export default TextFieldWithChoice;
