'use client';

import { OrdersTable } from '@tempo/ui/components/orders/OrdersTable';
import { Pagination } from '@tempo/ui/components/Pagination';
import { Spinner } from '@tempo/ui/components/Spinner';
import { mapEdgesToItems } from '@tempo/ui/utils/maps';
import type { OrdersQuery } from '@tempo/api/generated/graphql';

interface OrdersPageProps {
  data: NonNullable<OrdersQuery['me']>;
  loading?: boolean;
  error?: any;
}

function OrdersPage({ data, loading = false, error = undefined }: OrdersPageProps) {
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

  const orders = mapEdgesToItems(data?.orders);

  return (
    <>
      <OrdersTable orders={orders} />
      <Pagination
        onLoadMore={() => null}
        pageInfo={data?.orders?.pageInfo}
        itemsCount={data?.orders?.edges.length}
        totalCount={data?.orders?.totalCount || undefined}
      />
    </>
  );
}

export default OrdersPage;

// OrdersPage.getLayout = function getLayout(page: ReactElement) {
//   return <AccountLayout>{page}</AccountLayout>;
// };
