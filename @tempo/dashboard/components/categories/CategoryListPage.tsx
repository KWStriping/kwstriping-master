import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import type { FC } from 'react';
import CategoryList from './CategoryList';
import SearchBar from '@tempo/dashboard/components/bars/SearchBar';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import type { CategoryFragment } from '@tempo/api/generated/graphql';
import type { CategoryListUrlOrdering } from '@tempo/dashboard/oldSrc/categories/urls';
import type {
  ListActions,
  PageListProps,
  SearchPageProps,
  SortPage,
  TabPageProps,
} from '@tempo/dashboard/oldSrc/types';

export interface CategoryTableProps
  extends PageListProps,
    ListActions,
    SearchPageProps,
    SortPage<CategoryListUrlOrdering>,
    TabPageProps {
  categories: CategoryFragment[];
}

export const CategoryListPage: FC<CategoryTableProps> = ({
  categories,
  currentTab,
  disabled,
  initialSearch,
  isChecked,
  selected,
  settings,
  tabs,
  toggle,
  toggleAll,
  toolbar,
  onAll,
  onSearchChange,
  onTabChange,
  onTabDelete,
  onTabSave,
  onUpdateListSettings,
  ...listProps
}) => {
  return (
    <Container>
      <PageHeader title={m.dashboard_categories() ?? 'Categories'}>
        <Button color="primary" href={'/categories/add'} data-test-id="create-category">
          <>
            {/* button */}

            {m.dashboard_of_TR() ?? 'Create category'}
          </>
        </Button>
      </PageHeader>
      <Card>
        <SearchBar
          allTabLabel={
            m.dashboard_y_fjd() ?? 'All Categories' // tab name
          }
          currentTab={currentTab}
          initialSearch={initialSearch}
          searchPlaceholder={m.dashboard_iXNEV() ?? 'Search Category'}
          tabs={tabs}
          onAll={onAll}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
        />
        <CategoryList
          categories={categories}
          disabled={disabled}
          isChecked={isChecked}
          isRoot={true}
          selected={selected}
          settings={settings}
          toggle={toggle}
          toggleAll={toggleAll}
          toolbar={toolbar}
          onUpdateListSettings={onUpdateListSettings}
          {...listProps}
        />
      </Card>
    </Container>
  );
};
CategoryListPage.displayName = 'CategoryListPage';
export default CategoryListPage;
