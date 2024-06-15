
import type { DeleteShippingRateMutation, DeleteShippingRateMutationVariables } from '@tempo/api/generated/graphql';
import * as m from '@paraglide/messages';
import useNotifier from '@tempo/ui/hooks/useNotifier';
import { useMutation } from '@tempo/api/hooks/useMutation';
import { extractMutationErrors, getMutationState } from '@tempo/api/utils';
import type { ShippingZoneRateCommonFormData } from '@dashboard/components/ShippingZoneRatesPage/types';
import differenceBy from 'lodash-es/differenceBy';
import { useRouter } from 'next/navigation';
import { assert } from 'tsafe/assert';
import { shippingRateEditUrl } from './urls';
import type { ShippingMethod } from '@tempo/api/generated/constants';
import { PostalCodeRuleInclusionType } from '@tempo/api/generated/constants';
import {
  CreateShippingRateDocument,
  DeleteShippingRateDocument,
  ShippingMethodChannelListingUpdateDocument,
} from '@tempo/api/generated/graphql';
import type {
  CountryFragment,
  CreateShippingRateMutationVariables,
  ShippingMethodChannelListingUpdateMutationVariables,
  ShippingMethodFragment,
  ShippingPostalCodeRulesCreationInputRange,
  UpdateShippingRateMutationVariables,
} from '@tempo/api/generated/graphql';
import type { ChannelShippingData } from '@tempo/dashboard/oldSrc/channels/utils';
import { getParsedDataForJsonStringField } from '@tempo/dashboard/oldSrc/utils/richText/misc';

export const createChannelsChangeHandler =
  (
    selectedChannels: ChannelShippingData[],
    setSelectedChannels: (channels: ChannelShippingData[]) => void,
    triggerChange: () => void
  ) =>
  (channelId: string, value: { maxValue: string; minValue: string; price: string }) => {
    const itemIndex = selectedChannels.findIndex((item) => item.id === channelId);
    const channel = selectedChannels[itemIndex];
    setSelectedChannels([
      ...selectedChannels.slice(0, itemIndex),
      {
        ...channel,
        maxValue: value.maxValue,
        minValue: value.minValue,
        price: value.price,
      },
      ...selectedChannels.slice(itemIndex + 1),
    ]);
    triggerChange();
  };

const getPostalCodeRulesToAdd = (rules: ShippingMethodFragment['postalCodeRules']) =>
  rules
    .filter((code) => !code.id || code.id === '0')
    .map(
      (code) =>
        ({
          end: code.end,
          start: code.start,
        }) as ShippingPostalCodeRulesCreationInputRange
    );

export function getCreateShippingPriceRateVariables(
  data: ShippingZoneRateCommonFormData,
  id: string,
  addPostalCodeRules: ShippingMethodFragment['postalCodeRules'],
  inclusionType: PostalCodeRuleInclusionType
): CreateShippingRateMutationVariables {
  const parsedMinDays = parseInt(data?.minDays, 10);
  const parsedMaxDays = parseInt(data?.maxDays, 10);
  const postalCodeRules = getPostalCodeRulesToAdd(addPostalCodeRules);
  return {
    input: {
      addPostalCodeRules: postalCodeRules,
      inclusionType,
      maximumDeliveryDays: parsedMaxDays,
      minimumDeliveryDays: parsedMinDays,
      name: data?.name,
      shippingZone: id,
      description: getParsedDataForJsonStringField(data?.description),
    },
  };
}

export function getCreateShippingWeightRateVariables(
  data: ShippingZoneRateCommonFormData,
  id: string,
  addPostalCodeRules: ShippingMethodFragment['postalCodeRules'],
  inclusionType: PostalCodeRuleInclusionType
): CreateShippingRateMutationVariables {
  const parsedMinValue = parseFloat(data?.minValue);
  const parsedMaxValue = parseFloat(data?.maxValue);
  const parsedMinDays = parseInt(data?.minDays, 10);
  const parsedMaxDays = parseInt(data?.maxDays, 10);
  const isWeightSet = data?.orderValueRestricted;
  const postalCodeRules = getPostalCodeRulesToAdd(addPostalCodeRules);
  return {
    input: {
      addPostalCodeRules: postalCodeRules,
      inclusionType,
      maximumDeliveryDays: parsedMaxDays,
      maximumOrderWeight: isWeightSet ? parsedMaxValue : null,
      minimumDeliveryDays: parsedMinDays,
      minimumOrderWeight: isWeightSet ? parsedMinValue : null,
      name: data?.name,
      shippingZone: id,
      description: getParsedDataForJsonStringField(data?.description),
    },
  };
}

export function getUpdateShippingRateVariables(
  data: ShippingZoneRateCommonFormData,
  id: string,
  rateId: string,
  addPostalCodeRules: ShippingMethodFragment['postalCodeRules'],
  deletePostalCodeRules?: string[]
): UpdateShippingRateMutationVariables {
  const parsedMinDays = parseInt(data?.minDays, 10);
  const parsedMaxDays = parseInt(data?.maxDays, 10);
  const parsedMinValue = parseFloat(data?.minValue);
  const parsedMaxValue = parseFloat(data?.maxValue);
  const isWeightSet = data?.orderValueRestricted;
  const postalCodeRules = getPostalCodeRulesToAdd(addPostalCodeRules);
  return {
    id: rateId,
    input: {
      addPostalCodeRules: postalCodeRules,
      deletePostalCodeRules,
      inclusionType:
        addPostalCodeRules?.[0]?.inclusionType || PostalCodeRuleInclusionType.Exclude,
      minimumDeliveryDays: parsedMinDays,
      maximumDeliveryDays: parsedMaxDays,
      maximumOrderWeight: isWeightSet ? parsedMaxValue : null,
      minimumOrderWeight: isWeightSet ? parsedMinValue : null,
      name: data?.name,
      shippingZone: id,
      description: getParsedDataForJsonStringField(data?.description),
      taxClass: data?.taxClassId,
    },
  };
}

export function getShippingMethodChannelVariables(
  id: string,
  orderValueRestricted: boolean,
  formChannels: ChannelShippingData[],
  prevChannels?: ChannelShippingData[]
): ShippingMethodChannelListingUpdateMutationVariables {
  const removeChannels = prevChannels
    ? differenceBy(prevChannels, formChannels, 'id').map(({ id }) => id)
    : [];

  return {
    id,
    input: {
      addChannels:
        formChannels?.map((channel) => ({
          channelId: channel.id,
          maximumOrderPrice: channel.maxValue && orderValueRestricted ? channel.maxValue : null,
          minimumOrderPrice: channel.minValue && orderValueRestricted ? channel.minValue : null,
          price: channel.price,
        })) || [],
      removeChannels,
    },
  };
}

export function useShippingRateCreator(
  shippingZoneId: string,
  type: ShippingMethod,
  postalCodes: ShippingMethodFragment['postalCodeRules'],
  inclusionType: PostalCodeRuleInclusionType
) {
  const notify = useNotifier();
  const router = useRouter();
  const [createBaseShippingRate, createBaseShippingRateOpts] = useMutation(
    CreateShippingRateDocument,
    {}
  );
  const [updateShippingMethodChannelListing, updateShippingMethodChannelListingOpts] =
    useMutation(ShippingMethodChannelListingUpdateDocument, {});
  const [deleteShippingRate] = useMutation<DeleteShippingRateMutation, DeleteShippingRateMutationVariables>(DeleteShippingRateDocument, {});

  // TODO
  const getVariables = true
    ? getCreateShippingPriceRateVariables
    : getCreateShippingWeightRateVariables;

  const createShippingRate = async (data: ShippingZoneRateCommonFormData) => {
    const response = await createBaseShippingRate({
      ...getVariables(data, shippingZoneId, postalCodes, inclusionType),
    });

    const createErrors = response.data?.createShippingPrice?.errors;

    if (createErrors?.length) {
      return createErrors;
    }

    const rateId = response.data?.createShippingPrice?.shippingMethod?.id;
    assert(rateId);

    const errors = await extractMutationErrors(
      updateShippingMethodChannelListing({
        ...getShippingMethodChannelVariables(
          rateId,
          data?.orderValueRestricted,
          data?.channelListings
        ),
      })
    );

    if (errors?.length) {
      deleteShippingRate({
        id: rateId,
      });

      notify((m.dashboard_somethingWentWrong() ?? 'Something went wrong'), {
        type: 'error',
      });

      return errors;
    } else {
      notify((m.dashboard_savedChanges() ?? 'Saved changes'), {
        type: 'success',
      });
      assert(!!shippingZoneId);
      assert(!!rateId);
      void router.push(shippingRateEditUrl(shippingZoneId, rateId));
      return [];
    }
  };

  const called =
    createBaseShippingRateOpts.called || updateShippingMethodChannelListingOpts.called;
  const loading =
    createBaseShippingRateOpts.fetching || updateShippingMethodChannelListingOpts.fetching;
  const errors = [...(createBaseShippingRateOpts.data?.createShippingPrice?.errors || [])];
  const channelErrors =
    updateShippingMethodChannelListingOpts.data?.updateShippingMethodChannelListing?.errors || [];

  return {
    channelErrors,
    createShippingRate,
    errors,
    status: getMutationState(called, loading, [...errors, ...channelErrors]),
  };
}

export function getCountrySelectionMap(
  countries?: Maybe<CountryFragment[]>,
  countriesSelected?: string[]
) {
  return (
    countriesSelected &&
    countries?.reduce(
      (acc, country) => {
        acc[country.code] = !!countriesSelected.find(
          (selectedCountries) => selectedCountries === country.code
        );
        return acc;
      },
      {} as Map<string, boolean>
    )
  );
}

export function isRestWorldCountriesSelected(
  restWorldCountries?: string[],
  countrySelectionMap?: Map<string, boolean>
) {
  return (
    countrySelectionMap &&
    restWorldCountries?.every((countryCode) => countrySelectionMap[countryCode])
  );
}
