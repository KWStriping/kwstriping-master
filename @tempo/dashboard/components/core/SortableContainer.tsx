import type { UniqueIdentifier, DndContextProps, DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import type { ReactNode } from 'react';
import type { ReorderAction } from '@tempo/dashboard/oldSrc/types';

export interface SortableContainerProps {
  children: ReactNode;
  items: UniqueIdentifier[];
  onSortStart?: DndContextProps['onDragStart'];
  onSortEnd: ReorderAction;
}

export function SortableContainer({
  children,
  onSortStart,
  onSortEnd,
  items,
}: SortableContainerProps) {
  if (!items?.length) return <>{children}</>;
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      onSortEnd({ oldIndex, newIndex });
    }
  };
  return (
    <DndContext onDragStart={onSortStart} onDragEnd={handleDragEnd}>
      <SortableContext items={items}>{children}</SortableContext>
    </DndContext>
  );
}

export default SortableContainer;
