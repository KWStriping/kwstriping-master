import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { useState } from 'react';

import GiftCardExportDialogContent from '../GiftCardExportDialogContent';
import { createGiftCardMessages as messages } from './messages';
import type { DialogProps } from '@dashboard/oldSrc/types';

interface GiftCardBulkCreateSuccessDialogProps extends DialogProps {
  idsToExport: string[] | null;
}

const GiftCardBulkCreateSuccessDialog: FC<GiftCardBulkCreateSuccessDialogProps> = ({
  open,
  onClose,
  idsToExport,
}) => {
  const { t } = useTranslation();
  const [openEmailExport, setOpenEmailExport] = useState(false);

  const onExportDialogClose = () => {
    setOpenEmailExport(false);
    onClose();
  };

  return (
    <>
      <Dialog open={open} maxWidth="sm">
        <DialogTitle>
          {t('dashboard.ulkCreateIssuedTitle', messages.bulkCreateIssuedTitle.defaultMessage)}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {t(
              'dashboard.ulkCreateIssuedExplanation',
              messages.bulkCreateIssuedExplanation.defaultMessage
            )}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={() => setOpenEmailExport(true)}>
            {t(
              'dashboard.ulkCreateIssuedExportToEmail',
              messages.bulkCreateIssuedExportToEmail.defaultMessage
            )}
          </Button>
          <Button color="primary" onClick={onClose}>
            {t('dashboard.ulkCreateIssuedAccept', messages.bulkCreateIssuedAccept.defaultMessage)}
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
