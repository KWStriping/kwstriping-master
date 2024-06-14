import { getCommonFormFieldErrorMessage } from './common';
import type { GroupErrorFragment } from '@tempo/api/generated/graphql';
import { GroupErrorCode } from '@tempo/api/generated/constants';

const messages = {
  assignNonStaffMember: {
    id: '+x4cZH',
    defaultMessage: 'Only staff members can be assigned',
  },
  cannotRemoveFromLastGroup: {
    id: 'WzA5Ll',
    defaultMessage: 'Cannot remove user from last group',
  },
  duplicatedInputItem: {
    id: 'E8T3e+',
    defaultMessage: 'Cannot add and remove group the same time',
  },
  permissionOutOfScope: {
    id: 'vVviA2',
    defaultMessage: 'Those permissions are out of your scope',
  },
  unique: {
    id: 'mgFyBA',
    defaultMessage: 'This name should be unique',
  },
};

function getGroupErrorMessage(err: GroupErrorFragment, t: TFunction): string {
  if (err) {
    switch (err.code) {
      case GroupErrorCode.AssignNonStaffMember:
        return t('dashboard_assignNonStaffMember', messages.assignNonStaffMember.defaultMessage);
      case GroupErrorCode.DuplicatedInputItem:
        return t('dashboard_uplicatedInputItem', messages.duplicatedInputItem.defaultMessage);
      case GroupErrorCode.OutOfScopePermission:
        return t('dashboard_permissionOutOfScope', messages.permissionOutOfScope.defaultMessage);
      case GroupErrorCode.CannotRemoveFromLastGroup:
        return t(
          'dashboard_cannotRemoveFromLastGroup',
          messages.cannotRemoveFromLastGroup.defaultMessage
        );
      case GroupErrorCode.Unique:
        return t('dashboard_nique', messages.unique.defaultMessage);
    }
  }

  return getCommonFormFieldErrorMessage(err, t);
}

export default getGroupErrorMessage;
