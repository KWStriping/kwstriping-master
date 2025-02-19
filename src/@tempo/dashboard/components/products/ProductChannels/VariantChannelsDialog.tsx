import type { FC } from 'react';
import { useState } from 'react';
import type { ProductChannelListing } from '../types';
import ChannelsAvailabilityDialog from '@tempo/dashboard/components/dialogs/ChannelsAvailabilityDialog';
import type { FormsetData } from '@tempo/dashboard/hooks/useFormset';
import useModalDialogOpen from '@tempo/dashboard/hooks/useModalDialogOpen';
import type {
  ChannelPriceAndPreorderData,
  IChannelPriceAndPreorderArgs,
} from '@tempo/dashboard/oldSrc/channels/utils';
import { toggle } from '@tempo/dashboard/oldSrc/utils/lists';

interface VariantChannelsDialogProps {
  channelListings: ProductChannelListing;
  selectedChannelListings?: FormsetData<
    ChannelPriceAndPreorderData,
    IChannelPriceAndPreorderArgs
  >;
  open: boolean;
  onClose: () => void;
  onConfirm: (selectedIds: string[]) => void;
}

export const VariantChannelsDialog: FC<VariantChannelsDialogProps> = ({
  channelListings,
  selectedChannelListings,
  open,
  onClose,
  onConfirm,
}) => {
  const selectedOrDefaults = selectedChannelListings ?? channelListings;
  const allChannelsIds = channelListings.map((c) => c.channel.id);
  const allChannels = channelListings.map((c) => c.channel);
  const preSelectedIds = selectedOrDefaults.map((c) => c.id);
  const [selected, setSelected] = useState(preSelectedIds);

  const isSelected = (currentItem) => selected.includes(currentItem.id);

  const handleToggleAll = () => {
    setSelected((prev) => (prev?.length ? [] : allChannelsIds));
  };

  const handleConfirm = () => {
    onConfirm(selected);
    onClose();
  };

  const handleChange = ({ id }) => {
    setSelected((state) => toggle(id, state, (aId, bId) => aId === bId));
  };

  useModalDialogOpen(open, {
    onOpen: () => {
      setSelected(preSelectedIds);
    },
  });

  return (
    <ChannelsAvailabilityDialog
      isSelected={isSelected}
      channels={allChannels}
      onChange={handleChange}
      onClose={onClose}
      open={open}
      title="Manage Products Channel Availability"
      confirmButtonState="default"
      selected={selected.length}
      onConfirm={handleConfirm}
      toggleAll={handleToggleAll}
    />
  );
};
