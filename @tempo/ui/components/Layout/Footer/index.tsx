import { FooterMenuDocument } from '@tempo/api/generated/graphql';
import { useQuery } from '@tempo/api/hooks/useQuery';
import Box from '@mui/material/Box';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import type { HTMLAttributes, ReactNode } from 'react';

import { ChannelDropdown } from '../../regionDropdowns/ChannelDropdown';
import { LocaleDropdown } from '../../regionDropdowns/LocaleDropdown';
import styles from './index.module.css';
import { getLinkPath } from '@tempo/ui/utils/menus';
import { useShopSettings } from '@tempo/ui/providers/ShopSettingsProvider';
import { usePaths } from '@tempo/ui/providers/PathsProvider';
import { useLocalization } from '@tempo/ui/providers/LocalizationProvider';

export type FooterProps = HTMLAttributes<HTMLElement> & {
  logo?: ReactNode;
};

// Tempo Cloud currently doesn't support relative URLs in the footer.
// This is a workaround to make the links work.
// @todo remove this when the issue is fixed.
const fixMenuItemLocalhostUrl = (url: string) => url.replace(/^https?:\/\/localhost:8000\//, '/');

export function Footer({ className, logo, ...rest }: FooterProps) {
  const paths = usePaths();
  const { enableLocaleSwitcher, name: shopName } = useShopSettings();
  const { query } = useLocalization();

  const { data, error } = useQuery(FooterMenuDocument, { variables: { ...query } });

  if (error) {
    console.error('Footer component error', error);
  }

  const menu = data?.menu?.items || [];
  const logoIsString = typeof logo === 'string' && !logo.includes('/');

  return (
    <footer className={clsx(styles.footer, className)} {...rest}>
      <Box className={styles['footer-inner'] ?? ''}>
        <div className="flex mb-14 sm:mb-10">
          <Link href={paths.home()} className="hidden sm:inline-block">
            <div style={{ width: '14rem' }} className="mt-px group block h-16 grayscale relative">
              {!logo || logoIsString ? (
                <Image
                  src={(logo as string) || '/logo-black.svg'}
                  alt={`${shopName} logo`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                />
              ) : (
                logo
              )}
            </div>
          </Link>
          <div className="grid grid-cols-2 gap-[2rem] w-full sm:w-auto sm:flex sm:flex-wrap sm:justify-end sm:ml-auto">
            {menu.map((item) => (
              <div className="sm:ml-14" key={item?.id}>
                {item?.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles['menu-heading'] ?? ''}
                  >
                    {item?.name}
                  </a>
                ) : (
                  <Link href={getLinkPath(item, paths)} className={styles['menu-heading'] ?? ''}>
                    {item?.name}
                  </Link>
                )}
                <ul className={styles.menu ?? ''}>
                  {item?.children?.map((sub, idx) => (
                    <li key={idx}>
                      {sub?.url ? (
                        <a
                          href={fixMenuItemLocalhostUrl(sub.url)}
                          target="_blank"
                          rel="noreferrer"
                          className={styles['menu-link'] ?? ''}
                          data-testid={`footerExternalLinks${sub?.name}`}
                        >
                          {sub?.name}
                        </a>
                      ) : (
                        <Link
                          href={getLinkPath(sub, paths)}
                          className={styles['menu-link'] ?? ''}
                          data-testid={`footerInternalLinks${sub?.name}`}
                        >
                          {sub?.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <p className="text-sm text-main-3 flex-grow">
            © {new Date().getFullYear()} | {shopName}
          </p>
          {enableLocaleSwitcher && (
            <div className="invisible md:visible flex gap-4">
              <ChannelDropdown horizontalAlignment="right" />
              <LocaleDropdown horizontalAlignment="right" />
            </div>
          )}
        </div>
      </Box>
    </footer>
  );
}

export default Footer;
