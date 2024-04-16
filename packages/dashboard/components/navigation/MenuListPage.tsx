import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import PageHeader from '@dashboard/components/core/PageHeader';
import type { MenuFragment } from '@core/api/graphql';
import type { MenuListUrlOrdering } from '@dashboard/oldSrc/navigation/urls';
import { menuListUrl } from '@dashboard/oldSrc/navigation/urls';
import type { ListActions, PageListProps, SortPage } from '@dashboard/oldSrc/types';
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
  const { t } = useTranslation();
  const addUrl = menuListUrl({
    action: 'add',
  });

  return (
    <Container>
      <Backlink href={'/configuration'}>{t('dashboard.configuration', 'Configuration')}</Backlink>
      <PageHeader title={t('dashboard.navigation', 'Navigation')}>
        <Button color="primary" href={addUrl} data-test-id="add-menu">
          <>
            {/* button */}

            {t('dashboard.XRYQg', 'Create Menu')}
          </>
        </Button>
      </PageHeader>
      <MenuList {...listProps} />
    </Container>
  );
};
MenuListPage.displayName = 'MenuListPage';
export default MenuListPage;
