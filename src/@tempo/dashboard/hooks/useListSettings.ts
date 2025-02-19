import merge from 'lodash-es/merge';

import type { AppListViewSettings } from '../oldSrc/config';
import { defaultListSettings } from '../oldSrc/config';
import type { ListSettings, ListViews } from '../oldSrc/types';
import useLocalStorage from '@tempo/dashboard/hooks/useLocalStorage';

export const listSettingsStorageKey = 'listConfig';
export interface UseListSettings<TColumns extends string = string> {
  settings: ListSettings<TColumns>;
  updateListSettings: <T extends keyof ListSettings<TColumns>>(
    key: T,
    value: ListSettings<TColumns>[T]
  ) => void;
}

export default function useListSettings<TColumns extends string = string>(
  listName: ListViews
): UseListSettings<TColumns> {
  const [settings, setListSettings] = useLocalStorage<AppListViewSettings>(
    listSettingsStorageKey,
    (storedListSettings) => {
      if (typeof storedListSettings !== 'object') {
        return defaultListSettings;
      }

      return merge({}, defaultListSettings, storedListSettings) as AppListViewSettings;
    }
  );

  const updateListSettings = <T extends keyof ListSettings>(key: T, value: ListSettings[T]) =>
    setListSettings((settings) => ({
      ...settings,
      [listName]: {
        ...settings[listName],
        [key]: value,
      },
    }));

  // console.log(settings);
  if (!settings) {
    throw new Error(`List settings for ${listName} not found`);
  }

  return {
    settings: settings[listName] as ListSettings<TColumns>,
    updateListSettings,
  };
}
