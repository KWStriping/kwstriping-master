import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useRouter } from 'next/router';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import ChannelsAvailabilityDialog from '@dashboard/components/dialogs/ChannelsAvailabilityDialog';
import SaleCreatePage from '@dashboard/components/discounts/SaleCreatePage';
import type { ChannelSaleFormData } from '@dashboard/components/discounts/SaleDetailsPage';
import useAppChannel from '@dashboard/components/layout/Layout/AppChannelContext';
import { SaleCreateDocument } from '@core/api/graphql';

import useChannels from '@dashboard/hooks/useChannels';
import type { ChannelsAction } from '@dashboard/oldSrc/channels/urls';
import { createSortedSaleData } from '@dashboard/oldSrc/channels/utils';
import { SALE_CREATE_FORM_ID } from '@dashboard/oldSrc/discounts/SaleCreate/consts';
import { createHandler } from '@dashboard/oldSrc/discounts/SaleCreate/handlers';
import type { SaleCreateUrlQueryParams } from '@dashboard/oldSrc/discounts/urls';
import { saleAddUrl, saleUrl } from '@dashboard/oldSrc/discounts/urls';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import createMetadataCreateHandler from '@dashboard/oldSrc/utils/handlers/metadataCreateHandler';

interface SaleCreateViewProps {
  params: SaleCreateUrlQueryParams;
}

export const SaleCreateView = () => {
  const router = useRouter();
  const params = router.query;
  const pushMessage = useNotifier();
  const { t } = useTranslation();

  const [updateMetadata] = useMutation(UpdateMetadataDocument, {});
  const [updatePrivateMetadata] = useMutation(UpdatePrivateMetadataDocument, {});
  const [openModal, closeModal] = useDialogActionHandlers<
    ChannelsAction,
    SaleCreateUrlQueryParams
  >(router.push, (params) => saleAddUrl(params), params);

  const { availableChannels } = useAppChannel(false);
  const allChannels: ChannelSaleFormData[] = createSortedSaleData(availableChannels);

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
    { formId: SALE_CREATE_FORM_ID }
  );

  const [updateChannels, updateChannelsOpts] = useMutation(SaleChannelListingUpdateDocument, {});

  const [createSale, saleCreateOpts] = useMutation(SaleCreateDocument, {
    onCompleted: (data) => {
      if (data?.createSale?.errors?.length === 0) {
        pushMessage({
          type: 'success',
          text: t('dashboard.7Fg8i', 'Successfully created sale'),
        });
        void router.replace(saleUrl(data?.createSale?.sale?.id));
      }
    },
  });

  const handleCreate = createHandler((variables) => createSale({ variables }), updateChannels);
  const handleSubmit = createMetadataCreateHandler(
    handleCreate,
    updateMetadata,
    updatePrivateMetadata
  );

  return (
    <>
      <WindowTitle title={t('dashboard.sales', 'Sales')} />
      {!!allChannels?.length && (
        <ChannelsAvailabilityDialog
          isSelected={isChannelSelected}
          disabled={!channelListElements.length}
          channels={allChannels}
          onChange={channelsToggle}
          onClose={handleChannelsModalClose}
          open={isChannelsModalOpen}
          title={t('dashboard.SDTC/', 'Manage Sales Channel Availability')}
          confirmButtonState="default"
          selected={channelListElements.length}
          onConfirm={handleChannelsConfirm}
          toggleAll={toggleAllChannels}
        />
      )}
      <SaleCreatePage
        allChannelsCount={allChannels?.length}
        channelListings={currentChannels}
        disabled={saleCreateOpts.fetching || updateChannelsOpts.fetching}
        errors={[
          ...(saleCreateOpts.data?.createSale?.errors || []),
          ...(updateChannelsOpts.data?.updateSaleChannelListing?.errors || []),
        ]}
        onBack={() => router.push('/discounts/sales')}
        onSubmit={handleSubmit}
        saveButtonBarState={saleCreateOpts.status}
        openChannelsModal={handleChannelsModalOpen}
        onChannelsChange={setCurrentChannels}
      />
    </>
  );
};
export default SaleCreateView;
