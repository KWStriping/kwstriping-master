import type { LogLevels } from '@editorjs/editorjs';
import { FormControl, FormHelperText, InputLabel } from '@mui/material';
import { useId } from '@reach/auto-id';
import type { Props as ReactEditorJSProps } from '@react-editor-js/core';
import type { EditorCore } from '@react-editor-js/core/dist/src/editor-core';
import clsx from 'clsx';
import type { MutableRefObject, RefCallback, FC } from 'react';
import { useCallback, useState } from 'react';
import { createReactEditorJS } from 'react-editor-js';
import styles from './RichTextEditor.module.css';

import { tools } from './consts';
import { useHasRendered } from './hooks';

export type { EditorCore };

export type EditorJsProps = Omit<ReactEditorJSProps, 'factory'>;

export interface RichTextEditorProps extends Omit<EditorJsProps, 'onChange'> {
  id?: string;
  disabled: boolean;
  error: boolean;
  helperText: string;
  label: string;
  name: string;
  editorRef: RefCallback<EditorCore> | MutableRefObject<EditorCore> | null;
  // onChange with value shouldn't be used due to issues with React and EditorJS integration
  onChange?: () => void;
}

const ReactEditorJS = createReactEditorJS();

const RichTextEditor: FC<RichTextEditorProps> = ({
  id: defaultId,
  disabled,
  error,
  label,
  name,
  helperText,
  editorRef,
  onInitialize,
  ...props
}) => {
  const id = useId(defaultId);
  const [isFocused, setIsFocused] = useState(false);
  const handleInitialize = useCallback((editor: EditorCore) => {
    if (onInitialize) {
      onInitialize(editor);
    }

    if (typeof editorRef === 'function') {
      return editorRef(editor);
    }
    if (editorRef) {
      return (editorRef.current = editor);
    }
  }, []);

  // We need to render FormControl first to get id from @reach/auto-id
  const hasRendered = useHasRendered();

  return (
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
      {hasRendered && (
        <ReactEditorJS
          // match with the id of holder div
          holder={id}
          tools={tools}
          // LogLeves is undefined at runtime
          logLevel={'ERROR' as LogLevels.ERROR}
          onInitialize={handleInitialize}
          {...props}
        >
          <div
            id={id}
            className={clsx(
              styles.editor ?? '',
              styles.root ?? '',
              isFocused && (styles.rootActive ?? ''),
              disabled && (styles.rootDisabled ?? ''),
              error && styles.rootError
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </ReactEditorJS>
      )}
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

RichTextEditor.displayName = 'RichTextEditor';
export default RichTextEditor;
