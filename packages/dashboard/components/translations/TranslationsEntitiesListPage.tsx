import { useTranslation } from '@core/i18n';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import PageHeader from '@dashboard/components/core/PageHeader';
import { FilterTabs, FilterTab } from '@dashboard/components/tables/TableFilter';
import type { LanguageFragment } from '@core/api/graphql';
import type { TranslatableEntities } from '@dashboard/oldSrc/translations/urls';

import { languageListUrl } from '@dashboard/oldSrc/translations/urls';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import type { FC, ReactNode } from 'react';

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

  const { t } = useTranslation();
  const queryTab = tabs.indexOf(filters.current);
  const currentTab = queryTab >= 0 ? queryTab : 0;

  return (
    <Container>
      <Backlink href={languageListUrl}>{t('dashboard.sBRWL', 'Languages')}</Backlink>
      <PageHeader
        title={t('dashboard.emBUF', 'Translations to {language}', {
          language: language.language ?? '...',
        })}
      />
      <Card>
        <FilterTabs currentTab={currentTab}>
          <FilterTab
            label={t('dashboard.Kb1MS', 'Categories')}
            onClick={filters.onCategoriesTabClick}
          />
          <FilterTab
            label={t('dashboard.lh3kf', 'Collections')}
            onClick={filters.onCollectionsTabClick}
          />
          <FilterTab
            label={t('dashboard.NFfmz', 'Products')}
            onClick={filters.onProductsTabClick}
          />
          <FilterTab label={t('dashboard.8nvms', 'Sales')} onClick={filters.onSalesTabClick} />
          <FilterTab
            label={t('dashboard.tP0+D', 'Vouchers')}
            onClick={filters.onVouchersTabClick}
          />
          <FilterTab label={t('dashboard.xfKLC', 'Pages')} onClick={filters.onPagesTabClick} />
          <FilterTab label={t('+xTpT1', 'Attributes')} onClick={filters.onAttributesTabClick} />
          <FilterTab
            label={t('dashboard.zsKm8', 'Shipping methods')}
            onClick={filters.onShippingMethodsTabClick}
          />
          <FilterTab
            label={t('dashboard.cMzwj', 'Menu items')}
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
