import { Open_Sans } from 'next/font/google';
import theme from '@kwstriping/app/theme';
import './global.css';
import CssProvider from '@tempo/ui/providers/CssProvider';
import type { ReactNode } from 'react';
import { LanguageProvider } from '@tempo/next/i18n';
import { languageTag } from '@tempo/next/i18n/paraglide/runtime';

// If loading a variable font, you don't need to specify the font weight
const openSans = Open_Sans({
  subsets: ['latin'],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <html lang={languageTag()} className={openSans.className}>
        <body>
          <CssProvider theme={theme}>{children}</CssProvider>
          <div id="portal"></div>
        </body>
      </html>
    </LanguageProvider>
  );
}
