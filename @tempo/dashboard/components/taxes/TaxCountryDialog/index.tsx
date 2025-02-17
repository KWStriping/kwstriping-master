import * as m from '@paraglide/messages';
import Button from '@tempo/ui/components/buttons/Button';
import { DialogHeader } from '@tempo/ui/components/dialog/DialogHeader';
import type { CountryFragment } from '@tempo/api/generated/graphql';
import SearchIcon from '@mui/icons-material/Search';
import {
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormControlLabel,
  InputAdornment,
  Radio,
  TextField,
} from '@mui/material';
import type { FC } from 'react';
import { Fragment, useState } from 'react';
import useModalDialogOpen from '@tempo/dashboard/hooks/useModalDialogOpen';
import { useLocalSearch } from '@tempo/dashboard/hooks/useLocalSearch';

interface TaxCountryDialogProps {
  open: boolean;
  countries: CountryFragment[];
  onConfirm: (countries: CountryFragment) => void;
  onClose: () => void;
}

export const TaxCountryDialog: FC<TaxCountryDialogProps> = ({
  open,
  countries,
  onConfirm,
  onClose,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryFragment>();

  useModalDialogOpen(open, {
    onClose: () => {
      setSelectedCountry(undefined);
      setQuery('');
    },
  });

  const {
    query,
    setQuery,
    searchResult: filteredCountries,
  } = useLocalSearch<CountryFragment>(countries, (country) => country.name);

  return (
    <Dialog open={open} fullWidth onClose={onClose} className={styles.dialog ?? ''}>
      <DialogHeader onClose={onClose}>
        {m.dashboard_hooseCountryDialogTitle() ?? 'Choose country you want to add'}
      </DialogHeader>
      <DialogContent className={styles.wrapper ?? ''}>
        <TextField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          variant="outlined"
          placeholder={m.dashboard_country() ?? 'Country'}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          inputProps={{ className: styles.inputPadding }}
        />
        <div className={styles.scrollable ?? ''}>
          {filteredCountries.map((country) => (
            <Fragment key={country.code}>
              <FormControlLabel
                label={country.name}
                checked={country.code === selectedCountry?.code}
                onChange={() => setSelectedCountry(country)}
                control={<Radio />}
              />
              <Divider />
            </Fragment>
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={() => {
            onConfirm(selectedCountry);
          }}
          disabled={!selectedCountry}
        >
          {m.dashboard_add() ?? 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaxCountryDialog;
