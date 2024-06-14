import type { ChannelUsabilityDataQuery, ChannelUsabilityDataQueryVariables } from '@tempo/api/generated/graphql';
import * as m from '@paraglide/messages';
import { mapEdgesToItems } from '@tempo/ui/utils/maps';
import { useSearch } from '@tempo/api/hooks';
import { useQuery } from '@tempo/api/hooks/useQuery';
import type { PartialMutationProviderOutput } from '@tempo/api/types';
import { extractMutationErrors } from '@tempo/api/utils';
import type { OrderUrlDialog, OrderUrlQueryParams } from '@dashboard/oldSrc/urls';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { WindowTitle } from '@tempo/dashboard/components/core/WindowTitle';
import OrderAddressFields from '@tempo/dashboard/components/orders/OrderAddressFields';
import type { CustomerEditData } from '@tempo/dashboard/components/orders/OrderCustomer';
import type { OrderCustomerAddressesEditDialogOutput } from '@tempo/dashboard/components/orders/OrderCustomerAddressesEditDialog/types';
import { CustomerChangeActionEnum } from '@tempo/dashboard/components/orders/OrderCustomerChangeDialog/form';
import type { OrderCustomerChangeData } from '@tempo/dashboard/components/orders/OrderCustomerChangeDialog/form';
import OrderCustomerChangeDialog from '@tempo/dashboard/components/orders/OrderCustomerChangeDialog/OrderCustomerChangeDialog';
import OrderDraftCancelDialog from '@tempo/dashboard/components/orders/OrderDraftCancelDialog';
import OrderDraftPage from '@tempo/dashboard/components/orders/OrderDraftPage';
import OrderProductAddDialog from '@tempo/dashboard/components/orders/OrderProductAddDialog';
import OrderShippingMethodEditDialog from '@tempo/dashboard/components/orders/OrderShippingMethodEditDialog';
import { OrderDiscountProvider } from '@tempo/dashboard/components/products/OrderDiscountProviders/OrderDiscountProvider';
import { OrderLineDiscountProvider } from '@tempo/dashboard/components/products/OrderDiscountProviders/OrderLineDiscountProvider';
import { StockAvailability } from '@tempo/api/generated/constants';
import {
  ChannelUsabilityDataDocument,
  CustomerAddressesDocument,
  SearchCustomersDocument,
} from '@tempo/api/generated/graphql';
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
} from '@tempo/api/generated/graphql';
import { DEFAULT_INITIAL_SEARCH_DATA } from '@tempo/dashboard/oldSrc/config';
import { customerUrl } from '@tempo/dashboard/oldSrc/customers/urls';
import { getStringOrPlaceholder } from '@tempo/dashboard/oldSrc/misc';
import { getVariantSearchAddress } from '@tempo/dashboard/oldSrc/orders/utils/data';
import { productUrl } from '@tempo/dashboard/oldSrc/products/urls';
import { useOrderVariantSearch } from '@tempo/dashboard/oldSrc/searches/useOrderVariantSearch';

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

  const [{ data: channelUsabilityData }] = useQuery<ChannelUsabilityDataQuery, ChannelUsabilityDataQueryVariables>(ChannelUsabilityDataDocument, {
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
        title={
          m.dashboard_LNf_K({
            orderNumber: getStringOrPlaceholder(data?.order?.number),
          }) ?? 'Draft Order #{{orderNumber}}'
        }
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
