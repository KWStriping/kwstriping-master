import { useTranslation } from '@core/i18n';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import { Button } from '@core/ui/components/buttons/Button';
import AttributeList from '@dashboard/components/attributes/AttributeList';
import FilterBar from '@dashboard/components/bars/FilterBar';
import PageHeader from '@dashboard/components/core/PageHeader';
import type { AttributeFragment } from '@core/api/graphql';
import type { AttributeListUrlOrdering } from '@dashboard/oldSrc/attributes/urls';

import type {
  FilterPageProps,
  ListActions,
  PageListProps,
  SortPage,
  TabPageProps,
} from '@dashboard/oldSrc/types';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import type { FC } from 'react';
import type { AttributeFilterKeys, AttributeListFilterOpts } from './filters';
import { useFilterStructure } from './filters';

export interface AttributeListPageProps
  extends PageListProps,
    ListActions,
    FilterPageProps<AttributeFilterKeys, AttributeListFilterOpts>,
    SortPage<AttributeListUrlOrdering>,
    TabPageProps {
  attributes: AttributeFragment[];
}

const AttributeListPage: FC<AttributeListPageProps> = ({
  filterOpts,
  initialSearch,
  onFilterChange,
  onSearchChange,
  currentTab,
  onAll,
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
      <Backlink href={'/configuration/'}>
        {t('dashboard.configuration', 'Configuration')}
      </Backlink>
      <PageHeader title={t('dashboard.attributes', 'Attributes')}>
        <Button href={'/attributes/add'} color="primary" data-test-id="create-attribute-button">
          <>
            {/* button */}

            {t('dashboard.GvQ8k', 'Create attribute')}
          </>
        </Button>
      </PageHeader>
      <Card>
        <FilterBar
          allTabLabel={t('dashboard.allAttributes', 'All Attributes')}
          currentTab={currentTab}
          structure={structure}
          initialSearch={initialSearch}
          searchPlaceholder={t('dashboard.div9r', 'Search Attribute')}
          tabs={tabs}
          onAll={onAll}
          onFilterChange={onFilterChange}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
        />
        <AttributeList {...listProps} />
      </Card>
    </Container>
  );
};
AttributeListPage.displayName = 'AttributeListPage';
export default AttributeListPage;
