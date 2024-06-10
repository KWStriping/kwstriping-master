import { Trans, useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useShopSettings } from '@core/ui/hooks/useShopSettings';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import { useSearch } from '@core/urql/hooks';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { extractMutationErrors } from '@core/urql/utils';
import { getById } from '@core/utils';
import DialogContentText from '@mui/material/DialogContentText';
import Skeleton from '@mui/material/Skeleton';
import { diff } from 'fast-array-diff';
import { useRouter } from 'next/router';
import { assert } from 'tsafe/assert';
import NotFoundPage from '@dashboard/components/core/NotFoundPage';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import useAppChannel from '@dashboard/components/layout/Layout/AppChannelContext';
import DeleteShippingRateDialog from '@dashboard/components/shipping/DeleteShippingRateDialog';
import ShippingZoneAddWarehouseDialog from '@dashboard/components/shipping/ShippingZoneAddWarehouseDialog';
import ShippingZoneCountriesAssignDialog from '@dashboard/components/shipping/ShippingZoneCountriesAssignDialog';
import ShippingZoneDetailsPage from '@dashboard/components/shipping/ShippingZoneDetailsPage';
import type { ShippingZoneUpdateFormData } from '@dashboard/components/shipping/ShippingZoneDetailsPage/types';
import type { ShippingZoneUpdateInput } from '@core/api/graphql';
import {
  SearchWarehousesDocument,
  DeleteShippingRateDocument,
  DeleteShippingZoneDocument,
  UpdateMetadataDocument,
  UpdateShippingZoneDocument,
  WarehouseCreateDocument,
  ShopCountriesDocument,
  UpdatePrivateMetadataDocument,
  ShippingZoneDocument,
} from '@core/api/graphql';
import { useLocalPaginationState } from '@dashboard/hooks/useLocalPaginator';
import { DEFAULT_INITIAL_SEARCH_DATA, PAGINATE_BY } from '@dashboard/oldSrc/config';
import { getStringOrPlaceholder } from '@dashboard/oldSrc/misc';
import type {
  ShippingZoneUrlDialog,
  ShippingZoneUrlQueryParams,
} from '@dashboard/oldSrc/shipping/urls';
import { shippingRateEditUrl, shippingZoneUrl } from '@dashboard/oldSrc/shipping/urls';
import { arrayDiff } from '@dashboard/oldSrc/utils/arrays';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import createMetadataUpdateHandler from '@dashboard/oldSrc/utils/handlers/metadataUpdateHandler';
import { mapCountriesToCountriesCodes } from '@dashboard/oldSrc/utils/maps';

const ShippingZoneDetails = () => {
  const router = useRouter();
  const { id, ..._params } = router.query;
  assert(typeof id === 'string');
  const queryParams = _params as ShippingZoneUrlQueryParams;
  const notify = useNotifier();
  const { t } = useTranslation();
  const shop = useShopSettings();

  const [{ data: restWorldCountries }, refetchRestWorldCountries] = useQuery(
    ShopCountriesDocument,
    {
      variables: {
        filter: {
          attachedToShippingZones: false,
        },
      },
    }
  );

  const [paginationState] = useLocalPaginationState(PAGINATE_BY);

  const {
    result: searchWarehousesOpts,
    loadMore,
    search,
  } = useSearch(SearchWarehousesDocument, {
    variables: DEFAULT_INITIAL_SEARCH_DATA,
  });

  const [{ data, fetching: loading }] = useQuery(ShippingZoneDocument, {
    displayLoader: true,
    variables: { id, ...paginationState },
  });

  const shippingZone = data?.shippingZone;

  const { availableChannels, channel } = useAppChannel();

  const [openModal, closeModal] = useDialogActionHandlers<
    ShippingZoneUrlDialog,
    ShippingZoneUrlQueryParams
  >((params) => shippingZoneUrl(id, params), queryParams);

  const [deleteShippingRate, deleteShippingRateOpts] = useMutation(DeleteShippingRateDocument, {
    onCompleted: (data) => {
      if (data?.deleteShippingPrice?.errors?.length === 0) {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
        closeModal();
      }
    },
  });

  const [deleteShippingZone, deleteShippingZoneOpts] = useMutation(DeleteShippingZoneDocument, {
    onCompleted: (data) => {
      if (data?.deleteShippingZone?.errors?.length === 0) {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
        void router.replace('/shipping');
      }
    },
  });

  const [updateShippingZone, updateShippingZoneOpts] = useMutation(UpdateShippingZoneDocument, {
    onCompleted: (data) => {
      if (data?.updateShippingZone?.errors?.length === 0) {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
        closeModal();
        refetchRestWorldCountries();
      }
    },
  });

  const [createWarehouse, createWarehouseOpts] = useMutation(WarehouseCreateDocument, {
    onCompleted: (data) => {
      if (data?.createWarehouse?.errors?.length === 0) {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
        closeModal();
      }
    },
  });

  const [updateMetadata] = useMutation(UpdateMetadataDocument, {});
  const [updatePrivateMetadata] = useMutation(UpdatePrivateMetadataDocument, {});

  if (shippingZone === null) {
    return <NotFoundPage onBack={() => router.push('/shipping')} />;
  } else if (!shippingZone) {
    return <Skeleton />;
  }

  const getParsedUpdateInput = (
    submitData: ShippingZoneUpdateFormData
  ): ShippingZoneUpdateInput => {
    const warehouseDiff = diff(
      shippingZone.warehouses.map((warehouse) => warehouse.id),
      submitData.warehouses
    );

    const channelsDiff = arrayDiff(
      shippingZone.channels.map((channel) => channel.id),
      submitData.channels
    );

    return {
      addWarehouses: warehouseDiff.added,
      addChannels: channelsDiff.added,
      removeChannels: channelsDiff.removed,
      description: submitData.description,
      name: submitData.name,
      removeWarehouses: warehouseDiff.removed,
    };
  };

  const updateData = async (submitData: ShippingZoneUpdateFormData) =>
    extractMutationErrors(
      updateShippingZone({
        id,
        input: getParsedUpdateInput(submitData),
      })
    );

  const rate = queryParams.key
    ? shippingZone.shippingMethods?.find(getById(queryParams.key))
    : undefined;

  const handleSubmit = createMetadataUpdateHandler(
    shippingZone,
    updateData,
    (variables) => updateMetadata({ ...variables }),
    (variables) => updatePrivateMetadata({ ...variables })
  );

  return (
    <>
      <ShippingZoneDetailsPage
        disabled={loading}
        errors={updateShippingZoneOpts.data?.updateShippingZone?.errors || []}
        onCountryAdd={() => openModal('assign-country')}
        onCountryRemove={(code) => openModal('unassign-country', { key: code })}
        onDelete={() => openModal('remove')}
        onRateAdd={() =>
          void router.push({
            pathname: '/shipping/[id]/add',
            query: { id },
          })
        }
        getRateEditHref={(rateId) => shippingRateEditUrl(id, rateId)}
        onRateRemove={(rateId) => openModal('remove-rate', { key: rateId })}
        onSubmit={handleSubmit}
        allChannels={availableChannels}
        onWarehouseAdd={() => openModal('add-warehouse')}
        saveButtonBarState={updateShippingZoneOpts.status}
        shippingZone={shippingZone}
        warehouses={mapEdgesToItems(searchWarehousesOpts?.data?.search) || []}
        hasMore={!!searchWarehousesOpts.data?.search?.pageInfo?.hasNextPage}
        loading={searchWarehousesOpts.fetching}
        onFetchMore={loadMore}
        onSearchChange={search}
        selectedChannelId={channel?.id}
      />
      <DeleteShippingRateDialog
        confirmButtonState={deleteShippingRateOpts.status}
        onClose={closeModal}
        handleConfirm={() => queryParams.key && deleteShippingRate({ id: queryParams.key })}
        name={rate?.name}
        open={queryParams.action === 'remove-rate'}
      />
      <ActionDialog
        confirmButtonState={deleteShippingZoneOpts.status}
        onClose={closeModal}
        onConfirm={() => deleteShippingZone({ id })}
        open={queryParams.action === 'remove'}
        title={t('dashboard.3EI/U', 'Delete Shipping Zone')}
        variant="delete"
      >
        <DialogContentText>
          <Trans
            t={t}
            i18nKey={'LsgHmZ'}
            values={{ name: getStringOrPlaceholder(shippingZone.name) }}
          >
            {'Are you sure you want to delete <strong>{{name}}</strong>?'}
          </Trans>
        </DialogContentText>
      </ActionDialog>
      <ShippingZoneCountriesAssignDialog
        confirmButtonState={updateShippingZoneOpts.status}
        countries={shop?.countries || []}
        restWorldCountries={
          mapCountriesToCountriesCodes(restWorldCountries?.shop?.countries) || []
        }
        initial={mapCountriesToCountriesCodes(shippingZone?.countries) || []}
        onClose={closeModal}
        onConfirm={(formData) =>
          updateShippingZone({
            id,
            input: { countries: formData.countries },
          })
        }
        open={queryParams.action === 'assign-country'}
      />
      <ActionDialog
        confirmButtonState={updateShippingZoneOpts.status}
        onClose={closeModal}
        onConfirm={() =>
          updateShippingZone({
            id,
            input: {
              countries: data?.shippingZone?.countries
                .filter((country) => country.code !== queryParams.key)
                .map((country) => country.code),
            },
          })
        }
        open={queryParams.action === 'unassign-country'}
        title={t('dashboard.unassignCountryDialogHeader', 'Remove from Shipping Zone')}
        variant="delete"
        confirmButtonLabel={t('dashboard.removeAndSaveButtonLabel', 'Remove and save')}
      >
        <DialogContentText>
          <Trans
            t={t}
            i18nKey={'1zuQ2P'}
            values={{
              countryName: getStringOrPlaceholder(
                shippingZone.countries.find((country) => country.code === queryParams.key)
                  ?.country
              ),
            }}
          >
            {
              'Are you sure you want to remove <strong>{{countryName}}</strong> from this shipping zone?'
            }
          </Trans>
        </DialogContentText>
      </ActionDialog>
      <ShippingZoneAddWarehouseDialog
        countries={shop?.countries || []}
        disabled={createWarehouseOpts.fetching}
        open={queryParams.action === 'add-warehouse'}
        confirmButtonState={createWarehouseOpts.status}
        errors={createWarehouseOpts?.data?.createWarehouse?.errors || []}
        onClose={closeModal}
        onSubmit={(data) =>
          createWarehouse({
            input: {
              address: {
                companyName: data?.companyName,
                city: data?.city,
                cityArea: data?.cityArea,
                country: data?.country,
                countryArea: data?.countryArea,
                phone: data?.phone,
                postalCode: data?.postalCode,
                streetAddress1: data?.streetAddress1,
                streetAddress2: data?.streetAddress2,
              },
              name: data?.name,
            },
          })
        }
      />
    </>
  );
};
export default ShippingZoneDetails;
