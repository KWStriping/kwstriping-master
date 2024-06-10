import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useRouter } from 'next/router';
import { assert } from 'tsafe/assert';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import ChannelsAvailabilityDialog from '@dashboard/components/dialogs/ChannelsAvailabilityDialog';
import VoucherCreatePage from '@dashboard/components/discounts/VoucherCreatePage';
import useAppChannel from '@dashboard/components/layout/Layout/AppChannelContext';
import {
  UpdateMetadataDocument,
  UpdatePrivateMetadataDocument,
  VoucherChannelListingUpdateDocument,
  VoucherCreateDocument,
} from '@core/api/graphql';

import useChannels from '@dashboard/hooks/useChannels';
import type { ChannelsAction } from '@dashboard/oldSrc/channels/urls';
import { createSortedVoucherData } from '@dashboard/oldSrc/channels/utils';
import type { VoucherCreateUrlQueryParams } from '@dashboard/oldSrc/discounts/urls';
import { voucherAddUrl, voucherUrl } from '@dashboard/oldSrc/discounts/urls';
import { createHandler } from '@dashboard/oldSrc/discounts/VoucherCreate/handlers';
import { VOUCHER_CREATE_FORM_ID } from '@dashboard/oldSrc/discounts/VoucherCreate/types';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import createMetadataCreateHandler from '@dashboard/oldSrc/utils/handlers/metadataCreateHandler';

export const VoucherCreateView = () => {
  const router = useRouter();
  const params = router.query;
  const notify = useNotifier();
  const { t } = useTranslation();

  const [updateMetadata] = useMutation(UpdateMetadataDocument, {});
  const [updatePrivateMetadata] = useMutation(UpdatePrivateMetadataDocument, {});
  const [openModal, closeModal] = useDialogActionHandlers<
    ChannelsAction,
    VoucherCreateUrlQueryParams
  >((newParams) => voucherAddUrl({ ...params, ...newParams }));

  const { availableChannels } = useAppChannel(false);
  const allChannels = createSortedVoucherData(availableChannels) ?? [];

  const {
    channelListElements,
    channelsToggle,
    currentChannels,
    handleChannelsConfirm,
    handleChannelsModalClose,
    handleChannelsModalOpen,
    isChannelSelected,
    isChannelsModalOpen,
    setCurrentChannels,
    toggleAllChannels,
  } = useChannels(
    allChannels,
    params?.action,
    { closeModal, openModal },
    { formId: VOUCHER_CREATE_FORM_ID }
  );

  const [updateChannels, updateChannelsOpts] = useMutation(
    VoucherChannelListingUpdateDocument,
    {}
  );

  const [createVoucher, createVoucherOpts] = useMutation(VoucherCreateDocument, {
    onCompleted: (data) => {
      if (data?.createVoucher?.errors?.length === 0) {
        assert(!!data?.createVoucher?.voucher?.id);
        notify(t('dashboard.8mpW3', 'Successfully created voucher'), {
          type: 'success',
        });
        void router.replace(voucherUrl(data?.createVoucher?.voucher?.id));
      }
    },
  });

  const handleCreate = createHandler(
    (variables) => createVoucher({ ...variables }),
    updateChannels
  );
  const handleSubmit = createMetadataCreateHandler(
    handleCreate,
    updateMetadata,
    updatePrivateMetadata
  );

  return (
    <>
      <WindowTitle title={t('dashboard.vouchers', 'Vouchers')} />
      {!!allChannels?.length && (
        <ChannelsAvailabilityDialog
          isSelected={isChannelSelected}
          disabled={!channelListElements.length}
          channels={allChannels}
          onChange={channelsToggle}
          onClose={handleChannelsModalClose}
          open={isChannelsModalOpen}
          title={t('dashboard.au5AV', 'Manage Products Channel Availability')}
          confirmButtonState="default"
          selected={channelListElements.length}
          onConfirm={handleChannelsConfirm}
          toggleAll={toggleAllChannels}
        />
      )}
      <VoucherCreatePage
        allChannelsCount={allChannels?.length}
        channelListings={currentChannels}
        disabled={createVoucherOpts.fetching || updateChannelsOpts.fetching}
        errors={[
          ...(createVoucherOpts.data?.createVoucher?.errors || []),
          ...(updateChannelsOpts.data?.updateVoucherChannelListing?.errors || []),
        ]}
        onSubmit={handleSubmit}
        saveButtonBarState={createVoucherOpts.status}
        openChannelsModal={handleChannelsModalOpen}
        onChannelsChange={setCurrentChannels}
      />
    </>
  );
};
export default VoucherCreateView;
