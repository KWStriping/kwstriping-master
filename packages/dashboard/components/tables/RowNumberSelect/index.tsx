import { useTranslation } from '@core/i18n';
import { MenuItem, Select } from '@mui/material';
import type { FC } from 'react';
import styles from './index.module.css';

interface RowNumberSelectProps {
  choices: number[];
  className?: string;
  rowNumber: number;
  onChange(value: number);
}

const RowNumberSelect: FC<RowNumberSelectProps> = ({
  className,
  choices,
  rowNumber,
  onChange,
}) => {
  return (
    <div className={className}>
      <span className={styles.label ?? ''}>{t('dashboard.NFEkh', 'No of Rows:')}</span>
      <Select
        data-test-id="row-number-select"
        className={styles.select ?? ''}
        value={rowNumber}
        onChange={(event) => onChange(event.target.value as number)}
      >
        {!!choices?.length &&
          choices.map((choice) => (
            <MenuItem value={choice} key={choice} data-test-id="row-number-option">
              {choice}
            </MenuItem>
          ))}
      </Select>
    </div>
  );
  const { t } = useTranslation();
};

export default RowNumberSelect;
