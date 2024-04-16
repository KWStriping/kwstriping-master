import type { TypeDeleteMessages } from '@dashboard/components/dialogs/TypeDeleteWarningDialog';
import type { Ids } from '@dashboard/oldSrc/types';

export interface UseTypeDeleteData extends TypeDeleteMessages {
  isOpen: boolean;
  assignedItemsCount: number | undefined;
  viewAssignedItemsUrl: string;
  isLoading: boolean | undefined;
  typesToDelete: Ids;
}

export interface UseTypeDeleteProps<T> {
  params: T;
  selectedTypes?: Ids;
  singleId?: string;
}
