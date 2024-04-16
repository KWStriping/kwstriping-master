import { useQuery } from '@core/urql/hooks/useQuery';
import NotFoundPage from '@dashboard/components/core/NotFoundPage';
import OrderDetailsPage from '@dashboard/components/orders/OrderDetailsPage';
import OrderDraftPage from '@dashboard/components/orders/OrderDraftPage';
import { OrderStatus } from '@core/api/constants';
import { OrderDetailsDocument } from '@core/api/graphql';
import { useRouter } from 'next/router';

export const OrderDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const idIsValid = !!id && typeof id === 'string';
  const [{ data, fetching }] = useQuery(OrderDetailsDocument, {
    displayLoader: true,
    pause: !idIsValid,
    variables: { id: id as string },
  });

  if (!idIsValid) return null;

  const order = data?.order;
  const isOrderDraft = order?.status === OrderStatus.Draft;

  if (!fetching && order === null) return <NotFoundPage backHref="/orders" />;
  return isOrderDraft ? (
    <OrderDraftPage id={id} order={order} loading={fetching} />
  ) : (
    <OrderDetailsPage id={id} order={order} loading={fetching} />
  );
};

export default OrderDetails;
