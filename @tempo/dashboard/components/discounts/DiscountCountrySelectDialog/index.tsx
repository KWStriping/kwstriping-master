import * as m from '@paraglide/messages';
import BackButton from '@tempo/ui/components/buttons/BackButton';
import ConfirmButton from '@tempo/ui/components/buttons/ConfirmButton';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import Checkbox from '@tempo/dashboard/components/core/Checkbox';
import Form from '@tempo/dashboard/components/forms/Form';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import type { CountryWithCodeFragment } from '@tempo/api/generated/graphql';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import useScrollableDialogStyle from '@tempo/dashboard/oldSrc/styles/useScrollableDialogStyle';
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
                    'dashboard_vVIV/',
                    'Assign Countries'
                    // dialog header
                  )}
                </>
              </DialogTitle>
              <DialogContent>
                <Typography>
                  <>
                    {t(
                      'dashboard_WK/Ck',
                      'Choose countries, you want voucher to be limited to, from the list below'
                    )}
                  </>
                </Typography>
                <FormSpacer />
                <TextField
                  name="query"
                  value={data?.query}
                  onChange={(event) =>
                    change(event /* TO BE CHECKED: () => fetch(data?.query) */)
                  }
                  label={
                    m.dashboard_EGagh() ?? 'Filter Countries'
                    // search box label
                  }
                  placeholder={
                    m.dashboard_GqEJ_() ?? 'Search by country name'
                    // search box placeholder
                  }
                  fullWidth
                />
                <FormSpacer />
                <Divider />
                <FormSpacer />
                <Typography variant="subtitle1">
                  <>
                    {/* country selection */}

                    {m.dashboard_gA__T() ?? 'Countries A to Z'}
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

                    {m.dashboard_ZCCqz() ?? 'Assign countries'}
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
