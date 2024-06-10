import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useQuery } from '@core/urql/hooks';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useRouter } from 'next/router';
import ChannelDeleteDialog from '@dashboard/components/channels/ChannelDeleteDialog';
import { useShopLimitsQuery } from '@dashboard/components/core/Shop/queries';
import { ChannelDeleteDocument, ChannelsDocument } from '@core/api/graphql';
import type { ChannelDeleteMutation } from '@core/api/graphql';
import ChannelsListPage from '@dashboard/oldSrc/channels/pages/ChannelsListPage';
import type {
  ChannelsListUrlDialog,
  ChannelsListUrlQueryParams,
} from '@dashboard/oldSrc/channels/urls';
import { channelsListUrl } from '@dashboard/oldSrc/channels/urls';
import { getChannelsCurrencyChoices } from '@dashboard/oldSrc/channels/utils';
import getChannelsErrorMessage from '@dashboard/oldSrc/utils/errors/channels';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';

interface ChannelsListProps {
  params: ChannelsListUrlQueryParams;
}

export const ChannelsList = () => {
  const router = useRouter();
  const params = router.query;
  const notify = useNotifier();
  const { t } = useTranslation();

  const [{ data }, refetch] = useQuery(ChannelsDocument, { displayLoader: true });
  const limitOpts = useShopLimitsQuery({
    variables: {
      channels: true,
    },
  });

  const selectedChannel = data?.channels?.find((channel) => channel.id === params?.id);

  const [openModal, closeModal] = useDialogActionHandlers<
    ChannelsListUrlDialog,
    ChannelsListUrlQueryParams
  >(router.push, channelsListUrl, params);

  const onCompleted = (data: ChannelDeleteMutation) => {
    const errors = data?.deleteChannel?.errors;
    if (errors?.length === 0) {
      notify(t('dashboard.kyGP2', 'Channel deleted'), {
        type: 'success',
      });
      refetch();
      limitOpts.refetch();
      closeModal();
    } else {
      for (const error of errors) {
        notify(getChannelsErrorMessage(error, t), {
          type: 'error',
        });
      }
    }
  };

  const [deleteChannel, deleteChannelOpts] = useMutation(ChannelDeleteDocument, {
    onCompleted,
  });

  const channelsChoices = getChannelsCurrencyChoices(params.id, selectedChannel, data?.channels);

  const handleRemoveConfirm = (channelId?: string) => {
    const inputVariables = channelId ? { input: { channelId } } : {};

    deleteChannel({
      variables: {
        id: params.id,
        ...inputVariables,
      },
    });
  };

  return (
    <>
      <ChannelsListPage
        channelsList={data?.channels}
        limits={limitOpts.data?.shop.limits}
        onRemove={(id) =>
          openModal('remove', {
            id,
          })
        }
      />

      {!!selectedChannel && (
        <ChannelDeleteDialog
          channelsChoices={channelsChoices}
          hasOrders={selectedChannel.hasOrders}
          open={params.action === 'remove'}
          confirmButtonState={deleteChannelOpts.status}
          onBack={() => router.push('/channels')}
          onClose={closeModal}
          onConfirm={handleRemoveConfirm}
        />
      )}
    </>
  );
};

export default ChannelsList;
