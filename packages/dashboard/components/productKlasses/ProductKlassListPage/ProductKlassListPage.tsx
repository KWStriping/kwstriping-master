import { useTranslation } from '@core/i18n';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import { Button } from '@core/ui/components/buttons/Button';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import type { FC } from 'react';
import ProductKlassList from '../ProductKlassList';
import type { ProductKlassFilterKeys, ProductKlassListFilterOpts } from './filters';
import { useFilterStructure } from './filters';
import type {
  FilterPageProps,
  ListActions,
  PageListProps,
  SortPage,
  TabPageProps,
} from '@dashboard/oldSrc/types';
import type { ProductKlassListUrlOrdering } from '@dashboard/oldSrc/productKlasses/urls';
import type { ProductKlassFragment } from '@core/api/graphql';
import PageHeader from '@dashboard/components/core/PageHeader';
import FilterBar from '@dashboard/components/bars/FilterBar';

export interface ProductKlassListPageProps
  extends PageListProps,
    ListActions,
    FilterPageProps<ProductKlassFilterKeys, ProductKlassListFilterOpts>,
    SortPage<ProductKlassListUrlOrdering>,
    TabPageProps {
  productKlasses: ProductKlassFragment[];
}

const ProductKlassListPage: FC<ProductKlassListPageProps> = ({
  currentTab,
  filterOpts,
  initialSearch,
  onAll,
  onFilterChange,
  onSearchChange,
  onTabChange,
  onTabDelete,
  onTabSave,
  tabs,
  ...listProps
}) => {
  const { t } = useTranslation();

  const structure = useFilterStructure(filterOpts);

  return (
    <Container>
      <Backlink href={'/configuration'}>{t('dashboard.configuration', 'Configuration')}</Backlink>
      <PageHeader title={t('dashboard.productKlasses', 'Product Types')}>
        <Button color="primary" href={'/product-types/add'} data-test-id="add-product-type">
          <>
            {/* button */}

            {t('dashboard.ksZwp', 'Create product type')}
          </>
        </Button>
      </PageHeader>
      <Card>
        <FilterBar
          allTabLabel={t(
            'dashboard.KSqnn',
            'All Product Types'
            // tab name
          )}
          currentTab={currentTab}
          structure={structure}
          initialSearch={initialSearch}
          searchPlaceholder={t('dashboard.pFdD1', 'Search Product Type')}
          tabs={tabs}
          onAll={onAll}
          onFilterChange={onFilterChange}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
        />
        <ProductKlassList {...listProps} />
      </Card>
    </Container>
  );
};
ProductKlassListPage.displayName = 'ProductKlassListPage';
export default ProductKlassListPage;
