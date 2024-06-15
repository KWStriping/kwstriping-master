import type { CheckoutLineFragment, OrderLineFragment } from '@tempo/api/generated/graphql';
import compact from 'lodash-es/compact';

export const isCheckoutLine = (
  line: CheckoutLineFragment | OrderLineFragment
): line is CheckoutLineFragment => line.__typename === 'CheckoutLine';

export const getThumbnailFromLine = (line: CheckoutLineFragment) =>
  line.product.media?.find(({ type }) => type === 'IMAGE') ||
  line.product.media?.find(({ type }) => type === 'IMAGE');

export const getSummaryLineProps = (line: OrderLineFragment | CheckoutLineFragment) =>
  isCheckoutLine(line)
    ? {
      productName: line.product.name,
      productName: line.product.name,
      productImage: getThumbnailFromLine(line),
    }
    : {
      productName: line.productName,
      productName: line.productName,
      productImage: line.thumbnail,
    };

export const getSummaryLineAttributesText = (line: CheckoutLineFragment | OrderLineFragment) =>
  compact(
    line.product?.attributes.reduce(
      (result: Array<string | undefined | null>, { values }) => [
        ...result,
        ...values.map(({ name }) => name),
      ],
      []
    )
  ).join(', ') || '';
