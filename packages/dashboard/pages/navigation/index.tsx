import { Trans, useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { getById } from '@core/utils';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import DialogContentText from '@mui/material/DialogContentText';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { assert } from 'tsafe/assert';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import MenuCreateDialog from '@dashboard/components/navigation/MenuCreateDialog';
import MenuListPage from '@dashboard/components/navigation/MenuListPage';
import {
  MenuListDocument,
  MenuBulkDeleteDocument,
  MenuCreateDocument,
  MenuDeleteDocument,
} from '@core/api/graphql';

import useBulkActions from '@dashboard/hooks/useBulkActions';
import useListSettings from '@dashboard/hooks/useListSettings';
import { usePaginationReset } from '@dashboard/hooks/usePaginationReset';
import usePaginator, {
  createPaginationState,
  PaginatorContext,
} from '@dashboard/hooks/usePaginator';
import { getStringOrPlaceholder } from '@dashboard/oldSrc/misc';
import { getSortQueryVariables } from '@dashboard/oldSrc/navigation/sort';
import type { MenuListUrlQueryParams } from '@dashboard/oldSrc/navigation/urls';
import { menuListUrl, menuUrl } from '@dashboard/oldSrc/navigation/urls';
import { ListViews } from '@dashboard/oldSrc/types';
import useSortHandler from '@dashboard/oldSrc/utils/handlers/sortHandler';
import { getSortParams } from '@dashboard/oldSrc/utils/sort';

interface MenuListProps {
  params: MenuListUrlQueryParams;
}
const MenuList = () => {
  const router = useRouter();
  const params = router.query;
  const { ids = [] } = params;
  assert(Array.isArray(ids));
  const notify = useNotifier();
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(ids);
  const { updateListSettings, settings } = useListSettings(ListViews.NavigationList);

  usePaginationReset(menuListUrl, params, settings.rowNumber);

  const { t } = useTranslation();

  const closeModal = () =>
    void router.replace(
      menuListUrl({
        ...params,
        action: undefined,
        id: undefined,
        ids: undefined,
      })
    );

  const paginationState = createPaginationState(settings.rowNumber, params);
  const queryVariables = useMemo(
    () => ({
      ...paginationState,
      sort: getSortQueryVariables(params),
    }),
    [params, settings.rowNumber]
  );
  const [{ data, fetching: loading }, refetch] = useQuery(MenuListDocument, {
    displayLoader: true,
    variables: queryVariables,
  });

  const paginationValues = usePaginator({
    pageInfo: data?.menus?.pageInfo,
    paginationState,
    queryString: params,
  });

  const [createMenu, createMenuOpts] = useMutation(MenuCreateDocument, {
    onCompleted: (data) => {
      if (data?.createMenu?.errors?.length === 0) {
        notify(t('dashboard.gnggZ', 'Created menu'), {
          type: 'success',
        });
        void router.push(menuUrl(data?.createMenu?.menu?.id));
      }
    },
  });

  const [deleteMenu, deleteMenuOpts] = useMutation(MenuDeleteDocument, {
    onCompleted: (data) => {
      if (data?.deleteMenu?.errors?.length === 0) {
        notify(t('dashboard.wG/0z', 'Deleted menu'), {
          type: 'success',
        });
        closeModal();
        refetch();
      }
    },
  });

  const [deleteMenus, deleteMenusOpts] = useMutation(MenuBulkDeleteDocument, {
    onCompleted: (data) => {
      if (data?.deleteMenus?.errors?.length === 0) {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
        closeModal();
        reset();
        refetch();
      }
    },
  });

  const handleSort = useSortHandler(menuListUrl, params);
  const count = ids?.length ?? 0;
  return (
    <PaginatorContext.Provider value={paginationValues}>
      <MenuListPage
        disabled={loading}
        menus={mapEdgesToItems(data?.menus)}
        settings={settings}
        onDelete={(id) =>
          void router.push(
            menuListUrl({
              action: 'remove',
              id,
            })
          )
        }
        onUpdateListSettings={updateListSettings}
        onSort={handleSort}
        isChecked={isSelected}
        selected={listElements.length}
        sort={getSortParams(params)}
        toggle={toggle}
        toggleAll={toggleAll}
        toolbar={
          <Button
            onClick={() =>
              void router.push(
                menuListUrl({
                  ...params,
                  action: 'remove-many',
                  ids: listElements,
                })
              )
            }
          >
            {t('dashboard.remove', 'Remove')}
          </Button>
        }
      />
      <MenuCreateDialog
        open={params.action === 'add'}
        confirmButtonState={createMenuOpts.status}
        disabled={createMenuOpts.fetching}
        errors={createMenuOpts?.data?.createMenu?.errors || []}
        onClose={closeModal}
        onConfirm={(formData) =>
          createMenu({
            input: formData,
          })
        }
      />
      <ActionDialog
        open={params.action === 'remove'}
        onClose={closeModal}
        confirmButtonState={deleteMenuOpts.status}
        onConfirm={() =>
          deleteMenu({
            id: params.id,
          })
        }
        variant="delete"
        title={t(
          'dashboard.zseV7',
          'Delete Menu'
          // dialog header
        )}
      >
        <DialogContentText>
          {t('dashboard.j1U23', 'Are you sure you want to delete {{menuName}}?', {
            menuName: getStringOrPlaceholder(
              mapEdgesToItems(data?.menus)?.find(getById(params.id))?.name
            ),
          })}
        </DialogContentText>
      </ActionDialog>
      <ActionDialog
        open={params.action === 'remove-many' && ids?.length}
        onClose={closeModal}
        confirmButtonState={deleteMenusOpts.status}
        onConfirm={() =>
          deleteMenus({
            ids: ids,
          })
        }
        variant="delete"
        title={t(
          'dashboard.LBYpE',
          'Delete Menus'
          // dialog header
        )}
      >
        <DialogContentText>
          <Trans t={t} i18nKey="svK+kv" count={count} displayQuantity={<strong>{count}</strong>}>
            {count === 1
              ? 'Are you sure you want to delete this menu?'
              : 'Are you sure you want to delete {{displayQuantity}} menus?'}
          </Trans>
        </DialogContentText>
      </ActionDialog>
    </PaginatorContext.Provider>
  );
};
export default MenuList;
