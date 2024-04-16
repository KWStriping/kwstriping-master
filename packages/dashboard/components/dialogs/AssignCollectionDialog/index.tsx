import { useTranslation } from '@core/i18n';
import type { SearchCollectionsQuery } from '@core/api/graphql';
import type { RelayToFlat } from '@dashboard/oldSrc/types';
import type { FC } from 'react';

import type { AssignContainerDialogProps } from '../AssignContainerDialog';
import AssignContainerDialog from '../AssignContainerDialog';

interface AssignCollectionDialogProps
  extends Omit<AssignContainerDialogProps, 'containers' | 'labels'> {
  collections: RelayToFlat<NonNullable<SearchCollectionsQuery['search']>>;
}

const AssignCollectionDialog: FC<AssignCollectionDialogProps> = ({ collections, ...rest }) => {
  const { t } = useTranslation();

  return (
    <AssignContainerDialog
      containers={collections}
      labels={{
        title: t('dashboard.assignCollectionDialogHeader', 'Assign Collection'),
        label: t('dashboard.assignCollectionDialogLabel', 'Search Collection'),
        placeholder: t(
          'dashboard.assignCollectionDialogPlaceholder',
          'Search by collection name, etc...'
        ),
        confirmBtn: t('dashboard.onfirmBtn', 'Assign and save'),
      }}
      {...rest}
    />
  );
};

AssignCollectionDialog.displayName = 'AssignCollectionDialog';
export default AssignCollectionDialog;
