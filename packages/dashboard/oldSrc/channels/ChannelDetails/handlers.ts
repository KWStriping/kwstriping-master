import type { ReorderInput } from '@core/api/graphql';
import type { Node } from '@dashboard/oldSrc/types';
import { move } from '@dashboard/oldSrc/utils/lists';

export function calculateItemsOrderMoves<T extends Node>(
  itemsInputOrder: T[],
  itemsOutputOrder: T[]
): ReorderInput[] {
  const itemsInputOrderIds = itemsInputOrder.map((item) => item.id);
  const itemsOutputOrderIds = itemsOutputOrder.map((item) => item.id);
  let itemsIntermediateOrderIds = itemsInputOrderIds;

  return itemsOutputOrderIds.reduce((moves, itemId, newIndex) => {
    const oldIndex = itemsIntermediateOrderIds.indexOf(itemId);

    const sortOrder = newIndex - oldIndex;

    if (sortOrder === 0) {
      return moves;
    }

    const newMoves = [
      ...moves,
      {
        id: itemId,
        sortOrder,
      },
    ];

    itemsIntermediateOrderIds = move(
      itemsIntermediateOrderIds[oldIndex],
      itemsIntermediateOrderIds,
      (a, b) => a === b,
      newIndex
    );

    return newMoves;
  }, [] as ReorderInput[]);
}
