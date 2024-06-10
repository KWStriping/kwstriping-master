import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import Link from '@tempo/ui/components/Link';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import type { CategoryDetailsQuery } from '@tempo/api/generated/graphql';
import { productListUrl } from '@tempo/dashboard/oldSrc/products/urls';
import type { ListActions, PageListProps, RelayToFlat } from '@tempo/dashboard/oldSrc/types';
import Card from '@mui/material/Card';
import type { FC } from 'react';

import CategoryProductList from '../CategoryProductList';

interface CategoryProductsProps extends PageListProps, ListActions {
  products: RelayToFlat<CategoryDetailsQuery['category']['products']>;
  categoryName: string;
  categoryId: string;
}

export const CategoryProducts: FC<CategoryProductsProps> = ({
  products,
  disabled,
  categoryId,
  categoryName,
  isChecked,
  selected,
  toggle,
  toggleAll,
  toolbar,
}) => {
  return (
    <Card>
      <CardTitle
        title={m.___JV_({ categoryName }) ?? 'Products in {categoryName}'}
        toolbar={
          <div className={styles.toolbar ?? ''}>
            <Link
              href={productListUrl({
                categories: [categoryId],
              })}
            >
              <Button color="secondary" data-test-id="view-products">
                {m.dashboard_viewProducts() ?? 'View products'}
              </Button>
            </Link>

            <Button color="secondary" href={'/products/add'} data-test-id="add-products">
              <>
                {t(
                  'dashboard_/pIZ9',
                  'Add product'
                  // button
                )}
              </>
            </Button>
          </div>
        }
      />
      <CategoryProductList
        products={products}
        disabled={disabled}
        selected={selected}
        isChecked={isChecked}
        toggle={toggle}
        toggleAll={toggleAll}
        toolbar={toolbar}
      />
    </Card>
  );
};

CategoryProducts.displayName = 'CategoryProducts';
export default CategoryProducts;
