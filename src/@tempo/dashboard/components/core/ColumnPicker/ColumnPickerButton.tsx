import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
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
  return (
    <Button
      className={clsx(styles.root, className, active && styles.rootActive)}
      onClick={onClick}
      color="secondary"
    >
      <>
        {/* select visible columns button */}

        {m.dashboard___MJn() ?? 'Columns'}
      </>
      <ArrowDropDownIcon className={clsx(styles.icon, active && styles.rotate)} />
    </Button>
  );
};

export default ColumnPickerButton;
