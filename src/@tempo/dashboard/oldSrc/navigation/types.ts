import type { MenuItemFragment } from '@tempo/api/generated/graphql';

export type RecursiveMenuItem = MenuItemFragment & {
  children?: Maybe<RecursiveMenuItem[]>;
};
