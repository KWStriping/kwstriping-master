import * as m from '@paraglide/messages';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import TranslationFieldsSave from './TranslationFieldsSave';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import Form from '@tempo/dashboard/components/forms/Form';

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
            label={m._vCXIP() ?? 'Translation'}
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
    <Typography color="textSecondary">{m.dashboard___OyA() ?? 'No translation yet'}</Typography>
  ) : (
    <Typography>{initial}</Typography>
  );
};
TranslationFieldsShort.displayName = 'TranslationFieldsShort';
export default TranslationFieldsShort;
