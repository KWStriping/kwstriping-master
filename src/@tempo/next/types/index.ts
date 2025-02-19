export type * from './components';
export type * from './addresses';
export type * from './misc';

declare global {
  type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

  // expands object types recursively
  type ExpandRecursively<T> = T extends object
    ? T extends infer O
      ? { [K in keyof O]: ExpandRecursively<O[K]> }
      : never
    : T;

  type Maybe<T> = T | null | undefined;

  type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
    { [K in Keys]-?: Required<Pick<T, K>> }[Keys];

  type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
    {
      [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>;
    }[Keys];

  interface MessageDescriptor {
    id: string;
    defaultMessage?: string;
    description?: string | object;
  }

  interface Window {
    __URQL_DATA__?: any;
  }
}
