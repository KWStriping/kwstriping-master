import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { useState } from 'react';

import GiftCardExportDialogContent from '../GiftCardExportDialogContent';
import { createGiftCardMessages as messages } from './messages';
import type { DialogProps } from '@tempo/dashboard/oldSrc/types';

interface GiftCardBulkCreateSuccessDialogProps extends DialogProps {
  idsToExport: string[] | null;
}

const GiftCardBulkCreateSuccessDialog: FC<GiftCardBulkCreateSuccessDialogProps> = ({
  open,
  onClose,
  idsToExport,
}) => {
  const [openEmailExport, setOpenEmailExport] = useState(false);

  const onExportDialogClose = () => {
    setOpenEmailExport(false);
    onClose();
  };

  return (
    <>
      <Dialog open={open} maxWidth="sm">
        <DialogTitle>
          {m.dashboard_ulkCreateIssuedTitle() ?? messages.bulkCreateIssuedTitle.defaultMessage}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {m.dashboard_ulkCreateIssuedExplanation() ??
              messages.bulkCreateIssuedExplanation.defaultMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={() => setOpenEmailExport(true)}>
            {m.dashboard_ulkCreateIssuedExportToEmail() ??
              messages.bulkCreateIssuedExportToEmail.defaultMessage}
          </Button>
          <Button color="primary" onClick={onClose}>
            {m.dashboard_ulkCreateIssuedAccept() ??
              messages.bulkCreateIssuedAccept.defaultMessage}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEmailExport} maxWidth="sm">
        <GiftCardExportDialogContent idsToExport={idsToExport} onClose={onExportDialogClose} />
      </Dialog>
    </>
  );
};

export default GiftCardBulkCreateSuccessDialog;
