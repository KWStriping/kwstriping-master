import type { VoucherDetailsPageFormData } from '@dashboard/components/VoucherDetailsPage';
import type { VoucherChannelListingAddInput } from '@tempo/api/generated/graphql';
import type { ChannelVoucherData } from '@tempo/dashboard/oldSrc/channels/utils';

import { RequirementsPicker } from './types';

const getChannelDiscountValue = (
  channel: ChannelVoucherData,
  formData: VoucherDetailsPageFormData
) => (formData.discountType.toString() === 'SHIPPING' ? 100 : channel.discountValue);

const getChannelMinAmountSpent = (
  channel: ChannelVoucherData,
  formData: VoucherDetailsPageFormData
) => {
  if (formData.requirementsPicker === RequirementsPicker.None) {
    return null;
  }
  if (formData.requirementsPicker === RequirementsPicker.Item) {
    return 0;
  }
  return channel.minSpent;
};

const mapChannelToChannelInput =
  (formData: VoucherDetailsPageFormData) => (channel: ChannelVoucherData) => ({
    channelId: channel.id,
    discountValue: getChannelDiscountValue(channel, formData),
    minAmountSpent: getChannelMinAmountSpent(channel, formData),
  });

const filterNotDiscountedChannel = (channelInput: VoucherChannelListingAddInput) =>
  !!channelInput.discountValue;

export const getAddedChannelsInputFromFormData = (formData: VoucherDetailsPageFormData) =>
  formData.channelListings
    ?.map(mapChannelToChannelInput(formData))
    .filter(filterNotDiscountedChannel) || [];
