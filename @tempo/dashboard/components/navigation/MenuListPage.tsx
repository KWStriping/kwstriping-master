import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import type { MenuFragment } from '@tempo/api/generated/graphql';
import type { MenuListUrlOrdering } from '@tempo/dashboard/oldSrc/navigation/urls';
import { menuListUrl } from '@tempo/dashboard/oldSrc/navigation/urls';
import type { ListActions, PageListProps, SortPage } from '@tempo/dashboard/oldSrc/types';
import Container from '@mui/material/Container';
import type { FC } from 'react';

import MenuList from './MenuList';

export interface MenuListPageProps
  extends PageListProps,
    ListActions,
    SortPage<MenuListUrlOrdering> {
  menus: MenuFragment[];
  onDelete: (id: string) => void;
}

const MenuListPage: FC<MenuListPageProps> = ({ ...listProps }) => {
  const addUrl = menuListUrl({
    action: 'add',
  });

  return (
    <Container>
      <Backlink href={'/configuration'}>
        {m.dashboard_configuration() ?? 'Configuration'}
      </Backlink>
      <PageHeader title={m.dashboard_navigation() ?? 'Navigation'}>
        <Button color="primary" href={addUrl} data-test-id="add-menu">
          <>
            {/* button */}

            {m.dashboard_XRYQg() ?? 'Create Menu'}
          </>
        </Button>
      </PageHeader>
      <MenuList {...listProps} />
    </Container>
  );
};
MenuListPage.displayName = 'MenuListPage';
export default MenuListPage;
