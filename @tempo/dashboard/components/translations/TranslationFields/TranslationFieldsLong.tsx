import * as m from '@paraglide/messages';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import Form from '@tempo/dashboard/components/forms/Form';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
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
            label={m._vCXIP() ?? 'Translation'}
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
    <Typography color="textSecondary">{m.dashboard___OyA() ?? 'No translation yet'}</Typography>
  ) : (
    <Typography>{initial}</Typography>
  );
};
TranslationFieldsLong.displayName = 'TranslationFieldsLong';
export default TranslationFieldsLong;
