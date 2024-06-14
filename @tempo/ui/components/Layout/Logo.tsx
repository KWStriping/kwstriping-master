import Image from 'next/image';
import type { FC } from 'react';
import { useShopSettings } from '@tempo/ui/providers/ShopSettingsProvider';

interface LogoProps {
  className?: string;
}

export const Logo: FC<LogoProps> = ({ className }) => {
  const { logo, name } = useShopSettings();
  const height = logo?.height ?? undefined;
  const width = logo?.width ?? undefined;
  return (
    <div className={className ?? 'w-full h-full'}>
      {!!logo && (
        <Image
          src={logo.url}
          alt={logo.alt ?? `${name} logo`}
          {...(width && height ? { width, height } : { fill: true })}
          style={{ objectPosition: 'center' }}
        />
      )}
    </div>
  );
};

export default Logo;
