import Image from 'next/image';
import type { FC } from 'react';
import { useShopSettings } from '@tempo/ui';

interface LogoProps {
  className?: string;
}

export const Logo: FC<LogoProps> = ({ className }) => {
  const { logo, name } = useShopSettings();
  const height = logo.height ? parseInt(logo.height) : undefined;
  const width = logo.width ? parseInt(logo.width) : undefined;
  console.log('logo', { logo, height, width });
  return (
    <div className={className ?? 'w-full h-full'}>
      <Image
        src={logo.url}
        alt={logo.alt ?? `${name} logo`}
        {...(width && height ? { width, height } : { fill: true })}
        style={{ objectPosition: 'center' }}
      />
    </div>
  );
};

export default Logo;
