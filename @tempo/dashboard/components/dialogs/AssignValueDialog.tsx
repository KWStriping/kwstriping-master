import * as m from '@paraglide/messages';
import { AttributeEntityType } from '@tempo/api/generated/constants';
import type { SearchPagesQuery } from '@tempo/api/generated/graphql';
import type { FC } from 'react';

import AssignContainerDialog from './AssignContainerDialog';
import type { AssignProductDialogProps } from './AssignProductDialog';
import AssignProductDialog from './AssignProductDialog';
import AssignVariantDialog from './AssignVariantDialog';
import type { RelayToFlat } from '@tempo/dashboard/oldSrc/types';

type AssignValueDialogProps = AssignProductDialogProps & {
  entityType: AttributeEntityType;
  pages: RelayToFlat<NonNullable<SearchPagesQuery['search']>>;
};

const AssignValueDialog: FC<AssignValueDialogProps> = ({
  entityType,
  pages,
  products,
  ...rest
}) => {
  switch (entityType) {
    case AttributeEntityType.Page:
      return (
        <AssignContainerDialog
          containers={pages.map((page) => ({ id: page.id, name: page.title }))}
          labels={{
            confirmBtn: m.dashboard_onfirmBtn() ?? 'Assign and save',
            label: m.dashboard_searchLabel() ?? 'Search pages',
            placeholder: m.dashboard_searchPlaceholder() ?? 'Search by page name, etc...',
            title: m.dashboard_header() ?? 'Assign page',
          }}
          {...rest}
        />
      );
    case AttributeEntityType.Product:
      return <AssignProductDialog products={products} {...rest} />;
    case AttributeEntityType.Product:
      return <AssignVariantDialog products={products} {...rest} />;
  }
};
AssignValueDialog.displayName = 'AssignValueDialog';
export default AssignValueDialog;
