import type { ProductListAttributeFragment } from '@tempo/api/generated/graphql';
import Skeleton from '@mui/material/Skeleton';
import type { FC } from 'react';

import { getAttributeIdFromColumnValue } from '../ProductListPage/utils';
import Date from '@tempo/dashboard/components/core/Date';

export interface ProductListAttributeProps {
  attribute: string;
  productAttributes: ProductListAttributeFragment[];
}

const ProductListAttribute: FC<ProductListAttributeProps> = ({
  attribute: gridAttribute,
  productAttributes,
}) => {
  if (!productAttributes) {
    return <Skeleton />;
  }

  const productAttribute = productAttributes.find(
    (attribute) => attribute.attribute.id === getAttributeIdFromColumnValue(gridAttribute)
  );
  if (productAttribute) {
    if (productAttribute.values.length) {
      if (productAttribute.values[0]?.date) {
        return <Date date={productAttribute.values[0].date} />;
      }
      if (productAttribute.values[0]?.dateTime) {
        return <Date date={productAttribute.values[0].dateTime} />;
      }
    }

    const textValue = productAttribute.values.map((value) => value.name).join(', ');

    return <span title={textValue}>{textValue}</span>;
  }
  return <span>-</span>;
};

export default ProductListAttribute;
