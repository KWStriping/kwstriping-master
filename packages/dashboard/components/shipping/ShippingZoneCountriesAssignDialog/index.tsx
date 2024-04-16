import { useTranslation } from '@core/i18n';
import BackButton from '@core/ui/components/buttons/BackButton';
import ConfirmButton from '@core/ui/components/buttons/ConfirmButton';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import Checkbox from '@dashboard/components/core/Checkbox';
import Form from '@dashboard/components/forms/Form';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import type { CountryWithCodeFragment } from '@core/api/graphql';
import {
  getCountrySelectionMap,
  isRestWorldCountriesSelected,
} from '@dashboard/oldSrc/shipping/handlers';
import useScrollableDialogStyle from '@dashboard/oldSrc/styles/useScrollableDialogStyle';
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
  const { t } = useTranslation();

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
              <DialogTitle>{t('dashboard.assignCountriesTitle', 'Assign Countries')}</DialogTitle>
              <DialogContent>
                <Typography>
                  {t(
                    'dashboard.assignCountriesDescription',
                    'Choose countries you want to add to shipping zone from list below'
                  )}
                </Typography>
                <FormSpacer />
                <TextField
                  name="query"
                  value={data?.query}
                  onChange={(event) => change(event)}
                  label={t('dashboard.searchCountriesLabel', 'Search Countries')}
                  placeholder={t(
                    'dashboard.searchCountriesPlaceholder',
                    'Search by country name'
                  )}
                  fullWidth
                />
                <FormSpacer />
                <Divider />
                <FormSpacer />
                {!!restWorldCountries?.length && (
                  <>
                    <Typography variant="subtitle1">
                      {t('dashboard.uickPickSubtitle', 'Quick Pick')}
                    </Typography>
                    <FormSpacer />
                    <ResponsiveTable className={styles.table ?? ''}>
                      <TableBody>
                        <TableRow
                          className={styles.clickableRow ?? ''}
                          onClick={() => handleRestOfTheWorldChange(!isRestOfTheWorldSelected)}
                        >
                          <TableCell className={styles.wideCell ?? ''}>
                            {t('dashboard.estOfTheWorldCheckbox', 'Rest of the World')}
                            <Typography variant="caption">
                              {t(
                                'dashboard.estOfTheWorldCheckboxDescription',
                                'If selected, this will add all of the countries not selected to other shipping zones'
                              )}
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
                  {t('dashboard.countriesSubtitle', 'Countries A to Z')}
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
                  {t('dashboard.assignCountriesButton', 'Assign and save')}
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
