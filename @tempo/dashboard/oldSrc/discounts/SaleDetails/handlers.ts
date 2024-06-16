import { joinDateTime } from '@tempo/utils/datetime';
import type { OperationResult } from '@urql/core';
import type {
  ChannelSaleFormData,
  SaleDetailsPageFormData,
} from '@tempo/dashboard/components/discounts/SaleDetailsPage';
import type {
  SaleDetailsFragment,
  SaleType,
  SaleUpdateMutation,
  SaleUpdateMutationVariables,
} from '@tempo/api/generated/graphql';
import { DiscountValueType } from '@tempo/api/generated/constants';
import { getSaleChannelsVariables } from '@tempo/dashboard/oldSrc/discounts/handlers';

function discountValueType(type: SaleType): DiscountValueType {
  return type.toString() === DiscountValueType.Fixed
    ? DiscountValueType.Fixed
    : DiscountValueType.Percentage;
}

export function createUpdateHandler(
  sale: SaleDetailsFragment,
  saleChannelsChoices: ChannelSaleFormData[],
  updateSale: (
    variables: SaleUpdateMutationVariables
  ) => Promise<OperationResult<SaleUpdateMutation>>
) {
  return async (formData: SaleDetailsPageFormData) => {
    const { id } = sale;
    const errors = await Promise.all([
      updateSale({
        id,
        input: {
          endDate: formData.hasEndDate ? joinDateTime(formData.endDate, formData.endTime) : null,
          name: formData.name,
          startDate: joinDateTime(formData.startDate, formData.startTime),
          type: discountValueType(formData.type),
        },
        channelInput: getSaleChannelsVariables(
          id,
          formData,
          saleChannelsChoices.map((channel) => channel.id)
        ).input,
      }).then(({ data }) => data?.updateSale?.errors ?? []),
    ]);

    return errors.flat();
  };
}
