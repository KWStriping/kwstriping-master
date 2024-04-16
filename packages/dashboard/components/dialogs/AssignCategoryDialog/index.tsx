import { useTranslation } from '@core/i18n';
import type { SearchCategoriesQuery } from '@core/api/graphql';
import type { RelayToFlat } from '@dashboard/oldSrc/types';
import type { FC } from 'react';

import type { AssignContainerDialogProps } from '../AssignContainerDialog';
import AssignContainerDialog from '../AssignContainerDialog';

interface AssignCategoryDialogProps
  extends Omit<AssignContainerDialogProps, 'containers' | 'labels'> {
  categories: RelayToFlat<NonNullable<SearchCategoriesQuery['search']>>;
}

const AssignCategoryDialog: FC<AssignCategoryDialogProps> = ({ categories, ...rest }) => {
  const { t } = useTranslation();

  return (
    <AssignContainerDialog
      containers={categories}
      labels={{
        title: t('dashboard.assignCategoryDialogHeader', 'Assign Category'),
        label: t('dashboard.assignCategoryDialogLabel', 'Search Category'),
        placeholder: t(
          'dashboard.assignCategoryDialogPlaceholder',
          'Search by category name, etc...'
        ),
        confirmBtn: t('dashboard.onfirmButton', 'Assign and save'),
      }}
      {...rest}
    />
  );
};

AssignCategoryDialog.displayName = 'AssignCategoryDialog';
export default AssignCategoryDialog;
