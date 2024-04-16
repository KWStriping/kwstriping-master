import { useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import Form from '@dashboard/components/forms/Form';
import type { SubmitPromise } from '@dashboard/hooks/useForm';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import TranslationFieldsSave from './TranslationFieldsSave';

interface TranslationFieldsShortProps {
  disabled: boolean;
  edit: boolean;
  initial: string;
  saveButtonState: ConfirmButtonTransitionState;
  onDiscard: () => void;
  onSubmit: (data: string) => SubmitPromise<any[]>;
}

const TranslationFieldsShort: FC<TranslationFieldsShortProps> = ({
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
            label={t('/vCXIP', 'Translation')}
            name="translation"
            data-test-id="translation-field"
            value={data?.translation || ''}
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
TranslationFieldsShort.displayName = 'TranslationFieldsShort';
export default TranslationFieldsShort;
