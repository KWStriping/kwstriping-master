import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import IconButton from '@core/ui/components/buttons/IconButton';
import type { Choice } from '@core/ui/components/Filter';
import { MultipleValueAutocomplete } from '@core/ui/components/inputs/MultipleValueAutocomplete';
import type { FormChange } from '@dashboard/hooks/useForm';
import type { FetchMoreProps } from '@dashboard/oldSrc/types';
import CloseIcon from '@mui/icons-material/Close';
import { Card, CardActions, CardContent } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import type { Ref, FC } from 'react';
import { forwardRef } from 'react';
import styles from './index.module.css';

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

const ColumnPickerContent: FC<ColumnPickerContentProps> = forwardRef((props, ref) => {
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
  const { t } = useTranslation();

  return (
    <Card elevation={8} ref={ref}>
      <CardHeader
        action={
          <IconButton color="secondary" onClick={onCancel}>
            <CloseIcon />
          </IconButton>
        }
        title={t('dashboard.title', 'Customize list')}
      />
      <CardContent className={styles.content ?? ''}>
        <Typography color="textSecondary" variant="caption" className={styles.subHeader ?? ''}>
          {t('dashboard.columnSubheader', 'Column settings')}
        </Typography>
        <MultipleValueAutocomplete
          className={styles.choicesContainer ?? ''}
          choices={choices}
          enableReinitialize
          fullWidth
          label={t('dashboard.columnLabel', 'Selected columns')}
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
          {t('dashboard.save', 'Save')}
        </Button>
        <Button color="secondary" onClick={onReset}>
          {t('dashboard.reset', 'Reset')}
        </Button>
      </CardActions>
    </Card>
  );
});

ColumnPickerContent.displayName = 'ColumnPickerContent';

export default ColumnPickerContent;
