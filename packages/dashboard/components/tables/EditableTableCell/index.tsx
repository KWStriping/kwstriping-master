import useForm from '@dashboard/hooks/useForm';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import type { TextFieldProps } from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { FC } from 'react';
import { useState } from 'react';
import styles from './index.module.css';

interface EditableTableCellProps {
  className?: string;
  defaultValue?: string;
  focused?: boolean;
  InputProps?: TextFieldProps;
  value: string;
  onConfirm(value: string): unknown;
}

export const EditableTableCell: FC<EditableTableCellProps> = (props) => {
  const {
    className,
    defaultValue,
    focused,
    InputProps,
    value,
    // onConfirm
  } = props;
  // const handleConfirm = (data: { value: string }) => {
  //   disable();
  //   onConfirm(data?.value);
  // };

  const [opened, setOpenStatus] = useState(focused);
  const { change, data } = useForm({ value } /* commenting out temporarily handleConfirm */);
  const enable = () => setOpenStatus(true);
  const disable = () => setOpenStatus(false);

  return (
    <TableCell className={clsx(styles.container, className)}>
      {opened && <div className={styles.overlay ?? ''} onClick={disable} />}
      <Typography variant="caption" onClick={enable} className={styles.text ?? ''}>
        {value || defaultValue}
      </Typography>
      {opened && (
        <div className={styles.root ?? ''}>
          <Card className={styles.card ?? ''}>
            <CardContent>
              <TextField
                name="value"
                autoFocus
                fullWidth
                onChange={change}
                value={data?.value}
                variant="standard"
                {...InputProps}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </TableCell>
  );
};
EditableTableCell.displayName = 'EditableTableCell';
export default EditableTableCell;
