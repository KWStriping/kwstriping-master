import * as m from '@paraglide/messages';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import { Button } from '@tempo/ui/components/buttons/Button';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import type { CategoryDetailsQuery, ProductErrorFragment } from '@tempo/api/generated/graphql';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import CategoryBackground from '../CategoryBackground';
import CategoryProducts from '../CategoryProducts';
import type { CategoryUpdateData } from './form';
import CategoryUpdateForm from './form';
import CategoryDetailsForm from '@tempo/dashboard/components/categories/CategoryDetailsForm';
import CategoryList from '@tempo/dashboard/components/categories/CategoryList';
import { CardSpacer } from '@tempo/dashboard/components/core/CardSpacer';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import Metadata from '@tempo/dashboard/components/core/Metadata';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import SaveBar from '@tempo/dashboard/components/core/SaveBar';
import { Tab, TabContainer } from '@tempo/dashboard/components/core/Tab';
import SeoForm from '@tempo/dashboard/components/forms/SeoForm';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import { categoryAddUrl, categoryUrl } from '@tempo/dashboard/oldSrc/categories/urls';

import type { RelayToFlat, TabListActions } from '@tempo/dashboard/oldSrc/types';

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
  const router = useRouter();

  const backHref = category?.parent?.id ? categoryUrl(category?.parent?.id) : '/categories';
  if (!category) return null;
  return (
    <CategoryUpdateForm category={category} onSubmit={onSubmit} disabled={disabled}>
      {({ data, change, handlers, submit, isSaveDisabled }) => (
        <Container>
          <Backlink href={backHref}>{m.dashboard_categories() ?? 'Categories'}</Backlink>
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
            helperText={
              m.dashboard_QdR_M() ??
              'Add search engine title and description to make this category easier to find'
            }
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

                {m.dashboard_Dz_h_() ?? 'Subcategories'}
              </>
            </CategoriesTab>
            <ProductsTab
              testId="products-tab"
              isActive={currentTab === CategoryPageTab.products}
              changeTab={changeTab}
            >
              <>
                {t(
                  'dashboard_+fkAO',
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
                title={
                  m.dashboard_ivJal() ?? 'All Subcategories' // section header
                }
                toolbar={
                  <Button
                    color="secondary"
                    href={categoryAddUrl(categoryId)}
                    data-test-id="create-subcategory"
                  >
                    <>
                      {/* button */}

                      {m.dashboard_ycVMp() ?? 'Create subcategory'}
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
