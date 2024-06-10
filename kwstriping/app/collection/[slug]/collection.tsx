'use client';

import { PageHero } from '@tempo/ui/components/PageHero';
import { FilteredProductList } from '@tempo/ui/components/products/FilteredProductList';
import { CollectionPageSeo } from '@tempo/ui/components/seo/CollectionPageSeo';
import { translate } from '@tempo/ui/utils/translations';

import NotFound from '@kwstriping/components/NotFound';

function CollectionPage({ collection, attributeFiltersData }) {
  if (!collection) return <NotFound />;

  return (
    <>
      <CollectionPageSeo collection={collection} />
      <header className="mb-4 pt-4">
        <div className="container px-8">
          <PageHero
            title={translate(collection, 'name')}
            description={translate(collection, 'description') || ''}
          />
        </div>
      </header>
      <div className="container px-8 mt-4">
        <FilteredProductList
          attributeFiltersData={attributeFiltersData}
          collectionIDs={[collection.id]}
        />
      </div>
    </>
  );
}

export default CollectionPage;
