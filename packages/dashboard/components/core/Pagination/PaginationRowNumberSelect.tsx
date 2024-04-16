import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import clsx from 'clsx';
import type { FC } from 'react';
// import useStyles from './styles';

export type PaginationRowNumberSelectLabels = Record<'noOfRows', string>;
export interface PaginationRowNumberSelectProps {
  choices: number[];
  className?: string;
  disabled?: boolean;
  labels: PaginationRowNumberSelectLabels;
  rowNumber: number;
  onChange?: (value: number) => void;
}

export const PaginationRowNumberSelect: FC<PaginationRowNumberSelectProps> = ({
  className,
  choices,
  disabled,
  labels,
  rowNumber,
  onChange,
}) => {
  // const styles = useStyles({});

  const styles = {};

  return (
    <div className={clsx(styles.rowNumber ?? '', className)}>
      <span className={styles.rowNumberLabel ?? ''}>{labels.noOfRows}</span>
      {onChange ? (
        <Select
          data-test-id="PaginationRowNumberSelect"
          disabled={disabled}
          inputProps={{
            className: styles.rowNumberSelectLabel ?? '',
          }}
          className={styles.rowNumberSelect ?? ''}
          value={rowNumber}
          onChange={(event) => onChange(event.target.value as number)}
        >
          {!!choices?.length &&
            choices.map((choice) => (
              <MenuItem value={choice} key={choice} data-test-id="rowNumberOption">
                {choice}
              </MenuItem>
            ))}
        </Select>
      ) : (
        ` ${rowNumber}`
      )}
    </div>
  );
};
PaginationRowNumberSelect.displayName = 'PaginationRowNumberSelect';
