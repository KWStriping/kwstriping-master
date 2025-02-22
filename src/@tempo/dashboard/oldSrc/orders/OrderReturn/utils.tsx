import type {
  OrderDetailsFragment,
  OrderReturnFulfillmentLineInput,
  OrderReturnLineInput,
  OrderReturnProductsInput,
} from '@tempo/api/generated/graphql';
import { getById } from '@tempo/utils';
import { OrderRefundAmountCalculationMode } from '@tempo/dashboard/components/orders/OrderRefundPage/form';
import type {
  FormsetQuantityData,
  OrderReturnFormData,
} from '@tempo/dashboard/components/orders/OrderReturnPage/form';

class ReturnFormDataParser {
  private order: OrderDetailsFragment;
  private formData: OrderReturnFormData;

  constructor(order: OrderDetailsFragment, formData: OrderReturnFormData) {
    this.order = order;
    this.formData = formData;
  }

  public getParsedData = (): OrderReturnProductsInput => {
    const {
      fulfilledItemsQuantities,
      waitingItemsQuantities,
      unfulfilledItemsQuantities,
      refundShipmentCosts,
    } = this.formData;

    const fulfillmentLines = this.getParsedLineData<OrderReturnFulfillmentLineInput>(
      fulfilledItemsQuantities,
      'fulfillmentLineId'
    );

    const waitingLines = this.getParsedLineData<OrderReturnFulfillmentLineInput>(
      waitingItemsQuantities,
      'fulfillmentLineId'
    );

    const orderLines = this.getParsedLineData<OrderReturnLineInput>(
      unfulfilledItemsQuantities,
      'orderLineId'
    );

    return {
      amountToRefund: this.getAmountToRefund(),
      fulfillmentLines: fulfillmentLines.concat(waitingLines),
      includeShippingCosts: refundShipmentCosts,
      orderLines,
      refund: this.getShouldRefund(orderLines, fulfillmentLines),
    };
  };

  private getAmountToRefund = (): number | undefined =>
    this.formData.amountCalculationMode === OrderRefundAmountCalculationMode.Manual
      ? this.formData.amount
      : undefined;

  private getParsedLineData = <T extends OrderReturnFulfillmentLineInput | OrderReturnLineInput>(
    itemsQuantities: FormsetQuantityData,
    idKey: 'fulfillmentLineId' | 'orderLineId'
  ): T[] => {
    const { itemsToBeReplaced } = this.formData;

    return itemsQuantities.reduce((result, { value: quantity, id }) => {
      if (!quantity) {
        return result;
      }

      const shouldReplace = !!itemsToBeReplaced.find(getById(id))?.value;

      return [...result, { [idKey]: id, quantity, replace: shouldReplace } as unknown as T];
    }, []);
  };

  private getShouldRefund = (
    orderLines: OrderReturnLineInput[],
    fulfillmentLines: OrderReturnFulfillmentLineInput[]
  ) => {
    if (
      !this.order.totalCaptured?.amount ||
      this.formData.amountCalculationMode === OrderRefundAmountCalculationMode.None
    ) {
      return false;
    }

    if (this.getAmountToRefund()) {
      return true;
    }

    return (
      orderLines.some(ReturnFormDataParser.isLineRefundable) ||
      fulfillmentLines.some(ReturnFormDataParser.isLineRefundable)
    );
  };

  // eslint-disable-next-line ts/member-ordering
  private static isLineRefundable = function <
    T extends OrderReturnLineInput | OrderReturnFulfillmentLineInput,
  >({ replace }: T) {
    return !replace;
  };
}

export default ReturnFormDataParser;
