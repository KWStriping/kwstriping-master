import type { UrlObject } from 'url';
import * as m from '@paraglide/messages';
import type { HomepageBlockFragment, ProductFilter } from '@tempo/api/generated/graphql';
// import { useTranslation } from '@tempo/next/i18n';
import Link from 'next/link';
import { RichText } from '@tempo/ui/components/inputs/RichText';
import { ProductCollection } from '@tempo/ui/components/products/ProductCollection';
import { translate } from '@tempo/ui/utils/translations';

export interface HomepageBlockProps {
  menuItem: HomepageBlockFragment;
}

export function HomepageBlock({ menuItem }: HomepageBlockProps) {
  const filter: ProductFilter = {};
  if (menuItem.page?.id) {
    const content = translate(menuItem.page, 'content');
    return <div className="pb-10">{content && <RichText jsonStringData={content} />}</div>;
  }
  let url: string | UrlObject = {};
  if (menuItem.category?.id) {
    filter.categories = [menuItem.category?.id];
    url = `/catalog/${menuItem.category.slug}`;
  }
  if (menuItem.collection?.id) {
    filter.collections = [menuItem.collection?.id];
    url = `/collections/${menuItem.collection.slug}`;
  }
  return (
    <div className="pb-8" data-testid="category">
      <h1
        className="text-3xl font-bold tracking-tight text-gray-900 pb-4"
        data-testid={`categoryName${menuItem.name}`}
      >
        {translate(menuItem, 'name')}
      </h1>
      <ProductCollection filter={filter} allowMore={false} />
      <div className="flex flex-row-reverse p-4">
        <Link href={url}>
          <p className="text-base">{m.more() ?? 'More →'}</p>
        </Link>
      </div>
    </div>
  );
}

export default HomepageBlock;
