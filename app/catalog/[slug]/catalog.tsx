'use client';

import type { AttributeFilterFragment, CategoryBySlugQuery } from '@tempo/api/generated/graphql';

import { PageHero } from '@tempo/ui/components/PageHero';
import { FilteredProductList } from '@tempo/ui/components/products/FilteredProductList';
import { translate } from '@tempo/ui/utils/translations';

interface CatalogPageProps {
  category: NonNullable<CategoryBySlugQuery['category']>;
  attributeFiltersData: AttributeFilterFragment[];
}

function CategoryPage({ category, attributeFiltersData }: CatalogPageProps) {
  // const paths = usePaths();
  // const router = useRouter();
  // const subcategories = mapEdgesToItems(category.children);
  // const navigateToCategory = (categorySlug: string) => {
  //   void router.push(paths.catalog._slug(categorySlug).$url());
  // };
  console.log('>>> CategoryPage', { category, attributeFiltersData });
  return (
    <>
      <div className={'bg-white/90'}>
        <header className="pt-4 w-full px-8">
          <PageHero
            title={translate(category, 'name')}
            description={translate(category, 'description') || ''}
            // pills={subcategories.map((subcategory) => ({
            //   label: translate(subcategory, 'name'),
            //   onClick: () => navigateToCategory(subcategory.slug),
            // }))}
          />
        </header>
        <main className={'grow px-12 py-6'}>
          <FilteredProductList
            attributeFiltersData={attributeFiltersData}
            categoryIDs={[category.id]}
          />
        </main>
      </div>
    </>
  );
}

export default CategoryPage;
