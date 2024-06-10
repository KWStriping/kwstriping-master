import * as m from '@paraglide/messages';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import { Button } from '@tempo/ui/components/buttons/Button';
import AttributeList from '@tempo/dashboard/components/attributes/AttributeList';
import FilterBar from '@tempo/dashboard/components/bars/FilterBar';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import type { AttributeFragment } from '@tempo/api/generated/graphql';
import type { AttributeListUrlOrdering } from '@tempo/dashboard/oldSrc/attributes/urls';

import type {
  FilterPageProps,
  ListActions,
  PageListProps,
  SortPage,
  TabPageProps,
} from '@tempo/dashboard/oldSrc/types';
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
  const structure = useFilterStructure(filterOpts);
  return (
    <Container>
      <Backlink href={'/configuration/'}>
        {m.dashboard_configuration() ?? 'Configuration'}
      </Backlink>
      <PageHeader title={m.dashboard_attributes() ?? 'Attributes'}>
        <Button href={'/attributes/add'} color="primary" data-test-id="create-attribute-button">
          <>
            {/* button */}

            {m.dashboard_GvQ_k() ?? 'Create attribute'}
          </>
        </Button>
      </PageHeader>
      <Card>
        <FilterBar
          allTabLabel={m.dashboard_allAttributes() ?? 'All Attributes'}
          currentTab={currentTab}
          structure={structure}
          initialSearch={initialSearch}
          searchPlaceholder={m.dashboard_div_r() ?? 'Search Attribute'}
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
