import { useTranslation } from '@core/i18n';
import type { FC } from 'react';
import ChannelsAvailabilityDialog from '@dashboard/components/dialogs/ChannelsAvailabilityDialog';
import type { ChannelFragment } from '@core/api/graphql';
import useStateFromProps from '@dashboard/hooks/useStateFromProps';
import type { DialogProps } from '@dashboard/oldSrc/types';
import { arrayDiff } from '@dashboard/oldSrc/utils/arrays';
import { toggle } from '@dashboard/oldSrc/utils/lists';

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
  const { t } = useTranslation();

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
      title={t('dashboard.au5AV', 'Manage Products Channel Availability')}
      confirmButtonState="default"
      selected={selected.length}
      onConfirm={handleConfirm}
    />
  );
};

ProductChannelsListingsDialog.displayName = 'ProductChannelsListingsDialog';
export default ProductChannelsListingsDialog;
