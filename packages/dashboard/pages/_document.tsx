import { createEmotionCache } from '@core/ui/utils/emotion';
import type { DocumentContext, DocumentProps } from 'next/document';
import { Head, Html, Main, NextScript } from 'next/document';
import { DocumentHeadTags, documentGetInitialProps } from '@mui/material-nextjs/v13-pagesRouter';
import type { DocumentHeadTagsProps } from '@mui/material-nextjs/v13-pagesRouter';
import nextI18nextConfig from '../next-i18next.config';

function Document(props: DocumentProps & DocumentHeadTagsProps) {
  const locale = nextI18nextConfig.i18n.defaultLocale;
  return (
    <Html lang={locale}>
      <Head>
        <DocumentHeadTags {...props} />
      </Head>
      <body spellCheck={false}>
        <Main />
        <div id="portal"></div>
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx: DocumentContext) => {
  return await documentGetInitialProps(ctx, {
    emotionCache: createEmotionCache(),
  });
};

export default Document;
