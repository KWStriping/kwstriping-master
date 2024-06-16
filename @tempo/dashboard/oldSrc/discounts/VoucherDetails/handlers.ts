import { joinDateTime } from '@tempo/utils/datetime';
import type { OperationResult } from '@apollo/client';
import type { VoucherDetailsPageFormData } from '@tempo/dashboard/components/discounts/VoucherDetailsPage';
import { DiscountValueType, VoucherType } from '@tempo/api/generated/constants';
import type {
  VoucherChannelListingUpdateMutation,
  VoucherChannelListingUpdateMutationVariables,
  VoucherDetailsFragment,
  VoucherUpdateMutation,
  VoucherUpdateMutationVariables,
} from '@tempo/api/generated/graphql';
import type { ChannelVoucherData } from '@tempo/dashboard/oldSrc/channels/utils';
import { getChannelsVariables } from '@tempo/dashboard/oldSrc/discounts/handlers';
import { DiscountType, RequirementsPicker } from '@tempo/dashboard/oldSrc/discounts/types';

export function createUpdateHandler(
  voucher: VoucherDetailsFragment,
  voucherChannelsChoices: ChannelVoucherData[],
  updateVoucher: (
    variables: VoucherUpdateMutationVariables
  ) => Promise<OperationResult<VoucherUpdateMutation>>,
  updateChannels: (options: {
    variables: VoucherChannelListingUpdateMutationVariables;
  }) => Promise<OperationResult<VoucherChannelListingUpdateMutation>>
) {
  return async (formData: VoucherDetailsPageFormData) => {
    const { id } = voucher;

    const errors = await Promise.all([
      updateVoucher({
        id,
        input: {
          applyOncePerCustomer: formData.applyOncePerCustomer,
          applyOncePerOrder: formData.applyOncePerOrder,
          onlyForStaff: formData.onlyForStaff,
          discountValueType:
            formData.discountType === DiscountType.ValuePercentage
              ? DiscountValueType.Percentage
              : formData.discountType === DiscountType.ValueFixed
                ? DiscountValueType.Fixed
                : DiscountValueType.Percentage,
          endDate: formData.hasEndDate ? joinDateTime(formData.endDate, formData.endTime) : null,
          minCheckoutItemsQuantity:
            formData.requirementsPicker !== RequirementsPicker.Item
              ? 0
              : parseFloat(formData.minCheckoutItemsQuantity),
          startDate: joinDateTime(formData.startDate, formData.startTime),
          type:
            formData.discountType === DiscountType.Shipping
              ? VoucherType.Shipping
              : formData.type,
          usageLimit: formData.hasUsageLimit ? formData.usageLimit : null,
        },
      }).then(({ data }) => data?.updateVoucher?.errors ?? []),

      updateChannels({
        ...getChannelsVariables(id, formData, voucherChannelsChoices),
      }).then(({ data }) => data?.updateVoucherChannelListing?.errors ?? []),
    ]);

    return errors.flat();
  };
}
