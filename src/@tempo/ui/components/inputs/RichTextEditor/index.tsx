import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import type { RichTextEditorProps } from './RichTextEditor';

export const RichTextEditor: ComponentType<RichTextEditorProps> = dynamic(
  import('./RichTextEditor'),
  { ssr: false }
);

export default RichTextEditor;

export const RichTextEditorLoading = dynamic(import('./RichTextEditorLoading'), {
  ssr: false,
});

export const RichTextEditorContent = dynamic(import('./RichTextEditorContent'), {
  ssr: false,
});
