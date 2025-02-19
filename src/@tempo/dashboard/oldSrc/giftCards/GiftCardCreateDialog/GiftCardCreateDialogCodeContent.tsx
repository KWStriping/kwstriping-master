import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import useNotifier from '@tempo/ui/hooks/useNotifier';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import { createGiftCardMessages as messages } from './messages';
import { buttonMessages } from '@tempo/dashboard/oldSrc/intl';
import useClipboard from '@tempo/dashboard/hooks/useClipboard';
// import { useGiftCardCreateDialogCodeContentStyles as useStyles } from "./styles";

interface GiftCardCreateDialogCodeContentProps {
  cardCode: string;
  onClose: () => void;
}

const GiftCardCreateDialogCodeContent: FC<GiftCardCreateDialogCodeContentProps> = ({
  cardCode,
  onClose,
}) => {
  const notify = useNotifier();
  const [, copy] = useClipboard();

  const onCopyCode = () => {
    copy(cardCode);
    notify(
      m.dashboard_opiedToClipboardTitle({
        type: 'success',
      }) ?? messages.copiedToClipboardTitle.defaultMessage
    );
  };

  return (
    <div className={styles.content ?? ''}>
      <DialogContent>
        <Typography>
          {m.dashboard_createdGiftCardLabel() ?? messages.createdGiftCardLabel.defaultMessage}
        </Typography>
        <Typography variant="h6" color="textSecondary" data-test-id="cardCode">
          {cardCode}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCopyCode}>
          {m.dashboard_opyCodeLabel() ?? messages.copyCodeLabel.defaultMessage}
        </Button>
        <Button color="primary" onClick={onClose} data-test="submit">
          {m.dashboard_ok() ?? buttonMessages.ok.defaultMessage}
        </Button>
      </DialogActions>
    </div>
  );
};

export default GiftCardCreateDialogCodeContent;
