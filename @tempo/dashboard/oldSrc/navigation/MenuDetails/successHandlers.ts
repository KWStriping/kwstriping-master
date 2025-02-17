import * as m from '@paraglide/messages';
import type { TFunction } from '@tempo/next/i18n';
import type { UseNotifierResult } from '@tempo/ui/hooks/useNotifier';
import type {
  MenuDeleteMutation,
  MenuItemCreateMutation,
  MenuItemUpdateMutation,
  MenuUpdateMutation,
} from '@tempo/api/generated/graphql';

import { menuUrl } from '@tempo/dashboard/oldSrc/navigation/urls';

export function handleItemCreate(
  data: MenuItemCreateMutation,
  notify: UseNotifierResult,
  closeModal: () => void,
  t: TFunction
) {
  if (data?.createMenuItem?.errors?.length === 0) {
    closeModal();
    notify(m.dashboard_savedChanges() ?? 'Saved changes', {
      type: 'success',
    });
  }
}

export function handleItemUpdate(
  data: MenuItemUpdateMutation,
  id: string,
  router: NextRouter,
  notify: UseNotifierResult,
  t: TFunction
) {
  if (data?.updateMenuItem?.errors?.length === 0) {
    notify(m.dashboard_savedChanges() ?? 'Saved changes', {
      type: 'success',
    });
    void router.push(
      menuUrl(id, {
        action: undefined,
        id: undefined,
      })
    );
  }
}

export function handleDelete(
  data: MenuDeleteMutation,
  router: NextRouter,
  notify: UseNotifierResult,
  t: TFunction
) {
  if (data?.deleteMenu?.errors?.length === 0) {
    notify(m.dashboard_savedChanges() ?? 'Saved changes', {
      type: 'success',
    });
    void router.replace('/navigation');
  }
}

export function handleUpdate(
  data: MenuUpdateMutation,
  notify: UseNotifierResult,
  refetch: () => void,
  t: TFunction
) {
  if (
    data?.deleteMenuItems?.errors?.length === 0 &&
    data?.moveMenuItem?.errors?.length === 0 &&
    data?.updateMenu?.errors?.length === 0
  ) {
    notify(m.dashboard_savedChanges() ?? 'Saved changes', {
      type: 'success',
    });
    refetch();
  }
}
