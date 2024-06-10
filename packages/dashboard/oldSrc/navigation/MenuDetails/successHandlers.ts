import type { TFunction } from '@core/i18n';
import type { UseNotifierResult } from '@core/ui/hooks/useNotifier';
import type {
  MenuDeleteMutation,
  MenuItemCreateMutation,
  MenuItemUpdateMutation,
  MenuUpdateMutation,
} from '@core/api/graphql';

import { menuUrl } from '@dashboard/oldSrc/navigation/urls';

export function handleItemCreate(
  data: MenuItemCreateMutation,
  notify: UseNotifierResult,
  closeModal: () => void,
  t: TFunction
) {
  if (data?.createMenuItem?.errors?.length === 0) {
    closeModal();
    notify(t('dashboard.savedChanges', 'Saved changes'), {
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
    notify(t('dashboard.savedChanges', 'Saved changes'), {
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
    notify(t('dashboard.savedChanges', 'Saved changes'), {
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
    notify(t('dashboard.savedChanges', 'Saved changes'), {
      type: 'success',
    });
    refetch();
  }
}
