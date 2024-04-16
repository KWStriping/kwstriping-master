import { FormControl, FormHelperText, InputLabel } from '@mui/material';
import type { FC } from 'react';

import type { RichTextEditorProps } from '../RichTextEditor';

export const HOLDER = 'TEST_HOLDER';

const RichTextEditor: FC<RichTextEditorProps> = ({
  disabled,
  error,
  label,
  name,
  helperText,
}) => (
  <FormControl
    data-test-id={'rich-text-editor-' + name}
    disabled={disabled}
    error={error}
    fullWidth
    variant="outlined"
  >
    <InputLabel focused={true} shrink={true}>
      {label}
    </InputLabel>

    <FormHelperText>{helperText}</FormHelperText>
  </FormControl>
);

export default RichTextEditor;
