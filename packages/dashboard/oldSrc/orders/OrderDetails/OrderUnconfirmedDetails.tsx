import { useTranslation } from '@core/i18n';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import { useQuery } from '@core/urql/hooks/useQuery';
import { extractMutationErrors, getMutationState } from '@core/urql/utils';
import type { OrderUrlQueryParams } from '@dashboard/oldSrc/urls';
import { useRouter } from 'next/router';
import { useState } from 'react';
import type { FC } from 'react';
import { isAnyAddressEditModalOpen } from '../OrderDraftDetails';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import OrderAddressFields from '@dashboard/components/orders/OrderAddressFields';
import OrderCancelDialog from '@dashboard/components/orders/OrderCancelDialog';
import OrderCannotCancelOrderDialog from '@dashboard/components/orders/OrderCannotCancelOrderDialog';
import type { OrderCustomerAddressesEditDialogOutput } from '@dashboard/components/orders/OrderCustomerAddressesEditDialog/types';
import OrderDetailsPage from '@dashboard/components/orders/OrderDetailsPage';
import OrderFulfillmentApproveDialog from '@dashboard/components/orders/OrderFulfillmentApproveDialog';
import OrderFulfillmentCancelDialog from '@dashboard/components/orders/OrderFulfillmentCancelDialog';
import OrderFulfillmentTrackingDialog from '@dashboard/components/orders/OrderFulfillmentTrackingDialog';
import OrderInvoiceEmailSendDialog from '@dashboard/components/orders/OrderInvoiceEmailSendDialog';
import OrderMarkAsPaidDialog from '@dashboard/components/orders/OrderMarkAsPaidDialog';
import OrderPaymentDialog from '@dashboard/components/orders/OrderPaymentDialog';
import OrderPaymentVoidDialog from '@dashboard/components/orders/OrderPaymentVoidDialog';
import OrderProductAddDialog from '@dashboard/components/orders/OrderProductAddDialog';
import OrderShippingMethodEditDialog from '@dashboard/components/orders/OrderShippingMethodEditDialog';
import { OrderDiscountProvider } from '@dashboard/components/products/OrderDiscountProviders/OrderDiscountProvider';
import { OrderLineDiscountProvider } from '@dashboard/components/products/OrderDiscountProviders/OrderLineDiscountProvider';
import { FulfillmentStatus } from '@core/api/constants';
import {
  CustomerAddressesDocument,
  OrderConfirmDocument,
  WarehouseListDocument,
} from '@core/api/graphql';
import type {
  OrderFulfillmentApproveMutation,
  OrderFulfillmentApproveMutationVariables,
  OrderUpdateMutation,
  OrderUpdateMutationVariables,
} from '@core/api/graphql';
import { DEFAULT_INITIAL_SEARCH_DATA } from '@dashboard/oldSrc/config';
import { customerUrl } from '@dashboard/oldSrc/customers/urls';
import { getStringOrPlaceholder } from '@dashboard/oldSrc/misc';
import { useOrderVariantSearch } from '@dashboard/oldSrc/searches/useOrderVariantSearch';
import type { PartialMutationProviderOutput } from '@dashboard/oldSrc/types';

interface OrderUnconfirmedDetailsProps {
  id: string;
  params: OrderUrlQueryParams;
  updateOrder: PartialMutationProviderOutput<OrderUpdateMutation, OrderUpdateMutationVariables>;
  approveFulfillment: PartialMutationProviderOutput<
    OrderFulfillmentApproveMutation,
    OrderFulfillmentApproveMutationVariables
  >;
}

export const OrderUnconfirmedDetails: FC<OrderUnconfirmedDetailsProps> = ({
  id,
  order,
  params,
}) => {
  const router = useRouter();
  const {
    loadMore,
    search: variantSearch,
    result: variantSearchOpts,
  } = useOrderVariantSearch({
    ...DEFAULT_INITIAL_SEARCH_DATA,
    channel: order.channel.slug,
  });
  const [warehouses] = useQuery(WarehouseListDocument, {
    displayLoader: true,
    variables: {
      first: 30,
    },
  });

  const [confirmOrder] = useMutation(OrderConfirmDocument, {
    onCompleted: ({ confirmOrder: { errors } }) => {
      const isError = !!errors?.length;
      notify(isError ? getOrderErrorMessage(errors[0], t) : 'Confirmed Order', {
        type: isError ? 'error' : 'success',
      });
    },
  });

  const handleSubmit = async (data: MetadataFormData) => {
    if (order?.status === OrderStatus.Unconfirmed) {
      await confirmOrder({ id: order?.id });
    }

    const update = createMetadataUpdateHandler(
      order,
      () => Promise.resolve([]),
      (variables) => updateMetadata({ ...variables }),
      (variables) => updatePrivateMetadata({ ...variables })
    );

    const result = await update(data);

    if (result.length === 0) {
      notify(t('dashboard.savedChanges', 'Saved changes'), {
        type: 'success',
      });
    }

    return result;
  };

  const [{ data: customerAddresses, fetching: customerAddressesLoading }] = useQuery(
    CustomerAddressesDocument,
    {
      variables: {
        id: order?.user?.id,
      },
      pause: !order?.user?.id || !isAnyAddressEditModalOpen(params.action),
    }
  );

  const handleCustomerChangeAddresses = async (
    data: Partial<OrderCustomerAddressesEditDialogOutput>
  ): Promise<unknown> =>
    updateOrder.mutate({
      id,
      input: data,
    });

  const { t } = useTranslation();
  const [transactionReference, setTransactionReference] = useState('');

  const errors = updateOrder.opts.data?.updateOrder?.errors || [];

  return (
    <>
      <WindowTitle
        title={t('dashboard.bBCmr', 'Order #{{orderNumber}}', {
          orderNumber: getStringOrPlaceholder(order.number),
        })}
      />
      <OrderDiscountProvider order={order}>
        <OrderLineDiscountProvider order={order}>
          <OrderDetailsPage
            onOrderReturn={() => router.push({ pathname: '/orders/[id]/return', query: { id } })}
            disabled={updateMetadataOpts.fetching || updatePrivateMetadataOpts.fetching}
            errors={errors}
            onNoteAdd={(variables) =>
              extractMutationErrors(
                addNoteToOrder.mutate({
                  input: variables,
                  order: id,
                })
              )
            }
            order={order}
            shop={shop}
            onOrderLineAdd={() => openModal('add-order-line')}
            onOrderLineChange={(id, data) =>
              updateOrderLine.mutate({
                id,
                input: data,
              })
            }
            onOrderLineRemove={(id) => deleteOrderLine.mutate({ id })}
            onShippingMethodEdit={() => openModal('edit-shipping')}
            saveButtonBarState={getMutationState(
              updateMetadataOpts.called || updatePrivateMetadataOpts.called,
              updateMetadataOpts.fetching || updatePrivateMetadataOpts.fetching,
              [
                ...(updateMetadataOpts.data?.deleteMetadata?.errors || []),
                ...(updateMetadataOpts.data?.updateMetadata?.errors || []),
                ...(updatePrivateMetadataOpts.data?.deletePrivateMetadata?.errors || []),
                ...(updatePrivateMetadataOpts.data?.updatePrivateMetadata?.errors || []),
              ]
            )}
            shippingMethods={data?.order?.shippingMethods || []}
            onOrderCancel={() => openModal('cancel')}
            onOrderFulfill={() =>
              router.push({ pathname: '/orders/[id]/fulfill', query: { id } })
            }
            onFulfillmentApprove={(fulfillmentId) =>
              void router.push({
                pathname: '/orders/[id]',
                query: { action: 'approve-fulfillment', id: fulfillmentId },
              })
            }
            onFulfillmentCancel={(fulfillmentId) =>
              void router.push({
                pathname: '/orders/[id]',
                query: { action: 'cancel-fulfillment', id: fulfillmentId },
              })
            }
            onFulfillmentTrackingNumberUpdate={(fulfillmentId) =>
              void router.push({
                pathname: '/orders/[id]',
                query: { action: 'edit-fulfillment', id: fulfillmentId },
              })
            }
            onPaymentCapture={() => openModal('capture')}
            onPaymentVoid={() => openModal('void')}
            onPaymentRefund={() =>
              router.push({ pathname: '/orders/[id]/refund', query: { id } })
            }
            onProductClick={(id) => () =>
              router.push({ pathname: '/products/[id]', query: { id } })
            }
            onBillingAddressEdit={() => openModal('edit-billing-address')}
            onShippingAddressEdit={() => openModal('edit-shipping-address')}
            onPaymentPaid={() => openModal('mark-paid')}
            onProfileView={() => router.push(customerUrl(order.user.id))}
            onInvoiceClick={(id) =>
              window.open(
                order.invoices.find((invoice) => invoice.id === id)?.url,
                '_blank',
                'rel=noopener'
              )
            }
            onInvoiceGenerate={() =>
              orderInvoiceRequest.mutate({
                orderId: id,
              })
            }
            onInvoiceSend={(id) => openModal('invoice-send', { id })}
            onSubmit={handleSubmit}
          />
        </OrderLineDiscountProvider>
      </OrderDiscountProvider>
      <OrderCannotCancelOrderDialog
        onClose={closeModal}
        open={
          params.action === 'cancel' &&
          order?.fulfillments.some(
            (fulfillment) => fulfillment.status === FulfillmentStatus.Fulfilled
          )
        }
      />
      <OrderCancelDialog
        confirmButtonState={cancelOrder.opts.status}
        errors={cancelOrder.opts.data?.cancelOrder.errors || []}
        number={order?.number}
        open={params.action === 'cancel'}
        onClose={closeModal}
        onSubmit={() =>
          cancelOrder.mutate({
            id,
          })
        }
      />
      <OrderShippingMethodEditDialog
        confirmButtonState={orderShippingMethodUpdate.opts.status}
        errors={orderShippingMethodUpdate.opts.data?.updateOrderShipping.errors || []}
        open={params.action === 'edit-shipping'}
        shippingMethod={order?.shippingMethod?.id}
        shippingMethods={order?.shippingMethods}
        onClose={closeModal}
        onSubmit={(variables) =>
          extractMutationErrors(
            orderShippingMethodUpdate.mutate({
              id,
              input: {
                shippingMethod: variables.shippingMethod,
              },
            })
          )
        }
      />
      <OrderProductAddDialog
        confirmButtonState={orderLinesAdd.opts.status}
        errors={orderLinesAdd.opts.data?.createOrderLines?.errors || []}
        loading={variantSearchOpts.fetching}
        open={params.action === 'add-order-line'}
        hasMore={variantSearchOpts.data?.search?.pageInfo.hasNextPage}
        products={mapEdgesToItems(variantSearchOpts?.data?.search)}
        onClose={closeModal}
        onFetch={variantSearch}
        onFetchMore={loadMore}
        onSubmit={(variants) =>
          orderLinesAdd.mutate({
            id,
            input: variants.map((variant) => ({
              quantity: 1,
              productId: variant.id,
            })),
          })
        }
      />
      <OrderMarkAsPaidDialog
        confirmButtonState={orderPaymentMarkAsPaid.opts.status}
        errors={orderPaymentMarkAsPaid.opts.data?.markOrderAsPaid.errors || []}
        onClose={closeModal}
        onConfirm={() =>
          orderPaymentMarkAsPaid.mutate({
            id,
            transactionReference,
          })
        }
        open={params.action === 'mark-paid'}
        transactionReference={transactionReference}
        handleTransactionReference={({ target }) => setTransactionReference(target.value)}
      />
      <OrderPaymentVoidDialog
        confirmButtonState={voidOrder.opts.status}
        errors={voidOrder.opts.data?.voidOrder.errors || []}
        open={params.action === 'void'}
        onClose={closeModal}
        onConfirm={() => voidOrder.mutate({ id })}
      />
      <OrderPaymentDialog
        confirmButtonState={orderPaymentCapture.opts.status}
        errors={orderPaymentCapture.opts.data?.captureOrder?.errors || []}
        initial={order?.total.gross.amount}
        open={params.action === 'capture'}
        onClose={closeModal}
        onSubmit={(variables) =>
          orderPaymentCapture.mutate({
            ...variables,
            id,
          })
        }
      />
      <OrderFulfillmentApproveDialog
        confirmButtonState={approveFulfillment.opts.status}
        errors={approveFulfillment.opts.data?.approveFulfillment?.errors || []}
        open={params.action === 'approve-fulfillment'}
        onConfirm={({ notifyCustomer }) =>
          approveFulfillment.mutate({
            id: params.id,
            notifyCustomer,
          })
        }
        onClose={closeModal}
      />
      <OrderFulfillmentCancelDialog
        confirmButtonState={cancelFulfillment.opts.status}
        errors={cancelFulfillment.opts.data?.cancelFulfillment.errors || []}
        open={params.action === 'cancel-fulfillment'}
        warehouses={mapEdgesToItems(warehouses?.data?.warehouses)}
        onConfirm={(variables) =>
          cancelFulfillment.mutate({
            id: params.id,
            input: variables,
          })
        }
        onClose={closeModal}
      />
      <OrderFulfillmentTrackingDialog
        confirmButtonState={updateFulfillmentTracking.opts.status}
        errors={
          updateFulfillmentTracking.opts.data?.updateFulfillmentTracking.errors || []
        }
        open={params.action === 'edit-fulfillment'}
        trackingNumber={
          data?.order?.fulfillments.find((fulfillment) => fulfillment.id === params.id)
            ?.trackingNumber
        }
        onConfirm={(variables) =>
          updateFulfillmentTracking.mutate({
            id: params.id,
            input: {
              ...variables,
              notifyCustomer: true,
            },
          })
        }
        onClose={closeModal}
      />
      <OrderInvoiceEmailSendDialog
        confirmButtonState={orderInvoiceSend.opts.status}
        errors={orderInvoiceSend.opts.data?.invoiceSendEmail.errors || []}
        open={params.action === 'invoice-send'}
        invoice={order?.invoices?.find((invoice) => invoice.id === params.id)}
        onClose={closeModal}
        onSend={() => orderInvoiceSend.mutate({ id: params.id })}
      />
      <OrderAddressFields
        action={params?.action}
        customerAddressesLoading={customerAddressesLoading}
        orderShippingAddress={order?.shippingAddress}
        orderBillingAddress={order?.billingAddress}
        isDraft={false}
        countries={data?.shop?.countries}
        customer={customerAddresses?.user}
        onClose={closeModal}
        onConfirm={handleCustomerChangeAddresses}
        confirmButtonState={updateOrder.opts.status}
        errors={updateOrder.opts.data?.updateOrder.errors}
      />
    </>
  );
};

export default OrderUnconfirmedDetails;
