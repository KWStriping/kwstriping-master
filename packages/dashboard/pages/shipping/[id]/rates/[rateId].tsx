import { useTranslation } from '@core/i18n';
import Button from '@core/ui/components/buttons/Button';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useQuery } from '@core/urql/hooks';
import { useMutation } from '@core/urql/hooks/useMutation';
import { getById, getByUnmatchingId } from '@core/utils';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useReducer } from 'react';
import { assert } from 'tsafe';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import ChannelsAvailabilityDialog from '@dashboard/components/dialogs/ChannelsAvailabilityDialog';
import DeleteShippingRateDialog from '@dashboard/components/shipping/DeleteShippingRateDialog';
import ShippingMethodProductsAddDialog from '@dashboard/components/shipping/ShippingMethodProductsAddDialog';
import ShippingZonePostalCodeRangeDialog from '@dashboard/components/shipping/ShippingZonePostalCodeRangeDialog';
import ShippingZoneRatesPage from '@dashboard/components/shipping/ShippingZoneRatesPage';
import type { ShippingZoneRateUpdateFormData } from '@dashboard/components/shipping/ShippingZoneRatesPage/types';
import UnassignDialog from '@dashboard/components/shipping/UnassignDialog';
import type { PostalCodeRuleInclusionType } from '@core/api/constants';
import {
  UpdatePrivateMetadataDocument,
  UpdateMetadataDocument,
  ShippingZoneDocument,
  DeleteShippingRateDocument,
  ShippingPriceRemoveProductFromExcludeDocument,
  ShippingMethodChannelListingUpdateDocument,
  ShippingPriceExcludeProductDocument,
  UpdateShippingRateDocument,
} from '@core/api/graphql';
import useBulkActions from '@dashboard/hooks/useBulkActions';
import useChannels from '@dashboard/hooks/useChannels';
import useLocalPaginator, { useLocalPaginationState } from '@dashboard/hooks/useLocalPaginator';
import { PaginatorContext } from '@dashboard/hooks/usePaginator';
import {
  createShippingChannelsFromRate,
  createSortedShippingChannels,
} from '@dashboard/oldSrc/channels/utils';
import { PAGINATE_BY } from '@dashboard/oldSrc/config';
import useProductSearch from '@dashboard/oldSrc/searches/useProductSearch';
import {
  getShippingMethodChannelVariables,
  getUpdateShippingRateVariables,
} from '@dashboard/oldSrc/shipping/handlers';
import postalCodesReducer from '@dashboard/oldSrc/shipping/reducer';

import type {
  ShippingRateUrlDialog,
  ShippingRateUrlQueryParams,
} from '@dashboard/oldSrc/shipping/urls';
import { shippingRateEditUrl } from '@dashboard/oldSrc/shipping/urls';
import {
  filterPostalCodes,
  getPostalCodeRuleByMinMax,
  getRuleObject,
} from '@dashboard/oldSrc/shipping/utils';
import { useTaxClassFetchMore } from '@dashboard/oldSrc/taxes/utils/useTaxClassFetchMore';
import type { MinMax } from '@dashboard/oldSrc/types';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import createMetadataUpdateHandler from '@dashboard/oldSrc/utils/handlers/metadataUpdateHandler';

const FORM_ID = Symbol();

export interface RateUpdateProps {
  id: string;
  rateId: string;
  params: ShippingRateUrlQueryParams;
}

export const RateUpdate = () => {
  const router = useRouter();
  const { id, rateId, ...params } = router.query;
  assert(typeof id === 'string');
  assert(typeof rateId === 'string');
  const notify = useNotifier();
  const { t } = useTranslation();

  const [paginationState, setPaginationState] = useLocalPaginationState(PAGINATE_BY);
  const paginate = useLocalPaginator(setPaginationState);

  const [{ data, fetching: loading }, refetch] = useQuery(ShippingZoneDocument, {
    displayLoader: true,
    variables: {
      id,
      ...paginationState,
    },
  });

  const channelsData = data?.shippingZone?.channels;
  console.log('channelsData', channelsData);

  const rate = data?.shippingZone?.shippingMethods?.find(getById(rateId));

  const {
    loadMore,
    search: productsSearch,
    result: productsSearchState,
  } = useProductSearch({
    pause: true,
  });

  const buildShippingRateEditUrl = useCallback(
    (params: ShippingRateUrlQueryParams) => shippingRateEditUrl(id, rateId, params),
    [id, rateId]
  );

  const [openModal, closeModal] = useDialogActionHandlers<
    ShippingRateUrlDialog,
    ShippingRateUrlQueryParams
  >(buildShippingRateEditUrl, params);

  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions();

  const [updateShippingMethodChannelListing, updateShippingMethodChannelListingMutationState] =
    useMutation(ShippingMethodChannelListingUpdateDocument);

  const [assignProduct, assignProductMutationState] = useMutation(
    ShippingPriceExcludeProductDocument,
    {
      onCompleted: (data) => {
        if (data?.excludeProductsFromShippingPrice?.errors?.length === 0) {
          handleSuccess();
          refetch();
          closeModal();
        }
      },
    }
  );

  const [unassignProduct, unassignProductMutationState] = useMutation(
    ShippingPriceRemoveProductFromExcludeDocument,
    {
      onCompleted: (data) => {
        if (data?.removeProductFromShippingPriceExclusion?.errors?.length === 0) {
          handleSuccess();
          refetch();
          closeModal();
        }
      },
    }
  );

  const shippingChannels = useMemo(
    () => createShippingChannelsFromRate(rate?.channelListings),
    [rate]
  );

  const allChannels = useMemo(() => createSortedShippingChannels(channelsData), [channelsData]);

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
    shippingChannels,
    params?.action,
    { closeModal, openModal },
    { formId: FORM_ID }
  );

  const { taxClasses, fetchMoreTaxClasses } = useTaxClassFetchMore();

  const [updateShippingRate, updateShippingRateMutationState] = useMutation(
    UpdateShippingRateDocument
  );

  const handleSuccess = () => {
    notify(t('dashboard.savedChanges', 'Saved changes'), {
      type: 'success',
    });
  };

  const [deleteShippingRate, deleteShippingRateMutationState] = useMutation(
    DeleteShippingRateDocument,
    {
      onCompleted: (data) => {
        if (data?.deleteShippingPrice?.errors?.length === 0) {
          handleSuccess();
          void router.push({ pathname: '/shipping/[id]', query: { id } });
        }
      },
    }
  );

  const [updateMetadata] = useMutation(UpdateMetadataDocument);
  const [updatePrivateMetadata] = useMutation(UpdatePrivateMetadataDocument);

  const [state, dispatch] = useReducer(postalCodesReducer, {
    codesToDelete: [],
    havePostalCodesChanged: false,
    inclusionType: rate?.postalCodeRules?.[0]?.inclusionType,
    originalCodes: [],
    postalCodeRules: rate?.postalCodeRules || [],
  });

  const postalCodeRulesLoaded =
    !loading &&
    !state.postalCodeRules?.length &&
    !state.codesToDelete?.length &&
    rate?.postalCodeRules?.length;

  if (postalCodeRulesLoaded) {
    dispatch({ postalCodeRules: rate.postalCodeRules });
  }

  const onPostalCodeInclusionChange = (inclusion: PostalCodeRuleInclusionType) => {
    dispatch({
      codesToDelete: rate?.postalCodeRules?.map((code) => code.id),
      havePostalCodesChanged: true,
      inclusionType: inclusion,
      postalCodeRules: [],
    });
  };

  const updateData = async (formData: ShippingZoneRateUpdateFormData): Promise<unknown[]> => {
    const response = await updateShippingRate({
      ...getUpdateShippingRateVariables(
        formData,
        id,
        rateId,
        state.postalCodeRules,
        state.codesToDelete
      ),
    });

    dispatch({ codesToDelete: [] });

    const errors = response.data?.updateShippingPrice?.errors;

    if (errors?.length === 0) {
      handleSuccess();
      dispatch({ havePostalCodesChanged: false });
      updateShippingMethodChannelListing({
        ...getShippingMethodChannelVariables(
          rateId,
          formData.orderValueRestricted,
          formData.channelListings,
          shippingChannels
        ),
      });
    }

    return errors ?? [];
  };

  const handleSubmit = createMetadataUpdateHandler(
    rate,
    updateData,
    (variables) => updateMetadata({ ...variables }),
    (variables) => updatePrivateMetadata({ ...variables })
  );

  const handleProductAssign = useCallback(
    (ids: string[]) =>
      assignProduct({
        id: rateId,
        input: { products: ids },
      }),
    [rateId, assignProduct]
  );

  const handleProductUnassign = useCallback(
    (ids: string[]) => {
      unassignProduct({
        id: rateId,
        products: ids,
      });
      reset();
    },
    [rateId, reset, unassignProduct]
  );

  const onPostalCodeAssign = useCallback(
    (rule: MinMax) => {
      if (!state.originalCodes?.length) {
        dispatch({ originalCodes: rate?.postalCodeRules });
      }
      if (state?.postalCodeRules?.filter(getPostalCodeRuleByMinMax(rule)).length) {
        closeModal();
        return;
      }
      if (!state?.inclusionType) throw new Error('inclusionType is not defined');
      const newCode = getRuleObject(rule, state.inclusionType);
      assert(!!state.postalCodeRules);
      dispatch({
        havePostalCodesChanged: true,
        postalCodeRules: [...state.postalCodeRules, newCode],
      });
      closeModal();
    },
    [state]
  );

  const onPostalCodeUnassign = useCallback(
    (code: { id: string }) => {
      if (code.id !== undefined) {
        dispatch({
          codesToDelete: [...(state.codesToDelete ?? []), code.id],
          havePostalCodesChanged: true,
          postalCodeRules: state.postalCodeRules?.filter(getByUnmatchingId(code.id)),
        });
      } else {
        if (!state.postalCodeRules?.length) return;
        assert(!!state.postalCodeRules);
        dispatch({
          havePostalCodesChanged: true,
          postalCodeRules: filterPostalCodes(state.postalCodeRules, code),
        });
      }
    },
    [state]
  );

  const backHref = useMemo(() => ({ pathname: '/shipping/[id]', query: { id } }), [id]);

  const onDelete = useCallback(() => openModal('remove'), [openModal]);

  const openPostalCodeAssignmentModal = useCallback(() => openModal('add-range'), [openModal]);

  const { pageInfo, ...paginationValues } = paginate(
    rate?.excludedProducts?.pageInfo,
    paginationState
  );

  console.log('allChannels', allChannels);

  return (
    <PaginatorContext.Provider value={{ ...pageInfo, ...paginationValues }}>
      <WindowTitle title={t('dashboard.shipping', 'Shipping methods')} />
      {!!allChannels?.length && (
        <ChannelsAvailabilityDialog
          isSelected={isChannelSelected}
          channels={allChannels}
          onChange={channelsToggle}
          onClose={handleChannelsModalClose}
          open={isChannelsModalOpen}
          title={t('dashboard.M730i', 'Manage Channel Availability')}
          selected={channelListElements.length}
          confirmButtonState="default"
          onConfirm={handleChannelsConfirm}
          toggleAll={toggleAllChannels}
        />
      )}
      <DeleteShippingRateDialog
        confirmButtonState={deleteShippingRateMutationState.status}
        onClose={closeModal}
        handleConfirm={() => deleteShippingRate({ id: rateId })}
        open={params.action === 'remove'}
        name={rate?.name || '...'}
      />
      <UnassignDialog
        open={params.action === 'unassign-product' && !!listElements.length}
        idsLength={listElements.length}
        confirmButtonState={unassignProductMutationState.status}
        closeModal={closeModal}
        onConfirm={() => handleProductUnassign(listElements)}
      />
      <ShippingMethodProductsAddDialog
        confirmButtonState={assignProductMutationState.status}
        loading={productsSearchState.fetching}
        open={params.action === 'assign-product'}
        hasMore={!!productsSearchState.data?.search?.pageInfo?.hasNextPage}
        products={
          mapEdgesToItems(productsSearchState?.data?.search)?.filter(
            (suggestedProduct) => suggestedProduct.id
          ) ?? []
        }
        onClose={closeModal}
        onFetch={productsSearch}
        onFetchMore={loadMore}
        onSubmit={handleProductAssign}
      />
      <ShippingZoneRatesPage
        formId={FORM_ID}
        allChannelsCount={allChannels?.length}
        shippingChannels={currentChannels}
        disabled={
          loading ||
          updateShippingRateMutationState?.status === 'loading' ||
          updateShippingMethodChannelListingMutationState?.status === 'loading' ||
          unassignProductMutationState?.status === 'loading' ||
          assignProductMutationState?.status === 'loading'
        }
        saveButtonBarState={updateShippingRateMutationState.status}
        onDelete={onDelete}
        backHref={backHref}
        onSubmit={handleSubmit}
        rate={rate}
        errors={updateShippingRateMutationState.data?.updateShippingPrice?.errors}
        channelErrors={
          updateShippingMethodChannelListingMutationState?.data
            ?.updateShippingMethodChannelListing?.errors
        }
        openChannelsModal={handleChannelsModalOpen}
        onChannelsChange={setCurrentChannels}
        onProductUnassign={handleProductUnassign}
        onProductAssign={() => openModal('assign-product')}
        isChecked={isSelected}
        selected={listElements.length}
        toggle={toggle}
        toggleAll={toggleAll}
        toolbar={
          <Button onClick={() => openModal('unassign-product')}>
            {t('dashboard.unassignProductsFromShippingMethod', 'Unassign')}
          </Button>
        }
        onPostalCodeInclusionChange={onPostalCodeInclusionChange}
        onPostalCodeAssign={openPostalCodeAssignmentModal}
        onPostalCodeUnassign={onPostalCodeUnassign}
        postalCodeRules={state.postalCodeRules}
        taxClasses={taxClasses}
        fetchMoreTaxClasses={fetchMoreTaxClasses}
      />
      <ShippingZonePostalCodeRangeDialog
        confirmButtonState={'default'}
        onClose={closeModal}
        onSubmit={onPostalCodeAssign}
        open={params.action === 'add-range'}
      />
    </PaginatorContext.Provider>
  );
};

export default RateUpdate;
