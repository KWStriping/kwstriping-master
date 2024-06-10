import * as m from '@paraglide/messages';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import { Button } from '@tempo/ui/components/buttons/Button';

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
} from '@tempo/dashboard/oldSrc/types';
import type { ProductKlassListUrlOrdering } from '@tempo/dashboard/oldSrc/productKlasses/urls';
import type { ProductKlassFragment } from '@tempo/api/generated/graphql';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import FilterBar from '@tempo/dashboard/components/bars/FilterBar';

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
  const structure = useFilterStructure(filterOpts);

  return (
    <Container>
      <Backlink href={'/configuration'}>
        {m.dashboard_configuration() ?? 'Configuration'}
      </Backlink>
      <PageHeader title={m.dashboard_productKlasses() ?? 'Product Types'}>
        <Button color="primary" href={'/product-types/add'} data-test-id="add-product-type">
          <>
            {/* button */}

            {m.dashboard_ksZwp() ?? 'Create product type'}
          </>
        </Button>
      </PageHeader>
      <Card>
        <FilterBar
          allTabLabel={
            m.dashboard_KSqnn() ?? 'All Product Types'
            // tab name
          }
          currentTab={currentTab}
          structure={structure}
          initialSearch={initialSearch}
          searchPlaceholder={m.dashboard_pFdD_() ?? 'Search Product Type'}
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
