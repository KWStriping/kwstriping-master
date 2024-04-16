import { objectEntries, objectFromEntries } from 'tsafe';
import { persist, createJSONStorage } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { LOCAL_STORAGE_EXISTS, LOCAL_STORAGE_NAMESPACE } from './constants';
import { createWithEqualityFn } from 'zustand/traditional';

const AUTOLOGIN = true;

const PERSISTED_KEYS = ['authPluginId', 'channel'];

const initializeFromLocalStorage = AUTOLOGIN && LOCAL_STORAGE_EXISTS;

interface AuthStore {
  authPluginId: string | null;
  channel: string;
  actions: {
    setChannel: (channel: string) => void;
    setAuthPluginId: (authPluginId: string | null) => void;
  };
}

// https://docs.pmnd.rs/zustand/integrations/persisting-store-data
export const useAuthStore = createWithEqualityFn<AuthStore>()(
  persist(
    (set, _get) => ({
      channel: initializeFromLocalStorage
        ? localStorage.getItem('channel') ?? 'default'
        : 'default',
      authPluginId: initializeFromLocalStorage ? localStorage.getItem('authPluginId') : null,
      // Actions are static and never change, so they aren't technically "state."
      // Organizing them into a separate object allows exposing them as a single hook
      // to be used in any component without any impact on performance.
      actions: {
        setChannel: (channel: string) => set({ channel }),
        setAuthPluginId: (authPluginId: string | null) => set({ authPluginId }),
      },
    }),
    {
      name: LOCAL_STORAGE_NAMESPACE, // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
      partialize: (state) =>
        objectFromEntries(objectEntries(state).filter(([key]) => PERSISTED_KEYS.includes(key))),
    }
  ),
  shallow
);

export const useAuthActions = () => useAuthStore((state) => state.actions);

export const useAuthPlugin = (): [string | null, (pluginId: string | null) => void] =>
  useAuthStore((state) => [state.authPluginId, state.actions.setAuthPluginId]);

export const useChannel = (): [string, (channel: string) => void] =>
  useAuthStore((state) => [state.channel, state.actions.setChannel]);

export const getAuthStore = () => useAuthStore.getState();
