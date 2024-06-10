import { joinDateTime } from '@core/utils/datetime';
import type { OperationResult } from '@urql/core';
import type { VoucherDetailsPageFormData } from '@dashboard/components/discounts/VoucherDetailsPage';
import { DiscountValueType, VoucherType } from '@core/api/constants';
import type {
  VoucherChannelListingUpdateMutation,
  VoucherChannelListingUpdateMutationVariables,
  VoucherDetailsFragment,
  VoucherUpdateMutation,
  VoucherUpdateMutationVariables,
} from '@core/api/graphql';
import type { ChannelVoucherData } from '@dashboard/oldSrc/channels/utils';
import { getChannelsVariables } from '@dashboard/oldSrc/discounts/handlers';
import { DiscountType, RequirementsPicker } from '@dashboard/oldSrc/discounts/types';

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

    const errors = await gather([
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
