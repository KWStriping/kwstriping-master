import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import useNotifier from '@core/ui/hooks/useNotifier';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import { createGiftCardMessages as messages } from './messages';
import { buttonMessages } from '@dashboard/oldSrc/intl';
import useClipboard from '@dashboard/hooks/useClipboard';
// import { useGiftCardCreateDialogCodeContentStyles as useStyles } from "./styles";

interface GiftCardCreateDialogCodeContentProps {
  cardCode: string;
  onClose: () => void;
}

const GiftCardCreateDialogCodeContent: FC<GiftCardCreateDialogCodeContentProps> = ({
  cardCode,
  onClose,
}) => {
  const { t } = useTranslation();
  const notify = useNotifier();
  const [, copy] = useClipboard();

  const onCopyCode = () => {
    copy(cardCode);
    notify(t('dashboard.opiedToClipboardTitle', messages.copiedToClipboardTitle.defaultMessage), {
      type: 'success',
    });
  };

  return (
    <div className={styles.content ?? ''}>
      <DialogContent>
        <Typography>
          {t('dashboard.createdGiftCardLabel', messages.createdGiftCardLabel.defaultMessage)}
        </Typography>
        <Typography variant="h6" color="textSecondary" data-test-id="cardCode">
          {cardCode}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCopyCode}>
          {t('dashboard.opyCodeLabel', messages.copyCodeLabel.defaultMessage)}
        </Button>
        <Button color="primary" onClick={onClose} data-test="submit">
          {t('dashboard.ok', buttonMessages.ok.defaultMessage)}
        </Button>
      </DialogActions>
    </div>
  );
};

export default GiftCardCreateDialogCodeContent;
