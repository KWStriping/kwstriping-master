import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type {
  FilterContextType,
  FilterData,
  FilterDetailedOptions,
  OnFilterChangeOpts,
} from './types';
import * as utils from './utils';

const useFilterStore = create<FilterContextType>()(
  persist(
    (set) => ({
      filters: [],
      actions: {
        set: (name: string, filter: Partial<FilterData>) =>
          set(({ filters }) => ({
            filters: filters.map((f) => (f.name === name ? { ...f, ...filter } : f)),
          })),
        register: (name: string, label: string, options: FilterDetailedOptions) =>
          set(({ filters }) => ({
            filters: utils.register(filters, name, label, [], options),
          })),
        toggle: (name: string) =>
          set(({ filters }) => ({ filters: utils.toggle(filters, name) })),
        toggleRange: (name: string) =>
          set(({ filters }) => ({ filters: utils.toggleRange(filters, name) })),
        unregister: (name: string) =>
          set(({ filters }) => ({ filters: filters.filter((filter) => filter.name !== name) })),
        swap: (previousFilterName: string, nextFilterName: string) =>
          set(({ filters }) => ({
            filters: utils.swap(filters, previousFilterName, nextFilterName),
          })),
        onChange: (name: string, value: string | string[], opts?: OnFilterChangeOpts) =>
          set(({ filters }) => ({ filters: utils.change(filters, name, value, opts) })),
      },
    }),
    {
      name: 'filter-storage', // unique name
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useFilterData = () => useFilterStore((state) => state.filters);
export const useFilterActions = () => useFilterStore((state) => state.actions);
