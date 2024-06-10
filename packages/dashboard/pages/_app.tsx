import '@dashboard/styles/globals.css';
import { useSession } from '@core/auth/react/hooks';
import { SessionProvider } from '@core/auth/react/providers/SessionProvider';
import { appWithTranslation } from '@core/i18n';
import { BacklinkProvider } from '@core/ui/components/Layout/Backlink';
import { Spinner } from '@core/ui/components/Spinner';
import { ShopSettingsProvider } from '@core/ui/providers/ShopSettingsProvider';
import { ThemeProvider } from '@core/ui/theme/ThemeProvider';
import { createEmotionCache } from '@core/ui/utils/emotion';
import { withUrqlClient } from '@core/urql/client';
import type { NextUrqlContext, WithUrqlProps } from '@core/urql/client';
import { ActionBarProvider } from '@dashboard/components/bars/ActionBar';
import { DateProvider } from '@dashboard/components/core/Date/DateProvider';
import ExitFormDialogProvider from '@dashboard/components/forms/Form/ExitFormDialogProvider';
import Layout from '@dashboard/components/layout/Layout';
import { AppChannelProvider } from '@dashboard/components/layout/Layout/AppChannelContext';
import schema from '@core/api/introspection.json';
import BackgroundTasksProvider from '@dashboard/oldSrc/containers/BackgroundTasks';
import { DndContext } from '@dnd-kit/core';
import { Open_Sans } from 'next/font/google';
import type { NextComponentType, NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import type {} from '@mui/material/themeCssVarsAugmentation';
import NextNProgress from 'nextjs-progressbar';
import type { FC, ReactElement } from 'react';
import { ToastContainer } from 'react-toastify';
import nextI18nextConfig from '../next-i18next.config';

const clientSideEmotionCache = createEmotionCache();

const openSans = Open_Sans({
  weight: ['400', '500', '600', '800'],
  subsets: ['latin'],
});

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactElement;
  auth?: boolean;
};

type CustomAppProps = AppProps & {
  Component: NextPageWithLayout;
  emotionCache?: typeof clientSideEmotionCache;
};

function App({
  Component: Page,
  emotionCache = clientSideEmotionCache,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  const router = useRouter();
  const requireAuth = Page.auth !== false && !router.pathname.startsWith('/auth');
  const getLayout = Page.getLayout ?? ((page: ReactElement) => <Layout>{page}</Layout>);
  // console.log('>>>>>>>>>>>>>>>>>> App', router.pathname, { requireAuth });
  return (
    <ShopSettingsProvider>
      <SessionProvider session={session}>
        <ThemeProvider cache={emotionCache}>
          <DateProvider>
            <BackgroundTasksProvider>
              <AppChannelProvider>
                <ActionBarProvider>
                  <BacklinkProvider>
                    <ExitFormDialogProvider>
                      <DndContext>
                        {/* https://nextjs.org/docs/basic-features/font-optimization#apply-the-font-in-head */}
                        {/* eslint-disable-next-line react/no-unknown-property */}
                        <style jsx global>{`
                          :root {
                            --open-sans-font: ${openSans.style.fontFamily};
                          }
                        `}</style>
                        <NextNProgress color="#5B68E4" options={{ showSpinner: false }} />
                        {/* TODO https://fkhadra.github.io/react-toastify/introduction/ */}
                        <ToastContainer />
                        {requireAuth ? (
                          <Auth>{getLayout(<Page {...pageProps} />)}</Auth>
                        ) : (
                          getLayout(<Page {...pageProps} />)
                        )}
                      </DndContext>
                    </ExitFormDialogProvider>
                  </BacklinkProvider>
                </ActionBarProvider>
              </AppChannelProvider>
            </BackgroundTasksProvider>
          </DateProvider>
        </ThemeProvider>
      </SessionProvider>
    </ShopSettingsProvider>
  );
}

interface AuthProps {
  children: ReactElement;
}

export const Auth: FC<AuthProps> = ({ children }) => {
  const router = useRouter();
  const isAuthPage = router.pathname.startsWith('/auth');
  console.log('>>>>>>>>>>>>>>>>>> Auth ', router.pathname);
  const { status } = useSession({
    required: !isAuthPage,
    onUnauthenticated: () => {
      !isAuthPage &&
        router.push({
          pathname: '/auth/login',
          query: { next: router.asPath },
        });
    },
  });
  if (status !== 'authenticated') return <Spinner />;
  return children;
};

const translatedApp: typeof App = appWithTranslation(App, nextI18nextConfig);

const appWithUrqlClient: NextComponentType<NextUrqlContext, unknown, WithUrqlProps> =
  withUrqlClient({ schema: schema as any })(translatedApp);

export default appWithUrqlClient;
