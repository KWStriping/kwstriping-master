import { useTranslation } from '@core/i18n';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import useNotifier, { useDefaultNotifierSuccessErrorData } from '@core/ui/hooks/useNotifier';
import { useShopSettings } from '@core/ui/hooks/useShopSettings';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { extractMutationErrors } from '@core/urql/utils';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import { assert } from 'tsafe/assert';
import ChannelDeleteDialog from '@dashboard/components/channels/ChannelDeleteDialog';
import type { FormData } from '@dashboard/components/channels/ChannelForm';
import PageHeader from '@dashboard/components/core/PageHeader';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import {
  ChannelDocument,
  ChannelDeleteDocument,
  ChannelsDocument,
  ChannelUpdateDocument,
  ChannelActivateDocument,
  ChannelDeactivateDocument,
  ChannelReorderWarehousesDocument,
} from '@core/api/graphql';
import type {
  ChannelDeleteMutation,
  ChannelErrorFragment,
  ChannelUpdateMutation,
} from '@core/api/graphql';
import { calculateItemsOrderMoves } from '@dashboard/oldSrc/channels/ChannelDetails/handlers';
import { useShippingZones } from '@dashboard/oldSrc/channels/ChannelDetails/useShippingZones';
import { useWarehouses } from '@dashboard/oldSrc/channels/ChannelDetails/useWarehouses';
import ChannelDetailsPage from '@dashboard/oldSrc/channels/pages/ChannelDetailsPage';
import type { ChannelUrlDialog, ChannelUrlQueryParams } from '@dashboard/oldSrc/channels/urls';
import { channelUrl } from '@dashboard/oldSrc/channels/urls';
import { getChannelsCurrencyChoices } from '@dashboard/oldSrc/channels/utils';
import getChannelsErrorMessage from '@dashboard/oldSrc/utils/errors/channels';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';

interface ChannelDetailsProps {
  id: string;
  params: ChannelUrlQueryParams;
}

export const ChannelDetails = () => {
  const router = useRouter();
  const { id, ...params } = router.query;
  assert(typeof id === 'string');
  const notify = useNotifier();
  const { t } = useTranslation();
  const shop = useShopSettings();

  const [channelsListData] = useQuery(ChannelsDocument, { displayLoader: true });

  const [openModal, closeModal] = useDialogActionHandlers<
    ChannelUrlDialog,
    ChannelUrlQueryParams
  >(router.push, (params) => channelUrl(id, params), params);

  const [updateChannel, updateChannelOpts] = useMutation(ChannelUpdateDocument, {
    onCompleted: ({ updateChannel: { errors } }: ChannelUpdateMutation) =>
      notify(useDefaultNotifierSuccessErrorData(errors, t)),
  });

  const [{ data, fetching: loading }] = useQuery(ChannelDocument, {
    displayLoader: true,
    variables: { id },
  });

  const handleError = (error: ChannelErrorFragment) => {
    notify(getChannelsErrorMessage(error, t), {
      type: 'error',
    });
  };

  const [activateChannel, activateChannelOpts] = useMutation(ChannelActivateDocument, {
    onCompleted: (data) => {
      const errors = data?.activateChannel?.errors;
      if (errors?.length) {
        errors?.forEach((error) => handleError(error));
      }
    },
  });

  const [deactivateChannel, deactivateChannelOpts] = useMutation(ChannelDeactivateDocument, {
    onCompleted: (data) => {
      const errors = data?.deactivateChannel?.errors;
      if (errors?.length) {
        errors?.forEach((error) => handleError(error));
      }
    },
  });

  const [reorderChannelWarehouses, reorderChannelWarehousesOpts] = useMutation(
    ChannelReorderWarehousesDocument,
    {
      onCompleted: (data) => {
        const errors = data?.reorderChannelWarehouses?.errors;
        if (errors?.length) {
          errors?.forEach((error) => handleError(error));
        }
      },
    }
  );

  const handleSubmit = async ({
    name,
    slug,
    shippingZonesIdsToRemove,
    shippingZonesIdsToAdd,
    warehousesIdsToRemove,
    warehousesIdsToAdd,
    warehousesToDisplay,
    defaultCountry,
    allocationStrategy,
  }: FormData) => {
    const updateChannelMutation = updateChannel({
      id: data?.channel?.id,
      input: {
        name,
        slug,
        defaultCountry,
        addShippingZones: shippingZonesIdsToAdd,
        removeShippingZones: shippingZonesIdsToRemove,
        addWarehouses: warehousesIdsToAdd,
        removeWarehouses: warehousesIdsToRemove,
        stockSettings: {
          allocationStrategy,
        },
      },
    });

    const result = await updateChannelMutation;
    const errors = await extractMutationErrors(updateChannelMutation);

    if (!errors?.length) {
      const moves = calculateItemsOrderMoves(
        result.data?.updateChannel.channel?.warehouses,
        warehousesToDisplay
      );

      await reorderChannelWarehouses({
        channelId: id,
        moves,
      });
    }

    return errors;
  };

  const onDeleteCompleted = (data: ChannelDeleteMutation) => {
    const errors = data?.deleteChannel?.errors;
    if (errors?.length === 0) {
      notify(t('dashboard.kyGP2', 'Channel deleted'), {
        type: 'success',
      });
      closeModal();
      void router.push('/channels');
    } else {
      for (const error of errors) {
        notify(getChannelsErrorMessage(error, t), {
          type: 'error',
        });
      }
    }
  };

  const [deleteChannel, deleteChannelOpts] = useMutation(ChannelDeleteDocument, {
    onCompleted: onDeleteCompleted,
  });

  const channelsChoices = getChannelsCurrencyChoices(
    id,
    data?.channel,
    channelsListData?.data?.channels
  );

  const handleRemoveConfirm = (channelId?: string) => {
    const data = channelId ? { id, input: { channelId } } : { id };
    deleteChannel({ ...data });
  };

  const {
    shippingZonesCountData,
    shippingZonesCountLoading,
    channelShippingZonesData,
    channelsShippingZonesLoading,
    fetchMoreShippingZones,
    searchShippingZones,
    searchShippingZonesResult,
  } = useShippingZones(id);

  const {
    warehousesCountData,
    warehousesCountLoading,
    fetchMoreWarehouses,
    searchWarehouses,
    searchWarehousesResult,
  } = useWarehouses();

  const channelWarehouses = data?.channel?.warehouses || [];
  const channelShippingZones = mapEdgesToItems(channelShippingZonesData?.shippingZones);

  return (
    <>
      <WindowTitle
        title={t(
          'dashboard.9Rg+F',
          'Channel details'
          // window title
        )}
      />
      <Container>
        <Backlink href={'/channels'}>{t('dashboard.channels', 'Channels')}</Backlink>
        <PageHeader title={data?.channel?.name} />
        <ChannelDetailsPage
          channelShippingZones={channelShippingZones}
          allShippingZonesCount={shippingZonesCountData?.shippingZones?.totalCount}
          searchShippingZones={searchShippingZones}
          searchShippingZonesData={searchShippingZonesResult.data}
          fetchMoreShippingZones={getSearchFetchMoreProps(
            searchShippingZonesResult,
            fetchMoreShippingZones
          )}
          channelWarehouses={channelWarehouses}
          allWarehousesCount={warehousesCountData?.warehouses?.totalCount}
          searchWarehouses={searchWarehouses}
          searchWarehousesData={searchWarehousesResult.data}
          fetchMoreWarehouses={getSearchFetchMoreProps(
            searchWarehousesResult,
            fetchMoreWarehouses
          )}
          channel={data?.channel}
          disabled={
            updateChannelOpts.fetching ||
            reorderChannelWarehousesOpts.fetching ||
            loading ||
            shippingZonesCountLoading ||
            warehousesCountLoading ||
            channelsShippingZonesLoading
          }
          disabledStatus={activateChannelOpts.fetching || deactivateChannelOpts.fetching}
          errors={updateChannelOpts?.data?.updateChannel?.errors || []}
          onDelete={() => openModal('remove')}
          onSubmit={handleSubmit}
          updateChannelStatus={() =>
            data?.channel?.isActive
              ? deactivateChannel({ variables: { id } })
              : activateChannel({ variables: { id } })
          }
          saveButtonBarState={updateChannelOpts.status}
          countries={shop?.countries || []}
        />
      </Container>
      <ChannelDeleteDialog
        channelsChoices={channelsChoices}
        hasOrders={data?.channel?.hasOrders}
        open={params.action === 'remove'}
        confirmButtonState={deleteChannelOpts.status}
        onBack={() => router.push('/channels')}
        onClose={closeModal}
        onConfirm={handleRemoveConfirm}
      />
    </>
  );
};
export default ChannelDetails;
