import type { ProductCreateDataQuery } from '@tempo/api/generated/graphql';
import type { UseFormsetOutput } from '@tempo/dashboard/hooks/useFormset';
import type { ChannelPriceAndPreorderData } from '@tempo/dashboard/oldSrc/channels/utils';
import { getChannelsInput } from '@tempo/dashboard/oldSrc/products/utils/handlers';
import { validateCostPrice, validatePrice } from '@tempo/dashboard/oldSrc/products/utils/validation';

import type { VariantChannelListing } from './types';

type FormChannels = UseFormsetOutput<ChannelPriceAndPreorderData>;

export const validateChannels = (channels: FormChannels['data']) =>
  channels.some(
    (channelData) =>
      validatePrice(channelData.value.price) || validateCostPrice(channelData.value.costPrice)
  );

export const createChannelsWithPreorderInfo = (
  product: ProductCreateDataQuery['product']
) =>
  product
    ? product.channelListings?.map((listing) => ({
        ...listing.channel,
        currency: listing.channel.currencyCode,
        price: '',
      }))
    : [];

export const concatChannelsBySelection = (
  selectedIds: string[],
  formChannels: FormChannels,
  allChannels: ChannelPriceAndPreorderData[]
) => {
  const includedAndSelected = formChannels.data?.filter((ch) => selectedIds.includes(ch.id));
  const includedAndSelectedIds = includedAndSelected.map((ch) => ch.id);
  const restSelectedIds = selectedIds.filter((id) => !includedAndSelectedIds.includes(id));
  const newlySelected = allChannels.filter((ch) => restSelectedIds.includes(ch.id));

  return getChannelsInput(newlySelected).concat(includedAndSelected);
};

export const extractChannelPricesFromVariantChannel = (
  variantChannel: VariantChannelListing[number]
) => {
  const { costPrice, price } = variantChannel;

  return {
    costPrice: costPrice ? costPrice.amount.toString() : null,
    price: price ? price.amount.toString() : null,
  };
};
