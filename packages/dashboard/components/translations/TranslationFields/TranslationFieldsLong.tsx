import { useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import Form from '@dashboard/components/forms/Form';
import type { SubmitPromise } from '@dashboard/hooks/useForm';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import TranslationFieldsSave from './TranslationFieldsSave';

interface TranslationFieldsLongProps {
  disabled: boolean;
  edit: boolean;
  initial: string;
  saveButtonState: ConfirmButtonTransitionState;
  onDiscard: () => void;
  onSubmit: (data: string) => SubmitPromise;
}

const TranslationFieldsLong: FC<TranslationFieldsLongProps> = ({
  disabled,
  edit,
  initial,
  saveButtonState,
  onDiscard,
  onSubmit,
}) => {
  const { t } = useTranslation();

  return edit ? (
    <Form
      confirmLeave
      initial={{ translation: initial }}
      onSubmit={(data) => onSubmit(data?.translation)}
    >
      {({ change, data, submit }) => (
        <div>
          <TextField
            disabled={disabled}
            fullWidth
            multiline
            label={t('/vCXIP', 'Translation')}
            name="translation"
            value={data?.translation || ''}
            data-test-id="translation-field"
            onChange={change}
          />
          <TranslationFieldsSave
            saveButtonState={saveButtonState}
            onDiscard={onDiscard}
            onSave={submit}
          />
        </div>
      )}
    </Form>
  ) : initial === null ? (
    <Typography color="textSecondary">{t('dashboard./5OyA', 'No translation yet')}</Typography>
  ) : (
    <Typography>{initial}</Typography>
  );
};
TranslationFieldsLong.displayName = 'TranslationFieldsLong';
export default TranslationFieldsLong;
