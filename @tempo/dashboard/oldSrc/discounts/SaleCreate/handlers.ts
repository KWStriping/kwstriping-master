import { extractMutationErrors, getMutationErrors } from '@tempo/api/utils';
import { joinDateTime } from '@tempo/utils/datetime';
import type { OperationResult } from '@apollo/client';
import { DiscountValueType } from '@tempo/api/generated/constants';
import type {
  SaleChannelListingUpdateMutation,
  SaleChannelListingUpdateMutationVariables,
  SaleCreateMutation,
  SaleCreateMutationVariables,
  SaleType,
} from '@tempo/api/generated/graphql';
import type { FormData } from '@tempo/dashboard/components/discounts/SaleCreatePage';
import { getSaleChannelsVariables } from '@tempo/dashboard/oldSrc/discounts/handlers';
import { decimal } from '@tempo/dashboard/oldSrc/misc';

function discountValueEnum(type: SaleType): DiscountValueType {
  return type.toString() === DiscountValueType.Fixed
    ? DiscountValueType.Fixed
    : DiscountValueType.Percentage;
}

export function createHandler(
  createSale: (
    variables: SaleCreateMutationVariables
  ) => Promise<OperationResult<SaleCreateMutation>>,
  updateChannels: (
    variables: SaleChannelListingUpdateMutationVariables
  ) => Promise<OperationResult<SaleChannelListingUpdateMutation>>
) {
  return async (formData: FormData) => {
    const response = await createSale({
      input: {
        endDate: formData.hasEndDate ? joinDateTime(formData.endDate, formData.endTime) : null,
        name: formData.name,
        startDate: joinDateTime(formData.startDate, formData.startTime),
        type: discountValueEnum(formData.type),
        value: decimal(formData.value),
      },
    });

    const errors = getMutationErrors(response);

    if (errors?.length) {
      return { errors };
    }

    const updateChannelsErrors = await extractMutationErrors(
      updateChannels({
        ...getSaleChannelsVariables(response.data?.createSale?.sale?.id, formData),
      })
    );

    if (updateChannelsErrors?.length) {
      return { errors: updateChannelsErrors };
    }

    return { id: response.data?.createSale?.sale?.id };
  };
}
