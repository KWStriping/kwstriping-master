import type { UrlObject } from 'url';
import type { TypographyProps } from '@mui/material/Typography';
import Typography from '@mui/material/Typography';

import clsx from 'clsx';
import NextLink from 'next/link';
import { forwardRef } from 'react';
import type {
  ForwardedRef,
  MouseEvent,
  AnchorHTMLAttributes,
  MouseEventHandler,
  Ref,
} from 'react';
import styles from './index.module.css';
import { isExternalURL } from '@tempo/ui/utils/urls';

type Href = string | UrlObject;

interface LinkProps
  extends Pick<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    'rel' | 'target' | 'className' | 'children'
  > {
  href?: Href;
  color?: 'primary' | 'secondary' | 'inherit';
  underline?: boolean;
  typographyProps?: TypographyProps;
  onClick?: MouseEventHandler;
  disabled?: boolean;
  ref?: Ref<HTMLAnchorElement>;
}

function InnerLink(
  {
    className,
    children,
    color,
    underline = false,
    onClick,
    disabled,
    href,
    target,
    rel,
    ...linkProps
  }: LinkProps,
  ref: ForwardedRef<HTMLAnchorElement>
) {
  const opensNewTab = target === '_blank';

  const commonLinkProps = {
    className: clsx(
      className,
      color && styles[color],
      underline && (styles.underline ?? ''),
      !underline && (styles.noUnderline ?? ''),
      disabled && styles.disabled
    ),
    ...(disabled
      ? {
          onClick: (event: MouseEvent) => event.preventDefault(),
        }
      : onClick
        ? {
            onClick,
          }
        : {}),
    target,
    rel: (rel ?? (href && opensNewTab && isExternalURL(href))) ? 'noopener noreferer' : '',
    ...linkProps,
  };

  const useNextLink = !!href && !isExternalURL(href) && !disabled;

  return (
    <>
      {useNextLink ? (
        <NextLink href={href} ref={ref} {...commonLinkProps}>
          {children}
        </NextLink>
      ) : (
        <Typography
          component="a"
          ref={ref}
          href={disabled ? undefined : (href as string)}
          {...commonLinkProps}
        >
          {children}
        </Typography>
      )}
    </>
  );
}

InnerLink.displayName = 'Link';

const Link = forwardRef(InnerLink) as (
  props: LinkProps & { ref?: ForwardedRef<HTMLAnchorElement> }
) => ReturnType<typeof InnerLink>;

export default Link;
