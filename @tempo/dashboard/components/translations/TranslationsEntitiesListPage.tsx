import * as m from '@paraglide/messages';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import type { LanguageFragment } from '@tempo/api/generated/graphql';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import type { FC, ReactNode } from 'react';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import { FilterTabs, FilterTab } from '@tempo/dashboard/components/tables/TableFilter';
import type { TranslatableEntities } from '@tempo/dashboard/oldSrc/translations/urls';

import { languageListUrl } from '@tempo/dashboard/oldSrc/translations/urls';

export interface TranslationsEntitiesListPageProps {
  children: ReactNode;
  filters: TranslationsEntitiesFilters;
  language: Maybe<LanguageFragment>;
}

export interface TranslationsEntitiesFilters {
  current: TranslationsEntitiesListFilterTab;
  onCategoriesTabClick: () => void;
  onCollectionsTabClick: () => void;
  onProductsTabClick: () => void;
  onSalesTabClick: () => void;
  onVouchersTabClick: () => void;
  onPagesTabClick: () => void;
  onAttributesTabClick: () => void;
  onShippingMethodsTabClick: () => void;
  onMenuItemsTabClick: () => void;
}

export type TranslationsEntitiesListFilterTab = keyof typeof TranslatableEntities;

const tabs: TranslationsEntitiesListFilterTab[] = [
  'categories',
  'collections',
  'products',
  'sales',
  'vouchers',
  'pages',
  'attributes',
  'shippingMethods',
  'menuItems',
];

const TranslationsEntitiesListPage: FC<TranslationsEntitiesListPageProps> = (props) => {
  const { filters, language, children } = props;

  const queryTab = tabs.indexOf(filters.current);
  const currentTab = queryTab >= 0 ? queryTab : 0;

  return (
    <Container>
      <Backlink href={languageListUrl}>{m.dashboard_sBRWL() ?? 'Languages'}</Backlink>
      <PageHeader
        title={
          m.dashboard_emBUF({
            language: language.language ?? '...',
          }) ?? 'Translations to {language}'
        }
      />
      <Card>
        <FilterTabs currentTab={currentTab}>
          <FilterTab
            label={m.dashboard_Kb_MS() ?? 'Categories'}
            onClick={filters.onCategoriesTabClick}
          />
          <FilterTab
            label={m.dashboard_lh_kf() ?? 'Collections'}
            onClick={filters.onCollectionsTabClick}
          />
          <FilterTab
            label={m.dashboard_NFfmz() ?? 'Products'}
            onClick={filters.onProductsTabClick}
          />
          <FilterTab label={m.dashboard__nvms() ?? 'Sales'} onClick={filters.onSalesTabClick} />
          <FilterTab
            label={m.dashboard_tP0 + D() ?? 'Vouchers'}
            onClick={filters.onVouchersTabClick}
          />
          <FilterTab label={m.dashboard_xfKLC() ?? 'Pages'} onClick={filters.onPagesTabClick} />
          <FilterTab label={m._xTpT_() ?? 'Attributes'} onClick={filters.onAttributesTabClick} />
          <FilterTab
            label={m.dashboard_zsKm_() ?? 'Shipping methods'}
            onClick={filters.onShippingMethodsTabClick}
          />
          <FilterTab
            label={m.dashboard_cMzwj() ?? 'Menu items'}
            onClick={filters.onMenuItemsTabClick}
          />
        </FilterTabs>
        {children}
      </Card>
    </Container>
  );
};
TranslationsEntitiesListPage.displayName = 'TranslationsEntitiesListPage';
export default TranslationsEntitiesListPage;
