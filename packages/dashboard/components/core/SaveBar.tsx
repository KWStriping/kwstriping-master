import { useTranslation } from '@core/i18n';
import { SaveBar as BaseSaveBar } from '@dashboard/components/bars/SaveBar';
import type {
  SaveBarLabels,
  SaveBarProps as BaseSaveBarProps,
} from '@dashboard/components/bars/SaveBar';
import type { FC } from 'react';

export interface SaveBarProps extends Omit<BaseSaveBarProps, 'labels'> {
  labels?: Partial<SaveBarLabels>;
}

export const SaveBar: FC<SaveBarProps> = ({ labels = {}, ...rest }) => {
  const { t } = useTranslation();

  const defaultLabels: SaveBarLabels = {
    cancel: t('dashboard.back', 'Back'),
    confirm: t('dashboard.save', 'Save'),
    delete: t('dashboard.delete', 'Delete'),
    error: t('dashboard.error', 'Error'),
  };
  const componentLabels: SaveBarLabels = {
    ...defaultLabels,
    ...labels,
  };

  return <BaseSaveBar labels={componentLabels} {...rest} />;
};
SaveBar.displayName = 'SaveBar';
export default SaveBar;
