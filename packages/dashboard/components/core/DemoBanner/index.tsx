import { useTranslation, Trans } from '@core/i18n';
import Link from '@core/ui/components/Link';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { FC } from 'react';
import GitHubButton from 'react-github-btn';

import { SALEOR_GRAPHQL_URL, SALEOR_STOREFRONT_URL } from './constants';
import styles from './index.module.css';

export const DemoBanner: FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <div className={styles.wrapper ?? ''}>
      <div className={styles.borderedWrapper ?? ''}>
        <div />
        <div className={styles.linkList ?? ''}>
          <Link className={styles.link ?? ''} href={SALEOR_STOREFRONT_URL}>
            {isMdUp ? (
              <Trans
                i18nKey={'4gZl/n'}
                components={{ emphasis: <em className={styles.textEmphasis ?? ''} /> }}
              >
                {'See <emphasis>DEMO STOREFRONT</emphasis>'}
              </Trans>
            ) : (
              <div className={styles.textEmphasis ?? ''}>
                {t('dashboard.mKz3g', 'Storefront')}
              </div>
            )}
          </Link>
          {isMdUp && <div className={styles.divider ?? ''} />}
          <Link className={styles.link ?? ''} href={SALEOR_GRAPHQL_URL}>
            {isMdUp ? (
              <Trans
                id="/X8Mjx"
                defaultMessage="Play with <emphasis>GraphQL API</emphasis>"
                values={{
                  emphasis: (children: unknown) => (
                    <em className={styles.textEmphasis ?? ''}>{children}</em>
                  ),
                }}
              />
            ) : (
              <div className={styles.textEmphasis ?? ''}>{t('dashboard.wEc8K', 'API')}</div>
            )}
          </Link>

          <div className={styles.githubStarButton ?? ''}>
            <GitHubButton
              href="https://github.com/tempo/tempo"
              data-icon="octicon-star"
              data-show-count="true"
              data-size="large"
              aria-label="Star tempo/tempo on GitHub"
            >
              Star us on GitHub
            </GitHubButton>
          </div>
        </div>
      </div>
    </div>
  );
};

DemoBanner.displayName = 'DemoBanner';
export default DemoBanner;
