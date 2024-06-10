import * as m from '@paraglide/messages';
import type { FC } from 'react';
import ChannelsAvailabilityDialog from '@tempo/dashboard/components/dialogs/ChannelsAvailabilityDialog';
import type { ChannelFragment } from '@tempo/api/generated/graphql';
import useStateFromProps from '@tempo/dashboard/hooks/useStateFromProps';
import type { DialogProps } from '@tempo/dashboard/oldSrc/types';
import { arrayDiff } from '@tempo/dashboard/oldSrc/utils/arrays';
import { toggle } from '@tempo/dashboard/oldSrc/utils/lists';

import type { ProductUpdateData } from './types';

export type ProductChannelsListingDialogSubmit = (
  update: Record<'added' | 'removed', string[]>
) => void;

export interface ProductChannelsListingsDialogProps extends DialogProps {
  channels: ChannelFragment[];
  data: Pick<ProductUpdateData, 'channels'>;
  onConfirm: ProductChannelsListingDialogSubmit;
}

const ProductChannelsListingsDialog: FC<ProductChannelsListingsDialogProps> = ({
  channels,
  data,
  open,
  onClose,
  onConfirm,
}) => {
  const [selected, setSelected] = useStateFromProps(
    data?.channels?.updateChannels.map((listing) => listing.channelId)
  );

  const handleConfirm = () => {
    onConfirm(
      arrayDiff(
        data?.channels?.updateChannels.map(({ channelId }) => channelId),
        selected
      )
    );
    onClose();
  };

  const handleToggleAll = () =>
    selected.length !== channels.length
      ? setSelected(channels.map(({ id }) => id))
      : setSelected([]);

  return (
    <ChannelsAvailabilityDialog
      toggleAll={handleToggleAll}
      isSelected={({ id }) => selected.includes(id)}
      channels={channels}
      onChange={({ id }) => setSelected(toggle(id, selected, (a, b) => a === b))}
      onClose={onClose}
      open={open}
      title={m.dashboard_au_AV() ?? 'Manage Products Channel Availability'}
      confirmButtonState="default"
      selected={selected.length}
      onConfirm={handleConfirm}
    />
  );
};

ProductChannelsListingsDialog.displayName = 'ProductChannelsListingsDialog';
export default ProductChannelsListingsDialog;
