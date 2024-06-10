import { extractMutationErrors, getMutationErrors } from '@core/urql/utils';
import { joinDateTime } from '@core/utils/datetime';
import type { OperationResult } from '@urql/core';
import type { FormData } from '@dashboard/components/discounts/SaleCreatePage';
import { DiscountValueType } from '@core/api/constants';
import type {
  SaleChannelListingUpdateMutation,
  SaleChannelListingUpdateMutationVariables,
  SaleCreateMutation,
  SaleCreateMutationVariables,
  SaleType,
} from '@core/api/graphql';
import { getSaleChannelsVariables } from '@dashboard/oldSrc/discounts/handlers';
import { decimal } from '@dashboard/oldSrc/misc';

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
