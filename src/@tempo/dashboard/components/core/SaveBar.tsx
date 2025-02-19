import * as m from '@paraglide/messages';
import type { FC } from 'react';
import { SaveBar as BaseSaveBar } from '@tempo/dashboard/components/bars/SaveBar';
import type {
  SaveBarLabels,
  SaveBarProps as BaseSaveBarProps,
} from '@tempo/dashboard/components/bars/SaveBar';

export interface SaveBarProps extends Omit<BaseSaveBarProps, 'labels'> {
  labels?: Partial<SaveBarLabels>;
}

export const SaveBar: FC<SaveBarProps> = ({ labels = {}, ...rest }) => {
  const defaultLabels: SaveBarLabels = {
    cancel: m.dashboard_back() ?? 'Back',
    confirm: m.dashboard_save() ?? 'Save',
    delete: m.dashboard_delete() ?? 'Delete',
    error: m.dashboard_error() ?? 'Error',
  };
  const componentLabels: SaveBarLabels = {
    ...defaultLabels,
    ...labels,
  };

  return <BaseSaveBar labels={componentLabels} {...rest} />;
};
SaveBar.displayName = 'SaveBar';
export default SaveBar;
