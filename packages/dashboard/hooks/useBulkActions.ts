import useListActions from '@dashboard/hooks/useListActions';
import type { Node } from '../oldSrc/types';

function useBulkActions(initial?: string[]) {
  const { add, isSelected, listElements, remove, reset, set, toggle } =
    useListActions<string>(initial);

  function toggleAll(items: Node[], selected: number) {
    const allItems = items.map((item) => item.id);
    reset();
    if (selected !== allItems.length) {
      set(allItems);
    }
  }

  return {
    add,
    isSelected,
    listElements,
    remove,
    reset,
    toggle,
    toggleAll,
  };
}
export default useBulkActions;

export interface UseBulkActionsProps {
  isSelected: (id: string) => boolean;
  listElements: string[];
  toggle: (id: string) => void;
  toggleAll: (items: Node[], selected: number) => void;
  reset: () => void;
}
