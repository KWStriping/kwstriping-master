import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import type { FC } from 'react';
import GroupList from './GroupList';
import PageHeader from '@dashboard/components/core/PageHeader';
import type { GroupFragment } from '@core/api/graphql';

import type { GroupListUrlOrdering } from '@dashboard/oldSrc/groups/urls';
import { groupAddUrl } from '@dashboard/oldSrc/groups/urls';
import type { PageListProps, SortPage } from '@dashboard/oldSrc/types';

export interface GroupListPageProps extends PageListProps, SortPage<GroupListUrlOrdering> {
  groups: Maybe<GroupFragment[]>;
  onDelete: (id: string) => void;
}

const GroupListPage: FC<GroupListPageProps> = (listProps) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Backlink href={'/configuration'}>{t('dashboard.configuration', 'Configuration')}</Backlink>
      <PageHeader title={t('dashboard.groups', 'Permission Groups')}>
        <Button color="primary" href={groupAddUrl} data-test-id="create-permission-group">
          {t('dashboard.createGroup', 'Create permission group')}
        </Button>
      </PageHeader>
      <Card>
        <GroupList {...listProps} />
      </Card>
    </Container>
  );
};
GroupListPage.displayName = 'GroupListPage';
export default GroupListPage;
