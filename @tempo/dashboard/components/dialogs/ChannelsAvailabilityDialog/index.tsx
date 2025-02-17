import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import type { ChannelFragment } from '@tempo/api/generated/graphql';
import { NoChannels } from './NoChannels';
import { useChannelsSearch } from './utils';
import ChannelsAvailabilityDialogChannelsList from '@tempo/dashboard/components/channels/ChannelsAvailabilityDialogChannelsList';
import ChannelsAvailabilityDialogWrapper from '@tempo/dashboard/components/channels/ChannelsAvailabilityDialogWrapper';
import ActionDialog from '@tempo/dashboard/components/dialogs/ActionDialog';

type PartialChannel = Pick<ChannelFragment, 'id' | 'name'>;

export interface ChannelsAvailabilityDialogProps<TChannel> {
  isSelected: (option: TChannel) => boolean;
  channels: TChannel[];
  confirmButtonState: ConfirmButtonTransitionState;
  contentType?: string;
  disabled?: boolean;
  open: boolean;
  onClose: () => void;
  onChange: (option: TChannel) => void;
  onConfirm: () => void;
  selected?: number;
  title: string;
  toggleAll?: (items: TChannel[], selected: number) => void;
}

export function ChannelsAvailabilityDialog<TChannel extends PartialChannel>({
  isSelected,
  channels,
  confirmButtonState,
  contentType,
  disabled,
  open,
  onClose,
  onChange,
  onConfirm,
  selected = 0,
  title,
  toggleAll,
}: ChannelsAvailabilityDialogProps<TChannel>) {
  const { query, onQueryChange, filteredChannels } = useChannelsSearch(channels);
  const hasChannels = channels?.length;

  const handleToggleAll = () => toggleAll?.(channels, selected);

  const hasAllSelected = selected === channels.length;
  return (
    <ActionDialog
      confirmButtonState={confirmButtonState}
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title={title}
      disabled={disabled}
    >
      {hasChannels ? (
        <ChannelsAvailabilityDialogWrapper
          hasAnyChannelsToDisplay={!!filteredChannels.length}
          hasAllSelected={hasAllSelected}
          query={query}
          onQueryChange={onQueryChange}
          toggleAll={handleToggleAll}
          contentType={contentType}
        >
          <ChannelsAvailabilityDialogChannelsList
            channels={filteredChannels}
            isChannelSelected={isSelected}
            onChange={onChange}
          />
        </ChannelsAvailabilityDialogWrapper>
      ) : (
        <NoChannels />
      )}
    </ActionDialog>
  );
}

export default ChannelsAvailabilityDialog;
