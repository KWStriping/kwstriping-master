import { LOCALES } from '@tempo/utils/regions';
import { useRouter, useSearchParams } from 'next/navigation';

import type { HorizontalAlignment } from './BaseRegionsDropdown';
import { BaseRegionsDropdown } from './BaseRegionsDropdown';
import { BaseRegionsDropdownItem } from './BaseRegionsDropdownItem';
import { useLocalization } from '@tempo/ui/providers/LocalizationProvider';

interface DropdownOption {
  label: string;
  chosen: boolean;
  localeSlug: string;
}

export interface LocaleDropdownProps {
  horizontalAlignment?: HorizontalAlignment;
}

export function LocaleDropdown({ horizontalAlignment }: LocaleDropdownProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locale } = useLocalization();

  const localeOptions: DropdownOption[] = LOCALES.map((loc) => ({
    label: loc.name,
    chosen: loc.slug === locale,
    localeSlug: loc.slug,
  }));

  const onLocaleChange = (localeSlug: string) => {
    if (localeSlug === locale) return;
    const params = new URLSearchParams(searchParams);
    params.set('locale', localeSlug);
    // Update current URL to use the chosen locale
    void router.push(`?${params.toString()}`);
  };

  return (
    <BaseRegionsDropdown label={locale} horizontalAlignment={horizontalAlignment}>
      {localeOptions.map((option) => (
        <BaseRegionsDropdownItem
          key={option.label}
          chosen={option.chosen}
          label={option.label}
          onClick={() => onLocaleChange(option.localeSlug)}
        />
      ))}
    </BaseRegionsDropdown>
  );
}

export default LocaleDropdown;
