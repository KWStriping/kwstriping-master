import * as m from '@paraglide/messages';
import { DialogHeader } from '@tempo/ui/components/dialog/DialogHeader';
import { Button, Dialog } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import type { FC } from 'react';
import styles from './index.module.css';

interface ExitFormDialogProps {
  onClose: () => void;
  onLeave: () => void;
  isOpen: boolean;
}

const ExitFormDialog: FC<ExitFormDialogProps> = ({ onLeave, onClose, isOpen }) => {
  return (
    <Dialog className={styles.container ?? ''} open={isOpen} onClose={onClose}>
      <DialogHeader onClose={onClose}>
        {m.dashboard_enableToSaveTitle() ?? 'Leave without saving changes?'}
      </DialogHeader>
      <DialogContent className={styles.dialogContent ?? ''}>
        <div className={styles.buttonsContainer ?? ''}>
          <Button onClick={onClose} data-test-id="keep-editing">
            {m.dashboard_eepEditing() ?? 'Keep editing'}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onLeave}
            data-test-id="ignore-changes"
          >
            {m.dashboard_gnoreChanges() ?? 'Ignore changes'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitFormDialog;
