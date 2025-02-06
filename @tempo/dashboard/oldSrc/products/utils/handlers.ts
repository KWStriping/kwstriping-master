import { Temporal } from '@js-temporal/polyfill';
import { diff } from 'fast-array-diff';
import type { ChangeEvent } from 'react';
import type {
  ProductChannelListingAddInput,
  ProductFragment,
  ProductMediaAssignMutation,
  ProductMediaAssignMutationVariables,
  ProductMediaUnassignMutation,
  ProductMediaUnassignMutationVariables,
} from '@tempo/api/generated/graphql';
import type { FormChange, UseFormResult } from '@tempo/dashboard/hooks/useForm';
import type {
  ChannelData,
  ChannelPriceAndPreorderData,
  ChannelPriceArgs,
  ChannelPriceData,
} from '@tempo/dashboard/oldSrc/channels/utils';

export function createChannelsPriceChangeHandler(
  channelListings: ChannelData[],
  updateChannels: (data: ChannelData[]) => void,
  triggerChange: () => void
) {
  return (id: string, priceData: ChannelPriceArgs) => {
    const { costPrice, price } = priceData;

    const updatedChannels = channelListings.map((channel) =>
      channel.id === id ? { ...channel, costPrice, price } : channel
    );

    updateChannels(updatedChannels);

    triggerChange();
  };
}

export function createChannelsChangeHandler(
  channelsData: ChannelData[],
  updateChannels: (data: ChannelData[]) => void,
  triggerChange: () => void
) {
  return (id: string, data: Omit<ChannelData, 'name' | 'price' | 'currency' | 'id'>) => {
    const channelIndex = channelsData.findIndex((channel) => channel.id === id);
    const channel = channelsData[channelIndex];

    const updatedChannels = [
      ...channelsData.slice(0, channelIndex),
      {
        ...channel,
        ...data,
      },
      ...channelsData.slice(channelIndex + 1),
    ];

    updateChannels(updatedChannels);

    triggerChange();
  };
}

export function createVariantChannelsChangeHandler(
  channelListings: ChannelPriceData[],
  setData: (data: ChannelPriceData[]) => void,
  triggerChange: () => void
) {
  return (id: string, priceData: ChannelPriceArgs) => {
    const { costPrice, price } = priceData;
    const channelIndex = channelListings.findIndex((channel) => channel.id === id);
    const channel = channelListings[channelIndex];

    const updatedChannels = [
      ...channelListings.slice(0, channelIndex),
      {
        ...channel,
        costPrice,
        price,
      },
      ...channelListings.slice(channelIndex + 1),
    ];
    setData(updatedChannels);
    triggerChange();
  };
}

export function createProductKlassSelectHandler(
  setProductKlass: (klassId: string) => void,
  triggerChange: () => void
): FormChange {
  return (event: ChangeEvent<unknown>) => {
    const id = event.target.value;
    setProductKlass(id);
    triggerChange();
  };
}

export const getChannelsInput = (channels: ChannelPriceAndPreorderData[]) =>
  channels?.map((channel) => ({
    data: channel,
    id: channel.id,
    label: channel.name,
    value: {
      costPrice: channel.costPrice || '',
      price: channel.price || '',
      preorderThreshold: channel.preorderThreshold || null,
    },
  }));

export const getAvailabilityVariables = (
  channels: ChannelData[]
): ProductChannelListingAddInput[] =>
  channels.map((channel) => {
    const {
      isAvailableForPurchase,
      availableForPurchase,
      isPublished,
      publishedAt,
      visibleInListings,
    } = channel;
    const isAvailable =
      availableForPurchase && !isAvailableForPurchase ? true : isAvailableForPurchase;

    return {
      availableForPurchaseDate:
        isAvailableForPurchase || availableForPurchase === '' ? null : availableForPurchase,
      channelId: channel.id,
      isAvailableForPurchase: isAvailable,
      isPublished,
      publishedAt,
      visibleInListings,
    };
  });

export const createPreorderEndDateChangeHandler =
  (
    form: UseFormResult<{ preorderEndDateTime?: string }>,
    triggerChange: () => void,
    preorderPastDateErrorMessage: string
  ): FormChange =>
    (event) => {
      form.change(event);
      if (Temporal.PlainDateTime.from(event.target.value).diffNow().as('minutes') < 0) {
        form.setError('preorderEndDateTime', preorderPastDateErrorMessage);
      } else {
        form.clearErrors('preorderEndDateTime');
      }
      triggerChange();
    };

export const createMediaChangeHandler =
  (form: UseFormResult<{ media: string[] }>, triggerChange: () => void) => (ids: string[]) => {
    form.change({
      target: {
        name: 'media',
        value: ids,
      },
    });

    triggerChange();
  };

export const handleAssignMedia = async <T extends Pick<ProductFragment, 'id' | 'media'>>(
  media: string[],
  variant: T,
  assignMedia: (
    variables: ProductMediaAssignMutationVariables
  ) => Promise<OperationResult<ProductMediaAssignMutation>>,
  unassignMedia: (
    variables: ProductMediaUnassignMutationVariables
  ) => Promise<OperationResult<ProductMediaUnassignMutation>>
) => {
  const { added, removed } = diff(
    variant.media.map((mediaObj) => mediaObj.id),
    media
  );

  const assignResults = await Promise.all(
    added.map((mediaItemId) =>
      assignMedia({
        mediaItemId,
        productId: variant.id,
      })
    )
  );
  const unassignResults = await Promise.all(
    removed.map((mediaItemId) =>
      unassignMedia({
        mediaItemId,
        productId: variant.id,
      })
    )
  );

  const assignErrors = assignResults.reduce(
    (errors, result) => [...errors, ...(result.data?.assignProductMedia.errors || [])],
    []
  );
  const unassignErrors = unassignResults.reduce(
    (errors, result) => [...errors, ...(result.data?.unassignProductMedia.errors || [])],
    []
  );

  return [...assignErrors, ...unassignErrors];
};
