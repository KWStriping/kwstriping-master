import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import type { FC } from 'react';
import CategoryList from './CategoryList';
import SearchBar from '@dashboard/components/bars/SearchBar';
import PageHeader from '@dashboard/components/core/PageHeader';
import type { CategoryFragment } from '@core/api/graphql';
import type { CategoryListUrlOrdering } from '@dashboard/oldSrc/categories/urls';
import type {
  ListActions,
  PageListProps,
  SearchPageProps,
  SortPage,
  TabPageProps,
} from '@dashboard/oldSrc/types';

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
  const { t } = useTranslation();

  return (
    <Container>
      <PageHeader title={t('dashboard.categories', 'Categories')}>
        <Button color="primary" href={'/categories/add'} data-test-id="create-category">
          <>
            {/* button */}

            {t('dashboard.of5TR', 'Create category')}
          </>
        </Button>
      </PageHeader>
      <Card>
        <SearchBar
          allTabLabel={t(
            'dashboard.y7fjd',
            'All Categories'
            // tab name
          )}
          currentTab={currentTab}
          initialSearch={initialSearch}
          searchPlaceholder={t('dashboard.iXNEV', 'Search Category')}
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
