import { isExternalURL } from '@core/ui/utils/urls';
import Link from 'next/link';
import type { FC } from 'react';
import { forwardRef } from 'react';
import RawIconButton from './IconButton';
import type { IconButtonProps as RawIconButtonProps } from './IconButton';

export interface IconButtonProps extends RawIconButtonProps {
  href?: string;
}

export const IconButton: FC<IconButtonProps> = forwardRef(({ href, ...props }, ref) => {
  if (href && !isExternalURL(href)) {
    return (
      <Link href={href}>
        <RawIconButton {...props} ref={ref} />
      </Link>
    );
  }
  return <RawIconButton {...props} ref={ref} />;
});

IconButton.displayName = 'IconButton';

export default IconButton;
