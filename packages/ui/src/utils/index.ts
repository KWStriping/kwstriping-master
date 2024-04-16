import type { ReactNode } from 'react';
export * from './emotion';
export * from './maps';
export * from './media';
export * from './menus';
export * from './money';
export * from './product';
export * from './translations';

export type UserInteraction = 'default' | 'hover' | 'active';
export interface SyntheticChangeEvent<T = string> {
  target: {
    name: string;
    value: T;
  };
}

export function renderCollection<T>(
  collection: Maybe<T[]>,
  renderItem: (item: T, index: number) => ReactNode,
  renderEmpty?: (collection: T[]) => ReactNode
) {
  if (!collection) return null;
  if (collection.length === 0) {
    return renderEmpty ? renderEmpty(collection) : null;
  }
  return collection.map(renderItem);
}
