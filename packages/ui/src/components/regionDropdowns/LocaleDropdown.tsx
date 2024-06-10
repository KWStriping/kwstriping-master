import { useLocalization } from '@core/ui/providers/LocalizationProvider';
import { LOCALES } from '@core/utils/regions';
import { useRouter } from 'next/router';

import type { HorizontalAlignment } from './BaseRegionsDropdown';
import { BaseRegionsDropdown } from './BaseRegionsDropdown';
import { BaseRegionsDropdownItem } from './BaseRegionsDropdownItem';

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
  const { locale, currentChannel } = useLocalization();

  const localeOptions: DropdownOption[] = LOCALES.map((loc) => ({
    label: loc.name,
    chosen: loc.slug === locale,
    localeSlug: loc.slug,
  }));

  const onLocaleChange = (localeSlug: string) => {
    if (localeSlug === locale) return;

    // Update current URL to use the chosen locale
    void router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        channel: currentChannel.slug,
        locale: localeSlug,
      },
    });
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
