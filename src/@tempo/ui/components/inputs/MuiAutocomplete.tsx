import type { AutocompleteProps } from '@mui/material/Autocomplete';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';

export function MuiAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>({ options, ...props }: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) {
  const [open, setOpen] = useState(false);
  const readOnly = !options.length || options.length === 1;
  return (
    <Autocomplete
      options={options}
      {...props}
      blurOnSelect={true}
      open={open}
      onClick={(e) => {
        if (!readOnly) {
          setOpen(true);
        } else {
          e.preventDefault();
        }
      }}
      onBlur={() => setOpen(false)}
    />
  );
}

export default MuiAutocomplete;
