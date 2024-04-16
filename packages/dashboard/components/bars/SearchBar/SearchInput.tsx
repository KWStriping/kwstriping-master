import Debounce from '@core/ui/components/Debounce';
import type { SearchPageProps } from '@core/ui/types';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import type { ChangeEvent, FC } from 'react';

export interface SearchInputProps extends SearchPageProps {
  placeholder: string;
}

const SearchInput: FC<SearchInputProps> = (props) => {
  const { initialSearch, onSearchChange, placeholder } = props;
  const [search, setSearch] = useState(initialSearch);
  useEffect(() => setSearch(initialSearch), [initialSearch]);

  return (
    <Debounce debounceFn={onSearchChange} time={500}>
      {(debounceSearchChange) => {
        const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
          const value = event.target.value;
          setSearch(value);
          debounceSearchChange(value);
        };

        return (
          <TextField
            data-test-id="search-input"
            className={'grow'}
            inputProps={{
              sx: { py: '10.5px', px: '12px' },
              placeholder,
            }}
            value={search}
            onChange={handleSearchChange}
          />
        );
      }}
    </Debounce>
  );
};

SearchInput.displayName = 'SearchInput';
export default SearchInput;
