import * as m from '@paraglide/messages';
import type { SearchCategoriesQuery } from '@tempo/api/generated/graphql';
import type { RelayToFlat } from '@tempo/dashboard/oldSrc/types';
import type { FC } from 'react';

import type { AssignContainerDialogProps } from '../AssignContainerDialog';
import AssignContainerDialog from '../AssignContainerDialog';

interface AssignCategoryDialogProps
  extends Omit<AssignContainerDialogProps, 'containers' | 'labels'> {
  categories: RelayToFlat<NonNullable<SearchCategoriesQuery['search']>>;
}

const AssignCategoryDialog: FC<AssignCategoryDialogProps> = ({ categories, ...rest }) => {
  return (
    <AssignContainerDialog
      containers={categories}
      labels={{
        title: m.dashboard_assignCategoryDialogHeader() ?? 'Assign Category',
        label: m.dashboard_assignCategoryDialogLabel() ?? 'Search Category',
        placeholder: t(
          'dashboard_assignCategoryDialogPlaceholder',
          'Search by category name, etc...'
        ),
        confirmBtn: m.dashboard_onfirmButton() ?? 'Assign and save',
      }}
      {...rest}
    />
  );
};

AssignCategoryDialog.displayName = 'AssignCategoryDialog';
export default AssignCategoryDialog;
