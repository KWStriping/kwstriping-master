import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import type { FC } from 'react';
import type { GroupFragment } from '@tempo/api/generated/graphql';
import GroupList from './GroupList';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';

import type { GroupListUrlOrdering } from '@tempo/dashboard/oldSrc/groups/urls';
import { groupAddUrl } from '@tempo/dashboard/oldSrc/groups/urls';
import type { PageListProps, SortPage } from '@tempo/dashboard/oldSrc/types';

export interface GroupListPageProps extends PageListProps, SortPage<GroupListUrlOrdering> {
  groups: Maybe<GroupFragment[]>;
  onDelete: (id: string) => void;
}

const GroupListPage: FC<GroupListPageProps> = (listProps) => {
  return (
    <Container>
      <Backlink href={'/configuration'}>
        {m.dashboard_configuration() ?? 'Configuration'}
      </Backlink>
      <PageHeader title={m.dashboard_groups() ?? 'Permission Groups'}>
        <Button color="primary" href={groupAddUrl} data-test-id="create-permission-group">
          {m.dashboard_createGroup() ?? 'Create permission group'}
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
