import { Trans, useTranslation } from '@core/i18n';
import BackButton from '@core/ui/components/buttons/BackButton';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import ConfirmButton from '@core/ui/components/buttons/ConfirmButton';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import isUrl from 'is-url';
import type { ChangeEvent, FC } from 'react';
import { useEffect, useState } from 'react';
import AutocompleteSelectMenu from '@dashboard/components/AutocompleteSelectMenu';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
import type {
  MenuErrorFragment,
  SearchCategoriesQuery,
  SearchCollectionsQuery,
  SearchPagesQuery,
} from '@core/api/graphql';
import useModalDialogErrors from '@dashboard/hooks/useModalDialogErrors';
import useModalDialogOpen from '@dashboard/hooks/useModalDialogOpen';
import useStateFromProps from '@dashboard/hooks/useStateFromProps';
import type { RelayToFlat } from '@dashboard/oldSrc/types';
import { getFieldError, getFormErrors } from '@dashboard/oldSrc/utils/errors';
import getMenuErrorMessage from '@dashboard/oldSrc/utils/errors/menu';
import type { IMenu } from '@dashboard/oldSrc/utils/menu';
import { getMenuItemByValue } from '@dashboard/oldSrc/utils/menu';

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
  const { t } = useTranslation();
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
        label: t('dashboard.categories', 'Categories'),
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
        label: t('dashboard.collections', 'Collections'),
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
        label: t('dashboard.pages', 'Pages'),
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
              'dashboard.KQUMK',
              'Edit Item'
              // edit menu item, header
            )
          : t(
              'dashboard.3Uirw',
              'Add Item'
              // create new menu item, header
            )}
      </DialogTitle>
      <DialogContent style={{ overflow: 'visible' }}>
        <TextField
          disabled={disabled}
          label={t(
            'dashboard.Vyr8h',
            'Name'
            // menu item name
          )}
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
          label={t('dashboard.linkLabel', 'Link')}
          displayValue={displayValue}
          loading={loading}
          options={options}
          testIds={testIds}
          error={!!idError}
          helperText={getMenuErrorMessage(idError, t)}
          placeholder={t('dashboard.8GZnc', 'Start typing to begin search...')}
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
          {t('dashboard.onfirm', 'Confirm')}
        </ConfirmButton>
      </DialogActions>
    </Dialog>
  );
};
MenuItemDialog.displayName = 'MenuItemDialog';
export default MenuItemDialog;
