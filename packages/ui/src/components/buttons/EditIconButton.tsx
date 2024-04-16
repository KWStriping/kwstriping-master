import { useTranslation } from '@core/i18n';
import type { IconButtonProps } from '@core/ui/components/buttons/IconButton';
import IconButton from '@core/ui/components/buttons/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import type { FC } from 'react';

export const EditIconButton: FC<IconButtonProps> = ({ onClick, title }) => {
  const { t } = useTranslation();
  return (
    <IconButton onClick={onClick} title={title ?? t('edit', 'Edit')}>
      <EditIcon />
    </IconButton>
  );
};

export default EditIconButton;
