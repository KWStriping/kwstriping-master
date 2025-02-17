'use client';

import { OrdersDocument } from '@tempo/api/generated/graphql';
import { useUser } from '@tempo/api/auth/react/hooks';
import { OrdersTable } from '@tempo/ui/components/orders/OrdersTable';
import { Pagination } from '@tempo/ui/components/Pagination';
import { Spinner } from '@tempo/ui/components/Spinner';
import { mapEdgesToItems } from '@tempo/ui/utils/maps';
import { useQuery } from '@tempo/api/hooks/useQuery';

function OrdersPage() {
  const { authenticated } = useUser();
  const [{ data: ordersCollection, fetching: loading, error }, fetch] = useQuery(OrdersDocument, {
    pause: !authenticated,
  });

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <p>
        Error
        {error.message}
      </p>
    );
  }

  const orders = mapEdgesToItems(ordersCollection?.me?.orders);

  const onLoadMore = () => {
    return fetch({
      variables: {
        after: ordersCollection?.me?.orders?.pageInfo.endCursor,
      },
    });
  };

  return (
    <>
      <OrdersTable orders={orders} />
      <Pagination
        onLoadMore={onLoadMore}
        pageInfo={ordersCollection?.me?.orders?.pageInfo}
        itemsCount={ordersCollection?.me?.orders?.edges.length}
        totalCount={ordersCollection?.me?.orders?.totalCount || undefined}
      />
    </>
  );
}

export default OrdersPage;

// OrdersPage.getLayout = function getLayout(page: ReactElement) {
//   return <AccountLayout>{page}</AccountLayout>;
// };
