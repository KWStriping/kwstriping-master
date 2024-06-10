import { useTranslation } from '@core/i18n';
import BackButton from '@core/ui/components/buttons/BackButton';
import ConfirmButton from '@core/ui/components/buttons/ConfirmButton';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import Checkbox from '@dashboard/components/core/Checkbox';
import Form from '@dashboard/components/forms/Form';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import type { CountryWithCodeFragment } from '@core/api/graphql';
import type { SubmitPromise } from '@dashboard/hooks/useForm';
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

interface FormData {
  allCountries: boolean;
  countries: string[];
  query: string;
}

export interface DiscountCountrySelectDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  countries: CountryWithCodeFragment[];
  initial: string[];
  open: boolean;
  onClose: () => void;
  onConfirm: (data: FormData) => SubmitPromise;
}

const DiscountCountrySelectDialog: FC<DiscountCountrySelectDialogProps> = (props) => {
  const { confirmButtonState, onClose, countries, open, initial, onConfirm } = props;
  const styles = useStyles(props);
  const scrollableDialogClasses = useScrollableDialogStyle();

  const { t } = useTranslation();

  const initialForm: FormData = {
    allCountries: true,
    countries: initial,
    query: '',
  };
  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <Form initial={initialForm} onSubmit={onConfirm} className={scrollableDialogClasses.form}>
        {({ data, change }) => {
          const countrySelectionMap = countries.reduce((acc, country) => {
            acc[country.code] = !!data?.countries?.find(
              (selectedCountries) => selectedCountries === country.code
            );
            return acc;
          }, {});

          return (
            <>
              <DialogTitle>
                <>
                  {t(
                    'dashboard.vVIV/',
                    'Assign Countries'
                    // dialog header
                  )}
                </>
              </DialogTitle>
              <DialogContent>
                <Typography>
                  <>
                    {t(
                      'dashboard.WK/Ck',
                      'Choose countries, you want voucher to be limited to, from the list below'
                    )}
                  </>
                </Typography>
                <FormSpacer />
                <TextField
                  name="query"
                  value={data?.query}
                  onChange={(event) => change(event /* TO BE CHECKED: () => fetch(data?.query) */)}
                  label={t(
                    'dashboard.EGagh',
                    'Filter Countries'
                    // search box label
                  )}
                  placeholder={t(
                    'dashboard.GqEJ9',
                    'Search by country name'
                    // search box placeholder
                  )}
                  fullWidth
                />
                <FormSpacer />
                <Divider />
                <FormSpacer />
                <Typography variant="subtitle1">
                  <>
                    {/* country selection */}

                    {t('dashboard.gA48T', 'Countries A to Z')}
                  </>
                </Typography>
              </DialogContent>
              <DialogContent className={scrollableDialogClasses.scrollArea}>
                <ResponsiveTable>
                  <TableBody>
                    {filter(countries, data?.query, {
                      key: 'country',
                    }).map((country) => {
                      const isChecked = countrySelectionMap[country.code];

                      return (
                        <TableRow key={country.code}>
                          <TableCell className={styles.wideCell ?? ''}>{country.name}</TableCell>
                          <TableCell padding="checkbox" className={styles.checkboxCell ?? ''}>
                            <Checkbox
                              checked={isChecked}
                              onChange={() =>
                                isChecked
                                  ? change({
                                      target: {
                                        name: 'countries' as keyof FormData,
                                        value: data?.countries?.filter(
                                          (selectedCountries) =>
                                            selectedCountries !== country.code
                                        ),
                                      },
                                    } as unknown)
                                  : change({
                                      target: {
                                        name: 'countries' as keyof FormData,
                                        value: [...data?.countries, country.code],
                                      },
                                    } as unknown)
                              }
                            />
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
                  <>
                    {/* button */}

                    {t('dashboard.ZCCqz', 'Assign countries')}
                  </>
                </ConfirmButton>
              </DialogActions>
            </>
          );
        }}
      </Form>
    </Dialog>
  );
};
DiscountCountrySelectDialog.displayName = 'DiscountCountrySelectDialog';
export default DiscountCountrySelectDialog;
