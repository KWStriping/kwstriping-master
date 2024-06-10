import { extractMutationErrors, getMutationErrors } from '@core/urql/utils';
import { joinDateTime } from '@core/utils/datetime';
import type { OperationResult } from '@urql/core';
import { assert } from 'tsafe/assert';
import type { VoucherDetailsPageFormData } from '@dashboard/components/discounts/VoucherDetailsPage';
import { DiscountValueType, VoucherType } from '@core/api/constants';
import type {
  VoucherChannelListingUpdateMutation,
  VoucherChannelListingUpdateMutationVariables,
  VoucherCreateMutation,
  VoucherCreateMutationVariables,
} from '@core/api/graphql';
import { getChannelsVariables } from '@dashboard/oldSrc/discounts/handlers';
import { DiscountType, RequirementsPicker } from '@dashboard/oldSrc/discounts/types';

export function createHandler(
  createVoucher: (
    variables: VoucherCreateMutationVariables
  ) => Promise<OperationResult<VoucherCreateMutation>>,
  updateChannels: (
    variables: VoucherChannelListingUpdateMutationVariables
  ) => Promise<OperationResult<VoucherChannelListingUpdateMutation>>
) {
  return async (formData: VoucherDetailsPageFormData) => {
    const response = await createVoucher({
      input: {
        applyOncePerCustomer: formData.applyOncePerCustomer,
        applyOncePerOrder: formData.applyOncePerOrder,
        onlyForStaff: formData.onlyForStaff,
        code: formData.code,
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
    });

    const errors = getMutationErrors(response);

    if (errors?.length) {
      return { errors };
    }
    assert(!!response.data?.createVoucher?.voucher?.id);
    const channelsUpdateErrors = await extractMutationErrors(
      updateChannels({
        ...getChannelsVariables(
          response.data?.createVoucher?.voucher?.id,
          formData,
          formData.channelListings
        ),
      })
    );

    if (channelsUpdateErrors?.length) {
      return { errors: channelsUpdateErrors };
    }

    return { id: response.data?.createVoucher?.voucher?.id };
  };
}
