import type { MenuItemFragment } from '@core/api/graphql';

export type RecursiveMenuItem = MenuItemFragment & {
  children?: Maybe<RecursiveMenuItem[]>;
};
