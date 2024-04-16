import { Trans, useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { extractMutationErrors } from '@core/urql/utils';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import DialogContentText from '@mui/material/DialogContentText';
import { useRouter } from 'next/router';
import { assert } from 'tsafe/assert';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import MenuDetailsPage from '@dashboard/components/navigation/MenuDetailsPage';
import type { MenuDetailsSubmitData } from '@dashboard/components/navigation/MenuDetailsPage';
import { findNode, getNode } from '@dashboard/components/navigation/MenuDetailsPage/tree';
import type {
  MenuItemDialogFormData,
  MenuItemType,
} from '@dashboard/components/navigation/MenuItemDialog';
import MenuItemDialog from '@dashboard/components/navigation/MenuItemDialog';
import {
  getItemId,
  getItemType,
  unknownTypeError,
} from '@dashboard/components/navigation/MenuItems';
import {
  MenuDeleteDocument,
  MenuDetailsDocument,
  MenuItemCreateDocument,
  MenuItemUpdateDocument,
  MenuUpdateDocument,
} from '@core/api/graphql';

import { DEFAULT_INITIAL_SEARCH_DATA } from '@dashboard/oldSrc/config';
import { maybe } from '@dashboard/oldSrc/misc';
import {
  handleDelete,
  handleItemCreate,
  handleItemUpdate,
  handleUpdate,
} from '@dashboard/oldSrc/navigation/MenuDetails/successHandlers';
import {
  getInitialDisplayValue,
  getMenuItemCreationInputData,
  getMenuItemInputData,
  getMoves,
  getRemoveIds,
} from '@dashboard/oldSrc/navigation/MenuDetails/utils';
import type { MenuUrlQueryParams } from '@dashboard/oldSrc/navigation/urls';
import { menuUrl } from '@dashboard/oldSrc/navigation/urls';
import useCategorySearch from '@dashboard/oldSrc/searches/useCategorySearch';
import useCollectionSearch from '@dashboard/oldSrc/searches/useCollectionSearch';
import usePageSearch from '@dashboard/oldSrc/searches/usePageSearch';

interface MenuDetailsProps {
  id: string;
  params: MenuUrlQueryParams;
}

const MenuDetails = () => {
  const router = useRouter();
  const notify = useNotifier();
  const { t } = useTranslation();

  const { menuId: id, ...params } = router.query;
  assert(typeof id === 'string');

  const categorySearch = useCategorySearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA,
  });
  const collectionSearch = useCollectionSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA,
  });
  const pageSearch = usePageSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA,
  });

  const [{ data, fetching: loading }, refetch] = useQuery(MenuDetailsDocument, {
    variables: { id },
  });

  const [deleteMenu, deleteMenuOpts] = useMutation(MenuDeleteDocument, {
    onCompleted: (data) => handleDelete(data, router, notify, t),
  });

  const [updateMenu, updateMenuOpts] = useMutation(MenuUpdateDocument, {
    onCompleted: (data) => handleUpdate(data, notify, refetch, t),
  });

  const [createMenuItem, createMenuItemOpts] = useMutation(MenuItemCreateDocument, {
    onCompleted: (data) => handleItemCreate(data, notify, closeModal, t),
  });

  const [updateMenuItem, updateMenuItemOpts] = useMutation(MenuItemUpdateDocument, {
    onCompleted: (data) => handleItemUpdate(data, id, router, notify, t),
  });

  const closeModal = () =>
    void router.replace(
      menuUrl(id, {
        ...params,
        action: undefined,
        id: undefined,
      })
    );

  const handleItemClick = (id: string, type: MenuItemType) => {
    switch (type) {
      case 'category':
        void router.push({ pathname: '/categories/[id]', query: { id } });
        break;

      case 'link':
        window.open(id, 'blank');
        break;

      default:
        throw unknownTypeError;
        break;
    }
  };

  const handleQueryChange = (query: string) => {
    categorySearch.search(query);
    collectionSearch.search(query);
    pageSearch.search(query);
  };

  const categories = mapEdgesToItems(categorySearch?.result?.data?.search) || [];

  const collections = mapEdgesToItems(collectionSearch?.result?.data?.search) || [];

  const pages = mapEdgesToItems(pageSearch?.result?.data?.search) || [];

  const handleMenuItemCreate = (data: MenuItemDialogFormData) =>
    extractMutationErrors(
      createMenuItem({
        input: getMenuItemCreationInputData(id, data),
      })
    );

  const handleMenuItemUpdate = (data: MenuItemDialogFormData) =>
    typeof params.id === 'string' &&
    extractMutationErrors(
      updateMenuItem({
        id: params.id,
        input: getMenuItemInputData(data),
      })
    );

  const menuItem = data?.menu?.items?.length
    ? getNode(data?.menu?.items, findNode(data?.menu?.items, params.id))
    : undefined;

  const initialMenuItemUpdateFormData: MenuItemDialogFormData = {
    id: menuItem ? getItemId(menuItem) : 'new-item', // TODO
    name: menuItem?.name ?? '...',
    type: maybe<MenuItemType>(() => getItemType(menuItem), 'category'),
  };

  // This is a workaround to let know <MenuDetailsPage />
  // that it should clean operation stack if mutations
  // were successful
  const handleSubmit = async (data: MenuDetailsSubmitData) => {
    const result = await updateMenu({
      id,
      moves: getMoves(data),
      name: data?.name,
      removeIds: getRemoveIds(data),
    });

    return [
      ...(result?.data?.deleteMenuItems?.errors ?? []),
      ...(result?.data?.moveMenuItem?.errors ?? []),
      ...(result?.data?.updateMenu?.errors ?? []),
    ];
  };

  return (
    <>
      <MenuDetailsPage
        disabled={loading}
        errors={[
          ...(updateMenuOpts?.data?.updateMenu?.errors || []),
          ...(updateMenuOpts?.data?.moveMenuItem?.errors || []),
          ...(updateMenuOpts?.data?.updateMenu?.errors || []),
        ]}
        menu={data?.menu}
        onDelete={() =>
          void router.push({ pathname: '/navigation/[id]', query: { id, action: 'remove' } })
        }
        onItemAdd={() =>
          void router.push({ pathname: '/navigation/[id]', query: { id, action: 'add-item' } })
        }
        onItemClick={handleItemClick}
        onItemEdit={(itemId) =>
          void router.push({
            pathname: '/navigation/[id]',
            query: { action: 'edit-item', id: itemId },
          })
        }
        onSubmit={handleSubmit}
        saveButtonState={updateMenuOpts.status}
      />
      <ActionDialog
        open={params.action === 'remove'}
        onClose={closeModal}
        confirmButtonState={deleteMenuOpts.status}
        onConfirm={() => extractMutationErrors(deleteMenu({ id }))}
        variant="delete"
        title={t(
          'dashboard.zseV7',
          'Delete Menu'
          // dialog header
        )}
      >
        <DialogContentText>
          <Trans t={t} i18nKey="G/SYtU" menuName={<strong>{data?.menu?.name ?? '...'}</strong>}>
            {'Are you sure you want to delete menu {{menuName}}?'}
          </Trans>
        </DialogContentText>
      </ActionDialog>

      <MenuItemDialog
        open={params.action === 'add-item'}
        categories={categories}
        collections={collections}
        errors={createMenuItemOpts?.data?.createMenuItem?.errors ?? []}
        pages={pages}
        loading={categorySearch.result?.fetching || collectionSearch.result?.fetching}
        confirmButtonState={createMenuItemOpts.status}
        disabled={createMenuItemOpts.fetching}
        onClose={closeModal}
        onSubmit={handleMenuItemCreate}
        onQueryChange={handleQueryChange}
      />
      <MenuItemDialog
        open={params.action === 'edit-item'}
        categories={categories}
        collections={collections}
        errors={updateMenuItemOpts?.data?.updateMenuItem?.errors ?? []}
        pages={pages}
        initial={initialMenuItemUpdateFormData}
        initialDisplayValue={getInitialDisplayValue(menuItem)}
        loading={categorySearch.result.fetching || collectionSearch.result.fetching}
        confirmButtonState={updateMenuItemOpts.status}
        disabled={updateMenuItemOpts.fetching}
        onClose={closeModal}
        onSubmit={handleMenuItemUpdate}
        onQueryChange={handleQueryChange}
      />
    </>
  );
};

export default MenuDetails;
