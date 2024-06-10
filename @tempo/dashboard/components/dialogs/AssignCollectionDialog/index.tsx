import * as m from '@paraglide/messages';
import type { SearchCollectionsQuery } from '@tempo/api/generated/graphql';
import type { RelayToFlat } from '@tempo/dashboard/oldSrc/types';
import type { FC } from 'react';

import type { AssignContainerDialogProps } from '../AssignContainerDialog';
import AssignContainerDialog from '../AssignContainerDialog';

interface AssignCollectionDialogProps
  extends Omit<AssignContainerDialogProps, 'containers' | 'labels'> {
  collections: RelayToFlat<NonNullable<SearchCollectionsQuery['search']>>;
}

const AssignCollectionDialog: FC<AssignCollectionDialogProps> = ({ collections, ...rest }) => {
  return (
    <AssignContainerDialog
      containers={collections}
      labels={{
        title: m.dashboard_assignCollectionDialogHeader() ?? 'Assign Collection',
        label: m.dashboard_assignCollectionDialogLabel() ?? 'Search Collection',
        placeholder: t(
          'dashboard_assignCollectionDialogPlaceholder',
          'Search by collection name, etc...'
        ),
        confirmBtn: m.dashboard_onfirmBtn() ?? 'Assign and save',
      }}
      {...rest}
    />
  );
};

AssignCollectionDialog.displayName = 'AssignCollectionDialog';
export default AssignCollectionDialog;
