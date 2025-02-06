import dynamic from 'next/dynamic';

export const RichTextEditor = dynamic(import('./RichTextEditor'), { ssr: false });

export default RichTextEditor;

export const RichTextEditorLoading = dynamic(import('./RichTextEditorLoading'), {
  ssr: false,
});

export const RichTextEditorContent = dynamic(import('./RichTextEditorContent'), {
  ssr: false,
});
