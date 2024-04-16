import { useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import type { Choices } from '@dashboard/components/fields/SingleSelectField';
import { SingleSelectField } from '@dashboard/components/fields/SingleSelectField';
import useStateFromProps from '@dashboard/hooks/useStateFromProps';
import { buttonMessages } from '@dashboard/oldSrc/intl';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

const messages = {
  deleteChannel: {
    id: 'QZoU0r',
    defaultMessage: 'Delete Channel',
    description: 'dialog header',
  },
  deletingAllProductData: {
    id: 'Mz0cx+',
    defaultMessage:
      'Deleting channel will delete all product data regarding this channel. Are you sure you want to delete this channel?',
    description: 'delete channel',
  },
  needToBeMoved: {
    id: 'sidKce',
    defaultMessage:
      'All order information from this channel need to be moved to a different channel. Please select channel orders need to be moved to:.',
    description: 'delete channel',
  },
  noAvailableChannel: {
    id: 'BXMSl4',
    defaultMessage:
      'There is no available channel to move order information to. Please create a channel with same currency so that information can be moved to it.',
    description: 'currency channel',
  },
  selectChannel: {
    id: 'SZJhvK',
    defaultMessage: 'Select Channel',
    description: 'dialog header',
  },
};

export interface ChannelDeleteDialogProps {
  channelsChoices: Choices;
  hasOrders: boolean;
  confirmButtonState: ConfirmButtonTransitionState;
  open: boolean;
  onBack: () => void;
  onClose: () => void;
  onConfirm: (targetChannelId: string) => void;
}

const ChannelDeleteDialog: FC<ChannelDeleteDialogProps> = ({
  channelsChoices = [],
  hasOrders,
  confirmButtonState,
  open,
  onBack,
  onClose,
  onConfirm,
}) => {
  const { t } = useTranslation();

  const [choice, setChoice] = useStateFromProps(
    channelsChoices.length ? channelsChoices[0].value : ''
  );
  const hasChannels = !!channelsChoices?.length;

  const canBeDeleted = hasChannels || !hasOrders;

  return (
    <ActionDialog
      confirmButtonState={confirmButtonState}
      open={open}
      onClose={onClose}
      onConfirm={() => (canBeDeleted ? onConfirm(choice) : onBack())}
      title={t('dashboard.deleteChannel', 'Delete Channel')}
      confirmButtonLabel={t(
        canBeDeleted ? buttonMessages.delete : buttonMessages.ok.id,
        canBeDeleted ? buttonMessages.delete : buttonMessages.ok.defaultMessage
      )}
      variant={canBeDeleted ? 'delete' : 'default'}
    >
      <div>
        {hasOrders ? (
          hasChannels ? (
            <>
              <Typography>
                {t(
                  'dashboard.eedToBeMoved',
                  'All order information from this channel need to be moved to a different channel. Please select channel orders need to be moved to:.'
                )}
              </Typography>
              <div className={styles.select ?? ''}>
                <SingleSelectField
                  choices={channelsChoices}
                  name="channels"
                  label={t('dashboard.selectChannel', 'Select Channel')}
                  value={choice}
                  onChange={(e) => setChoice(e.target.value)}
                />
              </div>
              <Typography>
                {t(
                  'dashboard.eletingAllProductData',
                  'Deleting channel will delete all product data regarding this channel. Are you sure you want to delete this channel?'
                )}
              </Typography>
            </>
          ) : (
            <Typography>
              {t(
                'dashboard.oAvailableChannel',
                'There is no available channel to move order information to. Please create a channel with same currency so that information can be moved to it.'
              )}
            </Typography>
          )
        ) : (
          <Typography>
            {t(
              'dashboard.eletingAllProductData',
              'Deleting channel will delete all product data regarding this channel. Are you sure you want to delete this channel?'
            )}
          </Typography>
        )}
      </div>
    </ActionDialog>
  );
};
ChannelDeleteDialog.displayName = 'ChannelDeleteDialog';
export default ChannelDeleteDialog;
