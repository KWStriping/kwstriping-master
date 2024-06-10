import * as m from '@paraglide/messages';
import BackButton from '@tempo/ui/components/buttons/BackButton';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import ConfirmButton from '@tempo/ui/components/buttons/ConfirmButton';
import { makeStyles } from '@tempo/ui/theme/styles';
import Grid from '@tempo/ui/components/Grid';
import Form from '@tempo/dashboard/components/forms/Form';
import type { DialogProps, MinMax } from '@tempo/dashboard/oldSrc/types';
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
  // const styles = useStyles();
  const styles = {};

  const initial: MinMax = {
    max: '',
    min: '',
  };

  return (
    <Dialog open={open}>
      <DialogTitle>{m.dashboard_addPostalCodesDialogHeader() ?? 'Add postal codes'}</DialogTitle>
      <Form initial={initial} onSubmit={onSubmit}>
        {({ change, data }) => (
          <>
            <DialogContent>
              <Typography className={styles.info ?? ''}>
                <>
                  {m.dashboard_InCjD() ??
                    'Please provide range of postal codes you want to add to the include/exclude list.'}
                </>
              </Typography>
              <Grid variant="uniform">
                <TextField
                  label={
                    m.dashboard_T_fP_() ?? 'Postal codes (start)'
                    // range input label
                  }
                  name="min"
                  value={data?.min}
                  onChange={change}
                />
                <TextField
                  label={
                    m.dashboard_xFFaD() ?? 'Postal codes (end)'
                    // range input label
                  }
                  name="max"
                  helperText={m.dashboard_optionalField() ?? 'Optional'}
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
                  'dashboard_M/Ha1',
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
