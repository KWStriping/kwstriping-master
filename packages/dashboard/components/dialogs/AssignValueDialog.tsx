import { useTranslation } from '@core/i18n';
import { AttributeEntityType } from '@core/api/constants';
import type { SearchPagesQuery } from '@core/api/graphql';
import type { RelayToFlat } from '@dashboard/oldSrc/types';
import type { FC } from 'react';

import AssignContainerDialog from './AssignContainerDialog';
import type { AssignProductDialogProps } from './AssignProductDialog';
import AssignProductDialog from './AssignProductDialog';
import AssignVariantDialog from './AssignVariantDialog';

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
  const { t } = useTranslation();

  switch (entityType) {
    case AttributeEntityType.Page:
      return (
        <AssignContainerDialog
          containers={pages.map((page) => ({ id: page.id, name: page.title }))}
          labels={{
            confirmBtn: t('dashboard.onfirmBtn', 'Assign and save'),
            label: t('dashboard.searchLabel', 'Search pages'),
            placeholder: t('dashboard.searchPlaceholder', 'Search by page name, etc...'),
            title: t('dashboard.header', 'Assign page'),
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
