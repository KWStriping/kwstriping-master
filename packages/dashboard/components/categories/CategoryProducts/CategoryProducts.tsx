import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import Link from '@core/ui/components/Link';
import CardTitle from '@dashboard/components/core/CardTitle';
import type { CategoryDetailsQuery } from '@core/api/graphql';
import { productListUrl } from '@dashboard/oldSrc/products/urls';
import type { ListActions, PageListProps, RelayToFlat } from '@dashboard/oldSrc/types';
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
  const { t } = useTranslation();

  return (
    <Card>
      <CardTitle
        title={t('+43JV5', 'Products in {categoryName}', { categoryName })}
        toolbar={
          <div className={styles.toolbar ?? ''}>
            <Link
              href={productListUrl({
                categories: [categoryId],
              })}
            >
              <Button color="secondary" data-test-id="view-products">
                {t('dashboard.viewProducts', 'View products')}
              </Button>
            </Link>

            <Button color="secondary" href={'/products/add'} data-test-id="add-products">
              <>
                {t(
                  'dashboard./pIZ9',
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
