import { useTranslation } from '@core/i18n';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import useNotifier, { useDefaultNotifierSuccessErrorData } from '@core/ui/hooks/useNotifier';
import { useShopSettings } from '@core/ui/hooks/useShopSettings';
import { useMutation } from '@core/urql/hooks/useMutation';
import { extractMutationErrors } from '@core/urql/utils';
import Container from '@mui/material/Container';
import currencyCodes from 'currency-codes';
import { useRouter } from 'next/router';
import type { FormData } from '@dashboard/components/channels/ChannelForm';
import PageHeader from '@dashboard/components/core/PageHeader';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import {
  ChannelCreateDocument,
  ChannelReorderWarehousesDocument,
} from '@core/api/graphql';

import type { ChannelCreateMutation, ChannelErrorFragment } from '@core/api/graphql';
import { calculateItemsOrderMoves } from '@dashboard/oldSrc/channels/ChannelDetails/handlers';
import { useShippingZones } from '@dashboard/oldSrc/channels/ChannelDetails/useShippingZones';
import { useWarehouses } from '@dashboard/oldSrc/channels/ChannelDetails/useWarehouses';
import ChannelDetailsPage from '@dashboard/oldSrc/channels/pages/ChannelDetailsPage';
import { channelPath } from '@dashboard/oldSrc/channels/urls';
import getChannelsErrorMessage from '@dashboard/oldSrc/utils/errors/channels';

export const ChannelCreateView = () => {
  const router = useRouter();
  const notify = useNotifier();
  const { t } = useTranslation();
  const shop = useShopSettings();
  const getErrorMessage = useDefaultNotifierSuccessErrorData();
  const handleError = (error: ChannelErrorFragment) => {
    notify(getChannelsErrorMessage(error, t), {
      type: 'error',
    });
  };

  const [createChannel, createChannelOpts] = useMutation(ChannelCreateDocument, {
    onCompleted: ({ createChannel: { errors } }: ChannelCreateMutation) => {
      notify(useDefaultNotifierSuccessErrorData(errors, t));
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

        void router.push(channelPath(data?.reorderChannelWarehouses?.channel?.id));
      },
    }
  );

  const handleSubmit = async ({
    shippingZonesIdsToAdd,
    warehousesIdsToAdd,
    warehousesToDisplay,
    currencyCode,
    allocationStrategy,
    name,
    slug,
    defaultCountry,
  }: FormData) => {
    const createChannelMutation = createChannel({
      input: {
        defaultCountry,
        name,
        slug,
        currencyCode: currencyCode.toUpperCase(),
        addShippingZones: shippingZonesIdsToAdd,
        addWarehouses: warehousesIdsToAdd,
        stockSettings: {
          allocationStrategy,
        },
      },
    });

    const result = await createChannelMutation;
    const errors = await extractMutationErrors(createChannelMutation);

    if (!errors?.length) {
      const moves = calculateItemsOrderMoves(
        result.data?.createChannel.channel?.warehouses,
        warehousesToDisplay
      );

      await reorderChannelWarehouses({
        channelId: result.data?.createChannel.channel?.id,
        moves,
      });
    }

    return errors;
  };

  const {
    shippingZonesCountData,
    shippingZonesCountLoading,
    fetchMoreShippingZones,
    searchShippingZones,
    searchShippingZonesResult,
  } = useShippingZones();

  const {
    warehousesCountData,
    warehousesCountLoading,
    fetchMoreWarehouses,
    searchWarehouses,
    searchWarehousesResult,
  } = useWarehouses();

  const currencyCodeChoices = currencyCodes.data?.map((currencyData) => ({
    label: t('dashboard.7mFhU', '{{code} - {{countries}', {
      code: currencyData.code,
      countries: currencyData.countries.join(','),
    }),
    value: currencyData.code,
  }));

  return (
    <>
      <WindowTitle
        title={t(
          'dashboard.rMr/k',
          'Create Channel'
          // window title
        )}
      />
      <Container>
        <Backlink href={'/channels'}>{t('dashboard.channels', 'Channels')}</Backlink>
        <PageHeader
          title={t(
            'dashboard.nghuS',
            'New Channel'
            // channel create
          )}
        />
        <ChannelDetailsPage
          allShippingZonesCount={shippingZonesCountData?.shippingZones?.totalCount}
          searchShippingZones={searchShippingZones}
          searchShippingZonesData={searchShippingZonesResult.data}
          fetchMoreShippingZones={getSearchFetchMoreProps(
            searchShippingZonesResult,
            fetchMoreShippingZones
          )}
          allWarehousesCount={warehousesCountData?.warehouses?.totalCount}
          searchWarehouses={searchWarehouses}
          searchWarehousesData={searchWarehousesResult.data}
          fetchMoreWarehouses={getSearchFetchMoreProps(
            searchWarehousesResult,
            fetchMoreWarehouses
          )}
          disabled={
            createChannelOpts.fetching ||
            reorderChannelWarehousesOpts.fetching ||
            shippingZonesCountLoading ||
            warehousesCountLoading
          }
          errors={createChannelOpts?.data?.createChannel?.errors || []}
          currencyCodes={currencyCodeChoices}
          onSubmit={handleSubmit}
          saveButtonBarState={createChannelOpts.status}
          countries={shop?.countries || []}
        />
      </Container>
    </>
  );
};

export default ChannelCreateView;
