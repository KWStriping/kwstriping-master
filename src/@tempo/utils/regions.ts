import type { LanguageCode } from '@tempo/api/generated/graphql';

export const locales = ['en-US', 'pl-PL', 'fr-FR', 'nl-NL'] as const;

export type Locale = (typeof locales)[number];

export const DEFAULT_LOCALE = locales[0]; // TODO

export const LOCALES = [
  {
    slug: 'en-US',
    code: 'EN_US',
    name: 'American English',
  },
  { slug: 'pl-PL', code: 'PL_PL', name: 'Polski' },
  { slug: 'fr-FR', code: 'FR_FR', name: 'Français' },
  { slug: 'vi-VN', code: 'VI_VN', name: 'Việt Nam' },
] as const;

export const CHANNEL_SLUG_KEY = 'channelSlug';

export interface Channel {
  slug: string;
  name: string;
  currencyCode: string;
}

// export const DEFAULT_CHANNEL = "default";
export const DEFAULT_CHANNEL: Channel = {
  slug: 'default',
  name: 'United States Dollar',
  currencyCode: 'USD',
};

export const CHANNELS: Channel[] = [
  DEFAULT_CHANNEL,
  // {
  //   slug: "channel-pln",
  //   name: "Polski Złoty",
  //   currencyCode: "PLN",
  // },
  // {
  //   slug: "channel-fr",
  //   name: "Euro",
  //   currencyCode: "EUR",
  // },
  // {
  //   slug: "channel-vi",
  //   name: "Việt Nam đồng",
  //   currencyCode: "VND",
  // },
];

export interface RegionCombination {
  channelSlug: string;
  localeSlug: string;
}

export const regionCombinations = () => {
  const combinations: RegionCombination[] = [];
  CHANNELS.forEach((channel) => {
    LOCALES.forEach((locale) => {
      combinations.push({ channelSlug: channel.slug, localeSlug: locale.slug });
    });
  });
  return combinations;
};

export interface Path<T> {
  params: T;
}

export const localeToLanguageCode = (localeSlug: Locale): LanguageCode => {
  const locale = LOCALES.find(({ slug }) => slug === localeSlug);
  if (!locale) throw new Error(`Locale ${localeSlug} not found`);
  return locale.code;
};

export const contextToRegionQuery = (context: any) => ({
  channel: context.params?.channel?.toString() || DEFAULT_CHANNEL.slug,
  languageCode: localeToLanguageCode(
    (context.params?.locale?.toString() as Locale) || DEFAULT_LOCALE
  ),
});

// export const languageCodeToLocale = (locale: string) => {
//   // Converts locale from EN_US to en-US
//   const splitted = locale.split("_");
//   splitted[0] = splitted[0].toLowerCase();
//   return splitted.join("-");
// };
