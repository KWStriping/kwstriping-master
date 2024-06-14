import styles from './RichTextEditorContent.module.css';
import type { EditorJsProps } from '@tempo/ui/components/inputs/RichTextEditor/RichTextEditor';
import type { LogLevels } from '@editorjs/editorjs';
import { useId } from '@reach/auto-id';
import clsx from 'clsx';
import type { FC } from 'react';
import { createReactEditorJS } from 'react-editor-js';

import { tools } from './consts';
import { useHasRendered } from './hooks';

export interface RichTextEditorContentProps extends Omit<EditorJsProps, 'defaultValue'> {
  id?: string;
  className?: string;
}

const ReactEditorJS = createReactEditorJS();

const RichTextEditorContent: FC<RichTextEditorContentProps> = ({
  id: defaultId,
  className,
  value,
  ...props
}) => {
  const id = useId(defaultId);

  // We need to render FormControl first to get id from @reach/auto-id
  const hasRendered = useHasRendered();

  if (!hasRendered) {
    return <div />;
  }

  return (
    <ReactEditorJS
      holder={id}
      logLevel={'ERROR' as LogLevels.ERROR}
      tools={tools}
      {...props}
      defaultValue={value}
      readOnly={true}
    >
      <div id={id} className={clsx(styles.editor, styles.rootStatic ?? '', className)} />
    </ReactEditorJS>
  );
};

RichTextEditorContent.displayName = 'RichTextEditorContent';
export default RichTextEditorContent;
