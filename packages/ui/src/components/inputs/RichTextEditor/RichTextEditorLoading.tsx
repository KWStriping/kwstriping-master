import type { RichTextEditorProps } from './RichTextEditor';
import RichTextEditor from './RichTextEditor';

export interface RichTextEditorLoadingProps
  extends Omit<
    RichTextEditorProps,
    'disabled' | 'editorRef' | 'onChange' | 'defaultValue' | 'error' | 'helperText'
  > {
  helperText?: RichTextEditorProps['helperText'];
}

export const RichTextEditorLoading = (props: RichTextEditorLoadingProps) => (
  <RichTextEditor
    {...props}
    disabled={true}
    readOnly={true}
    error={null}
    helperText={props.helperText ?? ''}
    defaultValue={{ blocks: [] }}
    editorRef={{ current: null }}
  />
);

export default RichTextEditorLoading;
