'use client';

import type { OrderFragment } from '@tempo/api/generated/graphql';
import { useRouter } from 'next/navigation';
import { useLocalization } from '@tempo/ui/providers/LocalizationProvider';

export interface OrdersTableProps {
  orders: Maybe<OrderFragment[]>;
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const router = useRouter();
  const { formatPrice } = useLocalization();

  return (
    <table className="w-full divide-y bg-white rounded-md ">
      <thead className="text-center h-16">
        <tr>
          <th className="w-1/4 font-semibold text-md">Number</th>
          <th className="w-1/4 font-semibold text-md">Creation Date</th>
          <th className="w-1/4 font-semibold text-md md:text-center hidden md:table-cell">
            Status
          </th>
          <th className="w-1/4 font-semibold text-md">Total</th>
        </tr>
      </thead>
      <tbody className="text-center divide-y">
        {orders?.map((order) => (
          // TODO
          <tr className="h-16 cursor-pointer" key={order.id} onClick={() => router.push('/')}>
            <td>{order?.number}</td>
            <td>{order.createdAt.slice(0, 10)}</td>
            <td className="hidden md:table-cell">{order.status}</td>
            <td>{formatPrice(order.total.gross)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
