import { useTranslation } from '@core/i18n';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
import { WarehouseClickAndCollectOption } from '@core/api/constants';
import type { OrderDetailsFragment } from '@core/api/graphql';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

interface PickupAnnotationProps {
  order?: Maybe<OrderDetailsFragment>;
}

export const PickupAnnotation: FC<PickupAnnotationProps> = ({ order }) => {
  const { t } = useTranslation();
  if (order?.fulfillmentMethod?.__typename === 'Warehouse') {
    return (
      <>
        <FormSpacer />
        <Typography variant="caption" color="textSecondary">
          {order?.fulfillmentMethod?.clickAndCollectOption ===
          WarehouseClickAndCollectOption.Local
            ? t('dashboard.orderCustomerFulfillmentLocal', 'Fulfill from Local Stock')
            : t('dashboard.orderCustomerFulfillmentAll', 'Fulfill from All Warehouses')}
        </Typography>
      </>
    );
  }
  return null;
};
