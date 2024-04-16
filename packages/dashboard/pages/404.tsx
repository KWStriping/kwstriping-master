import { useTranslation } from '@core/i18n';
import type { GetStaticProps } from 'next';
import NextErrorComponent from 'next/error';
import { getServerTranslations } from '@dashboard/lib/i18n';

// Do not record an exception in Sentry for 404. (This is opinionated.)

const NotFound = () => {
  const { t } = useTranslation();
  return <NextErrorComponent statusCode={404} title={t('404.message', 'Not found')} />;
};

export default NotFound;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const messages = await getServerTranslations(locale);
  return {
    props: { ...messages },
  };
};
