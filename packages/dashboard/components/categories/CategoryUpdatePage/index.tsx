import { useTranslation } from '@core/i18n';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import { Button } from '@core/ui/components/buttons/Button';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import CategoryDetailsForm from '@dashboard/components/categories/CategoryDetailsForm';
import CategoryList from '@dashboard/components/categories/CategoryList';
import { CardSpacer } from '@dashboard/components/core/CardSpacer';
import CardTitle from '@dashboard/components/core/CardTitle';
import Metadata from '@dashboard/components/core/Metadata';
import PageHeader from '@dashboard/components/core/PageHeader';
import SaveBar from '@dashboard/components/core/SaveBar';
import { Tab, TabContainer } from '@dashboard/components/core/Tab';
import SeoForm from '@dashboard/components/forms/SeoForm';
import type { CategoryDetailsQuery, ProductErrorFragment } from '@core/api/graphql';
import type { SubmitPromise } from '@dashboard/hooks/useForm';
import { categoryAddUrl, categoryUrl } from '@dashboard/oldSrc/categories/urls';

import type { RelayToFlat, TabListActions } from '@dashboard/oldSrc/types';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import CategoryBackground from '../CategoryBackground';
import CategoryProducts from '../CategoryProducts';
import type { CategoryUpdateData } from './form';
import CategoryUpdateForm from './form';

export enum CategoryPageTab {
  categories = 'categories',
  products = 'products',
}

export interface CategoryUpdatePageProps
  extends TabListActions<'productListToolbar' | 'subcategoryListToolbar'> {
  categoryId: string;
  changeTab: (index: CategoryPageTab) => void;
  currentTab: CategoryPageTab;
  errors: ProductErrorFragment[];
  disabled: boolean;
  category: CategoryDetailsQuery['category'];
  products: RelayToFlat<CategoryDetailsQuery['category']['products']>;
  subcategories: RelayToFlat<CategoryDetailsQuery['category']['children']>;
  saveButtonBarState: ConfirmButtonTransitionState;
  addProductHref: string;
  onImageDelete: () => void;
  onSubmit: (data: CategoryUpdateData) => SubmitPromise;
  onImageUpload: (file: File) => void;
  onDelete: () => void;
}

const CategoriesTab = Tab(CategoryPageTab.categories);
const ProductsTab = Tab(CategoryPageTab.products);

export const CategoryUpdatePage: FC<CategoryUpdatePageProps> = ({
  categoryId,
  changeTab,
  currentTab,
  category,
  disabled,
  errors,
  products,
  saveButtonBarState,
  subcategories,
  onDelete,
  onSubmit,
  onImageDelete,
  onImageUpload,
  isChecked,
  productListToolbar,
  selected,
  subcategoryListToolbar,
  toggle,
  toggleAll,
}: CategoryUpdatePageProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const backHref = category?.parent?.id ? categoryUrl(category?.parent?.id) : '/categories';
  if (!category) return null;
  return (
    <CategoryUpdateForm category={category} onSubmit={onSubmit} disabled={disabled}>
      {({ data, change, handlers, submit, isSaveDisabled }) => (
        <Container>
          <Backlink href={backHref}>{t('dashboard.categories', 'Categories')}</Backlink>
          <PageHeader title={category?.name} />
          <CategoryDetailsForm
            data={data}
            disabled={disabled}
            errors={errors}
            onChange={change}
          />
          <CardSpacer />
          <CategoryBackground
            data={data}
            onImageUpload={onImageUpload}
            onImageDelete={onImageDelete}
            image={category?.backgroundImage}
            onChange={change}
          />
          <CardSpacer />
          <SeoForm
            helperText={t(
              'dashboard.QdR8M',
              'Add search engine title and description to make this category easier to find'
            )}
            errors={errors}
            title={data?.seoTitle}
            titlePlaceholder={data?.name}
            description={data?.seoDescription}
            descriptionPlaceholder={data?.name}
            slug={data?.slug}
            slugPlaceholder={data?.name}
            loading={!category}
            onChange={change}
            disabled={disabled}
          />
          <CardSpacer />
          <Metadata data={data} onChange={handlers.changeMetadata} />
          <CardSpacer />
          <TabContainer>
            <CategoriesTab
              isActive={currentTab === CategoryPageTab.categories}
              changeTab={changeTab}
            >
              <>
                {/* number of subcategories in category */}

                {t('dashboard.Dz5h8', 'Subcategories')}
              </>
            </CategoriesTab>
            <ProductsTab
              testId="products-tab"
              isActive={currentTab === CategoryPageTab.products}
              changeTab={changeTab}
            >
              <>
                {t(
                  'dashboard.+fkAO',
                  'Products'
                  // number of products in category
                )}
              </>
            </ProductsTab>
          </TabContainer>
          <CardSpacer />
          {currentTab === CategoryPageTab.categories && (
            <Card>
              <CardTitle
                title={t(
                  'dashboard.ivJal',
                  'All Subcategories'
                  // section header
                )}
                toolbar={
                  <Button
                    color="secondary"
                    href={categoryAddUrl(categoryId)}
                    data-test-id="create-subcategory"
                  >
                    <>
                      {/* button */}

                      {t('dashboard.ycVMp', 'Create subcategory')}
                    </>
                  </Button>
                }
              />
              <CategoryList
                categories={subcategories}
                disabled={disabled}
                isChecked={isChecked}
                isRoot={false}
                selected={selected}
                sort={undefined}
                toggle={toggle}
                toggleAll={toggleAll}
                toolbar={subcategoryListToolbar}
                onSort={() => undefined}
              />
            </Card>
          )}
          {currentTab === CategoryPageTab.products && (
            <CategoryProducts
              categoryId={category?.id}
              categoryName={category?.name}
              products={products}
              disabled={disabled}
              toggle={toggle}
              toggleAll={toggleAll}
              selected={selected}
              isChecked={isChecked}
              toolbar={productListToolbar}
            />
          )}
          <SaveBar
            onCancel={() => router.push(backHref)}
            onDelete={onDelete}
            onSubmit={submit}
            state={saveButtonBarState}
            disabled={isSaveDisabled}
          />
        </Container>
      )}
    </CategoryUpdateForm>
  );
};
CategoryUpdatePage.displayName = 'CategoryUpdatePage';
export default CategoryUpdatePage;
