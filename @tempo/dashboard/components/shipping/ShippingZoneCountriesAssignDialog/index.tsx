import * as m from '@paraglide/messages';
import BackButton from '@tempo/ui/components/buttons/BackButton';
import ConfirmButton from '@tempo/ui/components/buttons/ConfirmButton';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import type { CountryWithCodeFragment } from '@tempo/api/generated/graphql';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableBody,
  TableCell,
  TextField,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { filter } from 'fuzzaldrin';
import type { FC } from 'react';

import { createCountryChangeHandler, createRestOfTheWorldChangeHandler } from './handlers';
import styles from './index.module.css';
import useScrollableDialogStyle from '@tempo/dashboard/oldSrc/styles/useScrollableDialogStyle';
import {
  getCountrySelectionMap,
  isRestWorldCountriesSelected,
} from '@tempo/dashboard/oldSrc/shipping/handlers';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';
import Form from '@tempo/dashboard/components/forms/Form';
import Checkbox from '@tempo/dashboard/components/core/Checkbox';

interface FormData {
  countries: string[];
  query: string;
}

export interface ShippingZoneCountriesAssignDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  countries: CountryWithCodeFragment[];
  restWorldCountries: string[];
  initial: string[];
  open: boolean;
  onClose: () => void;
  onConfirm: (data: FormData) => void;
}

const ShippingZoneCountriesAssignDialog: FC<ShippingZoneCountriesAssignDialogProps> = (props) => {
  const { confirmButtonState, onClose, countries, restWorldCountries, open, initial, onConfirm } =
    props;
  const scrollableDialogClasses = useScrollableDialogStyle();

  const initialForm: FormData = {
    countries: initial,
    query: '',
  };

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <Form initial={initialForm} onSubmit={onConfirm} className={scrollableDialogClasses.form}>
        {({ data, change }) => {
          const countrySelectionMap = getCountrySelectionMap(countries, data?.countries);
          const isRestOfTheWorldSelected = isRestWorldCountriesSelected(
            restWorldCountries,
            countrySelectionMap
          );
          const handleCountryChange = createCountryChangeHandler(data?.countries, change);
          const handleRestOfTheWorldChange = createRestOfTheWorldChangeHandler(
            countrySelectionMap,
            data?.countries,
            restWorldCountries,
            change
          );

          return (
            <>
              <DialogTitle>
                {m.dashboard_assignCountriesTitle() ?? 'Assign Countries'}
              </DialogTitle>
              <DialogContent>
                <Typography>
                  {m.dashboard_assignCountriesDescription() ??
                    'Choose countries you want to add to shipping zone from list below'}
                </Typography>
                <FormSpacer />
                <TextField
                  name="query"
                  value={data?.query}
                  onChange={(event) => change(event)}
                  label={m.dashboard_searchCountriesLabel() ?? 'Search Countries'}
                  placeholder={
                    m.dashboard_searchCountriesPlaceholder() ?? 'Search by country name'
                  }
                  fullWidth
                />
                <FormSpacer />
                <Divider />
                <FormSpacer />
                {!!restWorldCountries?.length && (
                  <>
                    <Typography variant="subtitle1">
                      {m.dashboard_uickPickSubtitle() ?? 'Quick Pick'}
                    </Typography>
                    <FormSpacer />
                    <ResponsiveTable className={styles.table ?? ''}>
                      <TableBody>
                        <TableRow
                          className={styles.clickableRow ?? ''}
                          onClick={() => handleRestOfTheWorldChange(!isRestOfTheWorldSelected)}
                        >
                          <TableCell className={styles.wideCell ?? ''}>
                            {m.dashboard_estOfTheWorldCheckbox() ?? 'Rest of the World'}
                            <Typography variant="caption">
                              {m.dashboard_estOfTheWorldCheckboxDescription() ??
                                'If selected, this will add all of the countries not selected to other shipping zones'}
                            </Typography>
                          </TableCell>
                          <TableCell padding="checkbox" className={styles.checkboxCell ?? ''}>
                            <Checkbox name="restOfTheWorld" checked={isRestOfTheWorldSelected} />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </ResponsiveTable>
                    <FormSpacer />
                  </>
                )}
                <Typography variant="subtitle1">
                  {m.dashboard_countriesSubtitle() ?? 'Countries A to Z'}
                </Typography>
              </DialogContent>
              <DialogContent className={scrollableDialogClasses.scrollArea}>
                <ResponsiveTable className={styles.table ?? ''}>
                  <TableBody>
                    {filter(countries, data?.query, {
                      key: 'country',
                    }).map((country) => {
                      const isChecked = countrySelectionMap[country.code];

                      return (
                        <TableRow
                          className={styles.clickableRow ?? ''}
                          onClick={() => handleCountryChange(country.code, !isChecked)}
                          key={country.code}
                        >
                          <TableCell className={styles.wideCell ?? ''}>{country.name}</TableCell>
                          <TableCell padding="checkbox" className={styles.checkboxCell ?? ''}>
                            <Checkbox checked={isChecked} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </ResponsiveTable>
              </DialogContent>
              <DialogActions>
                <BackButton onClick={onClose} />
                <ConfirmButton transitionState={confirmButtonState} type="submit">
                  {m.dashboard_assignCountriesButton() ?? 'Assign and save'}
                </ConfirmButton>
              </DialogActions>
            </>
          );
        }}
      </Form>
    </Dialog>
  );
};
ShippingZoneCountriesAssignDialog.displayName = 'ShippingZoneCountriesAssignDialog';
export default ShippingZoneCountriesAssignDialog;
