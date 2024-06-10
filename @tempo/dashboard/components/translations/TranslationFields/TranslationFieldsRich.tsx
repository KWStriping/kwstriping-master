import * as m from '@paraglide/messages';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import RichTextEditor, {
  RichTextEditorLoading,
  RichTextEditorContent,
} from '@tempo/ui/components/inputs/RichTextEditor';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import type { OutputData } from '@editorjs/editorjs';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import TranslationFieldsSave from './TranslationFieldsSave';
import { useRichTextSubmit } from './useRichTextSubmit';

interface TranslationFieldsRichProps {
  disabled: boolean;
  edit: boolean;
  initial: string;
  saveButtonState: ConfirmButtonTransitionState;
  resetKey: string;
  onDiscard: () => void;
  onSubmit: (data: OutputData) => SubmitPromise;
}

const TranslationFieldsRich: FC<TranslationFieldsRichProps> = ({
  disabled,
  edit,
  initial,
  saveButtonState,
  resetKey,
  onDiscard,
  onSubmit,
}) => {
  const { isReadyForMount, handleSubmit, defaultValue, handleChange, editorRef } =
    useRichTextSubmit(initial, onSubmit);

  return edit ? (
    <form onSubmit={handleSubmit}>
      {isReadyForMount ? (
        <RichTextEditor
          defaultValue={defaultValue}
          editorRef={editorRef}
          onChange={handleChange}
          disabled={disabled}
          error={undefined}
          helperText={undefined}
          label={m._vCXIP() ?? 'Translation'}
          name="translation"
          data-test-id="translation-field"
        />
      ) : (
        <RichTextEditorLoading
          label={m._vCXIP() ?? 'Translation'}
          name="translation"
          data-test-id="translation-field"
        />
      )}
      <TranslationFieldsSave
        saveButtonState={saveButtonState}
        onDiscard={onDiscard}
        onSave={handleSubmit}
      />
    </form>
  ) : initial === null ? (
    <Typography color="textSecondary">{m.dashboard___OyA() ?? 'No translation yet'}</Typography>
  ) : (
    <Typography>
      {isReadyForMount && <RichTextEditorContent key={resetKey} value={defaultValue} />}
    </Typography>
  );
};
TranslationFieldsRich.displayName = 'TranslationFieldsRich';
export default TranslationFieldsRich;
