import { useTranslation } from '@core/i18n';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import { useSearch } from '@core/urql/hooks';
import { useQuery } from '@core/urql/hooks/useQuery';
import type { PartialMutationProviderOutput } from '@core/urql/types';
import { extractMutationErrors } from '@core/urql/utils';
import type { OrderUrlDialog, OrderUrlQueryParams } from '@dashboard/oldSrc/urls';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import OrderAddressFields from '@dashboard/components/orders/OrderAddressFields';
import type { CustomerEditData } from '@dashboard/components/orders/OrderCustomer';
import type { OrderCustomerAddressesEditDialogOutput } from '@dashboard/components/orders/OrderCustomerAddressesEditDialog/types';
import { CustomerChangeActionEnum } from '@dashboard/components/orders/OrderCustomerChangeDialog/form';
import type { OrderCustomerChangeData } from '@dashboard/components/orders/OrderCustomerChangeDialog/form';
import OrderCustomerChangeDialog from '@dashboard/components/orders/OrderCustomerChangeDialog/OrderCustomerChangeDialog';
import OrderDraftCancelDialog from '@dashboard/components/orders/OrderDraftCancelDialog';
import OrderDraftPage from '@dashboard/components/orders/OrderDraftPage';
import OrderProductAddDialog from '@dashboard/components/orders/OrderProductAddDialog';
import OrderShippingMethodEditDialog from '@dashboard/components/orders/OrderShippingMethodEditDialog';
import { OrderDiscountProvider } from '@dashboard/components/products/OrderDiscountProviders/OrderDiscountProvider';
import { OrderLineDiscountProvider } from '@dashboard/components/products/OrderDiscountProviders/OrderLineDiscountProvider';
import { StockAvailability } from '@core/api/constants';
import {
  ChannelUsabilityDataDocument,
  CustomerAddressesDocument,
  SearchCustomersDocument,
} from '@core/api/graphql';
import type {
  OrderDetailsQuery,
  OrderDraftCancelMutation,
  OrderDraftCancelMutationVariables,
  OrderDraftFinalizeMutation,
  OrderDraftFinalizeMutationVariables,
  OrderDraftUpdateMutation,
  OrderDraftUpdateMutationVariables,
  OrderLineUpdateMutation,
  OrderLineUpdateMutationVariables,
} from '@core/api/graphql';
import { DEFAULT_INITIAL_SEARCH_DATA } from '@dashboard/oldSrc/config';
import { customerUrl } from '@dashboard/oldSrc/customers/urls';
import { getStringOrPlaceholder } from '@dashboard/oldSrc/misc';
import { getVariantSearchAddress } from '@dashboard/oldSrc/orders/utils/data';
import { productUrl } from '@dashboard/oldSrc/products/urls';
import { useOrderVariantSearch } from '@dashboard/oldSrc/searches/useOrderVariantSearch';

interface OrderDraftDetailsProps {
  id: string;
  params: OrderUrlQueryParams;
  loading: unknown;
  data: OrderDetailsQuery;
  addNoteToOrder: unknown;
  updateOrderLine: PartialMutationProviderOutput<
    OrderLineUpdateMutation,
    OrderLineUpdateMutationVariables
  >;
  deleteOrderLine: unknown;
  orderShippingMethodUpdate: unknown;
  orderLinesAdd: unknown;
  orderDraftUpdate: PartialMutationProviderOutput<
    OrderDraftUpdateMutation,
    OrderDraftUpdateMutationVariables
  >;
  orderDraftCancel: PartialMutationProviderOutput<
    OrderDraftCancelMutation,
    OrderDraftCancelMutationVariables
  >;
  orderDraftFinalize: PartialMutationProviderOutput<
    OrderDraftFinalizeMutation,
    OrderDraftFinalizeMutationVariables
  >;
  openModal: (action: OrderUrlDialog, newParams?: OrderUrlQueryParams) => void;
  closeModal: unknown;
}

export const isAnyAddressEditModalOpen = (uri: string | undefined): boolean =>
  ['edit-customer-addresses', 'edit-shipping-address', 'edit-billing-address'].includes(uri);

export const OrderDraftDetails: FC<OrderDraftDetailsProps> = ({
  id,
  params,
  loading,
  data,
  addNoteToOrder,
  updateOrderLine,
  deleteOrderLine,
  orderShippingMethodUpdate,
  orderLinesAdd,
  orderDraftUpdate,
  orderDraftCancel,
  orderDraftFinalize,
  openModal,
  closeModal,
}) => {
  const order = data?.order;
  const router = useRouter();

  const [{ data: channelUsabilityData }] = useQuery(ChannelUsabilityDataDocument, {
    variables: {
      channel: order.channel.slug,
    },
  });

  const {
    loadMore,
    search: variantSearch,
    result: variantSearchOpts,
  } = useOrderVariantSearch({
    variables: {
      ...DEFAULT_INITIAL_SEARCH_DATA,
      channel: order.channel.slug,
      address: getVariantSearchAddress(order),
      isPublished: true,
      stockAvailability: StockAvailability.InStock,
    },
  });

  const {
    loadMore: loadMoreCustomers,
    search: searchUsers,
    result: users,
  } = useSearch(SearchCustomersDocument, {
    variables: DEFAULT_INITIAL_SEARCH_DATA,
  });

  const [{ data: customerAddresses, fetching: customerAddressesLoading }] = useQuery(
    CustomerAddressesDocument,
    {
      variables: {
        id: order?.user?.id,
      },
      pause: !order?.user?.id || !isAnyAddressEditModalOpen(params.action),
    }
  );

  const { t } = useTranslation();

  const handleCustomerChange = async ({
    user,
    userEmail,
    prevUser,
    prevUserEmail,
  }: CustomerEditData) => {
    const sameUser = user && user === prevUser;
    const sameUserEmail = userEmail && userEmail === prevUserEmail;
    if (sameUser || sameUserEmail) return;

    const result = await orderDraftUpdate.mutate({
      id,
      input: {
        user,
        userEmail,
      },
    });

    if (result?.data?.updateDraftOrder?.errors?.length) {
      return;
    }

    const modalUri = prevUser ? 'customer-change' : 'edit-customer-addresses';
    openModal(modalUri);
  };

  const handleCustomerChangeAction = (data: OrderCustomerChangeData) => {
    if (data?.changeActionOption === CustomerChangeActionEnum.ChangeAddress) {
      openModal('edit-customer-addresses');
    } else {
      closeModal();
    }
  };

  const handleCustomerChangeAddresses = async (
    data: Partial<OrderCustomerAddressesEditDialogOutput>
  ): Promise<unknown> =>
    orderDraftUpdate.mutate({
      id,
      input: data,
    });

  const handleOrderDraftCancel = async () => {
    const errors = await extractMutationErrors(orderDraftCancel.mutate({ id }));
    if (!errors?.length) {
      void router.push('/orders/drafts');
    }
    return errors;
  };

  const errors = orderDraftFinalize.opts.data?.completeOrderDraft?.errors || [];

  return (
    <>
      <WindowTitle
        title={t('dashboard.LNf6K', 'Draft Order #{{orderNumber}}', {
          orderNumber: getStringOrPlaceholder(data?.order?.number),
        })}
      />

      <OrderDiscountProvider order={order}>
        <OrderLineDiscountProvider order={order}>
          <OrderDraftPage
            disabled={loading}
            errors={errors}
            onNoteAdd={(variables) =>
              extractMutationErrors(
                addNoteToOrder.mutate({
                  input: variables,
                  order: id,
                })
              )
            }
            users={mapEdgesToItems(users?.data?.search)}
            hasMore={users?.data?.search?.pageInfo?.hasNextPage || false}
            onFetchMore={loadMoreCustomers}
            fetchUsers={searchUsers}
            loading={users.loading}
            usersLoading={users.loading}
            onCustomerEdit={handleCustomerChange}
            onDraftFinalize={() => orderDraftFinalize.mutate({ id })}
            onDraftRemove={() => openModal('cancel')}
            onOrderLineAdd={() => openModal('add-order-line')}
            order={order}
            channelUsabilityData={channelUsabilityData}
            onProductClick={(id) => () => router.push(productUrl(encodeURIComponent(id)))}
            onBillingAddressEdit={() => openModal('edit-billing-address')}
            onShippingAddressEdit={() => openModal('edit-shipping-address')}
            onShippingMethodEdit={() => openModal('edit-shipping')}
            onOrderLineRemove={(id) => deleteOrderLine.mutate({ id })}
            onOrderLineChange={(id, data) =>
              updateOrderLine.mutate({
                id,
                input: data,
              })
            }
            saveButtonBarState="default"
            onProfileView={() => router.push(customerUrl(order.user.id))}
          />
        </OrderLineDiscountProvider>
      </OrderDiscountProvider>
      <OrderDraftCancelDialog
        confirmButtonState={orderDraftCancel.opts.status}
        errors={orderDraftCancel.opts.data?.deleteOrderDraft?.errors || []}
        onClose={closeModal}
        onConfirm={handleOrderDraftCancel}
        open={params.action === 'cancel'}
        orderNumber={getStringOrPlaceholder(order?.number)}
      />
      <OrderShippingMethodEditDialog
        confirmButtonState={orderShippingMethodUpdate.opts.status}
        errors={orderShippingMethodUpdate.opts.data?.updateOrderShipping.errors || []}
        open={params.action === 'edit-shipping'}
        shippingMethod={order?.shippingMethod?.id}
        shippingMethods={order?.shippingMethods}
        onClose={closeModal}
        onSubmit={(variables) =>
          orderShippingMethodUpdate.mutate({
            id,
            input: {
              shippingMethod: variables.shippingMethod,
            },
          })
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
          extractMutationErrors(
            orderLinesAdd.mutate({
              id,
              input: variants.map((variant) => ({
                quantity: 1,
                productId: variant.id,
              })),
            })
          )
        }
      />
      <OrderCustomerChangeDialog
        open={params.action === 'customer-change'}
        onClose={closeModal}
        onConfirm={handleCustomerChangeAction}
      />
      <OrderAddressFields
        action={params?.action}
        orderShippingAddress={order?.shippingAddress}
        orderBillingAddress={order?.billingAddress}
        customerAddressesLoading={customerAddressesLoading}
        isDraft
        countries={data?.shop?.countries}
        customer={customerAddresses?.user}
        onClose={closeModal}
        onConfirm={handleCustomerChangeAddresses}
        confirmButtonState={orderDraftUpdate.opts.status}
        errors={orderDraftUpdate.opts.data?.updateDraftOrder.errors}
      />
    </>
  );
};

export default OrderDraftDetails;
