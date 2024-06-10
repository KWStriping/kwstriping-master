import { useTranslation } from '@core/i18n';
import { useShopSettings } from '@core/ui';
import { getMutationErrors } from '@core/urql/utils';
import CardSpacer from '@dashboard/components/core/CardSpacer';
import CardTitle from '@dashboard/components/core/CardTitle';
import SaveBar from '@dashboard/components/core/SaveBar';
import ControlledCheckbox from '@dashboard/components/forms/ControlledCheckbox';
import Form from '@dashboard/components/forms/Form';
import { OrderErrorCode } from '@core/api/constants';

import type { OrderFulfillStockInput } from '@core/api/graphql';
import type { FormsetData } from '@dashboard/hooks/useFormset';
import type { OrderFulfillUrlQueryParams } from '@dashboard/oldSrc/orders/urls';
import { orderUrl } from '@dashboard/oldSrc/orders/urls';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import { useEffect, useState } from 'react';

interface OrderFulfillFormData {
  sendInfo: boolean;
  allowStockToBeExceeded: boolean;
}
export interface OrderFulfillSubmitData extends OrderFulfillFormData {
  items: FormsetData<null, OrderFulfillStockInput[]>;
}

const initialFormData: OrderFulfillFormData = {
  sendInfo: true,
  allowStockToBeExceeded: false,
};

export interface OrderFulfillProps {
  orderId: string;
  params: OrderFulfillUrlQueryParams;
}

const OrderFulfillment = () => {
  const [displayStockExceededDialog, setDisplayStockExceededDialog] = useState(false);
  const { autoApproveFulfillment } = useShopSettings();
  const { t } = useTranslation();
  const handleSubmit = ({
    formData,
    allowStockToBeExceeded,
  }: {
    formData: OrderFulfillFormData;
    allowStockToBeExceeded: boolean;
  }) => {
    setDisplayStockExceededDialog(false);
    return onSubmit({
      ...formData,
      allowStockToBeExceeded,
      items: formsetData
        .filter((item) => !!item.value)
        .map((item) => ({
          ...item,
          value: item.value.map((value) => ({
            quantity: value.quantity,
            warehouse: value.warehouse.id,
          })),
        })),
    });
  };

  const errors = fulfillOrderOpts.data?.fulfillOrder?.errors;

  useEffect(() => {
    if (errors && errors.every((err) => err.code === OrderErrorCode.InsufficientStock)) {
      setDisplayStockExceededDialog(true);
    }
  }, [errors]);

  const notAllowedToFulfillUnpaid =
    settings?.shop?.autoApproveFulfillment &&
    !settings?.shop?.fulfillmentAllowUnpaid &&
    !order?.isPaid;

  const areWarehousesSet = formsetData
    .filter((item) => !!item?.value) // preorder case
    .every((line) => line.value.every((v) => v.warehouse));

  const loading = fetching || settingsLoading || fulfillOrderOpts.fetching;

  const shouldEnableSave = () => {
    if (!order || loading) {
      return false;
    }

    if (notAllowedToFulfillUnpaid) {
      return false;
    }

    const isAtLeastOneFulfilled = formsetData?.some((el) => !!el.value?.[0]?.quantity);

    const overfulfill = formsetData
      .filter((item) => !!item?.value) // this can be removed after preorder is dropped
      .some((item) => {
        const formQuantityFulfilled = item?.value?.[0]?.quantity;
        const quantityToFulfill = order?.lines?.find(
          (line) => line.id === item.id
        ).quantityToFulfill;
        return formQuantityFulfilled > quantityToFulfill;
      });

    return !overfulfill && isAtLeastOneFulfilled && areWarehousesSet;
  };

  const onSubmit = async (formData: OrderFulfillSubmitData) => {
    const res = await fulfillOrder({
      input: {
        lines: formData.items
          .filter((line) => !!line?.value)
          .map((line) => ({
            orderLineId: line.id,
            stocks: line.value,
          })),
        notifyCustomer: settings?.shop?.autoApproveFulfillment && formData.sendInfo,
        allowStockToBeExceeded: formData.allowStockToBeExceeded,
      },
      orderId,
    });

    return getMutationErrors(res);
  };

  return (
    <>
      <Container>
        <Form
          confirmLeave
          initial={initialFormData}
          onSubmit={(formData) =>
            handleSubmit({
              formData,
              allowStockToBeExceeded: displayStockExceededDialog,
            })
          }
        >
          {({ change, data, submit }) => (
            <>
              <Card>
                <CardTitle title={t('dashboard.itemsReadyToShip', 'Items ready to ship')} />
                {order ? (
                  <OrderFulfillmentTable order={order} />
                ) : (
                  <CardContent>
                    <Skeleton />
                  </CardContent>
                )}
              </Card>

              <CardSpacer />

              {autoApproveFulfillment && (
                <Card>
                  <CardTitle title={t('dashboard.shipmentInformation', 'Shipment information')} />
                  <CardContent>
                    <ControlledCheckbox
                      checked={data?.sendInfo}
                      label={t(
                        'dashboard.sentShipmentDetails',
                        'Send shipment details to customer'
                      )}
                      name="sendInfo"
                      onChange={change}
                    />
                  </CardContent>
                </Card>
              )}

              <SaveBar
                disabled={!shouldEnableSave()}
                labels={{
                  confirm: settings?.shop?.autoApproveFulfillment
                    ? t('dashboard.submitFulfillment', 'Fulfill')
                    : t('dashboard.submitPrepareFulfillment', 'Prepare fulfillment'),
                }}
                state={fulfillOrderOpts.status}
                tooltips={{
                  confirm:
                    notAllowedToFulfillUnpaid &&
                    t(
                      'dashboard.cannotFulfillUnpaidOrder',
                      'Can’t fulfill until payment is captured'
                    ),
                }}
                onSubmit={submit}
                onCancel={() => router.push(orderUrl(order?.id))}
              />
              <OrderFulfillStockExceededDialog
                open={displayStockExceededDialog}
                lines={order?.lines}
                formsetData={formsetData}
                confirmButtonState={fulfillOrderOpts.status}
                onSubmit={submit}
                onClose={() => setDisplayStockExceededDialog(false)}
              />
            </>
          )}
        </Form>
      </Container>
    </>
  );
};

export default OrderFulfillment;
