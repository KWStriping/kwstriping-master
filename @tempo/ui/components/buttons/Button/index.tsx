import type { UrlObject } from 'url';
import Link from 'next/link';
import { forwardRef } from 'react';
import type { ButtonProps as RawButtonProps } from './Button';
import RawButton from './Button';
import { isExternalURL } from '@tempo/ui/utils/urls';

export interface ButtonProps extends Omit<RawButtonProps, 'href'> {
  href?: string | UrlObject;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ href, children, ...props }, ref) => {
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
  }
);

Button.displayName = 'Button';

export default Button;
