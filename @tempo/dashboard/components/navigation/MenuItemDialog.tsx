import * as m from '@paraglide/messages';
import { Trans } from '@tempo/next/i18n';
import BackButton from '@tempo/ui/components/buttons/BackButton';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import ConfirmButton from '@tempo/ui/components/buttons/ConfirmButton';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import isUrl from 'is-url';
import type { ChangeEvent, FC } from 'react';
import { useEffect, useState } from 'react';
import type {
  MenuErrorFragment,
  SearchCategoriesQuery,
  SearchCollectionsQuery,
  SearchPagesQuery,
} from '@tempo/api/generated/graphql';
import AutocompleteSelectMenu from '@tempo/dashboard/components/AutocompleteSelectMenu';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';
import useModalDialogErrors from '@tempo/dashboard/hooks/useModalDialogErrors';
import useModalDialogOpen from '@tempo/dashboard/hooks/useModalDialogOpen';
import useStateFromProps from '@tempo/dashboard/hooks/useStateFromProps';
import type { RelayToFlat } from '@tempo/dashboard/oldSrc/types';
import { getFieldError, getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import getMenuErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/menu';
import type { IMenu } from '@tempo/dashboard/oldSrc/utils/menu';
import { getMenuItemByValue } from '@tempo/dashboard/oldSrc/utils/menu';

export type MenuItemType = 'category' | 'collection' | 'link' | 'page';
export interface MenuItemData {
  id: string;
  type: MenuItemType;
}

export interface MenuItemDialogFormData extends MenuItemData {
  name: string;
}

export interface MenuItemDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  disabled: boolean;
  errors: MenuErrorFragment[];
  initial?: MenuItemDialogFormData;
  initialDisplayValue?: string;
  loading: boolean;
  open: boolean;
  collections: RelayToFlat<NonNullable<SearchCollectionsQuery['search']>>;
  categories: RelayToFlat<NonNullable<SearchCategoriesQuery['search']>>;
  pages: RelayToFlat<NonNullable<SearchPagesQuery['search']>>;
  onClose: () => void;
  onSubmit: (data: MenuItemDialogFormData) => void;
  onQueryChange: (query: string) => void;
}

const defaultInitial: MenuItemDialogFormData = {
  id: '',
  name: '',
  type: 'category',
};

function getMenuItemData(value: string): MenuItemData {
  const [type, ...idParts] = value.split(':');
  return {
    id: idParts.join(':'),
    type: type as MenuItemType,
  };
}

function getDisplayValue(menu: IMenu, value: string): string {
  const menuItemData = getMenuItemData(value);
  if (menuItemData.type === 'link') {
    return menuItemData.id;
  }
  return getMenuItemByValue(menu, value).label.toString();
}

const MenuItemDialog: FC<MenuItemDialogProps> = ({
  confirmButtonState,
  disabled,
  errors: apiErrors,
  initial,
  initialDisplayValue,
  loading,
  onClose,
  onSubmit,
  onQueryChange,
  open,
  categories,
  collections,
  pages,
}) => {
  const errors = useModalDialogErrors(apiErrors, open);
  const [displayValue, setDisplayValue] = useState(initialDisplayValue || '');
  const [data, setData] = useStateFromProps<MenuItemDialogFormData>(initial || defaultInitial);
  const [url, setUrl] = useState<string>(undefined);

  // Reset input state after closing dialog
  useModalDialogOpen(open, {
    onClose: () => {
      setData(initial || defaultInitial);
      setDisplayValue(initialDisplayValue);
      setUrl(undefined);
    },
  });

  // Refresh initial display value if changed
  useEffect(() => setDisplayValue(initialDisplayValue), [initialDisplayValue]);

  const mutationErrors = errors?.filter((err) => err.field === null);
  const formErrors = getFormErrors(['name'], errors);
  const testIds = ['category', 'collection', 'page', 'url'];
  const idError = ['category', 'collection', 'page', 'url']
    .map((field) => getFieldError(errors, field))
    .reduce((acc, err) => acc || err);

  let options: IMenu = [];

  if (categories?.length) {
    options = [
      ...options,
      {
        children: categories.map((category) => ({
          children: [],
          data: {},
          label: category.name,
          value: 'category:' + category.id,
        })),
        data: {},
        label: m.dashboard_categories() ?? 'Categories',
      },
    ];
  }

  if (collections?.length) {
    options = [
      ...options,
      {
        children: collections.map((collection) => ({
          children: [],
          data: {},
          label: collection.name,
          value: 'collection:' + collection.id,
        })),
        data: {},
        label: m.dashboard_collections() ?? 'Collections',
      },
    ];
  }

  if (pages?.length) {
    options = [
      ...options,
      {
        children: pages.map((page) => ({
          children: [],
          data: {},
          label: page.title,
          value: 'page:' + page.id,
        })),
        data: {},
        label: m.dashboard_pages() ?? 'Pages',
      },
    ];
  }

  if (url) {
    options = [
      {
        children: [],
        data: {},
        label: (
          <Trans t={t} i18nKey={'fzDI3A'} url={`<strong>${url}</strong>}`}>
            {'Link to: {url}'}
          </Trans>
        ),
        value: 'link:' + url,
      },
    ];
  }

  const handleQueryChange = (query: string) => {
    if (isUrl(query)) {
      setUrl(query);
    } else if (isUrl('http://' + query)) {
      setUrl('http://' + query);
    } else if (url) {
      setUrl(undefined);
    }
    onQueryChange(query);
  };

  const handleSelectChange = (event: ChangeEvent<unknown>) => {
    const value = event.target.value;
    const menuItemData = getMenuItemData(value);

    setData((value) => ({
      ...value,
      ...menuItemData,
    }));
    setDisplayValue(getDisplayValue(options, value));
  };

  const handleSubmit = () => onSubmit(data);

  return (
    <Dialog
      onClose={onClose}
      open={open}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: { overflowY: 'visible' },
      }}
    >
      <DialogTitle>
        {initial
          ? t(
              'dashboard_KQUMK',
              'Edit Item'
              // edit menu item, header
            )
          : t(
              'dashboard_3Uirw',
              'Add Item'
              // create new menu item, header
            )}
      </DialogTitle>
      <DialogContent style={{ overflow: 'visible' }}>
        <TextField
          disabled={disabled}
          label={
            m.dashboard_Vyr_h() ?? 'Name'
            // menu item name
          }
          fullWidth
          value={data?.name}
          onChange={(event) =>
            setData((value) => ({
              ...value,
              name: event.target.value,
            }))
          }
          name="name"
          error={!!formErrors.name}
          helperText={getMenuErrorMessage(formErrors.name, t)}
        />
        <FormSpacer />
        <AutocompleteSelectMenu
          disabled={disabled}
          onChange={handleSelectChange}
          name="id"
          label={m.dashboard_linkLabel() ?? 'Link'}
          displayValue={displayValue}
          loading={loading}
          options={options}
          testIds={testIds}
          error={!!idError}
          helperText={getMenuErrorMessage(idError, t)}
          placeholder={m.dashboard__GZnc() ?? 'Start typing to begin search...'}
          onInputChange={handleQueryChange}
        />
        {!!mutationErrors?.length && (
          <>
            <FormSpacer />
            {mutationErrors.map((err) => (
              <Typography key={err.code} color="error">
                {getMenuErrorMessage(err, t)}
              </Typography>
            ))}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <BackButton onClick={onClose} />
        <ConfirmButton
          data-test-id="submit"
          transitionState={confirmButtonState}
          onClick={handleSubmit}
        >
          {m.dashboard_onfirm() ?? 'Confirm'}
        </ConfirmButton>
      </DialogActions>
    </Dialog>
  );
};
MenuItemDialog.displayName = 'MenuItemDialog';
export default MenuItemDialog;
