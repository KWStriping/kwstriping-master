import type { ToolConstructable, ToolSettings } from '@editorjs/editorjs';
import Embed from '@editorjs/embed';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import createGenericInlineTool from 'editorjs-inline-tool';

const inlineToolbar = ['link', 'bold', 'italic', 'strikethrough'];

const strikethroughIcon = `<svg height="32" width="32" viewBox="-4 -1 24 16"><path d="M6.53333 14H10.2667V11.2H6.53333V14ZM1.86667 0V2.8H6.53333V5.6H10.2667V2.8H14.9333V0H1.86667ZM0 9.33333H16.8V7.46667H0V9.33333Z"></path></svg>`;

export const tools: Record<string, ToolConstructable | ToolSettings> = {
  embed: Embed,
  header: {
    class: Header,
    config: {
      defaultLevel: 1,
      levels: [1, 2, 3],
    },
    inlineToolbar,
  },
  list: {
    class: List,
    inlineToolbar,
  },
  quote: {
    class: Quote,
    inlineToolbar,
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar,
  },
  strikethrough: createGenericInlineTool({
    sanitize: {
      s: {},
    },
    shortcut: 'CMD+S',
    tagName: 's',
    toolboxIcon: strikethroughIcon,
  }),
};
