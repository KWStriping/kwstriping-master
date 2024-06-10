import { useTranslation } from '@core/i18n';
import { useQuery } from '@core/urql/hooks';
import { useRouter } from 'next/router';
import { useMemo, useReducer } from 'react';
import { assert } from 'tsafe';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import ChannelsAvailabilityDialog from '@dashboard/components/dialogs/ChannelsAvailabilityDialog';
import ShippingZonePostalCodeRangeDialog from '@dashboard/components/shipping/ShippingZonePostalCodeRangeDialog';
import ShippingZoneRatesCreatePage from '@dashboard/components/shipping/ShippingZoneRatesCreatePage';
import { PostalCodeRuleInclusionType } from '@core/api/constants';
import { ShippingZoneChannelsDocument } from '@core/api/graphql';
import useChannels from '@dashboard/hooks/useChannels';
import { createSortedShippingChannels } from '@dashboard/oldSrc/channels/utils';
import { useShippingRateCreator } from '@dashboard/oldSrc/shipping/handlers';
import postalCodesReducer from '@dashboard/oldSrc/shipping/reducer';
import type {
  ShippingRateCreateUrlDialog,
  ShippingRateCreateUrlQueryParams,
} from '@dashboard/oldSrc/shipping/urls';
import { shippingRateCreateUrl } from '@dashboard/oldSrc/shipping/urls';
import {
  filterPostalCodes,
  getPostalCodeRuleByMinMax,
  getRuleObject,
} from '@dashboard/oldSrc/shipping/utils';
import { useTaxClassFetchMore } from '@dashboard/oldSrc/taxes/utils/useTaxClassFetchMore';
import type { MinMax } from '@dashboard/oldSrc/types';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';

const FORM_ID = Symbol();

export interface RateCreateProps {
  id: string;
  params: ShippingRateCreateUrlQueryParams;
}

export const RateCreate = () => {
  const router = useRouter();
  const { id, ...params } = router.query;
  assert(typeof id === 'string');
  const { t } = useTranslation();

  const [openModal, closeModal] = useDialogActionHandlers<
    ShippingRateCreateUrlDialog,
    ShippingRateCreateUrlQueryParams
  >((params) => shippingRateCreateUrl(id, params), params);

  const [{ data: shippingZoneData, fetching: channelsLoading }] = useQuery(
    ShippingZoneChannelsDocument,
    {
      displayLoader: true,
      variables: { id },
    }
  );

  const { taxClasses, fetchMoreTaxClasses } = useTaxClassFetchMore();

  const allChannels = createSortedShippingChannels(shippingZoneData?.shippingZone?.channels);

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
  } = useChannels(allChannels, params?.action, { closeModal, openModal }, { formId: FORM_ID });

  const [state, dispatch] = useReducer(postalCodesReducer, {
    codesToDelete: [],
    havePostalCodesChanged: false,
    inclusionType: PostalCodeRuleInclusionType.Exclude,
    originalCodes: [],
    postalCodeRules: [],
  });

  const { channelErrors, createShippingRate, errors, status } = useShippingRateCreator(
    id,
    params.type,
    state.postalCodeRules,
    state.inclusionType
  );

  const onPostalCodeAssign = (rule: MinMax) => {
    if (state.postalCodeRules.filter(getPostalCodeRuleByMinMax(rule)).length > 0) {
      closeModal();
      return;
    }

    const newCode = getRuleObject(rule, state.inclusionType);
    dispatch({
      havePostalCodesChanged: true,
      postalCodeRules: [...state.postalCodeRules, newCode],
    });
    closeModal();
  };

  const onPostalCodeInclusionChange = (inclusion: PostalCodeRuleInclusionType) => {
    dispatch({
      inclusionType: inclusion,
      postalCodeRules: [],
    });
  };

  const onPostalCodeUnassign = (code) => {
    dispatch({
      havePostalCodesChanged: true,
      postalCodeRules: filterPostalCodes(state.postalCodeRules, code),
    });
  };

  const backUrl = useMemo(() => ({ pathname: '/shipping/[id]', query: { id } }), [id]);

  return (
    <>
      <WindowTitle title={t('dashboard.shipping', 'Shipping methods')} />
      {!!allChannels?.length && (
        <ChannelsAvailabilityDialog
          isSelected={isChannelSelected}
          channels={allChannels}
          onChange={channelsToggle}
          onClose={handleChannelsModalClose}
          open={isChannelsModalOpen}
          title={t('dashboard.M730i', 'Manage Channel Availability')}
          confirmButtonState="default"
          selected={channelListElements.length}
          onConfirm={handleChannelsConfirm}
          toggleAll={toggleAllChannels}
        />
      )}
      <ShippingZoneRatesCreatePage
        formId={FORM_ID}
        allChannelsCount={allChannels?.length}
        shippingChannels={currentChannels}
        disabled={channelsLoading || status === 'loading'}
        saveButtonBarState={status}
        onSubmit={createShippingRate}
        backUrl={backUrl}
        errors={errors}
        channelErrors={channelErrors}
        postalCodes={state.postalCodeRules}
        openChannelsModal={handleChannelsModalOpen}
        onChannelsChange={setCurrentChannels}
        onPostalCodeAssign={() => openModal('add-range')}
        onPostalCodeUnassign={onPostalCodeUnassign}
        onPostalCodeInclusionChange={onPostalCodeInclusionChange}
        taxClasses={taxClasses ?? []}
        fetchMoreTaxClasses={fetchMoreTaxClasses}
      />
      <ShippingZonePostalCodeRangeDialog
        confirmButtonState="default"
        onClose={closeModal}
        onSubmit={onPostalCodeAssign}
        open={params.action === 'add-range'}
      />
    </>
  );
};

export default RateCreate;
