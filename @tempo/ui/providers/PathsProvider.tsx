import type { ReactNode, Context } from 'react';
import { createContext, useContext } from 'react';

type Path = string;

export interface Paths<TRoute extends Path = Path> {
  productBySlug: (slug: string) => TRoute;
  orderDetails: (id: string) => TRoute;
  accountPreferences: () => TRoute;
  accountOrders: () => TRoute;
  accountAddressBook: () => TRoute;
  home: () => TRoute;
  login: (params?: Record<string, string>) => TRoute;
  cart: () => TRoute;
  search: () => TRoute;
  categoryBySlug: (slug: string) => TRoute;
  collectionBySlug: (slug: string) => TRoute;
  pageBySlug: (slug: string) => TRoute;
  orderById: (id: string) => TRoute;
  order: () => TRoute;
}

export const PathsContext: Context<Paths> = createContext({} as Paths);

interface PathsProviderProps<TRoute extends Path = Path> {
  children: ReactNode;
  paths: Paths<TRoute>;
}

export function PathsProvider<TRoute extends Path = Path>({
  paths,
  children,
}: PathsProviderProps<TRoute>) {
  return <PathsContext.Provider value={paths}>{children}</PathsContext.Provider>;
}

export function usePaths<TRoute extends Path = Path>(): Paths<TRoute> {
  return useContext(PathsContext) as Paths<TRoute>;
}

export default PathsProvider;
