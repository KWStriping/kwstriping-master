import type { UrlObject } from 'url';
import { isExternalURL } from '@tempo/ui/utils/urls';
import Link from 'next/link';
import type { FC } from 'react';
import { forwardRef } from 'react';
import type { ButtonProps as RawButtonProps } from './Button';
import RawButton from './Button';

export interface ButtonProps extends Omit<RawButtonProps, 'href'> {
  href?: string | UrlObject;
}

export const Button: FC<ButtonProps> = forwardRef(({ href, children, ...props }, ref) => {
  if (href && !isExternalURL(href)) {
    return (
      <Link href={href}>
        <RawButton {...props} ref={ref}>
          {children}
        </RawButton>
      </Link>
    );
  }
  return (
    <RawButton {...props} ref={ref}>
      {children}
    </RawButton>
  );
});

Button.displayName = 'Button';

export default Button;
