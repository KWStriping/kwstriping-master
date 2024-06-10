import * as m from '@paraglide/messages';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';
import { WarehouseClickAndCollectOption } from '@tempo/api/generated/constants';
import type { OrderDetailsFragment } from '@tempo/api/generated/graphql';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

interface PickupAnnotationProps {
  order?: Maybe<OrderDetailsFragment>;
}

export const PickupAnnotation: FC<PickupAnnotationProps> = ({ order }) => {
  if (order?.fulfillmentMethod?.__typename === 'Warehouse') {
    return (
      <>
        <FormSpacer />
        <Typography variant="caption" color="textSecondary">
          {order?.fulfillmentMethod?.clickAndCollectOption ===
          WarehouseClickAndCollectOption.Local
            ? m.dashboard_orderCustomerFulfillmentLocal() ?? 'Fulfill from Local Stock'
            : m.dashboard_orderCustomerFulfillmentAll() ?? 'Fulfill from All Warehouses'}
        </Typography>
      </>
    );
  }
  return null;
};
