import { useTranslation } from '@core/i18n';
import BackButton from '@core/ui/components/buttons/BackButton';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import ConfirmButton from '@core/ui/components/buttons/ConfirmButton';
import { makeStyles } from '@core/ui/theme/styles';
import Grid from '@core/ui/components/Grid';
import Form from '@dashboard/components/forms/Form';
import type { DialogProps, MinMax } from '@dashboard/oldSrc/types';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

export interface ShippingZonePostalCodeRangeDialogProps extends DialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  onSubmit: (range: MinMax) => void;
}

const useStyles = makeStyles(
  (theme) => ({
    info: {
      marginBottom: theme.spacing(2),
    },
  }),
  {
    name: 'ShippingZonePostalCodeRangeDialog',
  }
);

const ShippingZonePostalCodeRangeDialog: FC<ShippingZonePostalCodeRangeDialogProps> = ({
  confirmButtonState,
  open,
  onClose,
  onSubmit,
}) => {
  const { t } = useTranslation();
  // const styles = useStyles();
  const styles = {};

  const initial: MinMax = {
    max: '',
    min: '',
  };

  return (
    <Dialog open={open}>
      <DialogTitle>{t('dashboard.addPostalCodesDialogHeader', 'Add postal codes')}</DialogTitle>
      <Form initial={initial} onSubmit={onSubmit}>
        {({ change, data }) => (
          <>
            <DialogContent>
              <Typography className={styles.info ?? ''}>
                <>
                  {t(
                    'dashboard.InCjD',
                    'Please provide range of postal codes you want to add to the include/exclude list.'
                  )}
                </>
              </Typography>
              <Grid variant="uniform">
                <TextField
                  label={t(
                    'dashboard.T1fP8',
                    'Postal codes (start)'
                    // range input label
                  )}
                  name="min"
                  value={data?.min}
                  onChange={change}
                />
                <TextField
                  label={t(
                    'dashboard.xFFaD',
                    'Postal codes (end)'
                    // range input label
                  )}
                  name="max"
                  helperText={t('dashboard.optionalField', 'Optional')}
                  value={data?.max}
                  onChange={change}
                />
              </Grid>
            </DialogContent>
            <DialogActions>
              <BackButton onClick={onClose} />
              <ConfirmButton
                disabled={!data?.min}
                transitionState={confirmButtonState}
                type="submit"
                data-test-id="submit"
              >
                {t(
                  'dashboard.M/Ha1',
                  'Add'
                  // add postal code range, button
                )}
              </ConfirmButton>
            </DialogActions>
          </>
        )}
      </Form>
    </Dialog>
  );
};

ShippingZonePostalCodeRangeDialog.displayName = 'ShippingZonePostalCodeRangeDialog';
export default ShippingZonePostalCodeRangeDialog;
