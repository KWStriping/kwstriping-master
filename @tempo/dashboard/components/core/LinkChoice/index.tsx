import Link from '@tempo/ui/components/Link';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import clsx from 'clsx';
import { codes } from 'keycode';
import type { KeyboardEvent, FC } from 'react';
import { useState, useRef } from 'react';

import type { SingleAutocompleteChoiceType } from '../SingleAutocompleteSelectField';
import styles from './index.module.css';
import ArrowDropdown from '@tempo/dashboard/oldSrc/icons/ArrowDropdown';
import type { FormChange } from '@tempo/dashboard/hooks/useForm';

export interface LinkChoiceProps {
  className?: string;
  choices: SingleAutocompleteChoiceType[];
  name?: string;
  value: string;
  onChange: FormChange;
}

const LinkChoice: FC<LinkChoiceProps> = ({ className, choices, name, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const anchor = useRef<HTMLInputElement | null>(null);
  const current = choices.find((c) => c.value === value);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const handleChange = (value: string) => {
    setOpen(false);
    onChange({
      target: {
        name,
        value,
      },
    });
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLSpanElement>) => {
    switch (event.keyCode) {
      case codes.down:
        setHighlightedIndex((highlightedIndex) => (highlightedIndex + 1) % choices.length);
        break;
      case codes.up:
        setHighlightedIndex((highlightedIndex) =>
          highlightedIndex === 0 ? choices.length - 1 : (highlightedIndex - 1) % choices.length
        );
        break;
      case codes.enter:
        if (open) {
          handleChange(choices[highlightedIndex].value);
        } else {
          setOpen(true);
        }
        break;
    }
  };

  return (
    <span
      className={clsx(styles.root, className)}
      ref={anchor}
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      <Link onClick={() => setOpen((open) => !open)}>
        {current.label}
        <ArrowDropdown className={clsx(styles.arrow, open && styles.rotate)} color="primary" />
      </Link>

      <Popper
        className={styles.popper ?? ''}
        open={open}
        anchorEl={anchor.current}
        transition
        disablePortal
        placement="bottom-start"
      >
        <ClickAwayListener onClickAway={() => setOpen(false)} mouseEvent="onClick">
          <Paper className={styles.paper ?? ''}>
            {choices.map((choice, choiceIndex) => (
              <MenuItem
                className={clsx(
                  styles.menuItem ?? '',
                  highlightedIndex === choiceIndex && styles.highlighted
                )}
                selected={choice.value === value}
                key={choice.value}
                onClick={() => handleChange(choice.value)}
                data-test-id="select-option"
              >
                {choice.label}
              </MenuItem>
            ))}
          </Paper>
        </ClickAwayListener>
      </Popper>
    </span>
  );
};

LinkChoice.displayName = 'LinkChoice';
export default LinkChoice;
