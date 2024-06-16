import { Button } from '@tempo/ui/components/buttons/Button';
import IconButton from '@tempo/ui/components/buttons/IconButton';
import type { Choice } from '@tempo/ui/components/Filter';
import { MultipleValueAutocomplete } from '@tempo/ui/components/inputs/MultipleValueAutocomplete';
import CloseIcon from '@mui/icons-material/Close';
import { Card, CardActions, CardContent } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import type { Ref } from 'react';
import { forwardRef } from 'react';
import styles from './index.module.css';
import type { FetchMoreProps } from '@tempo/dashboard/oldSrc/types';
import type { FormChange } from '@tempo/dashboard/hooks/useForm';

export interface ColumnPickerContentProps extends FetchMoreProps {
  choices: Choice[];
  initialValues: Choice[];
  onCancel: () => void;
  onChange: FormChange<string[]>;
  onReset: () => void;
  onSave: () => void;
  onQueryChange: (query: string) => void;
  ref?: Ref<HTMLDivElement>;
}

const ColumnPickerContent = forwardRef<HTMLDivElement, ColumnPickerContentProps>((props, ref) => {
  const {
    choices,
    initialValues,
    loading,
    onCancel,
    onChange,
    onReset,
    onFetchMore,
    onSave,
    onQueryChange,
  } = props;

  return (
    <Card elevation={8} ref={ref}>
      <CardHeader
        action={
          <IconButton color="secondary" onClick={onCancel}>
            <CloseIcon />
          </IconButton>
        }
        title={'Customize list'}
      />
      <CardContent className={styles.content ?? ''}>
        <Typography color="textSecondary" variant="caption" className={styles.subHeader ?? ''}>
          {'Column settings'}
        </Typography>
        <MultipleValueAutocomplete
          className={styles.choicesContainer ?? ''}
          choices={choices}
          enableReinitialize
          fullWidth
          label={'Selected columns'}
          loading={loading}
          name="columns"
          initialValue={initialValues}
          onChange={onChange}
          onInputChange={onQueryChange}
          onScrollToBottom={onFetchMore}
        >
          {({ choices, getItemProps }) =>
            choices.map((choice, choiceIndex) => (
              <MenuItem
                key={choice.value}
                {...getItemProps({ item: choice, index: choiceIndex })}
              >
                {choice.label}
              </MenuItem>
            ))
          }
        </MultipleValueAutocomplete>
      </CardContent>
      <CardActions className={styles.actions ?? ''}>
        <Button color="primary" onClick={onSave}>
          {'Save'}
        </Button>
        <Button color="secondary" onClick={onReset}>
          {'Reset'}
        </Button>
      </CardActions>
    </Card>
  );
});

ColumnPickerContent.displayName = 'ColumnPickerContent';

export default ColumnPickerContent;
