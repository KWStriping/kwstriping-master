import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import clsx from 'clsx';
import type { FC } from 'react';
import styles from './index.module.css';

interface ColumnPickerButtonProps {
  active: boolean;
  className?: string;
  onClick: () => void;
}

const ColumnPickerButton: FC<ColumnPickerButtonProps> = (props) => {
  const { active, className, onClick } = props;
  const { t } = useTranslation();
  return (
    <Button
      className={clsx(styles.root, className, active && styles.rootActive)}
      onClick={onClick}
      color="secondary"
    >
      <>
        {/* select visible columns button */}

        {t('dashboard.42MJn', 'Columns')}
      </>
      <ArrowDropDownIcon className={clsx(styles.icon, active && styles.rotate)} />
    </Button>
  );
};

export default ColumnPickerButton;
